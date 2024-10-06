var $r = Object.defineProperty;
var Ar = (n, e, t) => e in n ? $r(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var Ps = (n, e, t) => Ar(n, typeof e != "symbol" ? e + "" : e, t);
import { reactive as Xe, watch as ye, ref as x, shallowRef as Mr, onMounted as ve, onUnmounted as gs, onUpdated as cn, nextTick as Ke, computed as Ie, inject as X, getCurrentInstance as ln, onBeforeUnmount as dn, customRef as Tr, provide as Fr } from "vue";
import Vr from "mitt";
import Dr from "dragselect";
import Or from "@uppy/core";
import Lr from "@uppy/xhr-upload";
import Rr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import "cropperjs";
var on;
const Zt = (on = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : on.getAttribute("content");
class Ir {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    Ps(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const t = this.config, s = {};
    Zt != null && Zt !== "" && (s[t.xsrfHeaderName] = Zt);
    const r = Object.assign(
      {},
      t.headers,
      s,
      e.headers
    ), a = Object.assign({}, t.params, e.params), o = e.body, c = t.baseUrl + e.url, i = e.method;
    let d;
    i !== "get" && (o instanceof FormData ? (d = o, t.body != null && Object.entries(this.config.body).forEach(([l, v]) => {
      d.append(l, v);
    })) : (d = { ...o }, t.body != null && Object.assign(d, this.config.body)));
    const u = {
      url: c,
      method: i,
      headers: r,
      params: a,
      body: d
    };
    if (t.transformRequest != null) {
      const l = t.transformRequest({
        url: c,
        method: i,
        headers: r,
        params: a,
        body: d
      });
      l.url != null && (u.url = l.url), l.method != null && (u.method = l.method), l.params != null && (u.params = l.params ?? {}), l.headers != null && (u.headers = l.headers ?? {}), l.body != null && (u.body = l.body);
    }
    return u;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, t) {
    if (t.url != null)
      return t.url;
    const s = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: t.path }
    });
    return s.url + "?" + new URLSearchParams(s.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, t) {
    if (t.url != null)
      return t.url;
    const s = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: t.path }
    });
    return s.url + "?" + new URLSearchParams(s.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const t = this.transformRequestParams(e), s = e.responseType || "json", r = {
      method: e.method,
      headers: t.headers,
      signal: e.abortSignal
    }, a = t.url + "?" + new URLSearchParams(t.params);
    if (t.method !== "get" && t.body != null) {
      let c;
      t.body instanceof FormData ? c = e.body : (c = JSON.stringify(t.body), r.headers["Content-Type"] = "application/json"), r.body = c;
    }
    const o = await fetch(a, r);
    if (o.ok)
      return await o[s]();
    throw await o.json();
  }
  async getPinnedFolders() {
    return (await this.send({
      method: "get",
      url: "/pinned-folders"
    })).map((t) => JSON.parse(t.folder_data));
  }
  async pinFolder(e) {
    await this.send({
      method: "post",
      url: "/pinned-folders",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        folders: JSON.parse(JSON.stringify(e))
      }
    });
  }
  async unpinFolder(e) {
    await this.send({
      method: "delete",
      url: "/pinned-folders",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        path: e.path
      }
    });
  }
}
function Br(n) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof n == "string" ? Object.assign(e, { baseUrl: n }) : Object.assign(e, n), new Ir(e);
}
function Pr(n) {
  let e = localStorage.getItem(n + "_storage");
  const t = Xe(JSON.parse(e ?? "{}"));
  ye(t, s);
  function s() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function r(i, d) {
    t[i] = d;
  }
  function a(i) {
    delete t[i];
  }
  function o() {
    Object.keys(t).map((i) => a(i));
  }
  return { getStore: (i, d = null) => t.hasOwnProperty(i) ? t[i] : d, setStore: r, removeStore: a, clearStore: o };
}
async function Nr(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function Hr(n, e, t, s) {
  const { getStore: r, setStore: a } = n, o = x({}), c = x(r("locale", e)), i = (l, v = e) => {
    Nr(l, s).then((p) => {
      o.value = p, a("locale", l), c.value = l, a("translations", p), Object.values(s).length > 1 && (t.emit("vf-toast-push", { label: "The language is set to " + l }), t.emit("vf-language-saved"));
    }).catch((p) => {
      v ? (t.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(v, null)) : t.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  ye(c, (l) => {
    i(l);
  }), !r("locale") && !s.length ? i(e) : o.value = r("translations");
  const d = (l, ...v) => v.length ? d(l = l.replace("%s", v.shift()), ...v) : l;
  function u(l, ...v) {
    return o.value && o.value.hasOwnProperty(l) ? d(o.value[l], ...v) : d(l, ...v);
  }
  return Xe({ t: u, locale: c });
}
const fe = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, Ur = Object.values(fe), Gr = "2.5.16";
function un(n, e, t, s, r) {
  return (e = Math, t = e.log, s = 1024, r = t(n) / t(s) | 0, n / e.pow(s, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "iB" : "B");
}
function _n(n, e, t, s, r) {
  return (e = Math, t = e.log, s = 1e3, r = t(n) / t(s) | 0, n / e.pow(s, r)).toFixed(0) + " " + (r ? "KMGTPEZY"[--r] + "B" : "B");
}
function qr(n) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, s = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  return s[1] * Math.pow(1024, e[s[2].toLowerCase()]);
}
const He = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function zr(n, e) {
  const t = x(He.SYSTEM), s = x(He.LIGHT);
  t.value = n.getStore("theme", e ?? He.SYSTEM);
  const r = window.matchMedia("(prefers-color-scheme: dark)"), a = (o) => {
    t.value === He.DARK || t.value === He.SYSTEM && o.matches ? s.value = He.DARK : s.value = He.LIGHT;
  };
  return a(r), r.addEventListener("change", a), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: t,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: s,
    /**
     * @param {Theme} value
     */
    set(o) {
      t.value = o, o !== He.SYSTEM ? n.setStore("theme", o) : n.removeStore("theme"), a(r);
    }
  };
}
function jr() {
  const n = Mr(null), e = x(!1), t = x();
  return { visible: e, type: n, data: t, open: (a, o = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = a, t.value = o;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, n.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.10.0
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const ge = (n, e) => {
  const { o: t, i: s, u: r } = n;
  let a = t, o;
  const c = (u, l) => {
    const v = a, p = u, _ = l || (s ? !s(v, p) : v !== p);
    return (_ || r) && (a = p, o = v), [a, _, o];
  };
  return [e ? (u) => c(e(a, o), u) : c, (u) => [a, !!u, o]];
}, Wr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, he = Wr ? window : {}, vn = Math.max, Kr = Math.min, ss = Math.round, Tt = Math.abs, Ns = Math.sign, fn = he.cancelAnimationFrame, bs = he.requestAnimationFrame, Ft = he.setTimeout, ns = he.clearTimeout, Bt = (n) => typeof he[n] < "u" ? he[n] : void 0, Yr = Bt("MutationObserver"), Hs = Bt("IntersectionObserver"), Vt = Bt("ResizeObserver"), Et = Bt("ScrollTimeline"), ws = (n) => n === void 0, Pt = (n) => n === null, Me = (n) => typeof n == "number", ft = (n) => typeof n == "string", ys = (n) => typeof n == "boolean", xe = (n) => typeof n == "function", Te = (n) => Array.isArray(n), Dt = (n) => typeof n == "object" && !Te(n) && !Pt(n), Cs = (n) => {
  const e = !!n && n.length, t = Me(e) && e > -1 && e % 1 == 0;
  return Te(n) || !xe(n) && t ? e > 0 && Dt(n) ? e - 1 in n : !0 : !1;
}, Ot = (n) => !!n && n.constructor === Object, Lt = (n) => n instanceof HTMLElement, Nt = (n) => n instanceof Element;
function Q(n, e) {
  if (Cs(n))
    for (let t = 0; t < n.length && e(n[t], t, n) !== !1; t++)
      ;
  else n && Q(Object.keys(n), (t) => e(n[t], t, n));
  return n;
}
const pn = (n, e) => n.indexOf(e) >= 0, ut = (n, e) => n.concat(e), ne = (n, e, t) => (!ft(e) && Cs(e) ? Array.prototype.push.apply(n, e) : n.push(e), n), qe = (n) => Array.from(n || []), Ss = (n) => Te(n) ? n : !ft(n) && Cs(n) ? qe(n) : [n], rs = (n) => !!n && !n.length, as = (n) => qe(new Set(n)), Ce = (n, e, t) => {
  Q(n, (r) => r ? r.apply(void 0, e || []) : !0), !t && (n.length = 0);
}, mn = "paddingTop", hn = "paddingRight", gn = "paddingLeft", bn = "paddingBottom", wn = "marginLeft", yn = "marginRight", Cn = "marginBottom", Sn = "overflowX", xn = "overflowY", Ht = "width", Ut = "height", Ue = "visible", We = "hidden", nt = "scroll", Qr = (n) => {
  const e = String(n || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, Gt = (n, e, t, s) => {
  if (n && e) {
    let r = !0;
    return Q(t, (a) => {
      const o = n[a], c = e[a];
      o !== c && (r = !1);
    }), r;
  }
  return !1;
}, kn = (n, e) => Gt(n, e, ["w", "h"]), $t = (n, e) => Gt(n, e, ["x", "y"]), Xr = (n, e) => Gt(n, e, ["t", "r", "b", "l"]), Ye = () => {
}, U = (n, ...e) => n.bind(0, ...e), Je = (n) => {
  let e;
  const t = n ? Ft : bs, s = n ? ns : fn;
  return [(r) => {
    s(e), e = t(() => r(), xe(n) ? n() : n);
  }, () => s(e)];
}, os = (n, e) => {
  const { _: t, v: s, p: r, S: a } = e || {};
  let o, c, i, d, u = Ye;
  const l = function(f) {
    u(), ns(o), d = o = c = void 0, u = Ye, n.apply(this, f);
  }, v = (m) => a && c ? a(c, m) : m, p = () => {
    u !== Ye && l(v(i) || i);
  }, _ = function() {
    const f = qe(arguments), y = xe(t) ? t() : t;
    if (Me(y) && y >= 0) {
      const B = xe(s) ? s() : s, k = Me(B) && B >= 0, O = y > 0 ? Ft : bs, E = y > 0 ? ns : fn, C = v(f) || f, F = l.bind(0, C);
      let b;
      u(), r && !d ? (F(), d = !0, b = O(() => d = void 0, y)) : (b = O(F, y), k && !o && (o = Ft(p, B))), u = () => E(b), c = i = C;
    } else
      l(f);
  };
  return _.m = p, _;
}, En = (n, e) => Object.prototype.hasOwnProperty.call(n, e), ke = (n) => n ? Object.keys(n) : [], Y = (n, e, t, s, r, a, o) => {
  const c = [e, t, s, r, a, o];
  return (typeof n != "object" || Pt(n)) && !xe(n) && (n = {}), Q(c, (i) => {
    Q(i, (d, u) => {
      const l = i[u];
      if (n === l)
        return !0;
      const v = Te(l);
      if (l && Ot(l)) {
        const p = n[u];
        let _ = p;
        v && !Te(p) ? _ = [] : !v && !Ot(p) && (_ = {}), n[u] = Y(_, l);
      } else
        n[u] = v ? l.slice() : l;
    });
  }), n;
}, $n = (n, e) => Q(Y({}, n), (t, s, r) => {
  t === void 0 ? delete r[s] : t && Ot(t) && (r[s] = $n(t));
}), xs = (n) => !ke(n).length, An = (n, e, t) => vn(n, Kr(e, t)), Qe = (n) => as((Te(n) ? n : (n || "").split(" ")).filter((e) => e)), ks = (n, e) => n && n.getAttribute(e), Us = (n, e) => n && n.hasAttribute(e), Le = (n, e, t) => {
  Q(Qe(e), (s) => {
    n && n.setAttribute(s, String(t || ""));
  });
}, $e = (n, e) => {
  Q(Qe(e), (t) => n && n.removeAttribute(t));
}, qt = (n, e) => {
  const t = Qe(ks(n, e)), s = U(Le, n, e), r = (a, o) => {
    const c = new Set(t);
    return Q(Qe(a), (i) => {
      c[o](i);
    }), qe(c).join(" ");
  };
  return {
    O: (a) => s(r(a, "delete")),
    $: (a) => s(r(a, "add")),
    C: (a) => {
      const o = Qe(a);
      return o.reduce((c, i) => c && t.includes(i), o.length > 0);
    }
  };
}, Mn = (n, e, t) => (qt(n, e).O(t), U(Es, n, e, t)), Es = (n, e, t) => (qt(n, e).$(t), U(Mn, n, e, t)), Rt = (n, e, t, s) => (s ? Es : Mn)(n, e, t), $s = (n, e, t) => qt(n, e).C(t), Tn = (n) => qt(n, "class"), Fn = (n, e) => {
  Tn(n).O(e);
}, As = (n, e) => (Tn(n).$(e), U(Fn, n, e)), Vn = (n, e) => {
  const t = e ? Nt(e) && e : document;
  return t ? qe(t.querySelectorAll(n)) : [];
}, Zr = (n, e) => {
  const t = e ? Nt(e) && e : document;
  return t && t.querySelector(n);
}, is = (n, e) => Nt(n) && n.matches(e), Dn = (n) => is(n, "body"), cs = (n) => n ? qe(n.childNodes) : [], _t = (n) => n && n.parentElement, et = (n, e) => Nt(n) && n.closest(e), ls = (n) => document.activeElement, Jr = (n, e, t) => {
  const s = et(n, e), r = n && Zr(t, s), a = et(r, e) === s;
  return s && r ? s === n || r === n || a && et(et(n, t), e) !== s : !1;
}, rt = (n) => {
  Q(Ss(n), (e) => {
    const t = _t(e);
    e && t && t.removeChild(e);
  });
}, be = (n, e) => U(rt, n && e && Q(Ss(e), (t) => {
  t && n.appendChild(t);
})), tt = (n) => {
  const e = document.createElement("div");
  return Le(e, "class", n), e;
}, On = (n) => {
  const e = tt();
  return e.innerHTML = n.trim(), Q(cs(e), (t) => rt(t));
}, Gs = (n, e) => n.getPropertyValue(e) || n[e] || "", Ln = (n) => {
  const e = n || 0;
  return isFinite(e) ? e : 0;
}, xt = (n) => Ln(parseFloat(n || "")), ds = (n) => Math.round(n * 1e4) / 1e4, Rn = (n) => `${ds(Ln(n))}px`;
function vt(n, e) {
  n && e && Q(e, (t, s) => {
    try {
      const r = n.style, a = Pt(t) || ys(t) ? "" : Me(t) ? Rn(t) : t;
      s.indexOf("--") === 0 ? r.setProperty(s, a) : r[s] = a;
    } catch {
    }
  });
}
function Be(n, e, t) {
  const s = ft(e);
  let r = s ? "" : {};
  if (n) {
    const a = he.getComputedStyle(n, t) || n.style;
    r = s ? Gs(a, e) : qe(e).reduce((o, c) => (o[c] = Gs(a, c), o), r);
  }
  return r;
}
const qs = (n, e, t) => {
  const s = e ? `${e}-` : "", r = t ? `-${t}` : "", a = `${s}top${r}`, o = `${s}right${r}`, c = `${s}bottom${r}`, i = `${s}left${r}`, d = Be(n, [a, o, c, i]);
  return {
    t: xt(d[a]),
    r: xt(d[o]),
    b: xt(d[c]),
    l: xt(d[i])
  };
}, ea = (n, e) => `translate${Dt(n) ? `(${n.x},${n.y})` : `Y(${n})`}`, ta = (n) => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length), sa = {
  w: 0,
  h: 0
}, zt = (n, e) => e ? {
  w: e[`${n}Width`],
  h: e[`${n}Height`]
} : sa, na = (n) => zt("inner", n || he), st = U(zt, "offset"), In = U(zt, "client"), It = U(zt, "scroll"), Ms = (n) => {
  const e = parseFloat(Be(n, Ht)) || 0, t = parseFloat(Be(n, Ut)) || 0;
  return {
    w: e - ss(e),
    h: t - ss(t)
  };
}, Jt = (n) => n.getBoundingClientRect(), ra = (n) => !!n && ta(n), us = (n) => !!(n && (n[Ut] || n[Ht])), Bn = (n, e) => {
  const t = us(n);
  return !us(e) && t;
}, zs = (n, e, t, s) => {
  Q(Qe(e), (r) => {
    n && n.removeEventListener(r, t, s);
  });
}, ee = (n, e, t, s) => {
  var r;
  const a = (r = s && s.H) != null ? r : !0, o = s && s.I || !1, c = s && s.A || !1, i = {
    passive: a,
    capture: o
  };
  return U(Ce, Qe(e).map((d) => {
    const u = c ? (l) => {
      zs(n, d, u, o), t && t(l);
    } : t;
    return n && n.addEventListener(d, u, i), U(zs, n, d, u, o);
  }));
}, Pn = (n) => n.stopPropagation(), _s = (n) => n.preventDefault(), Nn = (n) => Pn(n) || _s(n), Ae = (n, e) => {
  const { x: t, y: s } = Me(e) ? {
    x: e,
    y: e
  } : e || {};
  Me(t) && (n.scrollLeft = t), Me(s) && (n.scrollTop = s);
}, we = (n) => ({
  x: n.scrollLeft,
  y: n.scrollTop
}), Hn = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), aa = (n, e) => {
  const { D: t, M: s } = n, { w: r, h: a } = e, o = (l, v, p) => {
    let _ = Ns(l) * p, m = Ns(v) * p;
    if (_ === m) {
      const f = Tt(l), y = Tt(v);
      m = f > y ? 0 : m, _ = f < y ? 0 : _;
    }
    return _ = _ === m ? 0 : _, [_ + 0, m + 0];
  }, [c, i] = o(t.x, s.x, r), [d, u] = o(t.y, s.y, a);
  return {
    D: {
      x: c,
      y: d
    },
    M: {
      x: i,
      y: u
    }
  };
}, js = ({ D: n, M: e }) => {
  const t = (s, r) => s === 0 && s <= r;
  return {
    x: t(n.x, e.x),
    y: t(n.y, e.y)
  };
}, Ws = ({ D: n, M: e }, t) => {
  const s = (r, a, o) => An(0, 1, (r - o) / (r - a) || 0);
  return {
    x: s(n.x, e.x, t.x),
    y: s(n.y, e.y, t.y)
  };
}, vs = (n) => {
  n && n.focus && n.focus({
    preventScroll: !0
  });
}, Ks = (n, e) => {
  Q(Ss(e), n);
}, fs = (n) => {
  const e = /* @__PURE__ */ new Map(), t = (a, o) => {
    if (a) {
      const c = e.get(a);
      Ks((i) => {
        c && c[i ? "delete" : "clear"](i);
      }, o);
    } else
      e.forEach((c) => {
        c.clear();
      }), e.clear();
  }, s = (a, o) => {
    if (ft(a)) {
      const d = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, d), Ks((u) => {
        xe(u) && d.add(u);
      }, o), U(t, a, o);
    }
    ys(o) && o && t();
    const c = ke(a), i = [];
    return Q(c, (d) => {
      const u = a[d];
      u && ne(i, s(d, u));
    }), U(Ce, i);
  }, r = (a, o) => {
    Q(qe(e.get(a)), (c) => {
      o && !rs(o) ? c.apply(0, o) : c();
    });
  };
  return s(n || {}), [s, t, r];
}, Ys = (n) => JSON.stringify(n, (e, t) => {
  if (xe(t))
    throw 0;
  return t;
}), Qs = (n, e) => n ? `${e}`.split(".").reduce((t, s) => t && En(t, s) ? t[s] : void 0, n) : void 0, oa = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, Un = (n, e) => {
  const t = {}, s = ut(ke(e), ke(n));
  return Q(s, (r) => {
    const a = n[r], o = e[r];
    if (Dt(a) && Dt(o))
      Y(t[r] = {}, Un(a, o)), xs(t[r]) && delete t[r];
    else if (En(e, r) && o !== a) {
      let c = !0;
      if (Te(a) || Te(o))
        try {
          Ys(a) === Ys(o) && (c = !1);
        } catch {
        }
      c && (t[r] = o);
    }
  }), t;
}, Xs = (n, e, t) => (s) => [Qs(n, s), t || Qs(e, s) !== void 0], ot = "data-overlayscrollbars", At = "os-environment", kt = `${At}-scrollbar-hidden`, es = `${ot}-initialize`, Mt = "noClipping", Zs = `${ot}-body`, Ge = ot, ia = "host", Re = `${ot}-viewport`, ca = Sn, la = xn, da = "arrange", Gn = "measuring", ua = "scrolling", qn = "scrollbarHidden", _a = "noContent", ps = `${ot}-padding`, Js = `${ot}-content`, Ts = "os-size-observer", va = `${Ts}-appear`, fa = `${Ts}-listener`, pa = "os-trinsic-observer", ma = "os-theme-none", Se = "os-scrollbar", ha = `${Se}-rtl`, ga = `${Se}-horizontal`, ba = `${Se}-vertical`, zn = `${Se}-track`, Fs = `${Se}-handle`, wa = `${Se}-visible`, ya = `${Se}-cornerless`, en = `${Se}-interaction`, tn = `${Se}-unusable`, ms = `${Se}-auto-hide`, sn = `${ms}-hidden`, nn = `${Se}-wheel`, Ca = `${zn}-interactive`, Sa = `${Fs}-interactive`;
let jn;
const xa = () => jn, ka = (n) => {
  jn = n;
};
let ts;
const Ea = () => {
  const n = (k, O, E) => {
    be(document.body, k), be(document.body, k);
    const T = In(k), C = st(k), F = Ms(O);
    return E && rt(k), {
      x: C.h - T.h + F.h,
      y: C.w - T.w + F.w
    };
  }, e = (k) => {
    let O = !1;
    const E = As(k, kt);
    try {
      O = Be(k, "scrollbar-width") === "none" || Be(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return E(), O;
  }, t = `.${At}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${At} div{width:200%;height:200%;margin:10px 0}.${kt}{scrollbar-width:none!important}.${kt}::-webkit-scrollbar,.${kt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, r = On(`<div class="${At}"><div></div><style>${t}</style></div>`)[0], a = r.firstChild, o = r.lastChild, c = xa();
  c && (o.nonce = c);
  const [i, , d] = fs(), [u, l] = ge({
    o: n(r, a),
    i: $t
  }, U(n, r, a, !0)), [v] = l(), p = e(r), _ = {
    x: v.x === 0,
    y: v.y === 0
  }, m = {
    elements: {
      host: null,
      padding: !p,
      viewport: (k) => p && Dn(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, f = Y({}, oa), y = U(Y, {}, f), $ = U(Y, {}, m), B = {
    T: v,
    k: _,
    R: p,
    V: !!Et,
    L: U(i, "r"),
    U: $,
    P: (k) => Y(m, k) && $(),
    N: y,
    q: (k) => Y(f, k) && y(),
    B: Y({}, m),
    F: Y({}, f)
  };
  if ($e(r, "style"), rt(r), ee(he, "resize", () => {
    d("r", []);
  }), xe(he.matchMedia) && !p && (!_.x || !_.y)) {
    const k = (O) => {
      const E = he.matchMedia(`(resolution: ${he.devicePixelRatio}dppx)`);
      ee(E, "change", () => {
        O(), k(O);
      }, {
        A: !0
      });
    };
    k(() => {
      const [O, E] = u();
      Y(B.T, O), d("r", [E]);
    });
  }
  return B;
}, Ve = () => (ts || (ts = Ea()), ts), Wn = (n, e) => xe(e) ? e.apply(0, n) : e, $a = (n, e, t, s) => {
  const r = ws(s) ? t : s;
  return Wn(n, r) || e.apply(0, n);
}, Kn = (n, e, t, s) => {
  const r = ws(s) ? t : s, a = Wn(n, r);
  return !!a && (Lt(a) ? a : e.apply(0, n));
}, Aa = (n, e) => {
  const { nativeScrollbarsOverlaid: t, body: s } = e || {}, { k: r, R: a, U: o } = Ve(), { nativeScrollbarsOverlaid: c, body: i } = o().cancel, d = t ?? c, u = ws(s) ? i : s, l = (r.x || r.y) && d, v = n && (Pt(u) ? !a : u);
  return !!l || !!v;
}, Vs = /* @__PURE__ */ new WeakMap(), Ma = (n, e) => {
  Vs.set(n, e);
}, Ta = (n) => {
  Vs.delete(n);
}, Yn = (n) => Vs.get(n), Fa = (n, e, t) => {
  let s = !1;
  const r = t ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    s = !0;
  }, o = (c) => {
    if (r && t) {
      const i = t.map((d) => {
        const [u, l] = d || [];
        return [l && u ? (c || Vn)(u, n) : [], l];
      });
      Q(i, (d) => Q(d[0], (u) => {
        const l = d[1], v = r.get(u) || [];
        if (n.contains(u) && l) {
          const _ = ee(u, l, (m) => {
            s ? (_(), r.delete(u)) : e(m);
          });
          r.set(u, ne(v, _));
        } else
          Ce(v), r.delete(u);
      }));
    }
  };
  return o(), [a, o];
}, rn = (n, e, t, s) => {
  let r = !1;
  const { j: a, X: o, Y: c, W: i, J: d, G: u } = s || {}, l = os(() => r && t(!0), {
    _: 33,
    v: 99
  }), [v, p] = Fa(n, l, c), _ = a || [], m = o || [], f = ut(_, m), y = (B, k) => {
    if (!rs(k)) {
      const O = d || Ye, E = u || Ye, T = [], C = [];
      let F = !1, b = !1;
      if (Q(k, (w) => {
        const { attributeName: S, target: R, type: g, oldValue: L, addedNodes: D, removedNodes: q } = w, K = g === "attributes", j = g === "childList", re = n === R, A = K && S, M = A && ks(R, S || ""), V = ft(M) ? M : null, I = A && L !== V, h = pn(m, S) && I;
        if (e && (j || !re)) {
          const N = K && I, P = N && i && is(R, i), z = (P ? !O(R, S, L, V) : !K || N) && !E(w, !!P, n, s);
          Q(D, (Z) => ne(T, Z)), Q(q, (Z) => ne(T, Z)), b = b || z;
        }
        !e && re && I && !O(R, S, L, V) && (ne(C, S), F = F || h);
      }), p((w) => as(T).reduce((S, R) => (ne(S, Vn(w, R)), is(R, w) ? ne(S, R) : S), [])), e)
        return !B && b && t(!1), [!1];
      if (!rs(C) || F) {
        const w = [as(C), F];
        return !B && t.apply(0, w), w;
      }
    }
  }, $ = new Yr(U(y, !1));
  return [() => ($.observe(n, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: f,
    subtree: e,
    childList: e,
    characterData: e
  }), r = !0, () => {
    r && (v(), $.disconnect(), r = !1);
  }), () => {
    if (r)
      return l.m(), y(!0, $.takeRecords());
  }];
}, Qn = {}, Xn = {}, Va = (n) => {
  Q(n, (e) => Q(e, (t, s) => {
    Qn[s] = e[s];
  }));
}, Zn = (n, e, t) => ke(n).map((s) => {
  const { static: r, instance: a } = n[s], [o, c, i] = t || [], d = t ? a : r;
  if (d) {
    const u = t ? d(o, c, e) : d(e);
    return (i || Xn)[s] = u;
  }
}), pt = (n) => Xn[n], Da = "__osOptionsValidationPlugin", Oa = "__osSizeObserverPlugin", La = (n, e) => {
  const { k: t } = e, [s, r] = n("showNativeOverlaidScrollbars");
  return [s && t.x && t.y, r];
}, at = (n) => n.indexOf(Ue) === 0, Ra = (n, e) => {
  const t = (r, a, o, c) => {
    const i = r === Ue ? We : r.replace(`${Ue}-`, ""), d = at(r), u = at(o);
    return !a && !c ? We : d && u ? Ue : d ? a && c ? i : a ? Ue : We : a ? i : u && c ? Ue : We;
  }, s = {
    x: t(e.x, n.x, e.y, n.y),
    y: t(e.y, n.y, e.x, n.x)
  };
  return {
    K: s,
    Z: {
      x: s.x === nt,
      y: s.y === nt
    }
  };
}, Jn = "__osScrollbarsHidingPlugin", Ia = "__osClickScrollPlugin", er = (n, e, t) => {
  const { dt: s } = t || {}, r = pt(Oa), [a] = ge({
    o: !1,
    u: !0
  });
  return () => {
    const o = [], i = On(`<div class="${Ts}"><div class="${fa}"></div></div>`)[0], d = i.firstChild, u = (l) => {
      const v = l instanceof ResizeObserverEntry;
      let p = !1, _ = !1;
      if (v) {
        const [m, , f] = a(l.contentRect), y = us(m);
        _ = Bn(m, f), p = !_ && !y;
      } else
        _ = l === !0;
      p || e({
        ft: !0,
        dt: _
      });
    };
    if (Vt) {
      const l = new Vt((v) => u(v.pop()));
      l.observe(d), ne(o, () => {
        l.disconnect();
      });
    } else if (r) {
      const [l, v] = r(d, u, s);
      ne(o, ut([As(i, va), ee(i, "animationstart", l)], v));
    } else
      return Ye;
    return U(Ce, ne(o, be(n, i)));
  };
}, Ba = (n, e) => {
  let t;
  const s = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, r = tt(pa), [a] = ge({
    o: !1
  }), o = (i, d) => {
    if (i) {
      const u = a(s(i)), [, l] = u;
      return l && !d && e(u) && [u];
    }
  }, c = (i, d) => o(d.pop(), i);
  return [() => {
    const i = [];
    if (Hs)
      t = new Hs(U(c, !1), {
        root: n
      }), t.observe(r), ne(i, () => {
        t.disconnect();
      });
    else {
      const d = () => {
        const u = st(r);
        o(u);
      };
      ne(i, er(r, d)()), d();
    }
    return U(Ce, ne(i, be(n, r)));
  }, () => t && c(!0, t.takeRecords())];
}, Pa = (n, e, t, s) => {
  let r, a, o, c, i, d;
  const u = `[${Ge}]`, l = `[${Re}]`, v = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: p, ht: _, ot: m, gt: f, bt: y, nt: $, wt: B, yt: k, St: O, Ot: E } = n, T = (h) => Be(h, "direction") === "rtl", C = {
    $t: !1,
    ct: T(p)
  }, F = Ve(), b = pt(Jn), [w] = ge({
    i: kn,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const h = b && b.tt(n, e, C, F, t).ut, P = !(B && $) && $s(_, Ge, Mt), H = !$ && k(da), z = H && we(f), Z = z && E(), oe = O(Gn, P), te = H && h && h()[0], de = It(m), G = Ms(m);
    return te && te(), Ae(f, z), Z && Z(), P && oe(), {
      w: de.w + G.w,
      h: de.h + G.h
    };
  }), S = os(s, {
    _: () => r,
    v: () => a,
    S(h, N) {
      const [P] = h, [H] = N;
      return [ut(ke(P), ke(H)).reduce((z, Z) => (z[Z] = P[Z] || H[Z], z), {})];
    }
  }), R = (h) => {
    const N = T(p);
    Y(h, {
      Ct: d !== N
    }), Y(C, {
      ct: N
    }), d = N;
  }, g = (h, N) => {
    const [P, H] = h, z = {
      xt: H
    };
    return Y(C, {
      $t: P
    }), !N && s(z), z;
  }, L = ({ ft: h, dt: N }) => {
    const H = !(h && !N) && F.R ? S : s, z = {
      ft: h || N,
      dt: N
    };
    R(z), H(z);
  }, D = (h, N) => {
    const [, P] = w(), H = {
      Ht: P
    };
    return R(H), P && !N && (h ? s : S)(H), H;
  }, q = (h, N, P) => {
    const H = {
      Et: N
    };
    return R(H), N && !P && S(H), H;
  }, [K, j] = y ? Ba(_, g) : [], re = !$ && er(_, L, {
    dt: !0
  }), [A, M] = rn(_, !1, q, {
    X: v,
    j: v
  }), V = $ && Vt && new Vt((h) => {
    const N = h[h.length - 1].contentRect;
    L({
      ft: !0,
      dt: Bn(N, i)
    }), i = N;
  }), I = os(() => {
    const [, h] = w();
    s({
      Ht: h
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    V && V.observe(_);
    const h = re && re(), N = K && K(), P = A(), H = F.L((z) => {
      z ? S({
        zt: z
      }) : I();
    });
    return () => {
      V && V.disconnect(), h && h(), N && N(), c && c(), P(), H();
    };
  }, ({ It: h, At: N, Dt: P }) => {
    const H = {}, [z] = h("update.ignoreMutation"), [Z, oe] = h("update.attributes"), [te, de] = h("update.elementEvents"), [G, ue] = h("update.debounce"), pe = de || oe, ce = N || P, _e = (ae) => xe(z) && z(ae);
    if (pe) {
      o && o(), c && c();
      const [ae, ie] = rn(y || m, !0, D, {
        j: ut(v, Z || []),
        Y: te,
        W: u,
        G: (J, se) => {
          const { target: le, attributeName: me } = J;
          return (!se && me && !$ ? Jr(le, u, l) : !1) || !!et(le, `.${Se}`) || !!_e(J);
        }
      });
      c = ae(), o = ie;
    }
    if (ue)
      if (S.m(), Te(G)) {
        const ae = G[0], ie = G[1];
        r = Me(ae) && ae, a = Me(ie) && ie;
      } else Me(G) ? (r = G, a = !1) : (r = !1, a = !1);
    if (ce) {
      const ae = M(), ie = j && j(), J = o && o();
      ae && Y(H, q(ae[0], ae[1], ce)), ie && Y(H, g(ie[0], ce)), J && Y(H, D(J[0], ce));
    }
    return R(H), H;
  }, C];
}, Na = (n, e, t, s) => {
  const r = "--os-viewport-percent", a = "--os-scroll-percent", o = "--os-scroll-direction", { U: c } = Ve(), { scrollbars: i } = c(), { slot: d } = i, { vt: u, ht: l, ot: v, Mt: p, gt: _, wt: m, nt: f } = e, { scrollbars: y } = p ? {} : n, { slot: $ } = y || {}, B = [], k = [], O = [], E = Kn([u, l, v], () => f && m ? u : l, d, $), T = (A) => {
    if (Et) {
      const M = new Et({
        source: _,
        axis: A
      });
      return {
        kt: (I) => {
          const h = I.Tt.animate({
            clear: ["left"],
            [a]: [0, 1]
          }, {
            timeline: M
          });
          return () => h.cancel();
        }
      };
    }
  }, C = {
    x: T("x"),
    y: T("y")
  }, F = () => {
    const { Rt: A, Vt: M } = t, V = (I, h) => An(0, 1, I / (I + h) || 0);
    return {
      x: V(M.x, A.x),
      y: V(M.y, A.y)
    };
  }, b = (A, M, V) => {
    const I = V ? As : Fn;
    Q(A, (h) => {
      I(h.Tt, M);
    });
  }, w = (A, M) => {
    Q(A, (V) => {
      const [I, h] = M(V);
      vt(I, h);
    });
  }, S = (A, M, V) => {
    const I = ys(V), h = I ? V : !0, N = I ? !V : !0;
    h && b(k, A, M), N && b(O, A, M);
  }, R = () => {
    const A = F(), M = (V) => (I) => [I.Tt, {
      [r]: ds(V) + ""
    }];
    w(k, M(A.x)), w(O, M(A.y));
  }, g = () => {
    if (!Et) {
      const { Lt: A } = t, M = Ws(A, we(_)), V = (I) => (h) => [h.Tt, {
        [a]: ds(I) + ""
      }];
      w(k, V(M.x)), w(O, V(M.y));
    }
  }, L = () => {
    const { Lt: A } = t, M = js(A), V = (I) => (h) => [h.Tt, {
      [o]: I ? "0" : "1"
    }];
    w(k, V(M.x)), w(O, V(M.y));
  }, D = () => {
    if (f && !m) {
      const { Rt: A, Lt: M } = t, V = js(M), I = Ws(M, we(_)), h = (N) => {
        const { Tt: P } = N, H = _t(P) === v && P, z = (Z, oe, te) => {
          const de = oe * Z;
          return Rn(te ? de : -de);
        };
        return [H, H && {
          transform: ea({
            x: z(I.x, A.x, V.x),
            y: z(I.y, A.y, V.y)
          })
        }];
      };
      w(k, h), w(O, h);
    }
  }, q = (A) => {
    const M = A ? "x" : "y", I = tt(`${Se} ${A ? ga : ba}`), h = tt(zn), N = tt(Fs), P = {
      Tt: I,
      Ut: h,
      Pt: N
    }, H = C[M];
    return ne(A ? k : O, P), ne(B, [be(I, h), be(h, N), U(rt, I), H && H.kt(P), s(P, S, A)]), P;
  }, K = U(q, !0), j = U(q, !1), re = () => (be(E, k[0].Tt), be(E, O[0].Tt), U(Ce, B));
  return K(), j(), [{
    Nt: R,
    qt: g,
    Bt: L,
    Ft: D,
    jt: S,
    Xt: {
      Yt: k,
      Wt: K,
      Jt: U(w, k)
    },
    Gt: {
      Yt: O,
      Wt: j,
      Jt: U(w, O)
    }
  }, re];
}, Ha = (n, e, t, s) => (r, a, o) => {
  const { ht: c, ot: i, nt: d, gt: u, Kt: l, Ot: v } = e, { Tt: p, Ut: _, Pt: m } = r, [f, y] = Je(333), [$, B] = Je(444), k = (T) => {
    xe(u.scrollBy) && u.scrollBy({
      behavior: "smooth",
      left: T.x,
      top: T.y
    });
  }, O = () => {
    const T = "pointerup pointercancel lostpointercapture", C = `client${o ? "X" : "Y"}`, F = o ? Ht : Ut, b = o ? "left" : "top", w = o ? "w" : "h", S = o ? "x" : "y", R = (L, D) => (q) => {
      const { Rt: K } = t, j = st(_)[w] - st(m)[w], A = D * q / j * K[S];
      Ae(u, {
        [S]: L + A
      });
    }, g = [];
    return ee(_, "pointerdown", (L) => {
      const D = et(L.target, `.${Fs}`) === m, q = D ? m : _, K = n.scrollbars, j = K[D ? "dragScroll" : "clickScroll"], { button: re, isPrimary: A, pointerType: M } = L, { pointers: V } = K;
      if (re === 0 && A && j && (V || []).includes(M)) {
        Ce(g), B();
        const h = !D && (L.shiftKey || j === "instant"), N = U(Jt, m), P = U(Jt, _), H = (se, le) => (se || N())[b] - (le || P())[b], z = ss(Jt(u)[F]) / st(u)[w] || 1, Z = R(we(u)[S], 1 / z), oe = L[C], te = N(), de = P(), G = te[F], ue = H(te, de) + G / 2, pe = oe - de[b], ce = D ? 0 : pe - ue, _e = (se) => {
          Ce(J), q.releasePointerCapture(se.pointerId);
        }, ae = D || h, ie = v(), J = [ee(l, T, _e), ee(l, "selectstart", (se) => _s(se), {
          H: !1
        }), ee(_, T, _e), ae && ee(_, "pointermove", (se) => Z(ce + (se[C] - oe))), ae && (() => {
          const se = we(u);
          ie();
          const le = we(u), me = {
            x: le.x - se.x,
            y: le.y - se.y
          };
          (Tt(me.x) > 3 || Tt(me.y) > 3) && (v(), Ae(u, se), k(me), $(ie));
        })];
        if (q.setPointerCapture(L.pointerId), h)
          Z(ce);
        else if (!D) {
          const se = pt(Ia);
          if (se) {
            const le = se(Z, ce, G, (me) => {
              me ? ie() : ne(J, ie);
            });
            ne(J, le), ne(g, U(le, !0));
          }
        }
      }
    });
  };
  let E = !0;
  return U(Ce, [ee(m, "pointermove pointerleave", s), ee(p, "pointerenter", () => {
    a(en, !0);
  }), ee(p, "pointerleave pointercancel", () => {
    a(en, !1);
  }), !d && ee(p, "mousedown", () => {
    const T = ls();
    (Us(T, Re) || Us(T, Ge) || T === document.body) && Ft(U(vs, i), 25);
  }), ee(p, "wheel", (T) => {
    const { deltaX: C, deltaY: F, deltaMode: b } = T;
    E && b === 0 && _t(p) === c && k({
      x: C,
      y: F
    }), E = !1, a(nn, !0), f(() => {
      E = !0, a(nn);
    }), _s(T);
  }, {
    H: !1,
    I: !0
  }), ee(p, "pointerdown", U(ee, l, "click", Nn, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), O(), y, B]);
}, Ua = (n, e, t, s, r, a) => {
  let o, c, i, d, u, l = Ye, v = 0;
  const p = (A) => A.pointerType === "mouse", [_, m] = Je(), [f, y] = Je(100), [$, B] = Je(100), [k, O] = Je(() => v), [E, T] = Na(n, r, s, Ha(e, r, s, (A) => p(A) && q())), { ht: C, Qt: F, wt: b } = r, { jt: w, Nt: S, qt: R, Bt: g, Ft: L } = E, D = (A, M) => {
    if (O(), A)
      w(sn);
    else {
      const V = U(w, sn, !0);
      v > 0 && !M ? k(V) : V();
    }
  }, q = () => {
    (i ? !o : !d) && (D(!0), f(() => {
      D(!1);
    }));
  }, K = (A) => {
    w(ms, A, !0), w(ms, A, !1);
  }, j = (A) => {
    p(A) && (o = i, i && D(!0));
  }, re = [O, y, B, m, () => l(), ee(C, "pointerover", j, {
    A: !0
  }), ee(C, "pointerenter", j), ee(C, "pointerleave", (A) => {
    p(A) && (o = !1, i && D(!1));
  }), ee(C, "pointermove", (A) => {
    p(A) && c && q();
  }), ee(F, "scroll", (A) => {
    _(() => {
      R(), q();
    }), a(A), L();
  })];
  return [() => U(Ce, ne(re, T())), ({ It: A, Dt: M, Zt: V, tn: I }) => {
    const { nn: h, sn: N, en: P, cn: H } = I || {}, { Ct: z, dt: Z } = V || {}, { ct: oe } = t, { k: te } = Ve(), { K: de, rn: G } = s, [ue, pe] = A("showNativeOverlaidScrollbars"), [ce, _e] = A("scrollbars.theme"), [ae, ie] = A("scrollbars.visibility"), [J, se] = A("scrollbars.autoHide"), [le, me] = A("scrollbars.autoHideSuspend"), [it] = A("scrollbars.autoHideDelay"), [mt, ht] = A("scrollbars.dragScroll"), [gt, je] = A("scrollbars.clickScroll"), [Ze, Wt] = A("overflow"), Kt = Z && !M, Yt = G.x || G.y, Qt = h || N || H || z || M, Ee = P || ie || Wt, Xt = ue && te.x && te.y, ct = (lt, Ne, bt) => {
      const dt = lt.includes(nt) && (ae === Ue || ae === "auto" && Ne === nt);
      return w(wa, dt, bt), dt;
    };
    if (v = it, Kt && (le && Yt ? (K(!1), l(), $(() => {
      l = ee(F, "scroll", U(K, !0), {
        A: !0
      });
    })) : K(!0)), pe && w(ma, Xt), _e && (w(u), w(ce, !0), u = ce), me && !le && K(!0), se && (c = J === "move", i = J === "leave", d = J === "never", D(d, !0)), ht && w(Sa, mt), je && w(Ca, !!gt), Ee) {
      const lt = ct(Ze.x, de.x, !0), Ne = ct(Ze.y, de.y, !1);
      w(ya, !(lt && Ne));
    }
    Qt && (R(), S(), L(), H && g(), w(tn, !G.x, !0), w(tn, !G.y, !1), w(ha, oe && !b));
  }, {}, E];
}, Ga = (n) => {
  const e = Ve(), { U: t, R: s } = e, { elements: r } = t(), { padding: a, viewport: o, content: c } = r, i = Lt(n), d = i ? {} : n, { elements: u } = d, { padding: l, viewport: v, content: p } = u || {}, _ = i ? n : d.target, m = Dn(_), f = _.ownerDocument, y = f.documentElement, $ = () => f.defaultView || he, B = U($a, [_]), k = U(Kn, [_]), O = U(tt, ""), E = U(B, O, o), T = U(k, O, c), C = (G) => {
    const ue = st(G), pe = It(G), ce = Be(G, Sn), _e = Be(G, xn);
    return pe.w - ue.w > 0 && !at(ce) || pe.h - ue.h > 0 && !at(_e);
  }, F = E(v), b = F === _, w = b && m, S = !b && T(p), R = !b && F === S, g = w ? y : F, L = w ? g : _, D = !b && k(O, a, l), q = !R && S, K = [q, g, D, L].map((G) => Lt(G) && !_t(G) && G), j = (G) => G && pn(K, G), re = !j(g) && C(g) ? g : _, A = w ? y : g, V = {
    vt: _,
    ht: L,
    ot: g,
    ln: D,
    bt: q,
    gt: A,
    Qt: w ? f : g,
    an: m ? y : re,
    Kt: f,
    wt: m,
    Mt: i,
    nt: b,
    un: $,
    yt: (G) => $s(g, Re, G),
    St: (G, ue) => Rt(g, Re, G, ue),
    Ot: () => Rt(A, Re, ua, !0)
  }, { vt: I, ht: h, ln: N, ot: P, bt: H } = V, z = [() => {
    $e(h, [Ge, es]), $e(I, es), m && $e(y, [es, Ge]);
  }];
  let Z = cs([H, P, N, h, I].find((G) => G && !j(G)));
  const oe = w ? I : H || P, te = U(Ce, z);
  return [V, () => {
    const G = $(), ue = ls(), pe = (J) => {
      be(_t(J), cs(J)), rt(J);
    }, ce = (J) => ee(J, "focusin focusout focus blur", Nn, {
      I: !0,
      H: !1
    }), _e = "tabindex", ae = ks(P, _e), ie = ce(ue);
    return Le(h, Ge, b ? "" : ia), Le(N, ps, ""), Le(P, Re, ""), Le(H, Js, ""), b || (Le(P, _e, ae || "-1"), m && Le(y, Zs, "")), be(oe, Z), be(h, N), be(N || h, !b && P), be(P, H), ne(z, [ie, () => {
      const J = ls(), se = j(P), le = se && J === P ? I : J, me = ce(le);
      $e(N, ps), $e(H, Js), $e(P, Re), m && $e(y, Zs), ae ? Le(P, _e, ae) : $e(P, _e), j(H) && pe(H), se && pe(P), j(N) && pe(N), vs(le), me();
    }]), s && !b && (Es(P, Re, qn), ne(z, U($e, P, Re))), vs(!b && m && ue === I && G.top === G ? P : ue), ie(), Z = 0, te;
  }, te];
}, qa = ({ bt: n }) => ({ Zt: e, _n: t, Dt: s }) => {
  const { xt: r } = e || {}, { $t: a } = t;
  n && (r || s) && vt(n, {
    [Ut]: a && "100%"
  });
}, za = ({ ht: n, ln: e, ot: t, nt: s }, r) => {
  const [a, o] = ge({
    i: Xr,
    o: qs()
  }, U(qs, n, "padding", ""));
  return ({ It: c, Zt: i, _n: d, Dt: u }) => {
    let [l, v] = o(u);
    const { R: p } = Ve(), { ft: _, Ht: m, Ct: f } = i || {}, { ct: y } = d, [$, B] = c("paddingAbsolute");
    (_ || v || (u || m)) && ([l, v] = a(u));
    const O = !s && (B || f || v);
    if (O) {
      const E = !$ || !e && !p, T = l.r + l.l, C = l.t + l.b, F = {
        [yn]: E && !y ? -T : 0,
        [Cn]: E ? -C : 0,
        [wn]: E && y ? -T : 0,
        top: E ? -l.t : 0,
        right: E ? y ? -l.r : "auto" : 0,
        left: E ? y ? "auto" : -l.l : 0,
        [Ht]: E && `calc(100% + ${T}px)`
      }, b = {
        [mn]: E ? l.t : 0,
        [hn]: E ? l.r : 0,
        [bn]: E ? l.b : 0,
        [gn]: E ? l.l : 0
      };
      vt(e || t, F), vt(t, b), Y(r, {
        ln: l,
        dn: !E,
        rt: e ? b : Y({}, F, b)
      });
    }
    return {
      fn: O
    };
  };
}, ja = (n, e) => {
  const t = Ve(), { ht: s, ln: r, ot: a, nt: o, Qt: c, gt: i, wt: d, St: u, un: l } = n, { R: v } = t, p = d && o, _ = U(vn, 0), m = {
    display: () => !1,
    direction: (M) => M !== "ltr",
    flexDirection: (M) => M.endsWith("-reverse"),
    writingMode: (M) => M !== "horizontal-tb"
  }, f = ke(m), y = {
    i: kn,
    o: {
      w: 0,
      h: 0
    }
  }, $ = {
    i: $t,
    o: {}
  }, B = (M) => {
    u(Gn, !p && M);
  }, k = (M) => {
    if (!f.some((oe) => {
      const te = M[oe];
      return te && m[oe](te);
    }))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    B(!0);
    const I = we(i), h = u(_a, !0), N = ee(c, nt, (oe) => {
      const te = we(i);
      oe.isTrusted && te.x === I.x && te.y === I.y && Pn(oe);
    }, {
      I: !0,
      A: !0
    });
    Ae(i, {
      x: 0,
      y: 0
    }), h();
    const P = we(i), H = It(i);
    Ae(i, {
      x: H.w,
      y: H.h
    });
    const z = we(i);
    Ae(i, {
      x: z.x - P.x < 1 && -H.w,
      y: z.y - P.y < 1 && -H.h
    });
    const Z = we(i);
    return Ae(i, I), bs(() => N()), {
      D: P,
      M: Z
    };
  }, O = (M, V) => {
    const I = he.devicePixelRatio % 1 !== 0 ? 1 : 0, h = {
      w: _(M.w - V.w),
      h: _(M.h - V.h)
    };
    return {
      w: h.w > I ? h.w : 0,
      h: h.h > I ? h.h : 0
    };
  }, [E, T] = ge(y, U(Ms, a)), [C, F] = ge(y, U(It, a)), [b, w] = ge(y), [S] = ge($), [R, g] = ge(y), [L] = ge($), [D] = ge({
    i: (M, V) => Gt(M, V, f),
    o: {}
  }, () => ra(a) ? Be(a, f) : {}), [q, K] = ge({
    i: (M, V) => $t(M.D, V.D) && $t(M.M, V.M),
    o: Hn()
  }), j = pt(Jn), re = (M, V) => `${V ? ca : la}${Qr(M)}`, A = (M) => {
    const V = (h) => [Ue, We, nt].map((N) => re(N, h)), I = V(!0).concat(V()).join(" ");
    u(I), u(ke(M).map((h) => re(M[h], h === "x")).join(" "), !0);
  };
  return ({ It: M, Zt: V, _n: I, Dt: h }, { fn: N }) => {
    const { ft: P, Ht: H, Ct: z, dt: Z, zt: oe } = V || {}, te = j && j.tt(n, e, I, t, M), { it: de, ut: G, _t: ue } = te || {}, [pe, ce] = La(M, t), [_e, ae] = M("overflow"), ie = at(_e.x), J = at(_e.y), se = !0;
    let le = T(h), me = F(h), it = w(h), mt = g(h);
    ce && v && u(qn, !pe);
    {
      $s(s, Ge, Mt) && B(!0);
      const [Is] = G ? G() : [], [wt] = le = E(h), [yt] = me = C(h), Ct = In(a), St = p && na(l()), Er = {
        w: _(yt.w + wt.w),
        h: _(yt.h + wt.h)
      }, Bs = {
        w: _((St ? St.w : Ct.w + _(Ct.w - yt.w)) + wt.w),
        h: _((St ? St.h : Ct.h + _(Ct.h - yt.h)) + wt.h)
      };
      Is && Is(), mt = R(Bs), it = b(O(Er, Bs), h);
    }
    const [ht, gt] = mt, [je, Ze] = it, [Wt, Kt] = me, [Yt, Qt] = le, [Ee, Xt] = S({
      x: je.w > 0,
      y: je.h > 0
    }), ct = ie && J && (Ee.x || Ee.y) || ie && Ee.x && !Ee.y || J && Ee.y && !Ee.x, lt = N || z || oe || Qt || Kt || gt || Ze || ae || ce || se, Ne = Ra(Ee, _e), [bt, dt] = L(Ne.K), [Cr, Sr] = D(h), Rs = z || Z || Sr || Xt || h, [xr, kr] = Rs ? q(k(Cr), h) : K();
    return lt && (dt && A(Ne.K), ue && de && vt(a, ue(Ne, I, de(Ne, Wt, Yt)))), B(!1), Rt(s, Ge, Mt, ct), Rt(r, ps, Mt, ct), Y(e, {
      K: bt,
      Vt: {
        x: ht.w,
        y: ht.h
      },
      Rt: {
        x: je.w,
        y: je.h
      },
      rn: Ee,
      Lt: aa(xr, je)
    }), {
      en: dt,
      nn: gt,
      sn: Ze,
      cn: kr || Ze,
      vn: Rs
    };
  };
}, Wa = (n) => {
  const [e, t, s] = Ga(n), r = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    dn: !1,
    rt: {
      [yn]: 0,
      [Cn]: 0,
      [wn]: 0,
      [mn]: 0,
      [hn]: 0,
      [bn]: 0,
      [gn]: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    Rt: {
      x: 0,
      y: 0
    },
    K: {
      x: We,
      y: We
    },
    rn: {
      x: !1,
      y: !1
    },
    Lt: Hn()
  }, { vt: a, gt: o, nt: c, Ot: i } = e, { R: d, k: u } = Ve(), l = !d && (u.x || u.y), v = [qa(e), za(e, r), ja(e, r)];
  return [t, (p) => {
    const _ = {}, f = l && we(o), y = f && i();
    return Q(v, ($) => {
      Y(_, $(p, _) || {});
    }), Ae(o, f), y && y(), !c && Ae(a, 0), _;
  }, r, e, s];
}, Ka = (n, e, t, s, r) => {
  let a = !1;
  const o = Xs(e, {}), [c, i, d, u, l] = Wa(n), [v, p, _] = Pa(u, d, o, (k) => {
    B({}, k);
  }), [m, f, , y] = Ua(n, e, _, d, u, r), $ = (k) => ke(k).some((O) => !!k[O]), B = (k, O) => {
    if (t())
      return !1;
    const { pn: E, Dt: T, At: C, hn: F } = k, b = E || {}, w = !!T || !a, S = {
      It: Xs(e, b, w),
      pn: b,
      Dt: w
    };
    if (F)
      return f(S), !1;
    const R = O || p(Y({}, S, {
      At: C
    })), g = i(Y({}, S, {
      _n: _,
      Zt: R
    }));
    f(Y({}, S, {
      Zt: R,
      tn: g
    }));
    const L = $(R), D = $(g), q = L || D || !xs(b) || w;
    return a = !0, q && s(k, {
      Zt: R,
      tn: g
    }), q;
  };
  return [() => {
    const { an: k, gt: O, Ot: E } = u, T = we(k), C = [v(), c(), m()], F = E();
    return Ae(O, T), F(), U(Ce, C);
  }, B, () => ({
    gn: _,
    bn: d
  }), {
    wn: u,
    yn: y
  }, l];
}, Fe = (n, e, t) => {
  const { N: s } = Ve(), r = Lt(n), a = r ? n : n.target, o = Yn(a);
  if (e && !o) {
    let c = !1;
    const i = [], d = {}, u = (b) => {
      const w = $n(b), S = pt(Da);
      return S ? S(w, !0) : w;
    }, l = Y({}, s(), u(e)), [v, p, _] = fs(), [m, f, y] = fs(t), $ = (b, w) => {
      y(b, w), _(b, w);
    }, [B, k, O, E, T] = Ka(n, l, () => c, ({ pn: b, Dt: w }, { Zt: S, tn: R }) => {
      const { ft: g, Ct: L, xt: D, Ht: q, Et: K, dt: j } = S, { nn: re, sn: A, en: M, cn: V } = R;
      $("updated", [F, {
        updateHints: {
          sizeChanged: !!g,
          directionChanged: !!L,
          heightIntrinsicChanged: !!D,
          overflowEdgeChanged: !!re,
          overflowAmountChanged: !!A,
          overflowStyleChanged: !!M,
          scrollCoordinatesChanged: !!V,
          contentMutation: !!q,
          hostMutation: !!K,
          appear: !!j
        },
        changedOptions: b || {},
        force: !!w
      }]);
    }, (b) => $("scroll", [F, b])), C = (b) => {
      Ta(a), Ce(i), c = !0, $("destroyed", [F, b]), p(), f();
    }, F = {
      options(b, w) {
        if (b) {
          const S = w ? s() : {}, R = Un(l, Y(S, u(b)));
          xs(R) || (Y(l, R), k({
            pn: R
          }));
        }
        return Y({}, l);
      },
      on: m,
      off: (b, w) => {
        b && w && f(b, w);
      },
      state() {
        const { gn: b, bn: w } = O(), { ct: S } = b, { Vt: R, Rt: g, K: L, rn: D, ln: q, dn: K, Lt: j } = w;
        return Y({}, {
          overflowEdge: R,
          overflowAmount: g,
          overflowStyle: L,
          hasOverflow: D,
          scrollCoordinates: {
            start: j.D,
            end: j.M
          },
          padding: q,
          paddingAbsolute: K,
          directionRTL: S,
          destroyed: c
        });
      },
      elements() {
        const { vt: b, ht: w, ln: S, ot: R, bt: g, gt: L, Qt: D } = E.wn, { Xt: q, Gt: K } = E.yn, j = (A) => {
          const { Pt: M, Ut: V, Tt: I } = A;
          return {
            scrollbar: I,
            track: V,
            handle: M
          };
        }, re = (A) => {
          const { Yt: M, Wt: V } = A, I = j(M[0]);
          return Y({}, I, {
            clone: () => {
              const h = j(V());
              return k({
                hn: !0
              }), h;
            }
          });
        };
        return Y({}, {
          target: b,
          host: w,
          padding: S || R,
          viewport: R,
          content: g || R,
          scrollOffsetElement: L,
          scrollEventElement: D,
          scrollbarHorizontal: re(q),
          scrollbarVertical: re(K)
        });
      },
      update: (b) => k({
        Dt: b,
        At: !0
      }),
      destroy: U(C, !1),
      plugin: (b) => d[ke(b)[0]]
    };
    return ne(i, [T]), Ma(a, F), Zn(Qn, Fe, [F, v, d]), Aa(E.wn.wt, !r && n.cancel) ? (C(!0), F) : (ne(i, B()), $("initialized", [F]), F.update(), F);
  }
  return o;
};
Fe.plugin = (n) => {
  const e = Te(n), t = e ? n : [n], s = t.map((r) => Zn(r, Fe)[0]);
  return Va(t), e ? s : s[0];
};
Fe.valid = (n) => {
  const e = n && n.elements, t = xe(e) && e();
  return Ot(t) && !!Yn(t.target);
};
Fe.env = () => {
  const { T: n, k: e, R: t, V: s, B: r, F: a, U: o, P: c, N: i, q: d } = Ve();
  return Y({}, {
    scrollbarsSize: n,
    scrollbarsOverlaid: e,
    scrollbarsHiding: t,
    scrollTimeline: s,
    staticDefaultInitialization: r,
    staticDefaultOptions: a,
    getDefaultInitialization: o,
    setDefaultInitialization: c,
    getDefaultOptions: i,
    setDefaultOptions: d
  });
};
Fe.nonce = ka;
function Ya() {
  const n = x(null);
  console.log(n.value);
  let e;
  const t = x(null), s = Math.floor(Math.random() * 2 ** 32), r = x(!1), a = x([]), o = () => a.value, c = () => e.getSelection(), i = () => a.value.length, d = () => e.clearSelection(!0), u = x(), l = x(null), v = x(null), p = x(null), _ = x(null);
  function m() {
    e = new Dr({
      area: t.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), e.subscribe(
      "DS:start:pre",
      ({ items: E, event: T, isDragging: C }) => {
        if (C)
          e.Interaction._reset(T);
        else {
          r.value = !1;
          const F = t.value.offsetWidth - T.offsetX, b = t.value.offsetHeight - T.offsetY;
          F < 15 && b < 15 && e.Interaction._reset(T), T.target.classList.contains("os-scrollbar-handle") && e.Interaction._reset(T);
        }
      }
    ), document.addEventListener("dragleave", (E) => {
      !E.buttons && r.value && (r.value = !1);
    });
  }
  const f = () => Ke(() => {
    e.addSelection(e.getSelectables()), y();
  }), y = () => {
    a.value = e.getSelection().map((E) => JSON.parse(E.dataset.item)), u.value(a.value);
  }, $ = () => Ke(() => {
    const E = o().map((T) => T.path);
    d(), e.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), e.addSelection(
      e.getSelectables().filter(
        (T) => E.includes(JSON.parse(T.dataset.item).path)
      )
    ), y(), k();
  }), B = (E) => {
    u.value = E, e.subscribe("DS:end", ({ items: T, event: C, isDragging: F }) => {
      a.value = T.map((b) => JSON.parse(b.dataset.item)), E(T.map((b) => JSON.parse(b.dataset.item)));
    });
  }, k = () => {
    l.value && (t.value.getBoundingClientRect().height < t.value.scrollHeight ? (v.value.style.height = t.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, O = (E) => {
    if (!l.value)
      return;
    const { scrollOffsetElement: T } = l.value.elements();
    T.scrollTo({
      top: t.value.scrollTop,
      left: 0
    });
  };
  return ve(() => {
    p.value && Fe(
      p.value,
      {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        },
        plugins: {
          OverlayScrollbars: Fe
          // ScrollbarsHidingPlugin,
          // SizeObserverPlugin,
          // ClickScrollPlugin
        }
      },
      {
        initialized: (E) => {
          l.value = E;
        },
        scroll: (E, T) => {
          const { scrollOffsetElement: C } = E.elements();
          t.value.scrollTo({
            top: C.scrollTop,
            left: 0
          });
        }
      }
    ), m(), k(), _.value = new ResizeObserver(k), _.value.observe(t.value), t.value.addEventListener("scroll", O), e.subscribe(
      "DS:scroll",
      ({ isDragging: E }) => E || O()
    );
  }), gs(() => {
    e && e.stop(), _.value && _.value.disconnect();
  }), cn(() => {
    e && e.Area.reset();
  }), {
    area: t,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: v,
    scrollBarContainer: p,
    getSelected: o,
    getSelection: c,
    selectAll: f,
    clearSelection: d,
    refreshSelection: $,
    getCount: i,
    onSelect: B
  };
}
function Qa(n, e) {
  const t = x(n), s = x(e), r = x([]), a = x([]), o = x([]), c = x(!1), i = x(5);
  let d = !1, u = !1;
  const l = Xe({
    adapter: t,
    storages: [],
    dirname: s,
    files: []
  });
  function v() {
    let $ = [], B = [], k = s.value ?? t.value + "://";
    k.length === 0 && (r.value = []), k.replace(t.value + "://", "").split("/").forEach(function(T) {
      $.push(T), $.join("/") !== "" && B.push({
        basename: T,
        name: T,
        path: t.value + "://" + $.join("/"),
        type: "dir"
      });
    }), a.value = B;
    const [O, E] = _(B, i.value);
    o.value = E, r.value = O;
  }
  function p($) {
    i.value = $, v();
  }
  function _($, B) {
    return $.length > B ? [$.slice(-B), $.slice(0, -B)] : [$, []];
  }
  function m($ = null) {
    c.value = $ ?? !c.value;
  }
  function f() {
    return r.value && r.value.length && !u;
  }
  const y = Ie(() => {
    var $;
    return (($ = r.value[r.value.length - 2]) == null ? void 0 : $.path) ?? t.value + "://";
  });
  return ve(() => {
  }), ye(s, v), ve(v), {
    adapter: t,
    path: s,
    loading: d,
    searchMode: u,
    data: l,
    breadcrumbs: r,
    breadcrumbItems: a,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: o,
    showHiddenBreadcrumbs: c,
    toggleHiddenBreadcrumbs: m,
    isGoUpAvailable: f,
    parentFolderPath: y
  };
}
const Xa = (n, e) => {
  const t = Pr(n.id), s = Vr(), r = t.getStore("metricUnits", !1), a = zr(t, n.theme), o = e.i18n, c = n.locale ?? e.locale, i = t.getStore("adapter"), d = (m) => Array.isArray(m) ? m : Ur, u = t.getStore("persist-path", n.persist), l = u ? t.getStore("path", n.path) : n.path, v = Br(n.request), p = x([]), _ = Xe({
    /**
     * Core properties
     * */
    // app version
    version: Gr,
    // root element
    root: null,
    // app id
    debug: n.debug,
    // Event Bus
    emitter: s,
    // storage
    storage: t,
    // localization object
    i18n: Hr(t, c, s, o),
    // modal state
    modal: jr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Ie(() => Ya()),
    // http object
    requester: v,
    // active features
    features: d(n.features),
    // view state
    view: t.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: n.fullScreen,
    // storage.getStore('full-screen', props.fullScreen),
    // show tree view
    showTreeView: t.getStore("show-tree-view", n.showTreeView),
    // pinnedFolders
    pinnedFolders: p,
    // storage.getStore('pinned-folders', props.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: n.selectButton,
    // max file size
    maxFileSize: n.maxFileSize,
    /**
     * Settings
     * */
    // theme state
    theme: a,
    // unit state - for example: GB or GiB
    metricUnits: r,
    // human readable file sizes
    filesize: r ? _n : un,
    // show large icons in list view
    compactListView: t.getStore("compact-list-view", !0),
    // persist state
    persist: u,
    // show thumbnails
    showThumbnails: t.getStore("show-thumbnails", n.showThumbnails),
    // file system
    fs: Qa(i, l)
  });
  return v.getPinnedFolders().then((m) => {
    _.pinnedFolders = m;
  }), ye(
    () => n.fullScreen,
    () => {
      _.fullScreen = n.fullScreen;
    }
  ), _;
};
function W(n, e, t, s, r, a, o, c) {
  var i = typeof n == "function" ? n.options : n;
  return e && (i.render = e, i.staticRenderFns = t, i._compiled = !0), {
    exports: n,
    options: i
  };
}
const Za = {
  __name: "ModalLayout",
  setup(n) {
    const e = x(null), t = X("ServiceContainer");
    return ve(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus(), Ke(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const r = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: r,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), { __sfc: !0, modalBody: e, app: t };
  }
};
var Ja = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__modal-layout", attrs: { "aria-labelledby": "modal-title", role: "dialog", "aria-modal": "true", tabindex: "0" }, on: { keyup: function(r) {
    return !r.type.indexOf("key") && e._k(r.keyCode, "esc", 27, r.key, ["Esc", "Escape"]) ? null : s.app.modal.close();
  } } }, [t("div", { staticClass: "vuefinder__modal-layout__overlay" }), t("div", { staticClass: "vuefinder__modal-layout__container" }, [t("div", { staticClass: "vuefinder__modal-layout__wrapper", on: { mousedown: function(r) {
    return r.target !== r.currentTarget ? null : s.app.modal.close();
  } } }, [t("div", { ref: "modalBody", staticClass: "vuefinder__modal-layout__body" }, [t("div", { staticClass: "vuefinder__modal-layout__content" }, [e._t("default")], 2), t("div", { staticClass: "vuefinder__modal-layout__footer" }, [e._t("buttons")], 2)])])])]);
}, eo = [], to = /* @__PURE__ */ W(
  Za,
  Ja,
  eo
);
const De = to.exports, so = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const s = X("ServiceContainer"), r = x(!1), { t: a } = s.i18n;
    let o = null;
    const c = () => {
      clearTimeout(o), r.value = !0, o = setTimeout(() => {
        r.value = !1;
      }, 2e3);
    };
    return ve(() => {
      s.emitter.on(n.on, c);
    }), gs(() => {
      clearTimeout(o);
    }), {
      shown: r,
      t: a
    };
  }
};
var no = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vuefinder__action-message", class: { "vuefinder__action-message--hidden": !e.shown } }, [e.$slots.default ? e._t("default") : t("span", [e._v(e._s(e.t("Saved.")))])], 2);
}, ro = [], ao = /* @__PURE__ */ W(
  so,
  no,
  ro
);
const oo = ao.exports;
var io = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z" } }), t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0" } })]);
};
const co = { render: io }, lo = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    return { __sfc: !0 };
  }
};
var uo = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { staticClass: "vuefinder__modal-header" }, [t("div", { staticClass: "vuefinder__modal-header__icon-container" }, [t(e.icon, { tag: "component", staticClass: "vuefinder__modal-header__icon" })], 1), t("h3", { staticClass: "vuefinder__modal-header__title", attrs: { id: "modal-title" } }, [e._v(e._s(e.title))])]);
}, _o = [], vo = /* @__PURE__ */ W(
  lo,
  uo,
  _o
);
const Pe = vo.exports, fo = {
  __name: "ModalAbout",
  setup(n) {
    const e = X("ServiceContainer"), { setStore: t, clearStore: s } = e.storage, { t: r } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, o = Ie(() => [
      { name: r("About"), key: a.ABOUT },
      { name: r("Settings"), key: a.SETTINGS },
      { name: r("Shortcuts"), key: a.SHORTCUTS },
      { name: r("Reset"), key: a.RESET }
    ]), c = x("about"), i = async () => {
      s(), location.reload();
    }, d = (B) => {
      e.theme.set(B), e.emitter.emit("vf-theme-saved");
    }, u = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? _n : un, t("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, l = () => {
      e.compactListView = !e.compactListView, t("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, v = () => {
      e.showThumbnails = !e.showThumbnails, t("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, p = () => {
      e.persist = !e.persist, t("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { proxy: _ } = ln(), { i18n: m } = _.$VueFinderOptions, f = {
      en: "English",
      fr: "French (Français)",
      de: "German (Deutsch)",
      fa: "Persian (فارسی)",
      he: "Hebrew (עִברִית)",
      hi: "Hindi (हिंदी)",
      ru: "Russian (Pусский)",
      sv: "Swedish (Svenska)",
      tr: "Turkish (Türkçe)",
      zhCN: "Simplified Chinese (简体中文)",
      zhTW: "Traditional Chinese (繁體中文)"
    }, y = Object.fromEntries(
      Object.entries(f).filter(
        ([B]) => Object.keys(m).includes(B)
      )
    ), $ = Ie(() => ({
      system: r("System"),
      light: r("Light"),
      dark: r("Dark")
    }));
    return { __sfc: !0, app: e, setStore: t, clearStore: s, t: r, TAB: a, tabs: o, selectedTab: c, clearLocalStorage: i, handleTheme: d, handleMetricUnits: u, handleCompactListView: l, handleShowThumbnails: v, handlePersistPath: p, proxy: _, i18n: m, languageList: f, supportedLanguages: y, themes: $, ModalLayout: De, ActionMessage: oo, AboutSVG: co, FEATURES: fe, ModalHeader: Pe };
  }
};
var po = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(" " + e._s(s.t("Close")) + " ")])];
  }, proxy: !0 }]) }, [t("div", { staticClass: "vuefinder__about-modal__content" }, [t(s.ModalHeader, { attrs: { icon: s.AboutSVG, title: "Vuefinder " + s.app.version } }), t("div", { staticClass: "vuefinder__about-modal__main" }, [t("div", [t("div", [t("nav", { staticClass: "vuefinder__about-modal__tabs", attrs: { "aria-label": "Tabs" } }, e._l(s.tabs, function(r) {
    return t("button", { key: r.name, class: [
      r.key === s.selectedTab ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive",
      "vuefinder__about-modal__tab"
    ], attrs: { "aria-current": r.current ? "page" : void 0 }, on: { click: function(a) {
      s.selectedTab = r.key;
    } } }, [e._v(" " + e._s(r.name) + " ")]);
  }), 0)])]), s.selectedTab === s.TAB.ABOUT ? t("div", { staticClass: "vuefinder__about-modal__tab-content" }, [t("div", { staticClass: "vuefinder__about-modal__description" }, [e._v(" " + e._s(s.t("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")) + " ")]), t("a", { staticClass: "vuefinder__about-modal__link", attrs: { href: "https://vuefinder.ozdemir.be", target: "_blank" } }, [e._v(e._s(s.t("Project home")))]), t("a", { staticClass: "vuefinder__about-modal__link", attrs: { href: "https://github.com/n1crack/vuefinder", target: "_blank" } }, [e._v(e._s(s.t("Follow on GitHub")))])]) : e._e(), s.selectedTab === s.TAB.SETTINGS ? t("div", { staticClass: "vuefinder__about-modal__tab-content" }, [t("div", { staticClass: "vuefinder__about-modal__description" }, [e._v(" " + e._s(s.t("Customize your experience with the following settings")) + " ")]), t("div", { staticClass: "vuefinder__about-modal__settings" }, [t("fieldset", [t("div", { staticClass: "vuefinder__about-modal__setting flex" }, [t("div", { staticClass: "vuefinder__about-modal__setting-input" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: s.app.metricUnits, expression: "app.metricUnits" }], staticClass: "vuefinder__about-modal__checkbox", attrs: { id: "metric_unit", name: "metric_unit", type: "checkbox" }, domProps: { checked: Array.isArray(s.app.metricUnits) ? e._i(s.app.metricUnits, null) > -1 : s.app.metricUnits }, on: { click: s.handleMetricUnits, change: function(r) {
    var a = s.app.metricUnits, o = r.target, c = !!o.checked;
    if (Array.isArray(a)) {
      var i = null, d = e._i(a, i);
      o.checked ? d < 0 && e.$set(s.app, "metricUnits", a.concat([i])) : d > -1 && e.$set(s.app, "metricUnits", a.slice(0, d).concat(a.slice(d + 1)));
    } else
      e.$set(s.app, "metricUnits", c);
  } } })]), t("div", { staticClass: "vuefinder__about-modal__setting-label" }, [t("label", { staticClass: "vuefinder__about-modal__label", attrs: { for: "metric_unit" } }, [e._v(" " + e._s(s.t("Use Metric Units")) + " "), t(s.ActionMessage, { staticClass: "ms-3", attrs: { on: "vf-metric-units-saved" } }, [e._v(e._s(s.t("Saved.")))])], 1)])]), t("div", { staticClass: "vuefinder__about-modal__setting flex" }, [t("div", { staticClass: "vuefinder__about-modal__setting-input" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: s.app.compactListView, expression: "app.compactListView" }], staticClass: "vuefinder__about-modal__checkbox", attrs: { id: "large_icons", name: "large_icons", type: "checkbox" }, domProps: { checked: Array.isArray(s.app.compactListView) ? e._i(s.app.compactListView, null) > -1 : s.app.compactListView }, on: { click: s.handleCompactListView, change: function(r) {
    var a = s.app.compactListView, o = r.target, c = !!o.checked;
    if (Array.isArray(a)) {
      var i = null, d = e._i(a, i);
      o.checked ? d < 0 && e.$set(s.app, "compactListView", a.concat([i])) : d > -1 && e.$set(s.app, "compactListView", a.slice(0, d).concat(a.slice(d + 1)));
    } else
      e.$set(s.app, "compactListView", c);
  } } })]), t("div", { staticClass: "vuefinder__about-modal__setting-label" }, [t("label", { staticClass: "vuefinder__about-modal__label", attrs: { for: "large_icons" } }, [e._v(" " + e._s(s.t("Compact list view")) + " "), t(s.ActionMessage, { staticClass: "ms-3", attrs: { on: "vf-compact-view-saved" } }, [e._v(e._s(s.t("Saved.")))])], 1)])]), t("div", { staticClass: "vuefinder__about-modal__setting flex" }, [t("div", { staticClass: "vuefinder__about-modal__setting-input" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: s.app.persist, expression: "app.persist" }], staticClass: "vuefinder__about-modal__checkbox", attrs: { id: "persist_path", name: "persist_path", type: "checkbox" }, domProps: { checked: Array.isArray(s.app.persist) ? e._i(s.app.persist, null) > -1 : s.app.persist }, on: { click: s.handlePersistPath, change: function(r) {
    var a = s.app.persist, o = r.target, c = !!o.checked;
    if (Array.isArray(a)) {
      var i = null, d = e._i(a, i);
      o.checked ? d < 0 && e.$set(s.app, "persist", a.concat([i])) : d > -1 && e.$set(s.app, "persist", a.slice(0, d).concat(a.slice(d + 1)));
    } else
      e.$set(s.app, "persist", c);
  } } })]), t("div", { staticClass: "vuefinder__about-modal__setting-label" }, [t("label", { staticClass: "vuefinder__about-modal__label", attrs: { for: "persist_path" } }, [e._v(" " + e._s(s.t("Persist path on reload")) + " "), t(s.ActionMessage, { staticClass: "ms-3", attrs: { on: "vf-persist-path-saved" } }, [e._v(e._s(s.t("Saved.")))])], 1)])]), t("div", { staticClass: "vuefinder__about-modal__setting flex" }, [t("div", { staticClass: "vuefinder__about-modal__setting-input" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: s.app.showThumbnails, expression: "app.showThumbnails" }], staticClass: "vuefinder__about-modal__checkbox", attrs: { id: "show_thumbnails", name: "show_thumbnails", type: "checkbox" }, domProps: { checked: Array.isArray(s.app.showThumbnails) ? e._i(s.app.showThumbnails, null) > -1 : s.app.showThumbnails }, on: { click: s.handleShowThumbnails, change: function(r) {
    var a = s.app.showThumbnails, o = r.target, c = !!o.checked;
    if (Array.isArray(a)) {
      var i = null, d = e._i(a, i);
      o.checked ? d < 0 && e.$set(s.app, "showThumbnails", a.concat([i])) : d > -1 && e.$set(s.app, "showThumbnails", a.slice(0, d).concat(a.slice(d + 1)));
    } else
      e.$set(s.app, "showThumbnails", c);
  } } })]), t("div", { staticClass: "vuefinder__about-modal__setting-label" }, [t("label", { staticClass: "vuefinder__about-modal__label", attrs: { for: "show_thumbnails" } }, [e._v(" " + e._s(s.t("Show thumbnails")) + " "), t(s.ActionMessage, { staticClass: "ms-3", attrs: { on: "vf-show-thumbnails-saved" } }, [e._v(e._s(s.t("Saved.")))])], 1)])]), t("div", { staticClass: "vuefinder__about-modal__setting" }, [t("div", { staticClass: "vuefinder__about-modal__setting-input" }, [t("label", { staticClass: "vuefinder__about-modal__label", attrs: { for: "theme" } }, [e._v(" " + e._s(s.t("Theme")) + " ")])]), t("div", { staticClass: "vuefinder__about-modal__setting-label" }, [t("select", { directives: [{ name: "model", rawName: "v-model", value: s.app.theme.value, expression: "app.theme.value" }], staticClass: "vuefinder__about-modal__select", attrs: { id: "theme" }, on: { change: [function(r) {
    var a = Array.prototype.filter.call(r.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var c = "_value" in o ? o._value : o.value;
      return c;
    });
    e.$set(s.app.theme, "value", r.target.multiple ? a : a[0]);
  }, function(r) {
    return s.handleTheme(r.target.value);
  }] } }, [t("optgroup", { attrs: { label: s.t("Theme") } }, e._l(s.themes, function(r, a) {
    return t("option", { domProps: { value: a } }, [e._v(" " + e._s(r) + " ")]);
  }), 0)]), t(s.ActionMessage, { staticClass: "ms-3", attrs: { on: "vf-theme-saved" } }, [e._v(e._s(s.t("Saved.")))])], 1)]), s.app.features.includes(s.FEATURES.LANGUAGE) && Object.keys(s.supportedLanguages).length > 1 ? t("div", { staticClass: "vuefinder__about-modal__setting" }, [t("div", { staticClass: "vuefinder__about-modal__setting-input" }, [t("label", { staticClass: "vuefinder__about-modal__label", attrs: { for: "language" } }, [e._v(" " + e._s(s.t("Language")) + " ")])]), t("div", { staticClass: "vuefinder__about-modal__setting-label" }, [t("select", { directives: [{ name: "model", rawName: "v-model", value: s.app.i18n.locale, expression: "app.i18n.locale" }], staticClass: "vuefinder__about-modal__select", attrs: { id: "language" }, on: { change: function(r) {
    var a = Array.prototype.filter.call(r.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var c = "_value" in o ? o._value : o.value;
      return c;
    });
    e.$set(s.app.i18n, "locale", r.target.multiple ? a : a[0]);
  } } }, [t("optgroup", { attrs: { label: s.t("Language") } }, e._l(s.supportedLanguages, function(r, a) {
    return t("option", { domProps: { value: a } }, [e._v(" " + e._s(r) + " ")]);
  }), 0)]), t(s.ActionMessage, { staticClass: "ms-3", attrs: { on: "vf-language-saved" } }, [e._v(e._s(s.t("Saved.")))])], 1)]) : e._e()])])]) : e._e(), s.selectedTab === s.TAB.SHORTCUTS ? t("div", { staticClass: "vuefinder__about-modal__tab-content" }, [t("div", { staticClass: "vuefinder__about-modal__shortcuts" }, [t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [t("div", [e._v(e._s(s.t("Rename")))]), t("kbd", [e._v("F2")])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [t("div", [e._v(e._s(s.t("Refresh")))]), t("kbd", [e._v("F5")])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [e._v(" " + e._s(s.t("Delete")) + " "), t("kbd", [e._v("Del")])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [e._v(" " + e._s(s.t("Escape")) + " "), t("div", [t("kbd", [e._v("Esc")])])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [e._v(" " + e._s(s.t("Select All")) + " "), t("div", [t("kbd", [e._v("Ctrl")]), e._v(" + "), t("kbd", [e._v("A")])])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [e._v(" " + e._s(s.t("Search")) + " "), t("div", [t("kbd", [e._v("Ctrl")]), e._v(" + "), t("kbd", [e._v("F")])])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [e._v(" " + e._s(s.t("Toggle Sidebar")) + " "), t("div", [t("kbd", [e._v("Ctrl")]), e._v(" + "), t("kbd", [e._v("E")])])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [e._v(" " + e._s(s.t("Open Settings")) + " "), t("div", [t("kbd", [e._v("Ctrl")]), e._v(" + "), t("kbd", [e._v(",")])])]), t("div", { staticClass: "vuefinder__about-modal__shortcut" }, [e._v(" " + e._s(s.t("Toggle Full Screen")) + " "), t("div", [t("kbd", [e._v("Ctrl")]), e._v(" + "), t("kbd", [e._v("Enter")])])])])]) : e._e(), s.selectedTab === s.TAB.RESET ? t("div", { staticClass: "vuefinder__about-modal__tab-content" }, [t("div", { staticClass: "vuefinder__about-modal__description" }, [e._v(" " + e._s(s.t("Reset all settings to default")) + " ")]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: s.clearLocalStorage } }, [e._v(" " + e._s(s.t("Reset Settings")) + " ")])]) : e._e()])], 1)]);
}, mo = [], ho = /* @__PURE__ */ W(
  fo,
  po,
  mo
);
const tr = ho.exports, go = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    var d;
    const t = n, s = X("ServiceContainer"), { t: r } = s.i18n, a = x(!1), o = x(null), c = x((d = o.value) == null ? void 0 : d.strMessage);
    return ye(c, () => a.value = !1), { __sfc: !0, emit: e, props: t, app: s, t: r, hidden: a, strMessage: o, strSlot: c, hide: () => {
      e("hidden"), a.value = !0;
    } };
  }
};
var bo = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", [s.hidden ? e._e() : t("div", { ref: "strMessage", staticClass: "vuefinder__message", class: e.error ? "vuefinder__message--error" : "vuefinder__message--success" }, [e._t("default"), t("div", { staticClass: "vuefinder__message__close", attrs: { title: s.t("Close") }, on: { click: s.hide } }, [t("svg", { staticClass: "vuefinder__message__icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18L18 6M6 6l12 12" } })])])], 2)]);
}, wo = [], yo = /* @__PURE__ */ W(
  go,
  bo,
  wo
);
const ze = yo.exports;
var Co = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" } })]);
};
const sr = { render: Co }, So = {
  __name: "ModalDelete",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = x(e.modal.data.items), r = x("");
    return { __sfc: !0, app: e, t, items: s, message: r, remove: () => {
      s.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: s.value.map(({ path: o, type: c }) => ({ path: o, type: c }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: t("Files deleted.") });
        },
        onError: (o) => {
          r.value = t(o.message);
        }
      });
    }, ModalLayout: De, Message: ze, ModalHeader: Pe, DeleteSVG: sr };
  }
};
var xo = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-danger", attrs: { type: "button" }, on: { click: s.remove } }, [e._v(e._s(s.t("Yes, Delete!")))]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Cancel")))]), t("div", { staticClass: "vuefinder__delete-modal__warning" }, [e._v(e._s(s.t("This action cannot be undone.")))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.DeleteSVG, title: s.t("Delete files") } }), t("div", { staticClass: "vuefinder__delete-modal__content" }, [t("div", { staticClass: "vuefinder__delete-modal__form" }, [t("p", { staticClass: "vuefinder__delete-modal__description" }, [e._v(e._s(s.t("Are you sure you want to delete these files?")))]), t("div", { staticClass: "vuefinder__delete-modal__files vf-scrollbar" }, e._l(s.items, function(r) {
    return t("p", { staticClass: "vuefinder__delete-modal__file" }, [r.type === "dir" ? t("svg", { staticClass: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" } })]) : t("svg", { staticClass: "vuefinder__delete-modal__icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" } })]), t("span", { staticClass: "vuefinder__delete-modal__file-name" }, [e._v(e._s(r.basename))])]);
  }), 0), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 1)])], 1)]);
}, ko = [], Eo = /* @__PURE__ */ W(
  So,
  xo,
  ko
);
const Ds = Eo.exports;
var $o = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" } })]);
};
const nr = { render: $o }, Ao = {
  __name: "ModalRename",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = x(e.modal.data.items[0]), r = x(e.modal.data.items[0].basename), a = x("");
    return { __sfc: !0, app: e, t, item: s, name: r, message: a, rename: () => {
      r.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: s.value.path,
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: t("%s is renamed.", r.value) });
        },
        onError: (c) => {
          a.value = t(c.message);
        }
      });
    }, ModalLayout: De, Message: ze, ModalHeader: Pe, RenameSVG: nr };
  }
};
var Mo = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-primary", attrs: { type: "button" }, on: { click: s.rename } }, [e._v(e._s(s.t("Rename")))]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Cancel")))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.RenameSVG, title: s.t("Rename") } }), t("div", { staticClass: "vuefinder__rename-modal__content" }, [t("div", { staticClass: "vuefinder__rename-modal__item" }, [t("p", { staticClass: "vuefinder__rename-modal__item-info" }, [s.item.type === "dir" ? t("svg", { staticClass: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" } })]) : t("svg", { staticClass: "vuefinder__rename-modal__icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" } })]), t("span", { staticClass: "vuefinder__rename-modal__item-name" }, [e._v(e._s(s.item.basename))])]), t("input", { directives: [{ name: "model", rawName: "v-model", value: s.name, expression: "name" }], staticClass: "vuefinder__rename-modal__input", attrs: { placeholder: "Name", type: "text" }, domProps: { value: s.name }, on: { keyup: function(r) {
    return !r.type.indexOf("key") && e._k(r.keyCode, "enter", 13, r.key, "Enter") ? null : s.rename.apply(null, arguments);
  }, input: function(r) {
    r.target.composing || (s.name = r.target.value);
  } } }), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 1)])], 1)]);
}, To = [], Fo = /* @__PURE__ */ W(
  Ao,
  Mo,
  To
);
const Os = Fo.exports, Oe = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function Vo(n) {
  const e = (t) => {
    t.code === Oe.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && (n.fs.searchMode || (t.code === Oe.F2 && n.features.includes(fe.RENAME) && (n.dragSelect.getCount() !== 1 || n.modal.open(Os, { items: n.dragSelect.getSelected() })), t.code === Oe.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, path: n.fs.data.dirname } }), t.code === Oe.DELETE && (!n.dragSelect.getCount() || n.modal.open(Ds, { items: n.dragSelect.getSelected() })), t.metaKey && t.code === Oe.BACKSLASH && n.modal.open(tr), t.metaKey && t.code === Oe.KEY_F && n.features.includes(fe.SEARCH) && (n.fs.searchMode = !0, t.preventDefault()), t.metaKey && t.code === Oe.KEY_E && (n.showTreeView = !n.showTreeView, n.storage.setStore("show-tree-view", n.showTreeView)), t.metaKey && t.code === Oe.ENTER && (n.fullScreen = !n.fullScreen, n.root.focus()), t.metaKey && t.code === Oe.KEY_A && (n.dragSelect.selectAll(), t.preventDefault())));
  };
  ve(() => {
    n.root.addEventListener("keydown", e);
  });
}
var Do = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" } })]);
};
const rr = { render: Do }, Oo = {
  __name: "ModalNewFolder",
  setup(n) {
    const e = X("ServiceContainer"), { getStore: t } = e.storage, { t: s } = e.i18n, r = x(""), a = x("");
    return { __sfc: !0, app: e, getStore: t, t: s, name: r, message: a, createFolder: () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    }, ModalLayout: De, Message: ze, ModalHeader: Pe, NewFolderSVG: rr };
  }
};
var Lo = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-primary", attrs: { type: "button" }, on: { click: s.createFolder } }, [e._v(e._s(s.t("Create")))]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Cancel")))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.NewFolderSVG, title: s.t("New Folder") } }), t("div", { staticClass: "vuefinder__new-folder-modal__content" }, [t("div", { staticClass: "vuefinder__new-folder-modal__form" }, [t("p", { staticClass: "vuefinder__new-folder-modal__description" }, [e._v(e._s(s.t("Create a new folder")))]), t("input", { directives: [{ name: "model", rawName: "v-model", value: s.name, expression: "name" }], staticClass: "vuefinder__new-folder-modal__input", attrs: { placeholder: s.t("Folder Name"), type: "text" }, domProps: { value: s.name }, on: { keyup: function(r) {
    return !r.type.indexOf("key") && e._k(r.keyCode, "enter", 13, r.key, "Enter") ? null : s.createFolder.apply(null, arguments);
  }, input: function(r) {
    r.target.composing || (s.name = r.target.value);
  } } }), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 1)])], 1)]);
}, Ro = [], Io = /* @__PURE__ */ W(
  Oo,
  Lo,
  Ro
);
const ar = Io.exports;
var Bo = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" } })]);
};
const or = { render: Bo }, Po = {
  __name: "ModalNewFile",
  setup(n) {
    const e = X("ServiceContainer"), { getStore: t } = e.storage, { t: s } = e.i18n, r = x(""), a = x("");
    return { __sfc: !0, app: e, getStore: t, t: s, name: r, message: a, createFile: () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("%s is created.", r.value) });
        },
        onError: (c) => {
          a.value = s(c.message);
        }
      });
    }, ModalLayout: De, Message: ze, ModalHeader: Pe, NewFileSVG: or };
  }
};
var No = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-primary", attrs: { type: "button" }, on: { click: s.createFile } }, [e._v(e._s(s.t("Create")))]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Cancel")))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.NewFileSVG, title: s.t("New File") } }), t("div", { staticClass: "vuefinder__new-file-modal__content" }, [t("div", { staticClass: "vuefinder__new-file-modal__form" }, [t("p", { staticClass: "vuefinder__new-file-modal__description" }, [e._v(e._s(s.t("Create a new file")))]), t("input", { directives: [{ name: "model", rawName: "v-model", value: s.name, expression: "name" }], staticClass: "vuefinder__new-file-modal__input", attrs: { placeholder: s.t("File Name"), type: "text" }, domProps: { value: s.name }, on: { keyup: function(r) {
    return !r.type.indexOf("key") && e._k(r.keyCode, "enter", 13, r.key, "Enter") ? null : s.createFile.apply(null, arguments);
  }, input: function(r) {
    r.target.composing || (s.name = r.target.value);
  } } }), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 1)])], 1)]);
}, Ho = [], Uo = /* @__PURE__ */ W(
  Po,
  No,
  Ho
);
const Go = Uo.exports;
function ir(n, e = 14) {
  let t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
var qo = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" } })]);
};
const cr = { render: qo }, zo = {
  __name: "ModalUpload",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = t("uppy"), r = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, a = x({ QUEUE_ENTRY_STATUS: r }), o = x(null), c = x(null), i = x(null), d = x(null), u = x(null), l = x(null), v = x([]), p = x(""), _ = x(!1), m = x(!1);
    let f;
    function y(S) {
      return v.value.findIndex((R) => R.id === S);
    }
    function $(S, R = null) {
      R = R ?? (S.webkitRelativePath || S.name), f.addFile({
        name: R,
        type: S.type,
        data: S,
        source: "Local"
      });
    }
    function B(S) {
      switch (S.status) {
        case r.DONE:
          return "text-green-600";
        case r.ERROR:
          return "text-red-600";
        case r.CANCELED:
          return "text-red-600";
        case r.PENDING:
        default:
          return "";
      }
    }
    const k = (S) => {
      switch (S.status) {
        case r.DONE:
          return "✓";
        case r.ERROR:
        case r.CANCELED:
          return "!";
        case r.PENDING:
        default:
          return "...";
      }
    };
    function O() {
      d.value.click();
    }
    function E() {
      if (!_.value) {
        if (!v.value.filter((S) => S.status !== r.DONE).length) {
          p.value = t("Please select file to upload first.");
          return;
        }
        p.value = "", f.retryAll(), f.upload();
      }
    }
    function T() {
      f.cancelAll({ reason: "user" }), v.value.forEach((S) => {
        S.status !== r.DONE && (S.status = r.CANCELED, S.statusName = t("Canceled"));
      }), _.value = !1;
    }
    function C(S) {
      _.value || (f.removeFile(S.id, "removed-by-user"), v.value.splice(y(S.id), 1));
    }
    function F(S) {
      if (!_.value) {
        if (f.cancelAll({ reason: "user" }), S) {
          const R = [];
          v.value.forEach((g) => {
            g.status !== r.DONE && R.push(g);
          }), v.value = [], R.forEach((g) => {
            $(g.originalFile, g.name);
          });
          return;
        }
        v.value.splice(0);
      }
    }
    function b() {
      e.modal.close();
    }
    function w() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return ve(async () => {
      f = new Or({
        debug: e.debug,
        restrictions: {
          maxFileSize: qr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: s,
        onBeforeFileAdded(g, L) {
          if (L[g.id] != null) {
            const q = y(g.id);
            v.value[q].status === r.PENDING && (p.value = f.i18n("noDuplicates", { fileName: g.name })), v.value = v.value.filter((K) => K.id !== g.id);
          }
          return v.value.push({
            id: g.id,
            name: g.name,
            size: e.filesize(g.size),
            status: r.PENDING,
            statusName: t("Pending upload"),
            percent: null,
            originalFile: g.data
          }), !0;
        }
      }), f.use(Lr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(g, L) {
          let D;
          try {
            D = JSON.parse(g).message;
          } catch {
            D = t("Cannot parse server response.");
          }
          return new Error(D);
        }
      }), f.on("restriction-failed", (g, L) => {
        const D = v.value[y(g.id)];
        C(D), p.value = L.message;
      }), f.on("upload", () => {
        const g = w();
        f.setMeta({ ...g.body });
        const L = f.getPlugin("XHRUpload");
        L.opts.method = g.method, L.opts.endpoint = g.url + "?" + new URLSearchParams(g.params), L.opts.headers = g.headers, delete g.headers["Content-Type"], _.value = !0, v.value.forEach((D) => {
          D.status !== r.DONE && (D.percent = null, D.status = r.UPLOADING, D.statusName = t("Pending upload"));
        });
      }), f.on("upload-progress", (g, L) => {
        const D = Math.floor(L.bytesUploaded / L.bytesTotal * 100);
        v.value[y(g.id)].percent = `${D}%`;
      }), f.on("upload-success", (g) => {
        const L = v.value[y(g.id)];
        L.status = r.DONE, L.statusName = t("Done");
      }), f.on("upload-error", (g, L) => {
        const D = v.value[y(g.id)];
        D.percent = null, D.status = r.ERROR, L.isNetworkError ? D.statusName = t("Network Error, Unable establish connection to the server or interrupted.") : D.statusName = L ? L.message : t("Unknown Error");
      }), f.on("error", (g) => {
        p.value = g.message, _.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), f.on("complete", () => {
        _.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), d.value.addEventListener("click", () => {
        c.value.click();
      }), u.value.addEventListener("click", () => {
        i.value.click();
      }), l.value.addEventListener("dragover", (g) => {
        g.preventDefault(), m.value = !0;
      }), l.value.addEventListener("dragleave", (g) => {
        g.preventDefault(), m.value = !1;
      });
      function S(g, L) {
        L.isFile && L.file((D) => g(L, D)), L.isDirectory && L.createReader().readEntries((D) => {
          D.forEach((q) => {
            S(g, q);
          });
        });
      }
      l.value.addEventListener("drop", (g) => {
        g.preventDefault(), m.value = !1;
        const L = /^[/\\](.+)/;
        [...g.dataTransfer.items].forEach((D) => {
          D.kind === "file" && S((q, K) => {
            const j = L.exec(q.fullPath);
            $(K, j[1]);
          }, D.webkitGetAsEntry());
        });
      });
      const R = ({ target: g }) => {
        const L = g.files;
        for (const D of L)
          $(D);
        g.value = "";
      };
      c.value.addEventListener("change", R), i.value.addEventListener("change", R);
    }), dn(() => {
      f == null || f.close({ reason: "unmount" });
    }), { __sfc: !0, app: e, t, uppyLocale: s, QUEUE_ENTRY_STATUS: r, definitions: a, container: o, internalFileInput: c, internalFolderInput: i, pickFiles: d, pickFolders: u, dropArea: l, queue: v, message: p, uploading: _, hasFilesInDropArea: m, uppy: f, findQueueEntryIndexById: y, addFile: $, getClassNameForEntry: B, getIconForEntry: k, openFileSelector: O, upload: E, cancel: T, remove: C, clear: F, close: b, buildReqParams: w, ModalLayout: De, Message: ze, title_shorten: ir, ModalHeader: Pe, UploadSVG: cr };
  }
};
var jo = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-primary", attrs: { type: "button", disabled: s.uploading }, on: { click: function(r) {
      return r.preventDefault(), s.upload.apply(null, arguments);
    } } }, [e._v(" " + e._s(s.t("Upload")) + " ")]), s.uploading ? t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return r.preventDefault(), s.cancel.apply(null, arguments);
    } } }, [e._v(e._s(s.t("Cancel")))]) : t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return r.preventDefault(), s.close.apply(null, arguments);
    } } }, [e._v(e._s(s.t("Close")))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.UploadSVG, title: s.t("Upload Files") } }), t("div", { staticClass: "vuefinder__upload-modal__content" }, [t("div", { ref: "dropArea", staticClass: "vuefinder__upload-modal__drop-area", on: { click: s.openFileSelector } }, [s.hasFilesInDropArea ? t("div", { staticClass: "pointer-events-none" }, [e._v(" " + e._s(s.t("Release to drop these files.")) + " ")]) : t("div", { staticClass: "pointer-events-none" }, [e._v(" " + e._s(s.t("Drag and drop the files/folders to here or click here.")) + " ")])]), t("div", { ref: "container", staticClass: "vuefinder__upload-modal__buttons" }, [t("button", { ref: "pickFiles", staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" } }, [e._v(" " + e._s(s.t("Select Files")) + " ")]), t("button", { ref: "pickFolders", staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" } }, [e._v(" " + e._s(s.t("Select Folders")) + " ")]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button", disabled: s.uploading }, on: { click: function(r) {
    return s.clear(!1);
  } } }, [e._v(" " + e._s(s.t("Clear all")) + " ")]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button", disabled: s.uploading }, on: { click: function(r) {
    return s.clear(!0);
  } } }, [e._v(" " + e._s(s.t("Clear only successful")) + " ")])]), t("div", { staticClass: "vuefinder__upload-modal__file-list vf-scrollbar" }, [e._l(s.queue, function(r) {
    return t("div", { key: r.id, staticClass: "vuefinder__upload-modal__file-entry" }, [t("span", { staticClass: "vuefinder__upload-modal__file-icon", class: s.getClassNameForEntry(r) }, [t("span", { staticClass: "vuefinder__upload-modal__file-icon-text", domProps: { textContent: e._s(s.getIconForEntry(r)) } })]), t("div", { staticClass: "vuefinder__upload-modal__file-info" }, [t("div", { staticClass: "vuefinder__upload-modal__file-name hidden md:block" }, [e._v(e._s(s.title_shorten(r.name, 40)) + " (" + e._s(r.size) + ")")]), t("div", { staticClass: "vuefinder__upload-modal__file-name md:hidden" }, [e._v(e._s(s.title_shorten(r.name, 16)) + " (" + e._s(r.size) + ")")]), t("div", { staticClass: "vuefinder__upload-modal__file-status", class: s.getClassNameForEntry(r) }, [e._v(" " + e._s(r.statusName) + " "), r.status === s.definitions.QUEUE_ENTRY_STATUS.UPLOADING ? t("b", { staticClass: "ml-auto" }, [e._v(e._s(r.percent))]) : e._e()])]), t("button", { staticClass: "vuefinder__upload-modal__file-remove", class: s.uploading ? "disabled" : "", attrs: { type: "button", title: s.t("Delete"), disabled: s.uploading }, on: { click: function(a) {
      return s.remove(r);
    } } }, [t("svg", { staticClass: "vuefinder__upload-modal__file-remove-icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18L18 6M6 6l12 12" } })])])]);
  }), s.queue.length ? e._e() : t("div", { staticClass: "py-2" }, [e._v(e._s(s.t("No files selected!")))])], 2), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 1)], 1), t("input", { ref: "internalFileInput", staticClass: "hidden", attrs: { type: "file", multiple: "" } }), t("input", { ref: "internalFolderInput", staticClass: "hidden", attrs: { type: "file", multiple: "", webkitdirectory: "" } })]);
}, Wo = [], Ko = /* @__PURE__ */ W(
  zo,
  jo,
  Wo
);
const Yo = Ko.exports;
var Qo = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" } })]);
};
const lr = { render: Qo }, Xo = {
  __name: "ModalUnarchive",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = x(e.modal.data.items[0]), r = x(""), a = x([]);
    return { __sfc: !0, app: e, t, item: s, message: r, items: a, unarchive: () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: s.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: t("The file unarchived.") });
        },
        onError: (c) => {
          r.value = t(c.message);
        }
      });
    }, ModalLayout: De, Message: ze, ModalHeader: Pe, UnarchiveSVG: lr };
  }
};
var Zo = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-primary", attrs: { type: "button" }, on: { click: s.unarchive } }, [e._v(e._s(s.t("Unarchive")))]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Cancel")))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.UnarchiveSVG, title: s.t("Unarchive") } }), t("div", { staticClass: "vuefinder__unarchive-modal__content" }, [t("div", { staticClass: "vuefinder__unarchive-modal__items" }, [e._l(s.items, function(r) {
    return t("p", { staticClass: "vuefinder__unarchive-modal__item" }, [r.type === "dir" ? t("svg", { staticClass: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" } })]) : t("svg", { staticClass: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" } })]), t("span", { staticClass: "vuefinder__unarchive-modal__item-name" }, [e._v(e._s(r.basename))])]);
  }), t("p", { staticClass: "vuefinder__unarchive-modal__info" }, [e._v(e._s(s.t("The archive will be unarchived at")) + " (" + e._s(s.app.fs.data.dirname) + ")")]), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 2)])], 1)]);
}, Jo = [], ei = /* @__PURE__ */ W(
  Xo,
  Zo,
  Jo
);
const dr = ei.exports;
var ti = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" } })]);
};
const ur = { render: ti }, si = {
  __name: "ModalArchive",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = x(""), r = x(""), a = x(e.modal.data.items);
    return { __sfc: !0, app: e, t, name: s, message: r, items: a, archive: () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: c, type: i }) => ({ path: c, type: i })),
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: t("The file(s) archived.") });
        },
        onError: (c) => {
          r.value = t(c.message);
        }
      });
    }, ModalLayout: De, Message: ze, ArchiveSVG: ur, ModalHeader: Pe };
  }
};
var ni = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-primary", attrs: { type: "button" }, on: { click: s.archive } }, [e._v(e._s(s.t("Archive")))]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Cancel")))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.ArchiveSVG, title: s.t("Archive the files") } }), t("div", { staticClass: "vuefinder__archive-modal__content" }, [t("div", { staticClass: "vuefinder__archive-modal__form" }, [t("div", { staticClass: "vuefinder__archive-modal__files vf-scrollbar" }, e._l(s.items, function(r) {
    return t("p", { staticClass: "vuefinder__archive-modal__file" }, [r.type === "dir" ? t("svg", { staticClass: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" } })]) : t("svg", { staticClass: "vuefinder__archive-modal__icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" } })]), t("span", { staticClass: "vuefinder__archive-modal__file-name" }, [e._v(e._s(r.basename))])]);
  }), 0), t("input", { directives: [{ name: "model", rawName: "v-model", value: s.name, expression: "name" }], staticClass: "vuefinder__archive-modal__input", attrs: { placeholder: s.t("Archive name. (.zip file will be created)"), type: "text" }, domProps: { value: s.name }, on: { keyup: function(r) {
    return !r.type.indexOf("key") && e._k(r.keyCode, "enter", 13, r.key, "Enter") ? null : s.archive.apply(null, arguments);
  }, input: function(r) {
    r.target.composing || (s.name = r.target.value);
  } } }), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 1)])], 1)]);
}, ri = [], ai = /* @__PURE__ */ W(
  si,
  ni,
  ri
);
const _r = ai.exports;
var oi = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "animate-spin p-0.5 h-5 w-5 text-white ml-auto", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" } }, [t("circle", { staticClass: "opacity-25 stroke-blue-900 dark:stroke-blue-100", attrs: { cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" } }), t("path", { staticClass: "opacity-75", attrs: { fill: "currentColor", d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z" } })]);
};
const Ls = { render: oi };
var ii = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" } })]);
};
const ci = { render: ii };
var li = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" } })]);
};
const di = { render: li };
var ui = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" } })]);
};
const _i = { render: ui };
var vi = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 md:h-8 md:w-8 m-auto", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" } })]);
};
const fi = { render: vi }, pi = {
  __name: "Toolbar",
  setup(n) {
    const e = X("ServiceContainer"), { setStore: t } = e.storage, { t: s } = e.i18n, r = e.dragSelect, a = x("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      a.value = i;
    });
    const o = () => {
      e.fullScreen = !e.fullScreen;
    };
    return ye(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", e.emitter.emit("vf-fullscreen-toggle");
    }), { __sfc: !0, app: e, setStore: t, t: s, ds: r, searchQuery: a, toggleFullScreen: o, toggleView: () => {
      e.view = e.view === "list" ? "grid" : "list", r.refreshSelection(), t("viewport", e.view);
    }, FEATURES: fe, ModalNewFolder: ar, ModalNewFile: Go, ModalRename: Os, ModalDelete: Ds, ModalUpload: Yo, ModalUnarchive: dr, ModalArchive: _r, NewFolderSVG: rr, NewFileSVG: or, RenameSVG: nr, DeleteSVG: sr, UploadSVG: cr, ArchiveSVG: ur, UnarchiveSVG: lr, LoadingSVG: Ls, FullscreenSVG: ci, MinimizeSVG: di, GridViewSVG: _i, ListViewSVG: fi };
  }
};
var mi = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__toolbar" }, [s.searchQuery.length ? t("div", { staticClass: "vuefinder__toolbar__search-results" }, [t("div", { staticClass: "pl-2" }, [e._v(" " + e._s(s.t("Search results for")) + " "), t("span", { staticClass: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, [e._v(e._s(s.searchQuery))])]), s.app.fs.loading ? t(s.LoadingSVG) : e._e()], 1) : t("div", { staticClass: "vuefinder__toolbar__actions" }, [s.app.features.includes(s.FEATURES.NEW_FOLDER) ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("New Folder") }, on: { click: function(r) {
    s.app.modal.open(s.ModalNewFolder, { items: s.ds.getSelected() });
  } } }, [t(s.NewFolderSVG)], 1) : e._e(), s.app.features.includes(s.FEATURES.NEW_FILE) ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("New File") }, on: { click: function(r) {
    s.app.modal.open(s.ModalNewFile, { items: s.ds.getSelected() });
  } } }, [t(s.NewFileSVG)], 1) : e._e(), s.app.features.includes(s.FEATURES.RENAME) ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("Rename") }, on: { click: function(r) {
    s.ds.getCount() !== 1 || s.app.modal.open(s.ModalRename, { items: s.ds.getSelected() });
  } } }, [t(s.RenameSVG, { class: s.ds.getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled" })], 1) : e._e(), s.app.features.includes(s.FEATURES.DELETE) ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("Delete") }, on: { click: function(r) {
    !s.ds.getCount() || s.app.modal.open(s.ModalDelete, { items: s.ds.getSelected() });
  } } }, [t(s.DeleteSVG, { class: s.ds.getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled" })], 1) : e._e(), s.app.features.includes(s.FEATURES.UPLOAD) ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("Upload") }, on: { click: function(r) {
    s.app.modal.open(s.ModalUpload, { items: s.ds.getSelected() });
  } } }, [t(s.UploadSVG)], 1) : e._e(), s.app.features.includes(s.FEATURES.UNARCHIVE) && s.ds.getCount() === 1 && s.ds.getSelected()[0].mime_type === "application/zip" ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("Unarchive") }, on: { click: function(r) {
    !s.ds.getCount() || s.app.modal.open(s.ModalUnarchive, { items: s.ds.getSelected() });
  } } }, [t(s.UnarchiveSVG, { class: s.ds.getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled" })], 1) : e._e(), s.app.features.includes(s.FEATURES.ARCHIVE) ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("Archive") }, on: { click: function(r) {
    !s.ds.getCount() || s.app.modal.open(s.ModalArchive, { items: s.ds.getSelected() });
  } } }, [t(s.ArchiveSVG, { class: s.ds.getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled" })], 1) : e._e()]), t("div", { staticClass: "vuefinder__toolbar__controls" }, [s.app.features.includes(s.FEATURES.FULL_SCREEN) ? t("div", { staticClass: "mx-1.5", attrs: { title: s.t("Toggle Full Screen") }, on: { click: s.toggleFullScreen } }, [s.app.fullScreen ? t(s.MinimizeSVG) : t(s.FullscreenSVG)], 1) : e._e(), t("div", { staticClass: "mx-1.5", attrs: { title: s.t("Change View") }, on: { click: function(r) {
    s.searchQuery.length || s.toggleView();
  } } }, [s.app.view === "grid" ? t(s.GridViewSVG, { staticClass: "vf-toolbar-icon", class: s.searchQuery.length ? "vf-toolbar-icon-disabled" : "" }) : e._e(), s.app.view === "list" ? t(s.ListViewSVG, { staticClass: "vf-toolbar-icon", class: s.searchQuery.length ? "vf-toolbar-icon-disabled" : "" }) : e._e()], 1)])]);
}, hi = [], gi = /* @__PURE__ */ W(
  pi,
  mi,
  hi
);
const bi = gi.exports, wi = (n, e = 0, t = !1) => {
  let s;
  return (...r) => {
    t && !s && n(...r), clearTimeout(s), s = setTimeout(() => {
      n(...r);
    }, e);
  };
}, an = (n, e, t) => {
  const s = x(n);
  return Tr((r, a) => ({
    get() {
      return r(), s.value;
    },
    set: wi(
      (o) => {
        s.value = o, a();
      },
      e,
      t
    )
  }));
};
var yi = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "aria-hidden": "true", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3" } })]);
};
const Ci = { render: yi }, Si = {
  __name: "ModalMove",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = x(e.modal.data.items.from), r = x("");
    return { __sfc: !0, app: e, t, items: s, message: r, move: () => {
      s.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: s.value.map(({ path: o, type: c }) => ({ path: o, type: c })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: t("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (o) => {
          r.value = t(o.message);
        }
      });
    }, ModalLayout: De, Message: ze, ModalHeader: Pe, MoveSVG: Ci };
  }
};
var xi = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-primary", attrs: { type: "button" }, on: { click: s.move } }, [e._v(e._s(s.t("Yes, Move!")))]), t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Cancel")))]), t("div", { staticClass: "vuefinder__move-modal__selected-items" }, [e._v(e._s(s.t("%s item(s) selected.", s.items.length)))])];
  }, proxy: !0 }]) }, [t("div", [t(s.ModalHeader, { attrs: { icon: s.MoveSVG, title: s.t("Move files") } }), t("div", { staticClass: "vuefinder__move-modal__content" }, [t("p", { staticClass: "vuefinder__move-modal__description" }, [e._v(e._s(s.t("Are you sure you want to move these files?")))]), t("div", { staticClass: "vuefinder__move-modal__files vf-scrollbar" }, e._l(s.items, function(r) {
    return t("div", { staticClass: "vuefinder__move-modal__file" }, [t("div", [r.type === "dir" ? t("svg", { staticClass: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" } })]) : t("svg", { staticClass: "vuefinder__move-modal__icon", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" } })])]), t("div", { staticClass: "vuefinder__move-modal__file-name" }, [e._v(e._s(r.path))])]);
  }), 0), t("h4", { staticClass: "vuefinder__move-modal__target-title" }, [e._v(e._s(s.t("Target Directory")))]), t("p", { staticClass: "vuefinder__move-modal__target-directory" }, [t("svg", { staticClass: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "stroke-width": "1" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" } })]), t("span", { staticClass: "vuefinder__move-modal__target-path" }, [e._v(e._s(s.app.modal.data.items.to.path))])]), s.message.length ? t(s.Message, { attrs: { error: "" }, on: { hidden: function(r) {
    s.message = "";
  } } }, [e._v(e._s(s.message))]) : e._e()], 1)], 1)]);
}, ki = [], Ei = /* @__PURE__ */ W(
  Si,
  xi,
  ki
);
const hs = Ei.exports;
var $i = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "-40 -40 580 580" } }, [t("path", { attrs: { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" } })]);
};
const Ai = { render: $i };
var Mi = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 p-0.5 rounded", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20" } }, [t("path", { staticClass: "pointer-events-none", attrs: { "fill-rule": "evenodd", d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0", "clip-rule": "evenodd" } })]);
};
const Ti = { render: Mi };
var Fi = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18 18 6M6 6l12 12" } })]);
};
const Vi = { render: Fi };
var Di = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20" } }, [t("path", { staticClass: "pointer-events-none", attrs: { d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z" } })]);
};
const Oi = { render: Di };
var Li = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20" } }, [t("path", { attrs: { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" } })]);
};
const Ri = { render: Li };
var Ii = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "w-6 h-6 cursor-pointer", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18 18 6M6 6l12 12" } })]);
};
const Bi = { render: Ii };
var Pi = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2" } })]);
};
const jt = { render: Pi };
var Ni = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", viewBox: "0 0 24 24" } }, [t("path", { attrs: { stroke: "none", d: "M0 0h24v24H0z" } }), t("path", { attrs: { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" } })]);
};
const Hi = { render: Ni };
var Ui = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer", attrs: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" } }, [t("path", { attrs: { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" } })]);
};
const Gi = { render: Ui }, qi = {
  __name: "Breadcrumb",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = e.dragSelect, { setStore: r } = e.storage, a = x(null), o = an(0, 100);
    ye(o, (C) => {
      const F = a.value.children;
      let b = 0, w = 0, S = 5, R = 1;
      e.fs.limitBreadcrumbItems(S), Ke(() => {
        for (let g = F.length - 1; g >= 0 && !(b + F[g].offsetWidth > o.value - 40); g--)
          b += parseInt(F[g].offsetWidth, 10), w++;
        w < R && (w = R), w > S && (w = S), e.fs.limitBreadcrumbItems(w);
      });
    });
    const c = () => {
      o.value = a.value.offsetWidth;
    };
    let i = x(null);
    ve(() => {
      i.value = new ResizeObserver(c), i.value.observe(a.value);
    }), gs(() => {
      i.value.disconnect();
    });
    const d = (C, F = null) => {
      C.preventDefault(), s.isDraggingRef.value = !1, v(C), F ?? (F = e.fs.hiddenBreadcrumbs.length - 1);
      let b = JSON.parse(C.dataTransfer.getData("items"));
      if (b.find((w) => w.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(hs, {
        items: {
          from: b,
          to: e.fs.hiddenBreadcrumbs[F] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (C, F = null) => {
      C.preventDefault(), s.isDraggingRef.value = !1, v(C), F ?? (F = e.fs.breadcrumbs.length - 2);
      let b = JSON.parse(C.dataTransfer.getData("items"));
      if (b.find((w) => w.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(hs, {
        items: {
          from: b,
          to: e.fs.breadcrumbs[F] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, l = (C) => {
      C.preventDefault(), e.fs.isGoUpAvailable() ? (C.dataTransfer.dropEffect = "copy", C.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none");
    }, v = (C) => {
      C.preventDefault(), C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      E(), e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }, _ = () => {
      E(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, m = (C) => {
      e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: C.path }
      }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, f = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, y = {
      mounted(C, F, b, w) {
        C.clickOutsideEvent = function(S) {
          C === S.target || C.contains(S.target) || F.value();
        }, document.body.addEventListener("click", C.clickOutsideEvent);
      },
      beforeUnmount(C, F, b, w) {
        document.body.removeEventListener("click", C.clickOutsideEvent);
      }
    }, $ = () => {
      e.showTreeView = !e.showTreeView;
    };
    ye(
      () => e.showTreeView,
      (C, F) => {
        C !== F && r("show-tree-view", C);
      }
    );
    const B = x(null), k = () => {
      e.features.includes(fe.SEARCH) && (e.fs.searchMode = !0, Ke(() => B.value.focus()));
    }, O = an("", 400);
    ye(O, (C) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: C });
    }), ye(
      () => e.fs.searchMode,
      (C) => {
        C && Ke(() => B.value.focus());
      }
    );
    const E = () => {
      e.fs.searchMode = !1, O.value = "";
    };
    return e.emitter.on("vf-search-exit", () => {
      E();
    }), { __sfc: !0, app: e, t, ds: s, setStore: r, breadcrumbContainer: a, breadcrumbContainerWidth: o, updateContainerWidth: c, resizeObserver: i, handleHiddenBreadcrumbDropZone: d, handleDropZone: u, handleDragOver: l, handleDragLeave: v, handleRefresh: p, handleGoUp: _, handleHiddenBreadcrumbsClick: m, handleClickOutside: f, vClickOutside: y, toggleTreeView: $, searchInput: B, enterSearchMode: k, query: O, exitSearchMode: E, handleBlur: () => {
      O.value === "" && E();
    }, RefreshSVG: Ai, GoUpSVG: Ti, CloseSVG: Vi, HomeSVG: Oi, SearchSVG: Ri, LoadingSVG: Ls, ExitSVG: Bi, FolderSVG: jt, ListTreeSVG: Hi, DotsSVG: Gi };
  }
};
var zi = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__breadcrumb__container" }, [t("span", { attrs: { title: s.t("Toggle Tree View") } }, [t(s.ListTreeSVG, { staticClass: "vuefinder__breadcrumb__toggle-tree", class: s.app.showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : "", nativeOn: { click: function(r) {
    return s.toggleTreeView.apply(null, arguments);
  } } })], 1), t("span", { attrs: { title: s.t("Go up a directory") } }, [t(s.GoUpSVG, { class: s.app.fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive", nativeOn: { dragover: function(r) {
    return s.handleDragOver(r);
  }, dragleave: function(r) {
    return s.handleDragLeave(r);
  }, drop: function(r) {
    return s.handleDropZone(r);
  }, click: function(r) {
    return s.handleGoUp.apply(null, arguments);
  } } })], 1), s.app.fs.loading ? t("span", { attrs: { title: s.t("Cancel") } }, [t(s.CloseSVG, { nativeOn: { click: function(r) {
    return s.app.emitter.emit("vf-fetch-abort");
  } } })], 1) : t("span", { attrs: { title: s.t("Refresh") } }, [t(s.RefreshSVG, { nativeOn: { click: function(r) {
    return s.handleRefresh.apply(null, arguments);
  } } })], 1), t("div", { directives: [{ name: "show", rawName: "v-show", value: !s.app.fs.searchMode, expression: "!app.fs.searchMode" }], staticClass: "group vuefinder__breadcrumb__search-container", on: { click: function(r) {
    return r.target !== r.currentTarget ? null : s.enterSearchMode.apply(null, arguments);
  } } }, [t("div", [t(s.HomeSVG, { nativeOn: { dragover: function(r) {
    return s.handleDragOver(r);
  }, dragleave: function(r) {
    return s.handleDragLeave(r);
  }, drop: function(r) {
    return s.handleDropZone(r, -1);
  }, click: function(r) {
    e.handleHomeClick, s.app.emitter.emit("vf-fetch", {
      params: { q: "index", adapter: s.app.fs.adapter }
    });
  } } })], 1), t("div", { staticClass: "vuefinder__breadcrumb__list" }, [s.app.fs.hiddenBreadcrumbs.length ? t("div", { directives: [{ name: "click-outside", rawName: "v-click-outside", value: s.handleClickOutside, expression: "handleClickOutside" }], staticClass: "vuefinder__breadcrumb__hidden-list" }, [t("div", { staticClass: "vuefinder__breadcrumb__separator" }, [e._v("/")]), t("div", { staticClass: "relative" }, [t("span", { staticClass: "vuefinder__breadcrumb__hidden-toggle", on: { dragenter: function(r) {
    return s.app.fs.toggleHiddenBreadcrumbs(!0);
  }, click: function(r) {
    return s.app.fs.toggleHiddenBreadcrumbs();
  } } }, [t(s.DotsSVG, { staticClass: "vuefinder__breadcrumb__hidden-toggle-icon" })], 1)])]) : e._e()]), t("div", { ref: "breadcrumbContainer", staticClass: "vuefinder__breadcrumb__visible-list", on: { click: function(r) {
    return r.target !== r.currentTarget ? null : s.enterSearchMode.apply(null, arguments);
  } } }, e._l(s.app.fs.breadcrumbs, function(r, a) {
    return t("div", { key: a }, [t("span", { staticClass: "vuefinder__breadcrumb__separator" }, [e._v("/")]), t("span", { staticClass: "vuefinder__breadcrumb__item", attrs: { title: r.basename }, on: { dragover: function(o) {
      a === s.app.fs.breadcrumbs.length - 1 || s.handleDragOver(o);
    }, dragleave: function(o) {
      a === s.app.fs.breadcrumbs.length - 1 || s.handleDragLeave(o);
    }, drop: function(o) {
      a === s.app.fs.breadcrumbs.length - 1 || s.handleDropZone(o, a);
    }, click: function(o) {
      return s.app.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: s.app.fs.adapter,
          path: r.path
        }
      });
    } } }, [e._v(e._s(r.name))])]);
  }), 0), s.app.fs.loading ? t(s.LoadingSVG) : e._e()], 1), t("div", { directives: [{ name: "show", rawName: "v-show", value: s.app.fs.searchMode, expression: "app.fs.searchMode" }], staticClass: "vuefinder__breadcrumb__search-mode" }, [t("div", [t(s.SearchSVG)], 1), t("input", { directives: [{ name: "model", rawName: "v-model", value: s.query, expression: "query" }], ref: "searchInput", staticClass: "vuefinder__breadcrumb__search-input", attrs: { placeholder: s.t("Search anything.."), type: "text" }, domProps: { value: s.query }, on: { keydown: function(r) {
    return !r.type.indexOf("key") && e._k(r.keyCode, "esc", 27, r.key, ["Esc", "Escape"]) ? null : s.exitSearchMode.apply(null, arguments);
  }, blur: s.handleBlur, input: function(r) {
    r.target.composing || (s.query = r.target.value);
  } } }), t(s.ExitSVG, { nativeOn: { click: function(r) {
    return s.exitSearchMode.apply(null, arguments);
  } } })], 1), t("div", { directives: [{ name: "show", rawName: "v-show", value: s.app.fs.showHiddenBreadcrumbs, expression: "app.fs.showHiddenBreadcrumbs" }], staticClass: "vuefinder__breadcrumb__hidden-dropdown" }, e._l(s.app.fs.hiddenBreadcrumbs, function(r, a) {
    return t("div", { key: a, staticClass: "vuefinder__breadcrumb__hidden-item", on: { dragover: function(o) {
      return s.handleDragOver(o);
    }, dragleave: function(o) {
      return s.handleDragLeave(o);
    }, drop: function(o) {
      return s.handleHiddenBreadcrumbDropZone(o, a);
    }, click: function(o) {
      return s.handleHiddenBreadcrumbsClick(r);
    } } }, [t("div", { staticClass: "vuefinder__breadcrumb__hidden-item-content" }, [t("span", [t(s.FolderSVG, { staticClass: "vuefinder__breadcrumb__hidden-item-icon" })], 1), t("span", { staticClass: "vuefinder__breadcrumb__hidden-item-text" }, [e._v(e._s(r.name))])])]);
  }), 0)]);
}, ji = [], Wi = /* @__PURE__ */ W(
  qi,
  zi,
  ji
);
const Ki = Wi.exports, vr = (n, e = null) => new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Yi = {
  __name: "Toast",
  setup(n) {
    const e = X("ServiceContainer"), { getStore: t } = e.storage, s = x(e.fullScreen), r = x([]), a = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", o = (i) => {
      r.value.splice(i, 1);
    }, c = (i) => {
      let d = r.value.findIndex((u) => u.id === i);
      d !== -1 && o(d);
    };
    return e.emitter.on("vf-toast-clear", () => {
      r.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let d = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = d, r.value.push(i), setTimeout(() => {
        c(d);
      }, 5e3);
    }), { __sfc: !0, app: e, getStore: t, fullScreen: s, messageQueue: r, getTypeClass: a, removeItem: o, removeItemByID: c };
  }
};
var Qi = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { class: [
    "vuefinder__toast",
    s.fullScreen.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"
  ] }, [t("transition-group", { attrs: { name: "vuefinder__toast-item", "enter-active-class": "vuefinder__toast-item--enter-active", "leave-active-class": "vuefinder__toast-item--leave-active", "leave-to-class": "vuefinder__toast-item--leave-to" } }, e._l(s.messageQueue, function(r, a) {
    return t("div", { key: a, class: ["vuefinder__toast__message", s.getTypeClass(r.type)], on: { click: function(o) {
      return s.removeItem(a);
    } } }, [e._v(" " + e._s(r.label) + " ")]);
  }), 0)], 1);
}, Xi = [], Zi = /* @__PURE__ */ W(
  Yi,
  Qi,
  Xi
);
const Ji = Zi.exports;
var ec = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-5 w-5", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20" } }, [t("path", { attrs: { "fill-rule": "evenodd", d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414", "clip-rule": "evenodd" } })]);
};
const tc = { render: ec };
var sc = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-5 w-5", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 20 20" } }, [t("path", { attrs: { "fill-rule": "evenodd", d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414", "clip-rule": "evenodd" } })]);
};
const nc = { render: sc }, rc = {
  __name: "SortIcon",
  props: { direction: String },
  setup(n) {
    return { __sfc: !0, AscSVG: tc, DescSVG: nc };
  }
};
var ac = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", [e.direction === "asc" ? t(s.AscSVG) : e._e(), e.direction === "desc" ? t(s.DescSVG) : e._e()], 1);
}, oc = [], ic = /* @__PURE__ */ W(
  rc,
  ac,
  oc
);
const cc = ic.exports;
var lc = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "text-neutral-500", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2" } })]);
};
const dc = { render: lc }, uc = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    return { __sfc: !0, FileSVG: dc, FolderSVG: jt };
  }
};
var _c = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("span", { staticClass: "vuefinder__item-icon" }, [e.type === "dir" ? t(s.FolderSVG, { class: e.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large" }) : t(s.FileSVG, { class: e.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large" })], 1);
}, vc = [], fc = /* @__PURE__ */ W(
  uc,
  _c,
  vc
);
const pc = fc.exports;
var mc = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2" } })]);
};
const hc = { render: mc }, gc = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(n) {
    return { __sfc: !0, props: n, DragSVG: hc };
  }
};
var bc = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__drag-item__container" }, [t(s.DragSVG), t("div", { staticClass: "vuefinder__drag-item__count" }, [e._v(e._s(s.props.count))])], 1);
}, wc = [], yc = /* @__PURE__ */ W(
  gc,
  bc,
  wc
);
const Cc = yc.exports, Sc = {
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = X("ServiceContainer");
    return ve(() => {
      e("success");
    }), { __sfc: !0, app: t, emit: e };
  }
};
var xc = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__default-preview" }, [t("div", { staticClass: "vuefinder__default-preview__header" }, [t("h3", { staticClass: "vuefinder__default-preview__title", attrs: { id: "modal-title", title: s.app.modal.data.item.path } }, [e._v(" " + e._s(s.app.modal.data.item.basename) + " ")])]), t("div")]);
}, kc = [], Ec = /* @__PURE__ */ W(
  Sc,
  xc,
  kc
);
const $c = Ec.exports, Ac = {
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = X("ServiceContainer"), s = () => t.requester.getPreviewUrl(t.modal.data.adapter, t.modal.data.item);
    return ve(() => {
      e("success");
    }), { __sfc: !0, app: t, emit: e, getVideoUrl: s };
  }
};
var Mc = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__video-preview" }, [t("h3", { staticClass: "vuefinder__video-preview__title", attrs: { id: "modal-title", title: s.app.modal.data.item.path } }, [e._v(" " + e._s(s.app.modal.data.item.basename) + " ")]), t("div", [t("video", { staticClass: "vuefinder__video-preview__video", attrs: { preload: "", controls: "" } }, [t("source", { attrs: { src: s.getVideoUrl(), type: "video/mp4" } }), e._v(" Your browser does not support the video tag. ")])])]);
}, Tc = [], Fc = /* @__PURE__ */ W(
  Ac,
  Mc,
  Tc
);
const Vc = Fc.exports, Dc = {
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = X("ServiceContainer"), s = () => t.requester.getPreviewUrl(t.modal.data.adapter, t.modal.data.item);
    return ve(() => {
      e("success");
    }), { __sfc: !0, emit: e, app: t, getAudioUrl: s };
  }
};
var Oc = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__audio-preview" }, [t("h3", { staticClass: "vuefinder__audio-preview__title", attrs: { id: "modal-title", title: s.app.modal.data.item.path } }, [e._v(" " + e._s(s.app.modal.data.item.basename) + " ")]), t("div", [t("audio", { staticClass: "vuefinder__audio-preview__audio", attrs: { controls: "" } }, [t("source", { attrs: { src: s.getAudioUrl(), type: "audio/mpeg" } }), e._v(" Your browser does not support the audio element. ")])])]);
}, Lc = [], Rc = /* @__PURE__ */ W(
  Dc,
  Oc,
  Lc
);
const Ic = Rc.exports, Bc = {
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = X("ServiceContainer"), s = () => t.requester.getPreviewUrl(t.modal.data.adapter, t.modal.data.item);
    return ve(() => {
      e("success");
    }), { __sfc: !0, app: t, emit: e, getPDFUrl: s };
  }
};
var Pc = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__pdf-preview" }, [t("h3", { staticClass: "vuefinder__pdf-preview__title", attrs: { id: "modal-title", title: s.app.modal.data.item.path } }, [e._v(" " + e._s(s.app.modal.data.item.basename) + " ")]), t("div", [t("object", { staticClass: "vuefinder__pdf-preview__object", attrs: { data: s.getPDFUrl(), type: "application/pdf", width: "100%", height: "100%" } }, [t("iframe", { staticClass: "vuefinder__pdf-preview__iframe", attrs: { src: s.getPDFUrl(), width: "100%", height: "100%" } })])])]);
}, Nc = [], Hc = /* @__PURE__ */ W(
  Bc,
  Pc,
  Nc
);
const Uc = Hc.exports, Gc = {
  __name: "ModalPreview",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = x(!1), r = (o) => (e.modal.data.item.mime_type ?? "").startsWith(o), a = e.features.includes(fe.PREVIEW);
    return a || (s.value = !0), { __sfc: !0, app: e, t, loaded: s, loadPreview: r, enabledPreview: a, ModalLayout: De, Default: $c, Video: Vc, Audio: Ic, Pdf: Uc, datetimestring: vr, FEATURES: fe };
  }
};
var qc = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t(s.ModalLayout, { scopedSlots: e._u([{ key: "buttons", fn: function() {
    return [t("button", { staticClass: "vf-btn vf-btn-secondary", attrs: { type: "button" }, on: { click: function(r) {
      return s.app.modal.close();
    } } }, [e._v(e._s(s.t("Close")))]), s.app.features.includes(s.FEATURES.DOWNLOAD) ? t("a", { staticClass: "vf-btn vf-btn-primary", attrs: { target: "_blank", download: s.app.requester.getDownloadUrl(s.app.modal.data.adapter, s.app.modal.data.item), href: s.app.requester.getDownloadUrl(s.app.modal.data.adapter, s.app.modal.data.item) } }, [e._v(e._s(s.t("Download")))]) : e._e()];
  }, proxy: !0 }]) }, [t("div", [t("div", { staticClass: "vuefinder__preview-modal__content" }, [s.enabledPreview ? t("div", [s.loadPreview("text") ? t("Text", { on: { success: function(r) {
    s.loaded = !0;
  } } }) : s.loadPreview("image") ? t("Image", { on: { success: function(r) {
    s.loaded = !0;
  } } }) : s.loadPreview("video") ? t(s.Video, { on: { success: function(r) {
    s.loaded = !0;
  } } }) : s.loadPreview("audio") ? t(s.Audio, { on: { success: function(r) {
    s.loaded = !0;
  } } }) : s.loadPreview("application/pdf") ? t(s.Pdf, { on: { success: function(r) {
    s.loaded = !0;
  } } }) : t(s.Default, { on: { success: function(r) {
    s.loaded = !0;
  } } })], 1) : e._e(), t("div", { staticClass: "vuefinder__preview-modal__loading" }, [s.loaded === !1 ? t("div", { staticClass: "vuefinder__preview-modal__loading-indicator" }, [t("svg", { staticClass: "vuefinder__preview-modal__spinner", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" } }, [t("circle", { staticClass: "vuefinder__preview-modal__spinner-circle", attrs: { cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" } }), t("path", { staticClass: "vuefinder__preview-modal__spinner-path", attrs: { fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" } })]), t("span", [e._v(e._s(s.t("Loading")))])]) : e._e()])])]), t("div", { staticClass: "vuefinder__preview-modal__details" }, [t("div", [t("span", { staticClass: "font-bold" }, [e._v(e._s(s.t("File Size")) + ": ")]), e._v(e._s(s.app.filesize(s.app.modal.data.item.file_size)))]), t("div", [t("span", { staticClass: "font-bold pl-2" }, [e._v(e._s(s.t("Last Modified")) + ": ")]), e._v(" " + e._s(s.datetimestring(s.app.modal.data.item.last_modified)))])]), s.app.features.includes(s.FEATURES.DOWNLOAD) ? t("div", { staticClass: "vuefinder__preview-modal__note" }, [t("span", [e._v(e._s(s.t(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)))])]) : e._e()]);
}, zc = [], jc = /* @__PURE__ */ W(
  Gc,
  qc,
  zc
);
const fr = jc.exports;
var Wc = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-5 w-5", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", viewBox: "0 0 24 24" } }, [t("path", { attrs: { stroke: "none", d: "M0 0h24v24H0z" } }), t("path", { attrs: { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" } })]);
};
const pr = { render: Wc }, Kc = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(n) {
    const e = n, t = X("ServiceContainer"), s = t.dragSelect, r = (_) => {
      _.type === "dir" ? (t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: _.path } })) : t.modal.open(fr, { adapter: t.fs.adapter, item: _ });
    }, a = {
      mounted(_, m, f, y) {
        f.props.draggable && (_.addEventListener("dragstart", ($) => o($, m.value)), _.addEventListener("dragover", ($) => i($, m.value)), _.addEventListener("drop", ($) => c($, m.value)));
      },
      beforeUnmount(_, m, f, y) {
        f.props.draggable && (_.removeEventListener("dragstart", o), _.removeEventListener("dragover", i), _.removeEventListener("drop", c));
      }
    }, o = (_, m) => {
      if (_.altKey || _.ctrlKey || _.metaKey)
        return _.preventDefault(), !1;
      s.isDraggingRef.value = !0, _.dataTransfer.setDragImage(e.dragImage.$el, 0, 15), _.dataTransfer.effectAllowed = "all", _.dataTransfer.dropEffect = "copy", _.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, c = (_, m) => {
      _.preventDefault(), s.isDraggingRef.value = !1;
      let f = JSON.parse(_.dataTransfer.getData("items"));
      if (f.find((y) => y.storage !== t.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.modal.open(hs, { items: { from: f, to: m } });
    }, i = (_, m) => {
      _.preventDefault(), !m || m.type !== "dir" || s.getSelection().find((f) => f === _.currentTarget) ? (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : _.dataTransfer.dropEffect = "copy";
    };
    let d = null, u = null, l = !1;
    return { __sfc: !0, app: t, ds: s, props: e, openItem: r, vDraggable: a, handleDragStart: o, handleDropZone: c, handleDragOver: i, touchTimeOut: d, doubleTapTimeOut: u, tappedTwice: l, clearTimeOut: () => {
      d && clearTimeout(d);
    }, delayedOpenItem: (_) => {
      if (!l)
        l = !0, u = setTimeout(() => l = !1, 300);
      else
        return l = !1, r(e.item), clearTimeout(d), !1;
      d = setTimeout(() => {
        const m = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: _.target.getBoundingClientRect().x,
          clientY: _.target.getBoundingClientRect().y
        });
        _.target.dispatchEvent(m);
      }, 500);
    }, PinSVG: pr };
  }
};
var Yc = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { directives: [{ name: "draggable", rawName: "v-draggable", value: e.item, expression: "item" }], key: e.item.path, class: ["vuefinder__item", "vf-item-" + s.ds.explorerId], style: { opacity: s.ds.isDraggingRef.value && s.ds.getSelection().find((r) => e.$el === r) ? "0.5 !important" : "" }, attrs: { "data-type": e.item.type, "data-item": JSON.stringify(e.item), "data-index": e.index }, on: { dblclick: function(r) {
    return s.openItem(e.item);
  }, touchstart: function(r) {
    return s.delayedOpenItem(r);
  }, touchend: function(r) {
    return s.clearTimeOut();
  }, contextmenu: function(r) {
    r.preventDefault(), s.app.emitter.emit("vf-contextmenu-show", { event: r, items: s.ds.getSelected(), target: e.item });
  } } }, [e._t("default"), s.app.pinnedFolders.find((r) => r.path === e.item.path) ? t(s.PinSVG, { staticClass: "vuefinder__item--pinned" }) : e._e()], 2);
}, Qc = [], Xc = /* @__PURE__ */ W(
  Kc,
  Yc,
  Qc
);
const Zc = Xc.exports, Jc = {
  __name: "Explorer",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = (l) => l == null ? void 0 : l.substring(0, 3), r = x(null), a = x(""), o = e.dragSelect;
    let c;
    e.emitter.on("vf-fullscreen-toggle", () => {
      o.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      a.value = l, l ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: l
        },
        onSuccess: (v) => {
          v.files.length || e.emitter.emit("vf-toast-push", {
            label: t("No search result found.")
          });
        }
      }) : e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        }
      });
    });
    const i = Xe({ active: !1, column: "", order: "" }), d = (l = !0) => {
      let v = [...e.fs.data.files], p = i.column, _ = i.order === "asc" ? 1 : -1;
      if (!l)
        return v;
      const m = (f, y) => typeof f == "string" && typeof y == "string" ? f.toLowerCase().localeCompare(y.toLowerCase()) : f < y ? -1 : f > y ? 1 : 0;
      return i.active && (v = v.slice().sort((f, y) => m(f[p], y[p]) * _)), v;
    }, u = (l) => {
      i.active && i.column === l ? (i.active = i.order === "asc", i.column = l, i.order = "desc") : (i.active = !0, i.column = l, i.order = "asc");
    };
    return ve(() => {
      c = new Rr(o.area.value);
    }), cn(() => {
      c.update();
    }), dn(() => {
      c.destroy();
    }), { __sfc: !0, app: e, t, ext: s, dragImage: r, searchQuery: a, ds: o, vfLazyLoad: c, sort: i, getItems: d, sortBy: u, datetimestring: vr, title_shorten: ir, Toast: Ji, SortIcon: cc, ItemIcon: pc, DragItem: Cc, Item: Zc };
  }
};
var el = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__explorer__container" }, [s.app.view === "list" || s.searchQuery.length ? t("div", { staticClass: "vuefinder__explorer__header" }, [t("div", { staticClass: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button", on: { click: function(r) {
    return s.sortBy("basename");
  } } }, [e._v(" " + e._s(s.t("Name")) + " "), t(s.SortIcon, { directives: [{ name: "show", rawName: "v-show", value: s.sort.active && s.sort.column === "basename", expression: "sort.active && sort.column === 'basename'" }], attrs: { direction: s.sort.order } })], 1), s.searchQuery.length ? e._e() : t("div", { staticClass: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button", on: { click: function(r) {
    return s.sortBy("file_size");
  } } }, [e._v(" " + e._s(s.t("Size")) + " "), t(s.SortIcon, { directives: [{ name: "show", rawName: "v-show", value: s.sort.active && s.sort.column === "file_size", expression: "sort.active && sort.column === 'file_size'" }], attrs: { direction: s.sort.order } })], 1), s.searchQuery.length ? e._e() : t("div", { staticClass: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button", on: { click: function(r) {
    return s.sortBy("last_modified");
  } } }, [e._v(" " + e._s(s.t("Date")) + " "), t(s.SortIcon, { directives: [{ name: "show", rawName: "v-show", value: s.sort.active && s.sort.column === "last_modified", expression: "sort.active && sort.column === 'last_modified'" }], attrs: { direction: s.sort.order } })], 1), s.searchQuery.length ? t("div", { staticClass: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button", on: { click: function(r) {
    return s.sortBy("path");
  } } }, [e._v(" " + e._s(s.t("Filepath")) + " "), t(s.SortIcon, { directives: [{ name: "show", rawName: "v-show", value: s.sort.active && s.sort.column === "path", expression: "sort.active && sort.column === 'path'" }], attrs: { direction: s.sort.order } })], 1) : e._e()]) : e._e(), t("div", { staticClass: "vuefinder__explorer__drag-item" }, [t(s.DragItem, { ref: "dragImage", attrs: { count: s.ds.getCount() } })], 1), t("div", { ref: s.ds.scrollBarContainer, staticClass: "vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", class: [
    { "grid-view": s.app.view === "grid" },
    { "search-active": s.searchQuery.length }
  ] }, [t("div", { ref: s.ds.scrollBar, staticClass: "vuefinder__explorer__scrollbar" })]), t("div", { ref: s.ds.area, staticClass: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area", on: { contextmenu: function(r) {
    if (r.target !== r.currentTarget) return null;
    r.preventDefault(), s.app.emitter.emit("vf-contextmenu-show", {
      event: r,
      items: s.ds.getSelected()
    });
  } } }, [e._l(s.getItems(), function(r, a) {
    return s.searchQuery.length ? t(s.Item, { staticClass: "vf-item vf-item-list", attrs: { item: r, index: a, dragImage: s.dragImage } }, [t("div", { staticClass: "vuefinder__explorer__item-list-content" }, [t("div", { staticClass: "vuefinder__explorer__item-list-name" }, [t(s.ItemIcon, { attrs: { type: r.type, small: s.app.compactListView } }), t("span", { staticClass: "vuefinder__explorer__item-name" }, [e._v(e._s(r.basename))])], 1), t("div", { staticClass: "vuefinder__explorer__item-path" }, [e._v(e._s(r.path))])])]) : e._e();
  }), e._l(s.getItems(), function(r, a) {
    return s.app.view === "list" && !s.searchQuery.length ? t(s.Item, { key: r.path, staticClass: "vf-item vf-item-list", attrs: { item: r, index: a, dragImage: s.dragImage, draggable: "true" } }, [t("div", { staticClass: "vuefinder__explorer__item-list-content" }, [t("div", { staticClass: "vuefinder__explorer__item-list-name" }, [t(s.ItemIcon, { attrs: { type: r.type, small: s.app.compactListView } }), t("span", { staticClass: "vuefinder__explorer__item-name" }, [e._v(e._s(r.basename))])], 1), t("div", { staticClass: "vuefinder__explorer__item-size" }, [e._v(" " + e._s(r.file_size ? s.app.filesize(r.file_size) : "") + " ")]), t("div", { staticClass: "vuefinder__explorer__item-date" }, [e._v(" " + e._s(s.datetimestring(r.last_modified)) + " ")])])]) : e._e();
  }), e._l(s.getItems(!1), function(r, a) {
    return s.app.view === "grid" && !s.searchQuery.length ? t(s.Item, { staticClass: "vf-item vf-item-grid", attrs: { item: r, index: a, dragImage: s.dragImage, draggable: "true" } }, [t("div", [t("div", { staticClass: "vuefinder__explorer__item-grid-content" }, [(r.mime_type ?? "").startsWith("image") && s.app.showThumbnails ? t("img", { key: r.path, staticClass: "vuefinder__explorer__item-thumbnail lazy", attrs: { src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", "data-src": s.app.requester.getPreviewUrl(s.app.fs.adapter, r), alt: r.basename } }) : t(s.ItemIcon, { attrs: { type: r.type } }), !((r.mime_type ?? "").startsWith("image") && s.app.showThumbnails) && r.type !== "dir" ? t("div", { staticClass: "vuefinder__explorer__item-extension" }, [e._v(" " + e._s(s.ext(r.extension)) + " ")]) : e._e()], 1), t("span", { staticClass: "vuefinder__explorer__item-title break-all" }, [e._v(e._s(s.title_shorten(r.basename)))])])]) : e._e();
  })], 2), t(s.Toast)], 1);
}, tl = [], sl = /* @__PURE__ */ W(
  Jc,
  el,
  tl
);
const nl = sl.exports, rl = {
  __name: "ContextMenu",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, s = x(null), r = x([]), a = x(""), o = Xe({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), c = Ie(() => o.items.filter(
      (l) => l.key == null || e.features.includes(l.key)
    ));
    e.emitter.on("vf-context-selected", (l) => {
      r.value = l;
    });
    const i = {
      newfolder: {
        key: fe.NEW_FOLDER,
        title: () => t("New Folder"),
        action: () => e.modal.open(ar)
      },
      selectAll: {
        title: () => t("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      pinFolder: {
        title: () => t("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(r.value), e.requester.pinFolder(r.value);
        }
      },
      unpinFolder: {
        title: () => t("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((l) => {
            const v = r.value.find(
              (p) => p.path === l.path
            );
            return e.requester.unpinFolder(v), !r.value.find((p) => p.path === l.path);
          });
        }
      },
      delete: {
        key: fe.DELETE,
        title: () => t("Delete"),
        action: () => {
          e.modal.open(Ds, { items: r });
        }
      },
      refresh: {
        title: () => t("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        }
      },
      preview: {
        key: fe.PREVIEW,
        title: () => t("Preview"),
        action: () => e.modal.open(fr, {
          adapter: e.fs.adapter,
          item: r.value[0]
        })
      },
      open: {
        title: () => t("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: r.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => t("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: r.value[0].dir
            }
          });
        }
      },
      download: {
        key: fe.DOWNLOAD,
        link: Ie(
          () => e.requester.getDownloadUrl(e.fs.adapter, r.value[0])
        ),
        title: () => t("Download"),
        action: () => {
        }
      },
      archive: {
        key: fe.ARCHIVE,
        title: () => t("Archive"),
        action: () => e.modal.open(_r, { items: r })
      },
      unarchive: {
        key: fe.UNARCHIVE,
        title: () => t("Unarchive"),
        action: () => e.modal.open(dr, { items: r })
      },
      rename: {
        key: fe.RENAME,
        title: () => t("Rename"),
        action: () => e.modal.open(Os, { items: r })
      }
    }, d = (l) => {
      e.emitter.emit("vf-contextmenu-hide"), l.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      a.value = l;
    }), e.emitter.on("vf-contextmenu-show", ({ event: l, items: v, target: p = null }) => {
      if (o.items = [], a.value)
        if (p)
          o.items.push(i.openDir), e.emitter.emit("vf-context-selected", [p]);
        else
          return;
      else !p && !a.value ? (o.items.push(i.refresh), o.items.push(i.selectAll), o.items.push(i.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((_) => _.path === p.path) ? (o.items.push(i.refresh), o.items.push(i.archive), o.items.push(i.delete), e.emitter.emit("vf-context-selected", v)) : (p.type === "dir" ? (o.items.push(i.open), e.pinnedFolders.findIndex((_) => _.path === p.path) !== -1 ? o.items.push(i.unpinFolder) : o.items.push(i.pinFolder)) : (o.items.push(i.preview), o.items.push(i.download)), o.items.push(i.rename), p.mime_type === "application/zip" ? o.items.push(i.unarchive) : o.items.push(i.archive), o.items.push(i.delete), e.emitter.emit("vf-context-selected", [p]));
      u(l);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      o.active = !1;
    });
    const u = (l) => {
      const v = e.dragSelect.area.value, p = e.root.getBoundingClientRect(), _ = v.getBoundingClientRect();
      let m = l.clientX - p.left, f = l.clientY - p.top;
      o.active = !0, Ke(() => {
        var k;
        const y = (k = s.value) == null ? void 0 : k.getBoundingClientRect();
        let $ = (y == null ? void 0 : y.height) ?? 0, B = (y == null ? void 0 : y.width) ?? 0;
        m = _.right - l.pageX + window.scrollX < B ? m - B : m, f = _.bottom - l.pageY + window.scrollY < $ ? f - $ : f, o.positions = {
          left: m + "px",
          top: f + "px"
        };
      });
    };
    return { __sfc: !0, app: e, t, contextmenu: s, selectedItems: r, searchQuery: a, context: o, filteredItems: c, menuItems: i, run: d, showContextMenu: u };
  }
};
var al = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("ul", { directives: [{ name: "show", rawName: "v-show", value: s.context.active, expression: "context.active" }], ref: "contextmenu", staticClass: "vuefinder__context-menu", style: s.context.positions }, e._l(s.filteredItems, function(r) {
    return t("li", { key: r.title(), staticClass: "vuefinder__context-menu__item" }, [r.link ? [t("a", { staticClass: "vuefinder__context-menu__link", attrs: { target: "_blank", href: r.link, download: r.link }, on: { click: function(a) {
      return s.app.emitter.emit("vf-contextmenu-hide");
    } } }, [t("span", [e._v(e._s(r.title()))])])] : [t("div", { staticClass: "vuefinder__context-menu__action", on: { click: function(a) {
      return s.run(r);
    } } }, [t("span", [e._v(e._s(r.title()))])])]], 2);
  }), 0);
}, ol = [], il = /* @__PURE__ */ W(
  rl,
  al,
  ol
);
const cl = il.exports;
var ll = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-5 w-5", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" } })]);
};
const mr = { render: ll };
var dl = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-5 w-5 stroke-slate-500 cursor-pointer", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" } })]);
};
const ul = { render: dl }, _l = {
  __name: "Statusbar",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, { setStore: s } = e.storage, r = e.dragSelect, a = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), s("adapter", e.fs.adapter);
    }, o = x("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      o.value = i;
    });
    const c = Ie(() => {
      const i = e.selectButton.multiple ? r.getSelected().length > 0 : r.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return { __sfc: !0, app: e, t, setStore: s, ds: r, handleStorageSelect: a, searchQuery: o, isSelectButtonActive: c, ModalAbout: tr, StorageSVG: mr, AboutSVG: ul };
  }
};
var vl = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { staticClass: "vuefinder__status-bar__wrapper" }, [t("div", { staticClass: "vuefinder__status-bar__storage" }, [t("div", { staticClass: "vuefinder__status-bar__storage-container", attrs: { title: s.t("Storage") } }, [t("div", { staticClass: "vuefinder__status-bar__storage-icon" }, [t(s.StorageSVG)], 1), t("select", { directives: [{ name: "model", rawName: "v-model", value: s.app.fs.adapter, expression: "app.fs.adapter" }], staticClass: "vuefinder__status-bar__storage-select", attrs: { tabindex: "-1" }, on: { change: [function(r) {
    var a = Array.prototype.filter.call(r.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var c = "_value" in o ? o._value : o.value;
      return c;
    });
    e.$set(s.app.fs, "adapter", r.target.multiple ? a : a[0]);
  }, s.handleStorageSelect] } }, e._l(s.app.fs.data.storages, function(r) {
    return t("option", { domProps: { value: r } }, [e._v(" " + e._s(r) + " ")]);
  }), 0)]), t("div", { staticClass: "vuefinder__status-bar__info" }, [s.searchQuery.length ? t("span", [e._v(e._s(s.app.fs.data.files.length) + " items found. ")]) : e._e(), t("span", { staticClass: "vuefinder__status-bar__selected-count" }, [e._v(e._s(s.app.dragSelect.getCount() > 0 ? s.t("%s item(s) selected.", s.app.dragSelect.getCount()) : ""))])])]), t("div", { staticClass: "vuefinder__status-bar__actions" }, [s.app.selectButton.active ? t("button", { staticClass: "vf-btn py-0 vf-btn-primary", class: { disabled: !s.isSelectButtonActive }, attrs: { disabled: !s.isSelectButtonActive }, on: { click: function(r) {
    s.app.selectButton.click(s.ds.getSelected(), r);
  } } }, [e._v(e._s(s.t("Select")))]) : e._e(), t("span", { staticClass: "vuefinder__status-bar__about", attrs: { title: s.t("About") }, on: { click: function(r) {
    return s.app.modal.open(s.ModalAbout);
  } } }, [t(s.AboutSVG)], 1)])]);
}, fl = [], pl = /* @__PURE__ */ W(
  _l,
  vl,
  fl
);
const ml = pl.exports;
var hl = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "1.5", viewBox: "0 0 24 24" } }, [t("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" } })]);
};
const hr = { render: hl };
var gl = function() {
  var e = this, t = e._self._c;
  return t("svg", { staticClass: "h-5 w-5", attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 24 24" } }, [t("path", { attrs: { fill: "none", d: "M0 0h24v24H0z" } }), t("path", { attrs: { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" } })]);
};
const bl = { render: gl };
var wl = function() {
  var e = this, t = e._self._c;
  return t("svg", { attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", viewBox: "0 0 24 24" } }, [t("path", { attrs: { stroke: "none", d: "M0 0h24v24H0z" } }), t("path", { attrs: { d: "M15 12H9M12 9v6" } })]);
};
const gr = { render: wl };
var yl = function() {
  var e = this, t = e._self._c;
  return t("svg", { attrs: { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", viewBox: "0 0 24 24" } }, [t("path", { attrs: { stroke: "none", d: "M0 0h24v24H0z" } }), t("path", { attrs: { d: "M9 12h6" } })]);
};
const br = { render: yl };
function wr(n, e) {
  const t = n.findIndex((s) => s.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const Cl = {
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    },
    value: {
      type: Boolean,
      default: !1
    }
  },
  components: {
    SquarePlusSVG: gr,
    SquareMinusSVG: br,
    LoadingSVG: Ls
  },
  model: {
    prop: "value",
    event: "input"
  },
  setup(n, { emit: e }) {
    const t = X("ServiceContainer");
    t.i18n;
    const s = Ie({
      get: () => n.value,
      set: (i) => e("input", i)
    }), r = x(!1);
    ye(
      () => s.value,
      () => {
        var i;
        (i = o()) != null && i.folders.length || c();
      }
    );
    const a = () => {
      s.value = !s.value;
    }, o = () => t.treeViewData.find((i) => i.path === n.path), c = () => {
      r.value = !0, t.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: n.adapter,
          path: n.path
        }
      }).then((i) => {
        wr(t.treeViewData, { path: n.path, ...i });
      }).catch((i) => {
        console.log(i);
      }).finally(() => {
        r.value = !1;
      });
    };
    return {
      opened: s,
      loading: r,
      getLoadedFolder: o,
      toggleIndicator: a
    };
  }
};
var Sl = function() {
  var s;
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vuefinder__folder-loader-indicator", on: { click: function(r) {
    e.opened = !e.opened;
  } } }, [e.loading ? t("LoadingSVG", { staticClass: "vuefinder__folder-loader-indicator--loading" }) : t("div", { staticClass: "vuefinder__folder-loader-indicator--icon" }, [e.opened && ((s = e.getLoadedFolder()) != null && s.folders.length) ? t("SquareMinusSVG", { staticClass: "vuefinder__folder-loader-indicator--minus" }) : e._e(), e.opened ? e._e() : t("SquarePlusSVG", { staticClass: "vuefinder__folder-loader-indicator--plus" })], 1)], 1);
}, xl = [], kl = /* @__PURE__ */ W(
  Cl,
  Sl,
  xl
);
const yr = kl.exports, El = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = X("ServiceContainer"), s = Xe({}), r = x(null);
    ve(() => {
      e.path === e.adapter + "://" && Fe(r.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const a = Ie(() => {
      var o;
      return ((o = t.treeViewData.find((c) => c.path === e.path)) == null ? void 0 : o.folders) || [];
    });
    return { __sfc: !0, app: t, showSubFolders: s, props: e, parentSubfolderList: r, treeSubFolders: a, FolderSVG: jt, OpenFolderSVG: hr, FolderLoaderIndicator: yr };
  }
};
var $l = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("ul", { ref: "parentSubfolderList", staticClass: "vuefinder__treesubfolderlist__container" }, e._l(s.treeSubFolders, function(r, a) {
    return t("li", { key: r.path, staticClass: "vuefinder__treesubfolderlist__item" }, [t("div", { staticClass: "vuefinder__treesubfolderlist__item-content" }, [t("div", { staticClass: "vuefinder__treesubfolderlist__item-toggle" }, [t(s.FolderLoaderIndicator, { attrs: { adapter: e.adapter, path: r.path }, model: { value: s.showSubFolders[r.path], callback: function(o) {
      e.$set(s.showSubFolders, r.path, o);
    }, expression: "showSubFolders[item.path]" } })], 1), t("div", { staticClass: "vuefinder__treesubfolderlist__item-link", attrs: { title: r.path }, on: { click: function(o) {
      return s.app.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.props.adapter, path: r.path }
      });
    } } }, [t("div", { staticClass: "vuefinder__treesubfolderlist__item-icon" }, [s.app.fs.path === r.path ? t(s.OpenFolderSVG) : t(s.FolderSVG)], 1), t("div", { staticClass: "vuefinder__treesubfolderlist__item-text", class: {
      "vuefinder__treesubfolderlist__item-text--active": s.app.fs.path === r.path
    } }, [e._v(" " + e._s(r.basename) + " ")])])]), t("div", { staticClass: "vuefinder__treesubfolderlist__subfolder" }, [t("TreeSubfolderList", { directives: [{ name: "show", rawName: "v-show", value: s.showSubFolders[r.path], expression: "showSubFolders[item.path]" }], attrs: { adapter: s.props.adapter, path: r.path } })], 1)]);
  }), 0);
}, Al = [], Ml = /* @__PURE__ */ W(
  El,
  $l,
  Al
);
const Tl = Ml.exports, Fl = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = n, t = X("ServiceContainer"), s = x(!1);
    return { __sfc: !0, app: t, showSubFolders: s, props: e, StorageSVG: mr, FolderLoaderIndicator: yr, TreeSubfolderList: Tl };
  }
};
var Vl = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", [t("div", { staticClass: "vuefinder__treestorageitem__header", on: { click: function(r) {
    s.showSubFolders = !s.showSubFolders;
  } } }, [t("div", { staticClass: "vuefinder__treestorageitem__info", class: e.storage === s.app.fs.adapter ? "vuefinder__treestorageitem__info--active" : "" }, [t("div", { staticClass: "vuefinder__treestorageitem__icon", class: e.storage === s.app.fs.adapter ? "vuefinder__treestorageitem__icon--active" : "" }, [t(s.StorageSVG)], 1), t("div", [e._v(e._s(e.storage))])]), t("div", { staticClass: "vuefinder__treestorageitem__loader" }, [t(s.FolderLoaderIndicator, { attrs: { adapter: e.storage, path: e.storage + "://" }, model: { value: s.showSubFolders, callback: function(r) {
    s.showSubFolders = r;
  }, expression: "showSubFolders" } })], 1)]), s.showSubFolders ? t(s.TreeSubfolderList, { staticClass: "vuefinder__treestorageitem__subfolder", attrs: { adapter: e.storage, path: e.storage + "://" } }) : e._e()], 1);
}, Dl = [], Ol = /* @__PURE__ */ W(
  Fl,
  Vl,
  Dl
);
const Ll = Ol.exports, Rl = {
  name: "FolderIndicator",
  components: {
    SquarePlusSVG: gr,
    SquareMinusSVG: br
  },
  props: {
    value: {
      type: Boolean,
      required: !0
    }
  },
  methods: {
    updateValue(n) {
      this.$emit("input", n);
    }
  }
};
var Il = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vuefinder__folder-indicator" }, [t("div", { staticClass: "vuefinder__folder-indicator--icon" }, [e.value ? t("SquareMinusSVG", { staticClass: "vuefinder__folder-indicator--minus" }) : e._e(), e.value ? e._e() : t("SquarePlusSVG", { staticClass: "vuefinder__folder-indicator--plus" })], 1)]);
}, Bl = [], Pl = /* @__PURE__ */ W(
  Rl,
  Il,
  Bl
);
const Nl = Pl.exports, Hl = {
  __name: "TreeView",
  setup(n) {
    const e = X("ServiceContainer"), { t } = e.i18n, { getStore: s, setStore: r } = e.storage, a = x(190), o = x(s("pinned-folders-opened", !0));
    ye(o, (u) => r("pinned-folders-opened", u));
    const c = (u) => {
      e.pinnedFolders = e.pinnedFolders.filter((l) => l.path !== u.path), e.requester.unpinFolder(u), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (u) => {
      const l = u.clientX, v = u.target.parentElement, p = v.getBoundingClientRect().width;
      v.classList.remove("transition-[width]"), v.classList.add("transition-none");
      const _ = (f) => {
        a.value = p + f.clientX - l, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, m = () => {
        const f = v.getBoundingClientRect();
        a.value = f.width, v.classList.add("transition-[width]"), v.classList.remove("transition-none"), window.removeEventListener("mousemove", _), window.removeEventListener("mouseup", m);
      };
      window.addEventListener("mousemove", _), window.addEventListener("mouseup", m);
    }, d = x(null);
    return ve(() => {
      Fe(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), ye(e.fs.data, (u, l) => {
      const v = u.files.filter((p) => p.type === "dir");
      wr(e.treeViewData, {
        path: e.fs.path,
        folders: v.map((p) => ({
          adapter: p.storage,
          path: p.path,
          basename: p.basename
        }))
      });
    }), { __sfc: !0, app: e, t, getStore: s, setStore: r, treeViewWidth: a, pinnedFoldersOpened: o, removeFavorite: c, handleMouseDown: i, treeViewScrollElement: d, FolderSVG: jt, OpenFolderSVG: hr, PinSVG: pr, XBoxSVG: bl, TreeStorageItem: Ll, FolderIndicator: Nl };
  }
};
var Ul = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return s.app.showTreeView ? t("div", { staticClass: "vuefinder__treeview__container", style: s.app.showTreeView ? "min-width:100px;max-width:75%; width: " + s.treeViewWidth + "px" : "width: 0" }, [t("div", { ref: "treeViewScrollElement", staticClass: "vuefinder__treeview__scroll" }, [t("div", { staticClass: "vuefinder__treeview__header" }, [t("div", { staticClass: "vuefinder__treeview__pinned-toggle", on: { click: function(r) {
    s.pinnedFoldersOpened = !s.pinnedFoldersOpened;
  } } }, [t("div", { staticClass: "vuefinder__treeview__pinned-label" }, [t(s.PinSVG, { staticClass: "vuefinder__treeview__pin-icon" }), t("div", { staticClass: "vuefinder__treeview__pin-text text-nowrap" }, [e._v(" " + e._s(s.t("Pinned Folders")) + " ")])], 1), t(s.FolderIndicator, { model: { value: s.pinnedFoldersOpened, callback: function(r) {
    s.pinnedFoldersOpened = r;
  }, expression: "pinnedFoldersOpened" } })], 1), s.pinnedFoldersOpened ? t("ul", { staticClass: "vuefinder__treeview__pinned-list" }, [e._l(s.app.pinnedFolders, function(r) {
    return t("li", { staticClass: "vuefinder__treeview__pinned-item" }, [t("div", { staticClass: "vuefinder__treeview__pinned-folder", on: { click: function(a) {
      return s.app.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: r.storage,
          path: r.path
        }
      });
    } } }, [s.app.fs.path !== r.path ? t(s.FolderSVG, { staticClass: "vuefinder__treeview__folder-icon" }) : e._e(), s.app.fs.path === r.path ? t(s.OpenFolderSVG, { staticClass: "vuefinder__treeview__open-folder-icon" }) : e._e(), t("div", { staticClass: "vuefinder__treeview__folder-name text-nowrap", class: {
      "vuefinder__treeview__folder-name--active": s.app.fs.path === r.path
    }, attrs: { title: r.path } }, [e._v(" " + e._s(r.basename) + " ")])], 1), t("div", { staticClass: "vuefinder__treeview__remove-favorite", on: { click: function(a) {
      return s.removeFavorite(r);
    } } }, [t(s.XBoxSVG, { staticClass: "vuefinder__treeview__remove-icon" })], 1)]);
  }), s.app.pinnedFolders.length ? e._e() : t("li", [t("div", { staticClass: "vuefinder__treeview__no-pinned" }, [e._v(" " + e._s(s.t("No folders pinned")) + " ")])])], 2) : e._e()]), t("div", { staticStyle: { display: "flex", "flex-direction": "column" } }, e._l(s.app.fs.data.storages, function(r) {
    return t("div", { staticClass: "vuefinder__treeview__storage" }, [t(s.TreeStorageItem, { attrs: { storage: r } })], 1);
  }), 0)]), t("div", { staticClass: "vuefinder__treeview__resize-handle", class: (s.app.showTreeView, ""), on: { mousedown: s.handleMouseDown } })]) : t("div", { staticClass: "vuefinder__treeview__overlay", class: s.app.showTreeView ? "vuefinder__treeview__backdrop" : "hidden", on: { click: function(r) {
    s.app.showTreeView = !s.app.showTreeView;
  } } });
}, Gl = [], ql = /* @__PURE__ */ W(
  Hl,
  Ul,
  Gl
);
const zl = ql.exports, jl = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: () => []
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(n) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...n
        };
      }
    }
  },
  emits: ["select"],
  setup(n, { emit: e }) {
    const t = n, { proxy: s } = ln(), r = Xa(t, s.$VueFinderOptions);
    Fr("ServiceContainer", r);
    const { setStore: a } = r.storage, o = x(null);
    r.root = o;
    const c = r.dragSelect;
    Vo(r);
    const i = (u) => {
      Object.assign(r.fs.data, u), c.clearSelection(), c.refreshSelection();
    };
    let d;
    return r.emitter.on("vf-fetch-abort", () => {
      d.abort(), r.fs.loading = !1;
    }), r.emitter.on(
      "vf-fetch",
      ({
        params: u,
        body: l = null,
        onSuccess: v = null,
        onError: p = null,
        noCloseModal: _ = !1
      }) => {
        ["index", "search"].includes(u.q) && (d && d.abort(), r.fs.loading = !0), d = new AbortController();
        const m = d.signal;
        r.requester.send({
          url: "",
          method: u.m || "get",
          params: u,
          body: l,
          abortSignal: m
        }).then((f) => {
          r.fs.adapter = f.adapter, r.persist && (r.fs.path = f.dirname, a("path", r.fs.path)), ["index", "search"].includes(u.q) && (r.fs.loading = !1), _ || r.modal.close(), i(f), v && v(f);
        }).catch((f) => {
          console.error(f), p && p(f);
        });
      }
    ), ve(() => {
      let u = {};
      r.fs.path.includes("://") && (u = {
        adapter: r.fs.path.split("://")[0],
        path: r.fs.path
      }), r.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: r.fs.adapter, ...u }
      }), c.onSelect((l) => {
        e("select", l);
      });
    }), { __sfc: !0, emit: e, props: t, proxy: s, app: r, setStore: a, root: o, ds: c, updateItems: i, controller: d, Toolbar: bi, Breadcrumb: Ki, Explorer: nl, ContextMenu: cl, Statusbar: ml, TreeView: zl };
  }
};
var Wl = function() {
  var e = this, t = e._self._c, s = e._self._setupProxy;
  return t("div", { ref: "root", staticClass: "vuefinder", attrs: { tabindex: "0" } }, [t("div", { class: s.app.theme.actualValue }, [t("div", { staticClass: "vuefinder__main__container", class: s.app.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", style: s.app.fullScreen ? "" : "max-height: " + e.maxHeight, on: { mousedown: function(r) {
    return s.app.emitter.emit("vf-contextmenu-hide");
  }, touchstart: function(r) {
    return s.app.emitter.emit("vf-contextmenu-hide");
  } } }, [t(s.Toolbar), t(s.Breadcrumb), t("div", { staticClass: "vuefinder__main__content" }, [t(s.TreeView), t(s.Explorer)], 1), t(s.Statusbar)], 1), t("Transition", { attrs: { name: "fade" } }, [s.app.modal.visible ? t(s.app.modal.type, { tag: "Component" }) : e._e()], 1), t(s.ContextMenu)], 1)]);
}, Kl = [], Yl = /* @__PURE__ */ W(
  jl,
  Wl,
  Kl
);
const Ql = Yl.exports, od = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.prototype.$VueFinderOptions = e, n.component("VueFinder", Ql);
  }
};
export {
  Ql as VueFinder,
  od as default
};
