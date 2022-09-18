import { ref as I, watch as At, openBlock as _, createElementBlock as C, createElementVNode as d, unref as R, normalizeClass as de, toDisplayString as V, createCommentVNode as re, createTextVNode as Me, createVNode as me, TransitionGroup as Mi, withCtx as G, Fragment as ie, renderList as he, reactive as ut, onMounted as ye, withDirectives as pe, vShow as ot, normalizeStyle as Sr, withModifiers as Te, nextTick as ft, vModelSelect as $i, customRef as Ei, withKeys as Ke, isRef as Ti, vModelText as Ue, provide as ir, createBlock as ne, resolveDynamicComponent as Ai, renderSlot as nr } from "vue";
import bt from "plupload";
const dt = (o, { method: e = "get", params: t = {}, json: n = !0 }) => {
  const s = { method: e };
  if (e == "get")
    o += "?" + new URLSearchParams(t);
  else {
    s.headers = {};
    let i = new FormData();
    for (const [c, h] of Object.entries(t))
      i.append(c, h);
    s.body = i;
  }
  return fetch(o, s).then((i) => i.ok ? n ? i.json() : i.text() : Promise.reject(i));
};
function Pi(o) {
  return { all: o = o || /* @__PURE__ */ new Map(), on: function(e, t) {
    var n = o.get(e);
    n ? n.push(t) : o.set(e, [t]);
  }, off: function(e, t) {
    var n = o.get(e);
    n && (t ? n.splice(n.indexOf(t) >>> 0, 1) : o.set(e, []));
  }, emit: function(e, t) {
    var n = o.get(e);
    n && n.slice().map(function(s) {
      s(t);
    }), (n = o.get("*")) && n.slice().map(function(s) {
      s(e, t);
    });
  } };
}
function or(o) {
  let e = localStorage.getItem(o + "_storage");
  const t = I(JSON.parse(e));
  At(t, n);
  function n() {
    t.value === null || t.value === "" ? localStorage.removeItem(o + "_storage") : localStorage.setItem(o + "_storage", JSON.stringify(t.value));
  }
  function s(h, p) {
    t.value = Object.assign({ ...t.value }, { [h]: p });
  }
  function i() {
    t.value = null;
  }
  return { getStore: (h, p = null) => t.value === null || t.value === "" ? p : t.value.hasOwnProperty(h) ? t.value[h] : p, setStore: s, clearStore: i };
}
const ar = I("");
function _e() {
  function o(e) {
    ar.value = e;
  }
  return { apiUrl: ar, setApiUrl: o };
}
const Oi = { class: "border-neutral-300 flex justify-between items-center py-1 text-sm" }, ji = {
  key: 0,
  class: "flex text-center"
}, Ii = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
  })
], -1), Ni = [
  Ii
], Li = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
  })
], -1), Vi = [
  Li
], zi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
}, null, -1), Bi = [
  zi
], Ri = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
}, null, -1), Hi = [
  Ri
], Ki = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
  })
], -1), Ui = [
  Ki
], Yi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Wi = [
  Yi
], Xi = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
}, null, -1), Fi = [
  Xi
], qi = {
  key: 1,
  class: "flex text-center"
}, Gi = { class: "pl-2" }, Ji = /* @__PURE__ */ Me(" Search results for "), Zi = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Qi = { class: "flex text-center items-center justify-end" }, en = {
  class: "mx-1.5",
  "aria-label": "Dark Mode",
  "data-microtip-position": "bottom",
  role: "tooltip"
}, tn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
}, null, -1), rn = [
  tn
], nn = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "none",
  "stroke-width": "1.5"
}, on = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
}, an = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
}, sn = {
  key: 0,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
}, ln = {
  key: 1,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
}, cn = {
  name: "VFToolbar"
}, un = /* @__PURE__ */ Object.assign(cn, {
  props: {
    data: Object
  },
  setup(o) {
    const e = inject("emitter"), { getStore: t, setStore: n } = inject("storage"), s = I(t("viewport", "grid")), i = I([]), c = I(t("full-screen", !1)), h = I("");
    e.on("vf-search-query", ({ newQuery: v }) => {
      h.value = v;
    });
    const p = () => {
      c.value = !c.value, e.emit("vf-fullscreen-toggle");
    };
    return e.on("vf-nodes-selected", (v) => {
      i.value = v;
    }), e.on("vf-view-toggle", (v) => {
      n("viewport", v), s.value = v;
    }), (v, f) => (_(), C("div", Oi, [
      h.value.length ? (_(), C("div", qi, [
        d("div", Gi, [
          Ji,
          d("span", Zi, V(h.value), 1)
        ])
      ])) : (_(), C("div", ji, [
        d("div", {
          class: "mx-1.5",
          "aria-label": "New Folder",
          "data-microtip-position": "bottom-right",
          role: "tooltip",
          onClick: f[0] || (f[0] = (g) => R(e).emit("vf-modal-show", { type: "new-folder", items: i.value }))
        }, Ni),
        d("div", {
          class: "mx-1.5",
          "aria-label": "New File",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[1] || (f[1] = (g) => R(e).emit("vf-modal-show", { type: "new-file", items: i.value }))
        }, Vi),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Rename",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[2] || (f[2] = (g) => i.value.length != 1 || R(e).emit("vf-modal-show", { type: "rename", items: i.value }))
        }, [
          (_(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length == 1 ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Bi, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Delete",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[3] || (f[3] = (g) => !i.value.length || R(e).emit("vf-modal-show", { type: "delete", items: i.value }))
        }, [
          (_(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Hi, 2))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Upload",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[4] || (f[4] = (g) => R(e).emit("vf-modal-show", { type: "upload", items: i.value }))
        }, Ui),
        i.value.length == 1 && i.value[0].mime_type == "application/zip" ? (_(), C("div", {
          key: 0,
          class: "mx-1.5",
          "aria-label": "Unrchive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[5] || (f[5] = (g) => !i.value.length || R(e).emit("vf-modal-show", { type: "unarchive", items: i.value }))
        }, [
          (_(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Wi, 2))
        ])) : (_(), C("div", {
          key: 1,
          class: "mx-1.5",
          "aria-label": "Archive",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: f[6] || (f[6] = (g) => !i.value.length || R(e).emit("vf-modal-show", { type: "archive", items: i.value }))
        }, [
          (_(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([i.value.length ? "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100" : "stroke-gray-200  dark:stroke-gray-600", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, Fi, 2))
        ]))
      ])),
      d("div", Qi, [
        d("div", en, [
          (_(), C("svg", {
            onClick: f[7] || (f[7] = (g) => R(e).emit("vf-darkMode-toggle")),
            viewBox: "0 0 24 24",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "h-6 w-6 m-auto cursor-pointer stroke-sky-500 fill-sky-100 hover:stroke-sky-600 dark:stroke-gray-400 dark:fill-gray-400/20 dark:hover:stroke-gray-300"
          }, rn))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Toggle Full Screen",
          "data-microtip-position": "bottom",
          role: "tooltip",
          onClick: p
        }, [
          (_(), C("svg", nn, [
            c.value ? (_(), C("path", on)) : (_(), C("path", an))
          ]))
        ]),
        d("div", {
          class: "mx-1.5",
          "aria-label": "Change View",
          "data-microtip-position": "bottom-left",
          role: "tooltip",
          onClick: f[8] || (f[8] = (g) => h.value.length || R(e).emit("vf-view-toggle", s.value == "list" ? "grid" : "list"))
        }, [
          (_(), C("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            class: de([h.value.length ? "stroke-gray-200  dark:stroke-gray-600" : "cursor-pointer stroke-gray-800 hover:stroke-cyan-700 dark:stroke-gray-300 dark:hover:stroke-gray-100", "h-6 w-6 md:h-8 md:w-8 m-auto"]),
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "none",
            "stroke-width": "1.5"
          }, [
            s.value == "grid" ? (_(), C("path", sn)) : re("", !0),
            s.value == "list" ? (_(), C("path", ln)) : re("", !0)
          ], 2))
        ])
      ])
    ]));
  }
});
var dn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, kr = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(dn, function() {
    function t(u, a) {
      if (!(u instanceof a))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(u, a) {
      for (var r = 0; r < a.length; r++) {
        var m = a[r];
        m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(u, m.key, m);
      }
    }
    function s(u, a, r) {
      return a && n(u.prototype, a), r && n(u, r), u;
    }
    function i(u, a, r) {
      return a in u ? Object.defineProperty(u, a, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : u[a] = r, u;
    }
    function c(u, a) {
      var r = Object.keys(u);
      if (Object.getOwnPropertySymbols) {
        var m = Object.getOwnPropertySymbols(u);
        a && (m = m.filter(function(l) {
          return Object.getOwnPropertyDescriptor(u, l).enumerable;
        })), r.push.apply(r, m);
      }
      return r;
    }
    function h(u) {
      for (var a = 1; a < arguments.length; a++) {
        var r = arguments[a] != null ? arguments[a] : {};
        a % 2 ? c(Object(r), !0).forEach(function(m) {
          i(u, m, r[m]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(u, Object.getOwnPropertyDescriptors(r)) : c(Object(r)).forEach(function(m) {
          Object.defineProperty(u, m, Object.getOwnPropertyDescriptor(r, m));
        });
      }
      return u;
    }
    function p(u, a) {
      if (typeof a != "function" && a !== null)
        throw new TypeError("Super expression must either be null or a function");
      u.prototype = Object.create(a && a.prototype, {
        constructor: {
          value: u,
          writable: !0,
          configurable: !0
        }
      }), a && f(u, a);
    }
    function v(u) {
      return v = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
        return r.__proto__ || Object.getPrototypeOf(r);
      }, v(u);
    }
    function f(u, a) {
      return f = Object.setPrototypeOf || function(m, l) {
        return m.__proto__ = l, m;
      }, f(u, a);
    }
    function g() {
      if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
        return !1;
      if (typeof Proxy == "function")
        return !0;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        })), !0;
      } catch {
        return !1;
      }
    }
    function b(u, a, r) {
      return g() ? b = Reflect.construct : b = function(l, w, x) {
        var S = [null];
        S.push.apply(S, w);
        var k = Function.bind.apply(l, S), T = new k();
        return x && f(T, x.prototype), T;
      }, b.apply(null, arguments);
    }
    function A(u) {
      return Function.toString.call(u).indexOf("[native code]") !== -1;
    }
    function D(u) {
      var a = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
      return D = function(m) {
        if (m === null || !A(m))
          return m;
        if (typeof m != "function")
          throw new TypeError("Super expression must either be null or a function");
        if (typeof a < "u") {
          if (a.has(m))
            return a.get(m);
          a.set(m, l);
        }
        function l() {
          return b(m, arguments, v(this).constructor);
        }
        return l.prototype = Object.create(m.prototype, {
          constructor: {
            value: l,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), f(l, m);
      }, D(u);
    }
    function E(u) {
      if (u === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return u;
    }
    function P(u, a) {
      return a && (typeof a == "object" || typeof a == "function") ? a : E(u);
    }
    function N(u) {
      var a = g();
      return function() {
        var m = v(u), l;
        if (a) {
          var w = v(this).constructor;
          l = Reflect.construct(m, arguments, w);
        } else
          l = m.apply(this, arguments);
        return P(this, l);
      };
    }
    function K(u, a) {
      for (; !Object.prototype.hasOwnProperty.call(u, a) && (u = v(u), u !== null); )
        ;
      return u;
    }
    function H(u, a, r) {
      return typeof Reflect < "u" && Reflect.get ? H = Reflect.get : H = function(l, w, x) {
        var S = K(l, w);
        if (!!S) {
          var k = Object.getOwnPropertyDescriptor(S, w);
          return k.get ? k.get.call(x) : k.value;
        }
      }, H(u, a, r || u);
    }
    function ae(u, a) {
      return O(u) || U(u, a) || B(u, a) || ge();
    }
    function J(u) {
      return y(u) || $(u) || B(u) || oe();
    }
    function y(u) {
      if (Array.isArray(u))
        return ee(u);
    }
    function O(u) {
      if (Array.isArray(u))
        return u;
    }
    function $(u) {
      if (typeof Symbol < "u" && Symbol.iterator in Object(u))
        return Array.from(u);
    }
    function U(u, a) {
      if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(u)))) {
        var r = [], m = !0, l = !1, w = void 0;
        try {
          for (var x = u[Symbol.iterator](), S; !(m = (S = x.next()).done) && (r.push(S.value), !(a && r.length === a)); m = !0)
            ;
        } catch (k) {
          l = !0, w = k;
        } finally {
          try {
            !m && x.return != null && x.return();
          } finally {
            if (l)
              throw w;
          }
        }
        return r;
      }
    }
    function B(u, a) {
      if (!!u) {
        if (typeof u == "string")
          return ee(u, a);
        var r = Object.prototype.toString.call(u).slice(8, -1);
        if (r === "Object" && u.constructor && (r = u.constructor.name), r === "Map" || r === "Set")
          return Array.from(u);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return ee(u, a);
      }
    }
    function ee(u, a) {
      (a == null || a > u.length) && (a = u.length);
      for (var r = 0, m = new Array(a); r < a; r++)
        m[r] = u[r];
      return m;
    }
    function oe() {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function ge() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var Y = function(a, r, m) {
      var l = a.x, w = a.y, x = m.x, S = m.y, k = {
        "+": {
          x: l + x,
          y: w + S
        },
        "-": {
          x: l - x,
          y: w - S
        },
        "*": {
          x: l * x,
          y: w * S
        },
        "/": {
          x: l / x,
          y: w / S
        }
      };
      return k[r];
    }, q = function(a) {
      return {
        x: a.left,
        y: a.top
      };
    }, ve = function(a) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return {
        left: a.x,
        top: a.y,
        right: a.x,
        bottom: a.y,
        width: r,
        height: r
      };
    }, Oe = function(a) {
      return {
        x: a,
        y: a
      };
    }, Ye = function(u, a, r) {
      window.addEventListener("resize", a), window.addEventListener("scroll", a), u.forEach(function(m, l) {
        r.observe(m, {
          childList: l !== 0,
          attributes: !0
        });
      });
    }, We = function(u) {
      var a = Ie(u);
      return a.x || a.y ? !0 : u instanceof HTMLDocument ? u.body ? !!(u.body.scrollTop = 1) : !!(u.documentElement.scrollTop = 1) : !!(u.scrollTop = 1);
    }, tt = function(u) {
      var a = document.createElement("div");
      return a.style.position = "fixed", a.style.overflow = "hidden", a.style.pointerEvents = "none", a.style.zIndex = "999999999999999999", a.classList.add(u), a;
    }, rt = function(u) {
      var a = document.createElement("div");
      return a.style.position = "absolute", u || (a.style.background = "rgba(0, 0, 255, 0.1)", a.style.border = "1px solid rgba(0, 0, 255, 0.45)", a.style.display = "none", a.style.pointerEvents = "none"), a;
    }, it = function(u, a) {
      var r;
      return function() {
        for (var m = arguments.length, l = new Array(m), w = 0; w < m; w++)
          l[w] = arguments[w];
        var x = function() {
          r = null, u.apply(void 0, l);
        };
        clearTimeout(r), r = setTimeout(x, a);
      };
    }, je = function() {
      var u, a, r, m;
      return {
        y: ((u = document.body) === null || u === void 0 ? void 0 : u.scrollTop) || ((a = document.documentElement) === null || a === void 0 ? void 0 : a.scrollTop) || 0,
        x: ((r = document.body) === null || r === void 0 ? void 0 : r.scrollLeft) || ((m = document.documentElement) === null || m === void 0 ? void 0 : m.scrollLeft) || 0
      };
    }, pt = function(u, a) {
      if (u instanceof Document)
        return {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      var r = u.getBoundingClientRect();
      return {
        top: r.top,
        left: r.left,
        bottom: r.bottom,
        right: r.right,
        width: (u.clientWidth || r.width) * a,
        height: (u.clientHeight || r.height) * a
      };
    }, Ie = function(u) {
      return !u || u instanceof Document ? je() : {
        x: u.scrollLeft >= 0 ? u.scrollLeft : je().x,
        y: u.scrollTop >= 0 ? u.scrollTop : je().y
      };
    }, Lt = function(u) {
      var a = u.elementRect, r = u.containerRect, m = u.tolerance, l = m === void 0 ? {
        x: 0,
        y: 0
      } : m, w = [];
      return a.top - l.y < r.top && w.push("top"), a.left - l.x < r.left && w.push("left"), a.bottom + l.y > r.bottom && w.push("bottom"), a.right + l.y > r.right && w.push("right"), w;
    }, Br = function(u) {
      var a = u.event;
      return {
        x: a.clientX,
        y: a.clientY
      };
    }, Rr = function(u) {
      var a = u.scrollAmount, r = u.initialPointerPos, m = u.pointerPos, l = {};
      return m.x > r.x - a.x ? (l.left = r.x - a.x, l.width = m.x - r.x + a.x) : (l.left = m.x, l.width = r.x - m.x - a.x), m.y > r.y - a.y ? (l.top = r.y - a.y, l.height = m.y - r.y + a.y) : (l.top = m.y, l.height = r.y - m.y - a.y), l;
    }, Vt = function(a) {
      var r = {
        x: 0,
        y: 0
      }, m = window.getComputedStyle(a);
      if (!m.transform || m.transform === "none")
        return r;
      if (m.transform.indexOf("3d") >= 0) {
        var l = m.transform.trim().match(/matrix3d\((.*?)\)/);
        if (l && l.length) {
          var w, x = (w = l[1]) === null || w === void 0 ? void 0 : w.split(",");
          r.x = parseInt(x[12]) || 0, r.y = parseInt(x[13]) || 0;
        }
        return r;
      } else {
        var S = m.transform.trim().match(/matrix\((.*?)\)/);
        if (S && S.length) {
          var k, T = (k = S[1]) === null || k === void 0 ? void 0 : k.split(",");
          r.x = parseInt(T[4]) || 0, r.y = parseInt(T[5]) || 0;
        }
        return r;
      }
    }, Hr = function(a) {
      var r = a.style.transform;
      if (!r || r.indexOf("translate") < 0)
        return Vt(a);
      var m = {
        x: 0,
        y: 0
      }, l = r.trim().match(/translate[3dD]*?\(.*?\)/);
      if (l) {
        var w, x = (w = l[0]) === null || w === void 0 ? void 0 : w.split("(");
        if (x) {
          var S, k = (S = x[1]) === null || S === void 0 ? void 0 : S.split(",");
          m.x = parseInt(k[0]) || 0, m.y = parseInt(k[1]) || 0;
        }
      }
      return !m.x && !m.x ? Vt(a) : m;
    }, Kr = function(a) {
      var r = a.style, m = {
        x: parseInt(r.left) || 0,
        y: parseInt(r.top) || 0
      };
      if (!m.x && !m.x) {
        var l = window.getComputedStyle(a);
        return {
          x: parseInt(l.left) || 0,
          y: parseInt(l.top) || 0
        };
      }
      return m;
    }, Ur = function(u, a) {
      return a ? Hr(u) : Kr(u);
    }, Yr = function(u) {
      var a = u.element, r = u.edges, m = u.elementRect, l = u.containerRect, w = u.elementPos, x = u.useTransform;
      r.includes("top") && Xe(a, {
        y: w.y + l.top - m.top,
        x: w.x
      }, x), r.includes("left") && Xe(a, {
        y: w.y,
        x: w.x + l.left - m.left
      }, x), r.includes("bottom") && Xe(a, {
        y: w.y + l.bottom - m.bottom,
        x: w.x
      }, x), r.includes("right") && Xe(a, {
        y: w.y,
        x: w.x + l.right - m.right
      }, x);
    }, zt = function(u) {
      var a = u.computedStyle, r = u.node, m = a.position, l = m === "absolute" || m === "relative" || m === "fixed";
      !(r instanceof HTMLDocument) && !l && (r.style.position = "relative");
    }, Wr = function(u) {
      var a = u.shiftKey, r = u.keyboardDragSpeed, m = u.zoom, l = u.key, w = u.dragKeys, x = u.scrollDiff, S = u.canScroll, k = u.scrollCallback, T = {
        x: 0,
        y: 0
      }, M = a ? r * 4 * m : r * m;
      return w.left.includes(l) && (T.x = x.x || -M, !a && !x.x && S && k(["left"], r)), w.right.includes(l) && (T.x = x.x || M, !a && !x.x && S && k(["right"], r)), w.up.includes(l) && (T.y = x.y || -M, !a && !x.y && S && k(["top"], r)), w.down.includes(l) && (T.y = x.y || M, !a && !x.y && S && k(["bottom"], r)), T;
    }, Xr = function(u) {
      var a = u.element, r = u.force, m = u.multiSelectionToggle, l = u.SelectedSet, w = u.hoverClassName;
      a.classList.contains(w) && !r || (l.has(a) ? m && l.delete(a) : l.add(a), a.classList.add(w));
    }, Fr = function(u) {
      var a = u.element, r = u.force, m = u.SelectedSet, l = u.PrevSelectedSet, w = u.hoverClassName;
      if (!a.classList.contains(w) && !r)
        return !1;
      var x = m.has(a), S = l.has(a);
      x && !S ? m.delete(a) : !x && S && m.add(a), a.classList.remove(w);
    }, gt = function(u, a) {
      return u.left < a.right && u.right > a.left && u.top < a.bottom && u.bottom > a.top;
    }, Bt = function(u) {
      var a = u.element, r = u.posDirection, m = u.containerRect, l = u.useTransform, w = Ur(a, l), x = Y(w, "+", r);
      Xe(a, x, l);
      var S = a.getBoundingClientRect(), k = Lt({
        elementRect: S,
        containerRect: m
      });
      Yr({
        element: a,
        edges: k,
        elementRect: S,
        containerRect: m,
        elementPos: x,
        useTransform: l
      });
    }, qr = function(u, a) {
      window.removeEventListener("resize", a), window.removeEventListener("scroll", a), u.disconnect();
    }, Gr = function(u, a, r) {
      if (!!a.length) {
        var m = document && document.documentElement && document.documentElement.scrollTop && document.documentElement, l = u instanceof HTMLDocument ? m || document.body : u, w = a.includes("top") && l.scrollTop > 0, x = a.includes("bottom") && l.scrollTop < l.scrollHeight, S = a.includes("left") && l.scrollLeft > 0, k = a.includes("right") && l.scrollLeft < l.scrollWidth;
        w && (l.scrollTop -= 1 * r), x && (l.scrollTop += 1 * r), S && (l.scrollLeft -= 1 * r), k && (l.scrollLeft += 1 * r);
      }
    }, Xe = function(u, a, r) {
      if (r) {
        var m = u.style.transform;
        u.style.transform = "translate3d(".concat(a.x, "px,").concat(a.y, "px,1px) ").concat(m.replace(/translate.*?\)/g, ""));
      } else
        u.style.left = "".concat(a.x, "px"), u.style.top = "".concat(a.y, "px");
      return u;
    }, Jr = function(u) {
      for (var a = u.subscribe, r = u.publish, m = u.Interaction, l = u.SelectedSet, w = {
        "Selected:added": [{
          name: "elementselect"
        }],
        "Selected:removed": [{
          name: "elementunselect"
        }],
        "Area:scroll": [{
          name: "autoscroll"
        }],
        "Interaction:start": [{
          name: "dragstart"
        }],
        "Interaction:update": [{
          name: "dragmove",
          condition: function(M) {
            return M.event;
          }
        }],
        "Interaction:end": [{
          name: "callback"
        }]
      }, x = function() {
        var M = ae(k[S], 2), j = M[0], L = M[1];
        ["pre", !1].forEach(function(F) {
          return a(F ? "".concat(j, ":").concat(F) : j, function(ce) {
            return L.forEach(function(Z) {
              return (!Z.condition || Z.condition(ce)) && r(F ? "".concat(F).concat(Z.name) : Z.name, h({
                items: l.elements,
                isDragging: m.isDragging
              }, ce));
            });
          });
        });
      }, S = 0, k = Object.entries(w); S < k.length; S++)
        x();
    }, Ne = function(u) {
      return u ? !Array.isArray(u) && (u instanceof HTMLElement || u instanceof SVGElement) ? [u] : J(u) : [];
    }, Rt = function(u, a) {
      u.style.left = "".concat(a.left, "px"), u.style.top = "".concat(a.top, "px"), u.style.width = "".concat(a.width, "px"), u.style.height = "".concat(a.height, "px");
    }, Zr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.area, l = a.PS, w = a.zoom;
        t(this, u), i(this, "_modificationCallback", void 0), i(this, "_modificationObserver", void 0), i(this, "_zoom", void 0), i(this, "_node", void 0), i(this, "_parentNodes", void 0), i(this, "_computedStyle", void 0), i(this, "_computedBorder", void 0), i(this, "_rect", void 0), i(this, "setArea", function(x) {
          r._node = x, zt({
            computedStyle: r.computedStyle,
            node: r._node
          }), setTimeout(function() {
            r.PubSub.publish("Area:modified:pre", {
              item: r
            }), r.reset(), r.PubSub.publish("Area:modified", {
              item: r
            });
          });
        }), i(this, "start", function() {
          Ye(r.parentNodes, r._modificationCallback, r._modificationObserver);
        }), i(this, "reset", function() {
          r._computedStyle = void 0, r._rect = void 0, r._computedBorder = void 0, r._parentNodes = void 0;
        }), i(this, "stop", function() {
          qr(r._modificationObserver, r._modificationCallback), r.reset();
        }), i(this, "scroll", function(x, S) {
          var k = {
            scroll_directions: x,
            scroll_multiplier: S
          };
          r.PubSub.publish("Area:scroll:pre", k), Gr(r._node, x, S), r.PubSub.publish("Area:scroll", k);
        }), this._zoom = w, this.PubSub = l, this.setArea(m), this._modificationCallback = it(function(x) {
          r.PubSub.publish("Area:modified:pre", {
            event: x,
            item: r
          }), r.reset(), r.PubSub.publish("Area:modified", {
            event: x,
            item: r
          });
        }, 60), this._modificationObserver = new MutationObserver(this._modificationCallback), this.PubSub.subscribe("Interaction:init", this.start), this.PubSub.subscribe("Interaction:end", this.reset);
      }
      return s(u, [{
        key: "HTMLNode",
        get: function() {
          return this._node;
        }
      }, {
        key: "computedBorder",
        get: function() {
          return this._computedBorder ? this._computedBorder : {
            top: parseInt(this.computedStyle.borderTopWidth),
            bottom: parseInt(this.computedStyle.borderBottomWidth),
            left: parseInt(this.computedStyle.borderLeftWidth),
            right: parseInt(this.computedStyle.borderRightWidth)
          };
        }
      }, {
        key: "computedStyle",
        get: function() {
          return this._computedStyle ? this._computedStyle : this.HTMLNode instanceof HTMLDocument ? this._computedStyle = window.getComputedStyle(this.HTMLNode.body || this.HTMLNode.documentElement) : this._computedStyle = window.getComputedStyle(this.HTMLNode);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = pt(this.HTMLNode, this._zoom);
        }
      }, {
        key: "parentNodes",
        get: function() {
          if (this._parentNodes)
            return this._parentNodes;
          var r = function m(l) {
            var w, x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, S = (w = l[x]) === null || w === void 0 ? void 0 : w.parentNode;
            return S ? (l.push(S), x++, m(l, x)) : l;
          };
          return this._parentNodes = r([this.HTMLNode]), this._parentNodes;
        }
      }]), u;
    }(), Qr = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.dragKeys, w = a.draggability, x = a.keyboardDrag, S = a.keyboardDragSpeed, k = a.useTransform, T = a.zoom;
        t(this, u), i(this, "_useTransform", void 0), i(this, "_prevCursorPos", void 0), i(this, "_prevScrollPos", void 0), i(this, "_elements", []), i(this, "_draggability", void 0), i(this, "_dragKeys", void 0), i(this, "_dragKeysFlat", void 0), i(this, "_keyboardDrag", void 0), i(this, "_keyboardDragSpeed", void 0), i(this, "_zoom", void 0), i(this, "keyboardDrag", function(M) {
          var j = M.event, L = M.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(L) || !r.DS.SelectedSet.size || !r._draggability || r.DS.continue)) {
            var F = {
              event: j,
              isDragging: !0,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:start:pre", "Interaction:start"], F), r._elements = r.DS.getSelection(), r.handleZIndex(!0);
            var ce = Wr({
              shiftKey: r.DS.stores.KeyStore.currentValues.includes("shift"),
              keyboardDragSpeed: r._keyboardDragSpeed,
              zoom: r._zoom,
              key: L,
              scrollCallback: r.DS.Area.scroll,
              scrollDiff: r._scrollDiff,
              canScroll: r.DS.stores.ScrollStore.canScroll,
              dragKeys: r._dragKeys
            });
            r._elements.forEach(function(Z) {
              return Bt({
                element: Z,
                posDirection: ce,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            }), r.DS.publish(["Interaction:update:pre", "Interaction:update"], F);
          }
        }), i(this, "keyboardEnd", function(M) {
          var j = M.event, L = M.key;
          if (!(!r._keyboardDrag || !r._dragKeysFlat.includes(L) || !r.DS.SelectedSet.size || !r._draggability)) {
            var F = {
              event: j,
              isDragging: r._draggability,
              isDraggingKeyboard: !0
            };
            r.DS.publish(["Interaction:end:pre", "Interaction:end"], F);
          }
        }), i(this, "start", function(M) {
          var j = M.isDragging, L = M.isDraggingKeyboard;
          !j || L || (r._prevCursorPos = null, r._prevScrollPos = null, r._elements = r.DS.getSelection(), r.handleZIndex(!0));
        }), i(this, "stop", function(M) {
          M != null && M.isKeyboard || (r._prevCursorPos = null, r._prevScrollPos = null, r.handleZIndex(!1), r._elements = []);
        }), i(this, "update", function(M) {
          var j = M.isDragging, L = M.isDraggingKeyboard;
          if (!(!j || !r._elements.length || L || r.DS.continue)) {
            var F = Y(r._cursorDiff, "+", r._scrollDiff);
            r._elements.forEach(function(ce) {
              return Bt({
                element: ce,
                posDirection: F,
                containerRect: r.DS.SelectorArea.rect,
                useTransform: r._useTransform
              });
            });
          }
        }), i(this, "handleZIndex", function(M) {
          r._elements.forEach(function(j) {
            return j.style.zIndex = "".concat((parseInt(j.style.zIndex) || 0) + M ? 9999 : -9998);
          });
        }), this.DS = m, this._useTransform = k, this._keyboardDragSpeed = S, this._keyboardDrag = x, this._zoom = T, this._draggability = w, this._dragKeys = {
          up: l.up.map(function(M) {
            return M.toLowerCase();
          }),
          down: l.down.map(function(M) {
            return M.toLowerCase();
          }),
          left: l.left.map(function(M) {
            return M.toLowerCase();
          }),
          right: l.right.map(function(M) {
            return M.toLowerCase();
          })
        }, this._dragKeysFlat = [].concat(J(this._dragKeys.up), J(this._dragKeys.down), J(this._dragKeys.left), J(this._dragKeys.right)), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:end", this.stop), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("KeyStore:down", this.keyboardDrag), this.DS.subscribe("KeyStore:up", this.keyboardEnd);
      }
      return s(u, [{
        key: "_cursorDiff",
        get: function() {
          var r = this.DS.stores.PointerStore.currentVal, m = this._prevCursorPos ? Y(r, "-", this._prevCursorPos) : {
            x: 0,
            y: 0
          };
          return this._prevCursorPos = r, m;
        }
      }, {
        key: "_scrollDiff",
        get: function() {
          var r = this.DS.stores.ScrollStore.currentVal, m = this._prevScrollPos ? Y(r, "-", this._prevScrollPos) : {
            x: 0,
            y: 0
          };
          return this._prevScrollPos = r, m;
        }
      }]), u;
    }(), ei = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.areaElement, w = a.draggability, x = a.immediateDrag, S = a.selectableClass;
        t(this, u), i(this, "_areaElement", void 0), i(this, "_draggability", void 0), i(this, "_immediateDrag", void 0), i(this, "_selectableClass", void 0), i(this, "isInteracting", void 0), i(this, "isDragging", void 0), i(this, "init", function() {
          return r.DS.publish("Interaction:init:pre", {});
        }), i(this, "_init", function() {
          r.stop(), r._areaElement.addEventListener("mousedown", r.start), r._areaElement.addEventListener("touchstart", r.start, {
            passive: !1
          }), r.DS.publish("Interaction:init", {});
        }), i(this, "start", function(k) {
          return r.DS.publish("Interaction:start:pre", {
            event: k,
            isDragging: r.isDragging
          });
        }), i(this, "_start", function(k) {
          k.type === "touchstart" && k.preventDefault(), r._canInteract(k) && (r.isInteracting = !0, r.isDragging = r.isDragEvent(k), r.DS.publish("Interaction:start", {
            event: k,
            isDragging: r.isDragging
          }), document.addEventListener("mouseup", r.reset), document.addEventListener("touchend", r.reset));
        }), i(this, "isDragEvent", function(k) {
          var T = k.target.closest(".".concat(r._selectableClass));
          return !r._draggability || r.DS.stores.KeyStore.isMultiSelectKeyPressed(k) || !T ? !1 : (r._immediateDrag && (r.DS.SelectedSet.size ? r.DS.SelectedSet.has(T) || (r.DS.SelectedSet.clear(), r.DS.SelectedSet.add(
            T
          )) : r.DS.SelectedSet.add(
            T
          )), !!r.DS.SelectedSet.has(T));
        }), i(this, "onClick", function(k) {
          var T = k.event;
          if (!!r._canInteract(T) && !(T.detail > 0)) {
            var M = r.DS, j = M.stores, L = j.PointerStore, F = j.KeyStore, ce = M.SelectableSet, Z = M.SelectedSet;
            L.start(T);
            var Le = T.target;
            !ce.has(Le) || (F.isMultiSelectKeyPressed(T) || Z.clear(), Z.toggle(Le), r.reset());
          }
        }), i(this, "stop", function() {
          r.isInteracting = !1, r.isDragging = !1, r._areaElement.removeEventListener("mousedown", r.start), r._areaElement.removeEventListener("touchstart", r.start, {
            passive: !1
          }), document.removeEventListener("mouseup", r.reset), document.removeEventListener("touchend", r.reset);
        }), i(this, "update", function(k) {
          var T = k.event, M = k.scroll_directions, j = k.scroll_multiplier;
          r.isInteracting && r.DS.publish(["Interaction:update:pre", "Interaction:update"], {
            event: T,
            scroll_directions: M,
            scroll_multiplier: j,
            isDragging: r.isDragging
          });
        }), i(this, "reset", function(k) {
          return r.DS.publish("Interaction:end:pre", {
            event: k,
            isDragging: r.isDragging
          });
        }), i(this, "_reset", function(k) {
          var T = r.isDragging;
          r.stop(), r.init(), r.DS.publish("Interaction:end", {
            event: k,
            isDragging: T
          });
        }), this._areaElement = l, this._draggability = w, this._immediateDrag = x, this._selectableClass = S, this.DS = m, this.DS.subscribe("PointerStore:updated", this.update), this.DS.subscribe("Selectable:click", this.onClick), this.DS.subscribe("Selectable:pointer", function(k) {
          var T = k.event;
          return r.start(T);
        }), this.DS.subscribe("Interaction:start:pre", function(k) {
          var T = k.event;
          return r._start(T);
        }), this.DS.subscribe("Interaction:init:pre", this._init), this.DS.subscribe("Interaction:end:pre", function(k) {
          var T = k.event;
          return r._reset(T);
        }), this.DS.subscribe("Area:scroll", this.update);
      }
      return s(u, [{
        key: "_canInteract",
        value: function(r) {
          var m = r.clientX === 0 && r.clientY === 0 && r.detail === 0 && r.target;
          return !(r.button === 2 || this.isInteracting || r.target && !this.DS.SelectorArea.isInside(
            r.target
          ) || !m && !this.DS.SelectorArea.isClicked(r));
        }
      }]), u;
    }(), ti = function u(a) {
      var r = this, m = a.DS;
      t(this, u), i(this, "subscribers", {}), i(this, "subscribe", function(l, w) {
        return Array.isArray(r.subscribers[l]) || (r.subscribers[l] = []), r.subscribers[l].push(w), r.subscribers[l].length - 1;
      }), i(this, "unsubscribe", function(l, w, x) {
        x >= 0 ? r.subscribers[l].splice(x, 1) : w && (r.subscribers[l] = r.subscribers[l].filter(function(S) {
          return S !== w;
        }));
      }), i(this, "publish", function(l, w) {
        Array.isArray(l) ? l.forEach(function(x) {
          return r._publish(x, w);
        }) : r._publish(l, w);
      }), i(this, "_publish", function(l, w) {
        var x = r.subscribers[l];
        !Array.isArray(x) || (l.includes(":pre") ? r._handlePrePublish(x, w) : r._handlePublish(x, w));
      }), i(this, "_handlePublish", function(l, w) {
        for (var x = 0, S = l.length; x < S; x++) {
          if (r.DS.stopped)
            return;
          l[x](w);
        }
      }), i(this, "_handlePrePublish", function(l, w) {
        for (var x = l.length; x--; ) {
          if (r.DS.stopped)
            return;
          l[x](w);
        }
      }), this.DS = m;
    }, ri = /* @__PURE__ */ function(u) {
      p(r, u);
      var a = N(r);
      function r(m) {
        var l, w = m.elements, x = m.className, S = m.hoverClassName, k = m.draggability, T = m.useTransform, M = m.DS;
        return t(this, r), l = a.call(this), i(E(l), "_initElements", void 0), i(E(l), "_className", void 0), i(E(l), "_hoverClassName", void 0), i(E(l), "_useTransform", void 0), i(E(l), "_draggability", void 0), i(E(l), "init", function() {
          return l._initElements.forEach(function(j) {
            return l.add(j);
          });
        }), i(E(l), "clear", function() {
          return l.forEach(function(j) {
            return l.delete(j);
          });
        }), i(E(l), "_onClick", function(j) {
          return l.DS.publish(["Selectable:click:pre", "Selectable:click"], {
            event: j
          });
        }), i(E(l), "_onPointer", function(j) {
          return l.DS.publish(["Selectable:pointer:pre", "Selectable:pointer"], {
            event: j
          });
        }), i(E(l), "addAll", function(j) {
          return j.forEach(function(L) {
            return l.add(L);
          });
        }), i(E(l), "deleteAll", function(j) {
          return j.forEach(function(L) {
            return l.delete(L);
          });
        }), l.DS = M, l._initElements = Ne(w), l._className = x, l._hoverClassName = S, l._useTransform = T, l._draggability = k, l.DS.subscribe("Interaction:init", l.init), l;
      }
      return s(r, [{
        key: "add",
        value: function(l) {
          return l.classList.add(this._className), l.addEventListener("click", this._onClick), l.addEventListener("mousedown", this._onPointer), l.addEventListener("touchstart", this._onPointer, {
            passive: !1
          }), this._draggability && !this._useTransform && zt({
            computedStyle: window.getComputedStyle(l),
            node: l
          }), H(v(r.prototype), "add", this).call(this, l);
        }
      }, {
        key: "delete",
        value: function(l) {
          return l.classList.remove(this._className), l.classList.remove(this._hoverClassName), l.removeEventListener("click", this._onClick), l.removeEventListener("mousedown", this._onPointer), l.removeEventListener("touchstart", this._onPointer, {
            passive: !1
          }), H(v(r.prototype), "delete", this).call(this, l);
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ D(Set)), ii = /* @__PURE__ */ function(u) {
      p(r, u);
      var a = N(r);
      function r(m) {
        var l, w = m.className, x = m.DS;
        return t(this, r), l = a.call(this), i(E(l), "_className", void 0), i(E(l), "clear", function() {
          return l.forEach(function(S) {
            return l.delete(S);
          });
        }), i(E(l), "addAll", function(S) {
          return S.forEach(function(k) {
            return l.add(k);
          });
        }), i(E(l), "deleteAll", function(S) {
          return S.forEach(function(k) {
            return l.delete(k);
          });
        }), l.DS = x, l._className = w, l;
      }
      return s(r, [{
        key: "add",
        value: function(l) {
          if (!H(v(r.prototype), "has", this).call(this, l)) {
            var w = {
              items: this.elements,
              item: l
            };
            return this.DS.publish("Selected:added:pre", w), H(v(r.prototype), "add", this).call(this, l), l.classList.add(this._className), l.style.zIndex = "".concat((parseInt(l.style.zIndex) || 0) + 1), this.DS.publish("Selected:added", w), this;
          }
        }
      }, {
        key: "delete",
        value: function(l) {
          if (!!H(v(r.prototype), "has", this).call(this, l)) {
            var w = {
              items: this.elements,
              item: l
            };
            this.DS.publish("Selected:removed:pre", w);
            var x = H(v(r.prototype), "delete", this).call(this, l);
            return l.classList.remove(this._className), l.style.zIndex = "".concat((parseInt(l.style.zIndex) || 0) - 1), this.DS.publish("Selected:removed", w), x;
          }
        }
      }, {
        key: "toggle",
        value: function(l) {
          return this.has(l) ? this.delete(l) : this.add(l), l;
        }
      }, {
        key: "elements",
        get: function() {
          return Array.from(this.values());
        }
      }]), r;
    }(/* @__PURE__ */ D(Set)), ni = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.hoverClassName, w = a.multiSelectToggling;
        t(this, u), i(this, "_prevSelectedSet", void 0), i(this, "_hoverClassName", void 0), i(this, "_multiSelectToggling", void 0), i(this, "start", function(x) {
          var S = x.event, k = x.isDragging;
          k || (r._storePrevious(S), r._handleInsideSelection(!0, S));
        }), i(this, "update", function(x) {
          var S = x.isDragging;
          S || r.DS.continue || r._handleInsideSelection();
        }), i(this, "_handleInsideSelection", function(x, S) {
          for (var k = r.DS, T = k.SelectableSet, M = k.SelectorArea, j = k.Selector, L = T.elements.map(function(Se) {
            return [Se, Se.getBoundingClientRect()];
          }), F = [], ce = [], Z = 0, Le = L.length; Z < Le; Z++)
            !M.isInside(L[Z][0], L[Z][1]) || (gt(L[Z][1], j.rect) ? F.push(L[Z][0]) : ce.push(L[Z][0]));
          var nt = r.DS.stores.KeyStore.isMultiSelectKeyPressed(S) && r._multiSelectToggling;
          r.DS.continue || (F.forEach(function(Se) {
            return Xr({
              element: Se,
              force: x,
              multiSelectionToggle: nt,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName
            });
          }), ce.forEach(function(Se) {
            return Fr({
              element: Se,
              force: x,
              SelectedSet: r.DS.SelectedSet,
              hoverClassName: r._hoverClassName,
              PrevSelectedSet: r._prevSelectedSet
            });
          }));
        }), this._hoverClassName = l, this._multiSelectToggling = w, this.DS = m, this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update);
      }
      return s(u, [{
        key: "_storePrevious",
        value: function(r) {
          var m = this.DS, l = m.stores.KeyStore, w = m.SelectedSet;
          l.isMultiSelectKeyPressed(r) ? this._prevSelectedSet = new Set(w) : this._prevSelectedSet = /* @__PURE__ */ new Set();
        }
      }]), u;
    }(), oi = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.selector, w = a.selectorClass, x = a.customStyles;
        t(this, u), i(this, "_rect", void 0), i(this, "start", function(S) {
          var k = S.isDragging;
          if (!k) {
            var T = r.DS.stores.PointerStore, M = T.initialValArea;
            Rt(r.HTMLNode, ve(M, 1)), r.HTMLNode.style.display = "block", r._rect = null;
          }
        }), i(this, "stop", function() {
          r.HTMLNode.style.width = "0", r.HTMLNode.style.height = "0", r.HTMLNode.style.display = "none";
        }), i(this, "update", function(S) {
          var k = S.isDragging;
          if (!(k || r.DS.continue)) {
            var T = r.DS.stores, M = T.ScrollStore, j = T.PointerStore, L = Rr({
              scrollAmount: M.scrollAmount,
              initialPointerPos: j.initialValArea,
              pointerPos: j.currentValArea
            });
            Rt(r.HTMLNode, L), r._rect = null;
          }
        }), this.DS = m, this.HTMLNode = l || rt(x), this.HTMLNode.classList.add(w), this.DS.subscribe("Interaction:start", this.start), this.DS.subscribe("Interaction:update", this.update), this.DS.subscribe("Interaction:end", this.stop);
      }
      return s(u, [{
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), ai = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.selectorAreaClass, w = a.autoScrollSpeed, x = a.overflowTolerance;
        t(this, u), i(this, "_autoScrollSpeed", void 0), i(this, "_scrollInterval", void 0), i(this, "_rect", void 0), i(this, "currentEdges", []), i(this, "_overflowTolerance", void 0), i(this, "start", function() {
          return r.applyElements("append");
        }), i(this, "applyElements", function() {
          var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "append", k = document.body ? "body" : "documentElement", T = "".concat(S, "Child");
          r.HTMLNode[T](r.DS.Selector.HTMLNode), document[k][T](r.HTMLNode);
        }), i(this, "updatePos", function() {
          r._rect = null;
          var S = r.DS.Area.rect, k = r.DS.Area.computedBorder, T = r.HTMLNode.style, M = "".concat(S.top + k.top, "px"), j = "".concat(S.left + k.left, "px"), L = "".concat(S.width, "px"), F = "".concat(S.height, "px");
          T.top !== M && (T.top = M), T.left !== j && (T.left = j), T.width !== L && (T.width = L), T.height !== F && (T.height = F);
        }), i(this, "stop", function(S) {
          r.stopAutoScroll(), S && r.applyElements("remove");
        }), i(this, "startAutoScroll", function() {
          r.currentEdges = [], r._scrollInterval = setInterval(function() {
            return r.handleAutoScroll();
          }, 16);
        }), i(this, "handleAutoScroll", function() {
          if (!r.DS.continue) {
            var S = r.DS, k = S.stores.PointerStore, T = S.Area;
            r.currentEdges = Lt({
              elementRect: ve(k.currentVal),
              containerRect: r.rect,
              tolerance: r._overflowTolerance
            }), r.currentEdges.length && T.scroll(r.currentEdges, r._autoScrollSpeed);
          }
        }), i(this, "stopAutoScroll", function() {
          r.currentEdges = [], clearInterval(r._scrollInterval);
        }), i(this, "isInside", function(S, k) {
          return r.DS.Area.HTMLNode.contains(S) && r.DS.stores.ScrollStore.canScroll ? !0 : gt(r.rect, k || S.getBoundingClientRect());
        }), this._autoScrollSpeed = w, this._overflowTolerance = x, this.DS = m, this.HTMLNode = tt(l), this.DS.subscribe("Area:modified", this.updatePos), this.DS.subscribe("Interaction:init", this.start), this.DS.subscribe("Interaction:start", this.startAutoScroll), this.DS.subscribe("Interaction:end", function() {
          r.updatePos(), r.stopAutoScroll();
        });
      }
      return s(u, [{
        key: "isClicked",
        value: function(r) {
          var m = this.DS.stores.PointerStore, l = r ? m.getPointerPosition(r) : m.initialVal;
          return gt({
            left: l.x,
            top: l.y,
            right: l.x,
            bottom: l.y
          }, this.rect);
        }
      }, {
        key: "rect",
        get: function() {
          return this._rect ? this._rect : this._rect = this.HTMLNode.getBoundingClientRect();
        }
      }]), u;
    }(), si = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.multiSelectKeys, w = a.multiSelectMode;
        t(this, u), i(this, "_multiSelectMode", void 0), i(this, "_multiSelectKeys", void 0), i(this, "_currentValues", /* @__PURE__ */ new Set()), i(this, "_keyMapping", {
          control: "ctrlKey",
          shift: "shiftKey",
          meta: "metaKey"
        }), i(this, "init", function() {
          document.addEventListener("keydown", r.keydown), document.addEventListener("keyup", r.keyup), window.addEventListener("blur", r.reset);
        }), i(this, "keydown", function(x) {
          var S = x.key.toLowerCase();
          r.DS.publish("KeyStore:down:pre", {
            event: x,
            key: S
          }), r._currentValues.add(S), r.DS.publish("KeyStore:down", {
            event: x,
            key: S
          });
        }), i(this, "keyup", function(x) {
          var S = x.key.toLowerCase();
          r.DS.publish("KeyStore:up:pre", {
            event: x,
            key: S
          }), r._currentValues.delete(S), r.DS.publish("KeyStore:up", {
            event: x,
            key: S
          });
        }), i(this, "stop", function() {
          document.removeEventListener("keydown", r.keydown), document.removeEventListener("keyup", r.reset), window.removeEventListener("blur", r.reset), r.reset();
        }), i(this, "reset", function() {
          return r._currentValues.clear();
        }), this.DS = m, this._multiSelectMode = w, this._multiSelectKeys = l.map(function(x) {
          var S = {
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
          }, k = S[x];
          return k ? (console.warn("[DragSelect] ".concat(x, ' is deprecated. Use "').concat(k, '" instead. Act Now!. See docs for more info')), k.toLowerCase()) : x.toLowerCase();
        }), this.DS.subscribe("Interaction:init", this.init);
      }
      return s(u, [{
        key: "isMultiSelectKeyPressed",
        value: function(r) {
          var m = this;
          return !!(this._multiSelectMode || this.currentValues.some(function(l) {
            return m._multiSelectKeys.includes(l);
          }) || r && this._multiSelectKeys.some(function(l) {
            return r[m._keyMapping[l]];
          }));
        }
      }, {
        key: "currentValues",
        get: function() {
          return Array.from(this._currentValues.values());
        }
      }]), u;
    }(), li = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS;
        t(this, u), i(this, "_isMouseInteraction", !1), i(this, "_initialValArea", void 0), i(this, "_currentValArea", void 0), i(this, "_lastValArea", void 0), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_lastVal", void 0), i(this, "_lastTouch", void 0), i(this, "init", function() {
          document.addEventListener("mousemove", r.update), document.addEventListener("touchmove", r.update, {
            passive: !1
          });
        }), i(this, "getPointerPosition", function(l) {
          return Br({
            event: r._normalizedEvent(l)
          });
        }), i(this, "update", function(l) {
          !l || (r.DS.publish("PointerStore:updated:pre", {
            event: l
          }), r.currentVal = r.getPointerPosition(l), r._isMouseInteraction && r.DS.publish("PointerStore:updated", {
            event: l
          }));
        }), i(this, "stop", function() {
          document.removeEventListener("mousemove", r.update), document.removeEventListener("touchmove", r.update, {
            passive: !1
          }), setTimeout(function() {
            return r._isMouseInteraction = !1;
          }, 100);
        }), i(this, "reset", function(l) {
          !l || (r.currentVal = r.lastVal = r.getPointerPosition(l), r.stop(), r.init());
        }), this.DS = m, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function(l) {
          var w = l.event;
          return r.start(w);
        }), this.DS.subscribe("Interaction:end", function(l) {
          var w = l.event;
          return r.reset(w);
        });
      }
      return s(u, [{
        key: "start",
        value: function(r) {
          !r || (this._isMouseInteraction = !0, this.currentVal = this.initialVal = this.getPointerPosition(r));
        }
      }, {
        key: "_normalizedEvent",
        value: function(r) {
          return "touches" in r && r.type !== "touchend" && (this._lastTouch = r), "touches" in r ? this._lastTouch.touches[0] : r;
        }
      }, {
        key: "initialValArea",
        get: function() {
          return this._initialValArea ? this._initialValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "currentValArea",
        get: function() {
          return this._currentValArea ? this._currentValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "lastValArea",
        get: function() {
          return this._lastValArea ? this._lastValArea : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "initialVal",
        get: function() {
          return this._initialVal ? this._initialVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._initialVal = r, this._initialValArea = r && Y(r, "-", Y(q(this.DS.Area.rect), "+", q(this.DS.Area.computedBorder)));
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal ? this._currentVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._currentVal = r, this._currentValArea = r && Y(r, "-", Y(q(this.DS.Area.rect), "+", q(this.DS.Area.computedBorder)));
        }
      }, {
        key: "lastVal",
        get: function() {
          return this._lastVal ? this._lastVal : {
            x: 0,
            y: 0
          };
        },
        set: function(r) {
          this._lastVal = r, this._lastValArea = r && Y(r, "-", Y(q(this.DS.Area.rect), "+", q(this.DS.Area.computedBorder)));
        }
      }]), u;
    }(), ci = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.DS, l = a.areaElement, w = a.zoom;
        t(this, u), i(this, "_initialVal", void 0), i(this, "_currentVal", void 0), i(this, "_areaElement", void 0), i(this, "_canScroll", void 0), i(this, "init", function() {
          return r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "start", function() {
          r._currentVal = r._initialVal = Ie(r._areaElement), r._areaElement.addEventListener("scroll", r.update);
        }), i(this, "update", function() {
          return r._currentVal = Ie(r._areaElement);
        }), i(this, "stop", function() {
          r._areaElement.removeEventListener("scroll", r.update), r._initialVal = {
            x: 0,
            y: 0
          }, r._canScroll = null;
        }), i(this, "reset", function() {
          r.stop(), r.start();
        }), this._areaElement = l, this.DS = m, this.zoom = w, this.DS.subscribe("Interaction:init", this.init), this.DS.subscribe("Interaction:start", function() {
          return r.start();
        }), this.DS.subscribe("Interaction:end", function() {
          return r.reset();
        });
      }
      return s(u, [{
        key: "canScroll",
        get: function() {
          return typeof this._canScroll == "boolean" ? this._canScroll : this._canScroll = We(this._areaElement);
        }
      }, {
        key: "scrollAmount",
        get: function() {
          var r = Y(this.currentVal, "-", this.initialVal), m = Oe(this.zoom), l = Y(Y(r, "*", m), "-", r);
          return {
            x: r.x + l.x,
            y: r.y + l.y
          };
        }
      }, {
        key: "initialVal",
        get: function() {
          return this._initialVal ? this._initialVal : {
            x: 0,
            y: 0
          };
        }
      }, {
        key: "currentVal",
        get: function() {
          return this._currentVal || (this._currentVal = Ie(this._areaElement)), this._currentVal;
        }
      }]), u;
    }(), ui = /* @__PURE__ */ function() {
      function u(a) {
        var r = this, m = a.area, l = m === void 0 ? document : m, w = a.selectables, x = w === void 0 ? [] : w, S = a.autoScrollSpeed, k = S === void 0 ? 5 : S, T = a.overflowTolerance, M = T === void 0 ? {
          x: 25,
          y: 25
        } : T, j = a.zoom, L = j === void 0 ? 1 : j, F = a.customStyles, ce = F === void 0 ? !1 : F, Z = a.multiSelectMode, Le = Z === void 0 ? !1 : Z, nt = a.multiSelectToggling, Se = nt === void 0 ? !0 : nt, Ht = a.multiSelectKeys, di = Ht === void 0 ? ["Control", "Shift", "Meta"] : Ht, Kt = a.selector, hi = Kt === void 0 ? void 0 : Kt, Ut = a.draggability, vt = Ut === void 0 ? !0 : Ut, Yt = a.immediateDrag, fi = Yt === void 0 ? !0 : Yt, Wt = a.keyboardDrag, mi = Wt === void 0 ? !0 : Wt, pi = a.dragKeys, Xt = a.keyboardDragSpeed, gi = Xt === void 0 ? 10 : Xt, Ft = a.useTransform, qt = Ft === void 0 ? !0 : Ft, Gt = a.hoverClass, Jt = Gt === void 0 ? "ds-hover" : Gt, Zt = a.selectableClass, Qt = Zt === void 0 ? "ds-selectable" : Zt, er = a.selectedClass, vi = er === void 0 ? "ds-selected" : er, tr = a.selectorClass, bi = tr === void 0 ? "ds-selector" : tr, rr = a.selectorAreaClass, yi = rr === void 0 ? "ds-selector-area" : rr, wi = a.callback, xi = a.onDragMove, _i = a.onDragStartBegin, Si = a.onDragStart, ki = a.onElementSelect, Di = a.onElementUnselect;
        t(this, u), i(this, "continue", !1), i(this, "start", function() {
          r.stopped = !1, r.Interaction.init();
        }), i(this, "break", function() {
          return r.continue = !0;
        }), i(this, "getSelection", function() {
          return r.SelectedSet.elements;
        }), i(this, "getSelectables", function() {
          return r.SelectableSet.elements;
        }), i(this, "getInitialCursorPosition", function() {
          return r.stores.PointerStore.initialVal;
        }), i(this, "getCurrentCursorPosition", function() {
          return r.stores.PointerStore.currentVal;
        }), i(this, "getPreviousCursorPosition", function() {
          return r.stores.PointerStore.lastVal;
        }), i(this, "getInitialCursorPositionArea", function() {
          return r.stores.PointerStore.initialValArea;
        }), i(this, "getCurrentCursorPositionArea", function() {
          return r.stores.PointerStore.currentValArea;
        }), i(this, "getPreviousCursorPositionArea", function() {
          return r.stores.PointerStore.lastValArea;
        }), i(this, "isMultiSelect", function(Ci) {
          return r.stores.KeyStore.isMultiSelectKeyPressed(Ci);
        }), i(this, "isDragging", function() {
          return r.Interaction.isDragging;
        }), this.PubSub = new ti({
          DS: this
        }), this.subscribe = this.PubSub.subscribe, this.unsubscribe = this.PubSub.unsubscribe, this.publish = this.PubSub.publish, this._callbacksTemp({
          callback: wi,
          onDragMove: xi,
          onDragStart: Si,
          onDragStartBegin: _i,
          onElementSelect: ki,
          onElementUnselect: Di
        }), this.stores = {
          PointerStore: new li({
            DS: this
          }),
          ScrollStore: new ci({
            DS: this,
            areaElement: l,
            zoom: L
          }),
          KeyStore: new si({
            DS: this,
            multiSelectKeys: di,
            multiSelectMode: Le
          })
        }, this.Area = new Zr({
          area: l,
          PS: this.PubSub,
          zoom: L
        }), this.Selector = new oi({
          DS: this,
          selector: hi,
          selectorClass: bi,
          customStyles: ce
        }), this.SelectorArea = new ai({
          DS: this,
          selectorAreaClass: yi,
          autoScrollSpeed: k,
          overflowTolerance: M
        }), this.SelectableSet = new ri({
          elements: x,
          DS: this,
          className: Qt,
          hoverClassName: Jt,
          useTransform: qt,
          draggability: vt
        }), this.SelectedSet = new ii({
          DS: this,
          className: vi
        }), this.Selection = new ni({
          DS: this,
          hoverClassName: Jt,
          multiSelectToggling: Se
        }), this.Drag = new Qr({
          DS: this,
          draggability: vt,
          useTransform: qt,
          keyboardDrag: mi,
          dragKeys: Object.assign({
            up: ["ArrowUp"],
            down: ["ArrowDown"],
            left: ["ArrowLeft"],
            right: ["ArrowRight"]
          }, pi),
          zoom: L,
          keyboardDragSpeed: gi
        }), this.Interaction = new ei({
          areaElement: l,
          DS: this,
          draggability: vt,
          immediateDrag: fi,
          selectableClass: Qt
        }), Jr({
          subscribe: this.subscribe,
          publish: this.publish,
          SelectedSet: this.SelectedSet,
          Interaction: this.Interaction
        }), this.subscribe("Interaction:end", function() {
          return r.continue = !1;
        }), this.start();
      }
      return s(u, [{
        key: "_callbacksTemp",
        value: function(r) {
          var m = r.callback, l = r.onDragMove, w = r.onDragStart, x = r.onDragStartBegin, S = r.onElementSelect, k = r.onElementUnselect, T = function(j, L) {
            return console.warn("[DragSelect] ".concat(j, ' is deprecated. Use DragSelect.subscribe("').concat(L, '", (callbackObject) => {}) instead. Act Now! See docs for more info'));
          };
          m && (T("callback", "callback"), this.subscribe("callback", function(M) {
            var j = M.items;
            M.item;
            var L = M.event;
            return m(j, L);
          })), l && (T("onDragMove", "dragmove"), this.subscribe("dragmove", function(M) {
            M.items, M.item;
            var j = M.event;
            return l(j);
          })), w && (T("onDragStart", "dragstart"), this.subscribe("dragstart", function(M) {
            M.items, M.item;
            var j = M.event;
            return w(j);
          })), x && (T("onDragStartBegin", "dragstart"), this.subscribe("dragstart", function(M) {
            M.items, M.item;
            var j = M.event;
            return x(j);
          })), S && (T("onElementSelect", "elementselect"), this.subscribe("elementselect", function(M) {
            M.items;
            var j = M.item, L = M.event;
            return S(j, L);
          })), k && (T("onElementUnselect", "elementunselect"), this.subscribe("elementunselect", function(M) {
            M.items;
            var j = M.item, L = M.event;
            return k(j, L);
          }));
        }
      }, {
        key: "stop",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          l && this.publish("callback", {
            items: this.getSelection()
          }), this.Interaction.stop(), this.Area.stop(), this.Drag.stop(), this.Selector.stop(), this.SelectorArea.stop(r), this.stores.KeyStore.stop(), this.stores.PointerStore.stop(), this.stores.ScrollStore.stop(), r && this.SelectableSet.clear(), m && this.SelectedSet.clear(), this.stopped = !0;
        }
      }, {
        key: "addSelection",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.addAll(Ne(r)), l || this.addSelectables(r), m && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "removeSelection",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.SelectedSet.deleteAll(Ne(r)), l && this.removeSelectables(r), m && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "toggleSelection",
        value: function(r) {
          var m = this, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, w = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return Ne(r).forEach(function(x) {
            return m.SelectedSet.has(x) ? m.removeSelection(r, l, w) : m.addSelection(r, l, w);
          }), l && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "setSelection",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.clearSelection(), this.addSelection(r, m, l), this.getSelection();
        }
      }, {
        key: "clearSelection",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          return this.SelectedSet.clear(), r && this.PubSub.publish("callback", {
            items: this.getSelection()
          }), this.getSelection();
        }
      }, {
        key: "addSelectables",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = Ne(r);
          return this.SelectableSet.addAll(l), m && this.SelectedSet.addAll(l), r;
        }
      }, {
        key: "setSelectables",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
          return this.removeSelectables(r, m), this.addSelectables(r, l);
        }
      }, {
        key: "removeSelectables",
        value: function(r) {
          var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          return this.SelectableSet.deleteAll(Ne(r)), m && this.removeSelection(r), r;
        }
      }, {
        key: "getCursorPositionDifference",
        value: function() {
          var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
          console.warn("[DragSelect] Using .getCursorPositionDifference is deprecated. Calculate yourself instead. i.e. `.getCurrentCursorPosition().x - .getInitialCursorPosition().x`");
          var l = m ? this.getCurrentCursorPositionArea() : this.getCurrentCursorPosition(), w = r ? m ? this.getPreviousCursorPositionArea() : this.getPreviousCursorPosition() : m ? this.getInitialCursorPositionArea() : this.getInitialCursorPosition();
          return Y(l, "-", w);
        }
      }]), u;
    }();
    return ui;
  });
})(kr);
const hn = kr.exports, fn = (o, e, t, n, s) => (e = Math, t = e.log, n = 1024, s = t(o) / t(n) | 0, o / e.pow(n, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B"), mn = (o, e = "en-US") => new Date(o * 1e3).toLocaleString(e), pn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, gn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
}, null, -1), vn = [
  gn
], bn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, yn = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z",
  "clip-rule": "evenodd"
}, null, -1), wn = [
  yn
], xn = {
  name: "VFSortIcon"
}, at = /* @__PURE__ */ Object.assign(xn, {
  props: { direction: String },
  setup(o) {
    return (e, t) => (_(), C("div", null, [
      o.direction == "down" ? (_(), C("svg", pn, vn)) : re("", !0),
      o.direction == "up" ? (_(), C("svg", bn, wn)) : re("", !0)
    ]));
  }
}), _n = ["onClick"], Sn = {
  name: "VFToast.vue"
}, kn = /* @__PURE__ */ Object.assign(Sn, {
  setup(o) {
    const e = inject("emitter"), { getStore: t } = inject("storage"), n = I(t("full-screen", !1)), s = (p) => p == "error" ? "text-red-400 border-red-400" : "text-lime-600 border-lime-600", i = I([]), c = (p) => {
      i.value.splice(p, 1);
    }, h = (p) => {
      let v = i.value.findIndex((f) => f.id === p);
      v !== -1 && c(v);
    };
    return e.on("vf-toast-push", (p) => {
      let v = new Date().getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      p.id = v, i.value.push(p), setTimeout(() => {
        h(v);
      }, 5e3);
    }), (p, v) => (_(), C("div", {
      class: de([n.value.value ? "fixed" : "absolute", "bottom-0 max-w-fit flex flex-col bottom-0 left-1/2 -translate-x-1/2"])
    }, [
      me(Mi, {
        name: "vf-toast-item",
        "leave-active-class": "transition-all duration-1000",
        "leave-to-class": "opacity-0"
      }, {
        default: G(() => [
          (_(!0), C(ie, null, he(i.value, (f, g) => (_(), C("div", {
            onClick: (b) => c(g),
            key: f,
            class: de([s(f.type), "inline-block mx-auto my-0.5 py-0.5 px-2 min-w-max bg-gray-50 border text-xs rounded cursor-pointer"])
          }, V(f.label), 11, _n))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}), Dn = { class: "relative flex-auto flex flex-col overflow-hidden" }, Cn = {
  key: 0,
  class: "grid grid-cols-12 border-b border-neutral-300 dark:border-gray-700 text-xs select-none"
}, Mn = /* @__PURE__ */ Me(" Name "), $n = /* @__PURE__ */ Me(" Size "), En = /* @__PURE__ */ Me(" Date "), Tn = /* @__PURE__ */ Me(" Path "), An = { class: "absolute" }, Pn = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  })
], -1), On = { class: "text-neutral-700 dark:text-neutral-300 p-1 absolute text-center top-4 right-[-2rem] md:top-5 md:right-[-2.4rem] z-20 text-xs" }, jn = ["onDblclick", "onContextmenu", "data-type", "data-item", "data-index"], In = { class: "grid grid-cols-12 items-center" }, Nn = { class: "flex col-span-7 items-center" }, Ln = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), zn = [
  Vn
], Bn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Hn = [
  Rn
], Kn = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, Un = { class: "col-span-5 overflow-ellipsis overflow-hidden whitespace-nowrap" }, Yn = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], Wn = { class: "grid grid-cols-12 items-center" }, Xn = { class: "flex col-span-7 items-center" }, Fn = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Gn = [
  qn
], Jn = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zn = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Qn = [
  Zn
], eo = { class: "overflow-ellipsis overflow-hidden whitespace-nowrap" }, to = { class: "col-span-2 text-center" }, ro = { class: "col-span-3 overflow-ellipsis overflow-hidden whitespace-nowrap" }, io = ["onDblclick", "onContextmenu", "onDragstart", "onDragover", "onDrop", "data-type", "data-item", "data-index"], no = { class: "relative" }, oo = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ao = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), so = [
  ao
], lo = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-10 w-10 md:h-12 md:w-12 m-auto text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, co = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), uo = [
  co
], ho = { class: "absolute hidden md:block top-1/2 w-full text-center text-neutral-500" }, fo = { class: "break-all" }, mo = {
  name: "VFExplorer"
}, po = /* @__PURE__ */ Object.assign(mo, {
  props: {
    view: String,
    data: Object,
    search: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { setStore: n, getStore: s } = inject("storage"), i = (y) => y == null ? void 0 : y.substring(0, 3), c = (y) => y.replace(/((?=([\w\W]{0,14}))([\w\W]{8,})([\w\W]{8,}))/, "$2..$4"), h = I(null), p = I(null), v = I(0), f = I(null), g = I(s("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      g.value = !g.value, n("full-screen", g.value);
    });
    const b = I("");
    t.on("vf-search-query", ({ newQuery: y }) => {
      b.value = y, y ? t.emit("vf-fetch", { q: "search", adapter: e.data.adapter, path: e.data.dirname, filter: y }) : t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: e.data.dirname });
    });
    const A = (y) => {
      y.type == "dir" ? (t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.data.adapter, path: y.path })) : t.emit("vf-modal-show", { type: "preview", adapter: e.data.adapter, item: y });
    }, D = ut({ active: !1, column: "", order: "" }), E = (y = !0) => {
      let O = [...e.data.files], $ = D.column, U = D.order == "asc" ? 1 : -1;
      if (!y)
        return O;
      const B = (ee, oe) => typeof ee == "string" && typeof oe == "string" ? ee.toLowerCase().localeCompare(oe.toLowerCase()) : ee < oe ? -1 : ee > oe ? 1 : 0;
      return D.active && (O = O.slice().sort((ee, oe) => B(ee[$], oe[$]) * U)), O;
    }, P = (y) => {
      D.active && D.column == y ? (D.active = D.order == "asc", D.column = y, D.order = "desc") : (D.active = !0, D.column = y, D.order = "asc");
    }, N = () => f.value.getSelection().map((y) => JSON.parse(y.dataset.item)), K = (y, O) => {
      if (y.altKey || y.ctrlKey || y.metaKey)
        return y.preventDefault(), !1;
      y.dataTransfer.setDragImage(p.value, 0, 15), y.dataTransfer.effectAllowed = "all", y.dataTransfer.dropEffect = "copy", y.dataTransfer.setData("items", JSON.stringify(N()));
    }, H = (y, O) => {
      y.preventDefault();
      let $ = JSON.parse(y.dataTransfer.getData("items"));
      if ($.find((U) => U.storage != s("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", { type: "move", items: { from: $, to: O } });
    }, ae = (y, O) => {
      y.preventDefault(), !O || O.type !== "dir" || f.value.getSelection().find(($) => $ == y.currentTarget) ? (y.dataTransfer.dropEffect = "none", y.dataTransfer.effectAllowed = "none") : y.dataTransfer.dropEffect = "copy";
    };
    return ye(() => {
      f.value = new hn({
        area: h.value,
        keyboardDrag: !1,
        selectedClass: "vf-explorer-selected",
        selectorClass: "vf-explorer-selector"
      }), t.on("vf-explorer-update", () => ft(() => {
        f.value.clearSelection(), f.value.setSelectables(document.getElementsByClassName("vf-item"));
      })), f.value.subscribe("predragstart", ({ event: y, isDragging: O }) => {
        if (O)
          v.value = f.value.getSelection().length, f.value.break();
        else {
          const $ = y.target.offsetWidth - y.offsetX, U = y.target.offsetHeight - y.offsetY;
          $ < 15 && U < 15 && (f.value.clearSelection(), f.value.break());
        }
      }), f.value.subscribe("predragmove", ({ isDragging: y }) => {
        y && f.value.break();
      }), f.value.subscribe("callback", ({ items: y, event: O, isDragging: $ }) => {
        t.emit("vf-nodes-selected", N()), v.value = f.value.getSelection().length;
      });
    }), ye(() => {
      At(() => e.view, () => t.emit("vf-explorer-update"));
    }), (y, O) => (_(), C("div", Dn, [
      o.view == "list" || b.value.length ? (_(), C("div", Cn, [
        d("div", {
          onClick: O[0] || (O[0] = ($) => P("basename")),
          class: "col-span-7 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center pl-1"
        }, [
          Mn,
          pe(me(at, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, D.active && D.column == "basename"]
          ])
        ]),
        b.value.length ? re("", !0) : (_(), C("div", {
          key: 0,
          onClick: O[1] || (O[1] = ($) => P("file_size")),
          class: "col-span-2 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l border-r dark:border-gray-700"
        }, [
          $n,
          pe(me(at, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, D.active && D.column == "file_size"]
          ])
        ])),
        b.value.length ? re("", !0) : (_(), C("div", {
          key: 1,
          onClick: O[2] || (O[2] = ($) => P("last_modified")),
          class: "col-span-3 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center"
        }, [
          En,
          pe(me(at, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, D.active && D.column == "last_modified"]
          ])
        ])),
        b.value.length ? (_(), C("div", {
          key: 2,
          onClick: O[3] || (O[3] = ($) => P("path")),
          class: "col-span-5 py-1 leading-6 hover:bg-neutral-100 bg-neutral-50 dark:bg-gray-800 flex items-center justify-center border-l dark:border-gray-700"
        }, [
          Tn,
          pe(me(at, {
            direction: D.order == "asc" ? "down" : "up"
          }, null, 8, ["direction"]), [
            [ot, D.active && D.column == "path"]
          ])
        ])) : re("", !0)
      ])) : re("", !0),
      d("div", An, [
        d("div", {
          ref: ($) => p.value = $,
          class: "absolute -z-50 -top-96"
        }, [
          Pn,
          d("div", On, V(v.value), 1)
        ], 512)
      ]),
      d("div", {
        style: Sr(g.value ? "height: 100%;" : ""),
        class: de([g.value ? "" : "resize-y", "h-full w-full text-xs vf-selector-area min-h-[150px] overflow-auto p-1 z-0"]),
        ref: ($) => h.value = $,
        onContextmenu: O[4] || (O[4] = Te(($) => R(t).emit("vf-contextmenu-show", { event: $, area: h.value, items: N() }), ["self", "prevent"]))
      }, [
        b.value.length ? (_(!0), C(ie, { key: 0 }, he(E(), ($, U) => (_(), C("div", {
          onDblclick: (B) => A($),
          onContextmenu: Te((B) => R(t).emit("vf-contextmenu-show", { event: B, area: h.value, items: N(), target: $ }), ["prevent"]),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": $.type,
          "data-item": JSON.stringify($),
          "data-index": U
        }, [
          d("div", In, [
            d("div", Nn, [
              $.type == "dir" ? (_(), C("svg", Ln, zn)) : (_(), C("svg", Bn, Hn)),
              d("span", Kn, V($.basename), 1)
            ]),
            d("div", Un, V($.path), 1)
          ])
        ], 40, jn))), 256)) : re("", !0),
        o.view == "list" && !b.value.length ? (_(!0), C(ie, { key: 1 }, he(E(), ($, U) => (_(), C("div", {
          draggable: "true",
          onDblclick: (B) => A($),
          onContextmenu: Te((B) => R(t).emit("vf-contextmenu-show", { event: B, area: h.value, items: N(), target: $ }), ["prevent"]),
          onDragstart: (B) => K(B),
          onDragover: (B) => ae(B, $),
          onDrop: (B) => H(B, $),
          class: "vf-item grid grid-cols-1 border hover:bg-neutral-50 dark:hover:bg-gray-700 border-transparent my-0.5 w-full select-none",
          "data-type": $.type,
          "data-item": JSON.stringify($),
          "data-index": U
        }, [
          d("div", Wn, [
            d("div", Xn, [
              $.type == "dir" ? (_(), C("svg", Fn, Gn)) : (_(), C("svg", Jn, Qn)),
              d("span", eo, V($.basename), 1)
            ]),
            d("div", to, V($.file_size ? R(fn)($.file_size) : ""), 1),
            d("div", ro, V(R(mn)($.last_modified)), 1)
          ])
        ], 40, Yn))), 256)) : re("", !0),
        o.view == "grid" && !b.value.length ? (_(!0), C(ie, { key: 2 }, he(E(!1), ($, U) => (_(), C("div", {
          draggable: "true",
          onDblclick: (B) => A($),
          onContextmenu: Te((B) => R(t).emit("vf-contextmenu-show", { event: B, area: h.value, items: N(), target: $ }), ["prevent"]),
          onDragstart: (B) => K(B),
          onDragover: (B) => ae(B, $),
          onDrop: (B) => H(B, $),
          class: "vf-item border border-transparent hover:bg-neutral-50 m-0.5 dark:hover:bg-gray-700 inline-flex w-[5.5rem] h-20 md:w-24 md:h-24 text-center justify-center select-none",
          "data-type": $.type,
          "data-item": JSON.stringify($),
          "data-index": U
        }, [
          d("div", null, [
            d("div", no, [
              $.type == "dir" ? (_(), C("svg", oo, so)) : (_(), C("svg", lo, uo)),
              d("div", ho, V(i($.extension)), 1)
            ]),
            d("span", fo, V(c($.basename)), 1)
          ])
        ], 40, io))), 256)) : re("", !0)
      ], 38),
      me(kn)
    ]));
  }
}), go = { class: "p-1 text-xs border-t border-neutral-300 dark:border-gray-700/50 flex justify-between select-none" }, vo = { class: "flex leading-5 items-center" }, bo = /* @__PURE__ */ d("div", {
  class: "mx-2",
  "aria-label": "Storage",
  "data-microtip-position": "top",
  role: "tooltip"
}, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "1"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    })
  ])
], -1), yo = ["value"], wo = { class: "ml-3" }, xo = { key: 0 }, _o = { class: "ml-1" }, So = { class: "flex leading-5 items-center" }, ko = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })
], -1), Do = [
  ko
], Co = {
  name: "VFStatusbar"
}, Mo = /* @__PURE__ */ Object.assign(Co, {
  props: {
    data: Object
  },
  setup(o) {
    var v;
    const e = o, t = inject("emitter"), { getStore: n, setStore: s } = inject("storage"), i = I(0), c = I((v = n("adapter")) != null ? v : e.data.adapter), h = () => {
      t.emit("vf-fetch", { q: "index", adapter: c.value }), s("adapter", c.value);
    };
    t.on("vf-nodes-selected", (f) => {
      i.value = f.length;
    });
    const p = I("");
    return t.on("vf-search-query", ({ newQuery: f }) => {
      p.value = f;
    }), (f, g) => (_(), C("div", go, [
      d("div", vo, [
        bo,
        pe(d("select", {
          "onUpdate:modelValue": g[0] || (g[0] = (b) => c.value = b),
          onChange: h,
          class: "py-0.5 text-sm text-slate-500 dark:text-neutral-50 dark:bg-gray-700 rounded pl-2 pr-8"
        }, [
          (_(!0), C(ie, null, he(o.data.storages, (b) => (_(), C("option", { value: b }, V(b), 9, yo))), 256))
        ], 544), [
          [$i, c.value]
        ]),
        d("div", wo, [
          p.value.length ? (_(), C("span", xo, V(o.data.files.length) + " items found. ", 1)) : re("", !0),
          d("span", _o, V(i.value > 0 ? i.value + " items selected." : ""), 1)
        ])
      ]),
      d("div", So, [
        d("span", {
          onClick: g[1] || (g[1] = (b) => R(t).emit("vf-modal-show", { type: "message", title: "Vuefinder 1.0", message: "Vuefinder is a file manager component for vue 3." }))
        }, Do)
      ])
    ]));
  }
}), $o = (o, e = 0, t = !1) => {
  let n;
  return (...s) => {
    t && !n && o(...s), clearTimeout(n), n = setTimeout(() => {
      o(...s);
    }, e);
  };
}, Eo = (o, e, t) => {
  const n = I(o);
  return Ei((i, c) => ({
    get() {
      return i(), n.value;
    },
    set: $o(
      (h) => {
        n.value = h, c();
      },
      e,
      t
    )
  }));
}, To = { class: "flex p-1.5 bg-neutral-100 dark:bg-gray-800 border-t border-b border-neutral-300 dark:border-gray-700/50 items-center select-none" }, Ao = {
  "aria-label": "Go up a directory",
  "data-microtip-position": "bottom-right",
  role: "tooltip"
}, Po = /* @__PURE__ */ d("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z",
  "clip-rule": "evenodd"
}, null, -1), Oo = [
  Po
], jo = ["onClick"], Io = /* @__PURE__ */ d("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" }, null, -1), No = [
  Io
], Lo = { class: "flex leading-5" }, Vo = /* @__PURE__ */ d("span", { class: "text-neutral-300 dark:text-gray-600 mx-0.5" }, "/", -1), zo = ["title", "onClick"], Bo = {
  key: 1,
  class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full"
}, Ro = /* @__PURE__ */ d("svg", {
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  })
], -1), Ho = ["onKeydown"], Ko = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18L18 6M6 6l12 12"
}, null, -1), Uo = [
  Ko
], Yo = {
  name: "VFBreadcrumb"
}, Wo = /* @__PURE__ */ Object.assign(Yo, {
  props: {
    data: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = I(null), i = I([]), c = I(!1), h = I(null);
    t.on("vf-explorer-update", () => {
      var P;
      let D = [], E = [];
      s.value = (P = e.data.dirname) != null ? P : n("adapter", "local") + "://", s.value.length == 0 && (i.value = []), s.value.replace(n("adapter", "local") + "://", "").split("/").forEach(function(N) {
        D.push(N), D.join("/") != "" && E.push({
          basename: N,
          name: N,
          path: n("adapter", "local") + "://" + D.join("/"),
          type: "dir"
        });
      }), E.length > 4 && (E = E.slice(-5), E[0].name = ".."), i.value = E;
    });
    const p = () => {
      c.value = !1, f.value = "";
    };
    t.on("vf-search-exit", () => {
      p();
    });
    const v = () => {
      c.value = !0, ft(() => h.value.focus());
    }, f = Eo("", 400);
    At(f, (D) => {
      t.emit("vf-search-query", { newQuery: D });
    });
    const g = () => i.value.length && !c.value, b = (D) => {
      var P;
      D.preventDefault();
      let E = JSON.parse(D.dataTransfer.getData("items"));
      if (E.find((N) => N.storage != n("adapter", "local"))) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      t.emit("vf-modal-show", {
        type: "move",
        items: { from: E, to: (P = i.value[i.value.length - 2]) != null ? P : { path: n("adapter", "local") + "://" } }
      });
    }, A = (D) => {
      D.preventDefault(), g() ? D.dataTransfer.dropEffect = "copy" : (D.dataTransfer.dropEffect = "none", D.dataTransfer.effectAllowed = "none");
    };
    return (D, E) => (_(), C("div", To, [
      d("span", Ao, [
        (_(), C("svg", {
          onDragover: E[0] || (E[0] = (P) => A(P)),
          onDrop: E[1] || (E[1] = (P) => b(P)),
          onClick: E[2] || (E[2] = (P) => {
            var N, K;
            return !g() || R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: (K = (N = i.value[i.value.length - 2]) == null ? void 0 : N.path) != null ? K : R(n)("adapter", "local") + "://" });
          }),
          class: de(["h-6 w-6 p-0.5 rounded", g() ? "text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer" : "text-gray-400 dark:text-neutral-500"]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, Oo, 34))
      ]),
      c.value ? (_(), C("div", Bo, [
        Ro,
        pe(d("input", {
          ref: (P) => h.value = P,
          onKeydown: Ke(p, ["esc"]),
          "onUpdate:modelValue": E[4] || (E[4] = (P) => Ti(f) ? f.value = P : null),
          placeholder: "Search anything..",
          class: "py-0 px-2 w-full border-0 ring-0 outline-0 text-sm text-gray-600 focus:ring-transparent focus:border-transparent dark:focus:ring-transparent dark:focus:border-transparent dark:text-gray-300 bg-transparent",
          type: "text"
        }, null, 40, Ho), [
          [Ue, R(f)]
        ]),
        (_(), C("svg", {
          class: "w-6 h-6 cursor-pointer",
          onClick: p,
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          "stroke-width": "1.5",
          stroke: "currentColor"
        }, Uo))
      ])) : (_(), C("div", {
        key: 0,
        class: "flex bg-white dark:bg-gray-700 items-center rounded p-1 ml-2 w-full",
        onClick: Te(v, ["self"])
      }, [
        (_(), C("svg", {
          onClick: E[3] || (E[3] = (P) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter })),
          class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, No)),
        d("div", Lo, [
          (_(!0), C(ie, null, he(i.value, (P, N) => (_(), C("div", { key: N }, [
            Vo,
            d("span", {
              class: "px-1.5 py-1 text-slate-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-gray-800 rounded cursor-pointer",
              title: P.basename,
              onClick: (K) => R(t).emit("vf-fetch", { q: "index", adapter: o.data.adapter, path: P.path })
            }, V(P.name), 9, zo)
          ]))), 128))
        ])
      ], 8, jo))
    ]));
  }
}), Pe = (o) => Object.entries(o).map((e) => e.map(encodeURIComponent).join("=")).join("&"), Xo = ["onClick"], Fo = /* @__PURE__ */ d("span", { class: "px-1" }, null, -1), qo = {
  name: "VFContextMenu"
}, Go = /* @__PURE__ */ Object.assign(qo, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), n = I(null), { apiUrl: s } = _e(), i = ut({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), c = I([]);
    t.on("vf-context-selected", (f) => {
      c.value = f;
    });
    const h = {
      newfolder: {
        title: "New Folder",
        action: () => {
          t.emit("vf-modal-show", { type: "new-folder" });
        }
      },
      delete: {
        title: "Delete",
        action: () => {
          t.emit("vf-modal-show", { type: "delete", items: c });
        }
      },
      refresh: {
        title: "Refresh",
        action: () => {
          t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
        }
      },
      preview: {
        title: "Preview",
        action: () => {
          t.emit("vf-modal-show", { type: "preview", adapter: e.current.adapter, item: c.value[0] });
        }
      },
      open: {
        title: "Open",
        action: () => {
          t.emit("vf-search-exit"), t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: c.value[0].path });
        }
      },
      download: {
        title: "Download",
        action: () => {
          const f = s.value + "?" + Pe({ q: "download", adapter: c.value[0].adapter, path: c.value[0].path });
          t.emit("vf-download", f);
        }
      },
      archive: {
        title: "Archive",
        action: () => {
          t.emit("vf-modal-show", { type: "archive", items: c });
        }
      },
      unarchive: {
        title: "Unarchive",
        action: () => {
          t.emit("vf-modal-show", { type: "unarchive", items: c });
        }
      },
      rename: {
        title: "Rename",
        action: () => {
          t.emit("vf-modal-show", { type: "rename", items: c });
        }
      }
    }, p = (f) => {
      t.emit("vf-contextmenu-hide"), f.action();
    };
    t.on("vf-contextmenu-show", ({ event: f, area: g, items: b, target: A = null }) => {
      i.items = [], A ? b.length > 1 && b.some((D) => D.path === A.path) ? (i.items.push(h.refresh), i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", b), console.log(b.length + " selected (more than 1 item.)")) : (A.type == "dir" ? i.items.push(h.open) : i.items.push(h.preview), i.items.push(h.rename), i.items.push(h.download), A.mime_type == "application/zip" ? i.items.push(h.unarchive) : i.items.push(h.archive), i.items.push(h.delete), t.emit("vf-context-selected", [A]), console.log(A.type + " is selected")) : (i.items.push(h.refresh), i.items.push(h.newfolder), t.emit("vf-context-selected", []), console.log("no files selected")), v(f, g);
    }), t.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const v = (f, g) => {
      i.active = !0, ft(() => {
        let b = g.getBoundingClientRect(), A = f.pageX, D = f.pageY, E = n.value.offsetHeight, P = n.value.offsetWidth;
        A = b.right - f.pageX + window.scrollX < P ? A - P : A, D = b.bottom - f.pageY + window.scrollY < E ? D - E : D, i.positions = {
          left: A + "px",
          top: D + "px"
        };
      });
    };
    return (f, g) => i.active ? (_(), C("ul", {
      key: 0,
      class: "z-30 absolute text-xs bg-neutral-50 dark:bg-gray-800 dark:text-gray-200 border border-neutral-300 dark:border-gray-600 shadow rounded select-none",
      ref: (b) => n.value = b,
      style: Sr(i.positions)
    }, [
      (_(!0), C(ie, null, he(i.items, (b) => (_(), C("li", {
        class: "px-2 py-1.5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-gray-700",
        key: b.title,
        onClick: (A) => p(b)
      }, [
        Fo,
        d("span", null, V(b.title), 1)
      ], 8, Xo))), 128))
    ], 4)) : re("", !0);
  }
}), Jo = /* @__PURE__ */ d("iframe", {
  id: "download_frame",
  style: { display: "none" }
}, null, -1), Zo = {
  name: "VueFinder"
}, Qo = /* @__PURE__ */ Object.assign(Zo, {
  props: {
    url: {
      type: [String]
    },
    id: {
      type: String,
      default: "vf"
    },
    dark: {
      type: Boolean,
      default: !1
    }
  },
  setup(o) {
    const e = o, t = Pi();
    ir("emitter", t);
    const { setStore: n, getStore: s } = or(e.id);
    ir("storage", or(e.id));
    const { apiUrl: i, setApiUrl: c } = _e();
    c(e.url);
    const h = ut({ adapter: "local", storages: [], dirname: ".", files: [] }), p = I(s("viewport", "grid")), v = I(s("darkMode", e.dark));
    t.on("vf-darkMode-toggle", () => {
      v.value = !v.value, n("darkMode", v.value);
    });
    const f = I(s("full-screen", !1));
    t.on("vf-fullscreen-toggle", () => {
      f.value = !f.value, n("full-screen", f.value);
    }), t.on("vf-view-toggle", (A) => {
      p.value = A;
    });
    const g = ut({
      active: !1,
      type: "delete",
      data: {}
    });
    t.on("vf-modal-close", () => {
      g.active = !1;
    }), t.on("vf-modal-show", (A) => {
      g.active = !0, g.type = A.type, g.data = A;
    });
    const b = (A) => {
      console.log("local", A), Object.assign(h, A), t.emit("vf-nodes-selected", {}), t.emit("vf-explorer-update");
    };
    return t.on("vf-fetch", (A) => {
      dt(i.value, { params: A }).then((D) => {
        t.emit("vf-modal-close"), b(D);
      });
    }), t.on("vf-download", (A) => {
      document.getElementById("download_frame").src = A, t.emit("vf-modal-close");
    }), ye(() => {
      t.emit("vf-fetch", { q: "index", adapter: s("adapter", h.adapter) });
    }), (A, D) => (_(), C("div", {
      class: de(v.value ? "dark" : "")
    }, [
      d("div", {
        class: de([f.value ? "fixed w-screen inset-0 z-20" : "relative", "border flex flex-col rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-neutral-400 border-neutral-300 dark:border-gray-900 min-w-min select-none"]),
        onMousedown: D[0] || (D[0] = (E) => R(t).emit("vf-contextmenu-hide"))
      }, [
        me(un, { data: h }, null, 8, ["data"]),
        me(Wo, { data: h }, null, 8, ["data"]),
        me(po, {
          view: p.value,
          data: h
        }, null, 8, ["view", "data"]),
        me(Mo, { data: h }, null, 8, ["data"])
      ], 34),
      g.active ? (_(), ne(Ai("v-f-modal-" + g.type), {
        key: 0,
        selection: g.data,
        current: h
      }, null, 8, ["selection", "current"])) : re("", !0),
      me(Go, { current: h }, null, 8, ["current"]),
      Jo
    ], 2));
  }
}), ea = /* @__PURE__ */ d("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, -1), ta = { class: "fixed z-10 inset-0 overflow-y-auto" }, ra = { class: "relative bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl sm:w-full" }, ia = { class: "bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, na = { class: "bg-gray-50 dark:bg-gray-800 dark:border-t dark:border-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, xe = {
  __name: "ModalLayout",
  setup(o) {
    const e = inject("emitter");
    return ye(() => {
      const t = document.querySelector(".v-f-modal input");
      t && t.focus();
    }), (t, n) => (_(), C("div", {
      class: "v-f-modal relative z-30",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: n[1] || (n[1] = Ke((s) => R(e).emit("vf-modal-close"), ["esc"])),
      tabindex: "0"
    }, [
      ea,
      d("div", ta, [
        d("div", {
          class: "flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0",
          onMousedown: n[0] || (n[0] = Te((s) => R(e).emit("vf-modal-close"), ["self"]))
        }, [
          d("div", ra, [
            d("div", ia, [
              nr(t.$slots, "default")
            ]),
            d("div", na, [
              nr(t.$slots, "buttons")
            ])
          ])
        ], 32)
      ])
    ], 32));
  }
}, oa = { class: "sm:flex sm:items-start" }, aa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    })
  ])
], -1), sa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, la = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Delete files", -1), ca = { class: "mt-2" }, ua = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Are you sure you want to delete these files?", -1), da = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, ha = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fa = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), ma = [
  fa
], pa = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ga = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), va = [
  ga
], ba = { class: "ml-1.5" }, ya = /* @__PURE__ */ d("div", { class: "m-auto font-bold text-red-500 text-sm dark:text-red-200 text-center" }, "This action cannot be undone.", -1), wa = {
  name: "VFModalDelete"
}, xa = /* @__PURE__ */ Object.assign(wa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = I(e.selection.items), i = () => {
      s.value.length && t.emit("vf-fetch", {
        q: "delete",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(s.value.map(({ path: c, type: h }) => ({ path: c, type: h })))
      });
    };
    return (c, h) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, delete!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel"),
        ya
      ]),
      default: G(() => [
        d("div", oa, [
          aa,
          d("div", sa, [
            la,
            d("div", ca, [
              ua,
              (_(!0), C(ie, null, he(s.value, (p) => (_(), C("p", da, [
                p.type == "dir" ? (_(), C("svg", ha, ma)) : (_(), C("svg", pa, va)),
                d("span", ba, V(p.basename), 1)
              ]))), 256))
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), _a = { class: "sm:flex sm:items-start" }, Sa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })
  ])
], -1), ka = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Da = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ca = { class: "mt-2" }, Ma = { class: "text-sm text-gray-500" }, $a = {
  name: "VFModalMessage"
}, Ea = /* @__PURE__ */ Object.assign($a, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = inject("emitter");
    return (t, n) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: n[0] || (n[0] = (s) => R(e).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close")
      ]),
      default: G(() => {
        var s, i, c, h;
        return [
          d("div", _a, [
            Sa,
            d("div", ka, [
              d("h3", Da, V((i = (s = o.selection) == null ? void 0 : s.title) != null ? i : "Title"), 1),
              d("div", Ca, [
                d("p", Ma, V((h = (c = o.selection) == null ? void 0 : c.message) != null ? h : "Message") + ".", 1)
              ])
            ])
          ])
        ];
      }),
      _: 1
    }));
  }
}), Ta = { class: "sm:flex sm:items-start" }, Aa = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
    })
  ])
], -1), Pa = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Oa = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New Folder", -1), ja = { class: "mt-2" }, Ia = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new folder", -1), Na = ["onKeyup"], La = {
  name: "VFModalNewFolder"
}, Va = /* @__PURE__ */ Object.assign(La, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = I(""), i = () => {
      s.value != "" && (t.emit("vf-fetch", {
        q: "newfolder",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      }), t.emit("vf-toast-push", { label: "New Folder is created successfully", type: "success" }));
    };
    return (c, h) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", Ta, [
          Aa,
          d("div", Pa, [
            Oa,
            d("div", ja, [
              Ia,
              pe(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => s.value = p),
                onKeyup: Ke(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Folder Name",
                type: "text"
              }, null, 40, Na), [
                [Ue, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), za = { class: "sm:flex sm:items-start" }, Ba = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    })
  ])
], -1), Ra = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Ha = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "New File", -1), Ka = { class: "mt-2" }, Ua = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500" }, "Create a new file", -1), Ya = ["onKeyup"], Wa = {
  name: "VFModalNewFile"
}, Xa = /* @__PURE__ */ Object.assign(Wa, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = I(""), i = () => {
      s.value != "" && t.emit("vf-fetch", {
        q: "newfile",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        name: s.value
      });
    };
    return (c, h) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Create!"),
        d("button", {
          type: "button",
          onClick: h[1] || (h[1] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", za, [
          Ba,
          d("div", Ra, [
            Ha,
            d("div", Ka, [
              Ua,
              pe(d("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => s.value = p),
                onKeyup: Ke(i, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "File Name",
                type: "text"
              }, null, 40, Ya), [
                [Ue, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fa = { class: "flex" }, qa = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Ga = { class: "ml-auto mb-2" }, Ja = {
  key: 0,
  class: "p-2 border font-normal border-gray-200 dark:border-gray-700/50 dark:text-gray-200 rounded min-h-[200px] max-h-[60vh] text-xs overflow-auto"
}, Za = { key: 1 }, Qa = {
  __name: "Text",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, n = I(""), s = I(""), i = I(null), c = I(!1), { apiUrl: h } = _e();
    ye(() => {
      dt(h.value, {
        params: { q: "preview", adapter: t.selection.adapter, path: t.selection.item.path },
        json: !1
      }).then((f) => {
        n.value = f, e("load");
      });
    });
    const p = () => {
      c.value = !c.value, s.value = n.value, c.value == !0 && ft(() => {
        i.value.focus();
      });
    }, v = () => {
      dt(h.value, {
        method: "POST",
        params: { q: "save", adapter: t.selection.adapter, path: t.selection.item.path, content: s.value },
        json: !1
      }).then((f) => {
        n.value = f, e("load"), c.value = !c.value;
      }).catch((f) => console.log(f.statusText));
    };
    return (f, g) => (_(), C(ie, null, [
      d("div", Fa, [
        d("div", qa, V(o.selection.item.basename), 1),
        d("div", Ga, [
          c.value ? (_(), C("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Save")) : re("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: g[0] || (g[0] = (b) => p())
          }, V(c.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", null, [
        c.value ? (_(), C("div", Za, [
          pe(d("textarea", {
            ref: (b) => i.value = b,
            "onUpdate:modelValue": g[1] || (g[1] = (b) => s.value = b),
            class: "w-full p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:selection:bg-gray-500 min-h-[200px] text-xs",
            name: "text",
            id: "",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ue, s.value]
          ])
        ])) : (_(), C("pre", Ja, V(n.value), 1))
      ])
    ], 64));
  }
};
/*!
 * Cropper.js v1.5.12
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-06-12T08:00:17.411Z
 */
function sr(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(o, s).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Dr(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? sr(Object(t), !0).forEach(function(n) {
      rs(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : sr(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function ct(o) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ct = function(e) {
    return typeof e;
  } : ct = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ct(o);
}
function es(o, e) {
  if (!(o instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function lr(o, e) {
  for (var t = 0; t < e.length; t++) {
    var n = e[t];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(o, n.key, n);
  }
}
function ts(o, e, t) {
  return e && lr(o.prototype, e), t && lr(o, t), o;
}
function rs(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function Cr(o) {
  return is(o) || ns(o) || os(o) || as();
}
function is(o) {
  if (Array.isArray(o))
    return _t(o);
}
function ns(o) {
  if (typeof Symbol < "u" && o[Symbol.iterator] != null || o["@@iterator"] != null)
    return Array.from(o);
}
function os(o, e) {
  if (!!o) {
    if (typeof o == "string")
      return _t(o, e);
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor && (t = o.constructor.name), t === "Map" || t === "Set")
      return Array.from(o);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))
      return _t(o, e);
  }
}
function _t(o, e) {
  (e == null || e > o.length) && (e = o.length);
  for (var t = 0, n = new Array(e); t < e; t++)
    n[t] = o[t];
  return n;
}
function as() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var mt = typeof window < "u" && typeof window.document < "u", we = mt ? window : {}, Pt = mt && we.document.documentElement ? "ontouchstart" in we.document.documentElement : !1, Ot = mt ? "PointerEvent" in we : !1, W = "cropper", jt = "all", Mr = "crop", $r = "move", Er = "zoom", $e = "e", Ee = "w", Ve = "s", ke = "n", Fe = "ne", qe = "nw", Ge = "se", Je = "sw", St = "".concat(W, "-crop"), cr = "".concat(W, "-disabled"), le = "".concat(W, "-hidden"), ur = "".concat(W, "-hide"), ss = "".concat(W, "-invisible"), ht = "".concat(W, "-modal"), kt = "".concat(W, "-move"), Qe = "".concat(W, "Action"), st = "".concat(W, "Preview"), It = "crop", Tr = "move", Ar = "none", Dt = "crop", Ct = "cropend", Mt = "cropmove", $t = "cropstart", dr = "dblclick", ls = Pt ? "touchstart" : "mousedown", cs = Pt ? "touchmove" : "mousemove", us = Pt ? "touchend touchcancel" : "mouseup", hr = Ot ? "pointerdown" : ls, fr = Ot ? "pointermove" : cs, mr = Ot ? "pointerup pointercancel" : us, pr = "ready", gr = "resize", vr = "wheel", Et = "zoom", br = "image/jpeg", ds = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, hs = /^data:/, fs = /^data:image\/jpeg;base64,/, ms = /^img|canvas$/i, Pr = 200, Or = 100, yr = {
  viewMode: 0,
  dragMode: It,
  initialAspectRatio: NaN,
  aspectRatio: NaN,
  data: null,
  preview: "",
  responsive: !0,
  restore: !0,
  checkCrossOrigin: !0,
  checkOrientation: !0,
  modal: !0,
  guides: !0,
  center: !0,
  highlight: !0,
  background: !0,
  autoCrop: !0,
  autoCropArea: 0.8,
  movable: !0,
  rotatable: !0,
  scalable: !0,
  zoomable: !0,
  zoomOnTouch: !0,
  zoomOnWheel: !0,
  wheelZoomRatio: 0.1,
  cropBoxMovable: !0,
  cropBoxResizable: !0,
  toggleDragModeOnDblclick: !0,
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: Pr,
  minContainerHeight: Or,
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, ps = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', gs = Number.isNaN || we.isNaN;
function z(o) {
  return typeof o == "number" && !gs(o);
}
var wr = function(e) {
  return e > 0 && e < 1 / 0;
};
function yt(o) {
  return typeof o > "u";
}
function Ae(o) {
  return ct(o) === "object" && o !== null;
}
var vs = Object.prototype.hasOwnProperty;
function ze(o) {
  if (!Ae(o))
    return !1;
  try {
    var e = o.constructor, t = e.prototype;
    return e && t && vs.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function se(o) {
  return typeof o == "function";
}
var bs = Array.prototype.slice;
function jr(o) {
  return Array.from ? Array.from(o) : bs.call(o);
}
function Q(o, e) {
  return o && se(e) && (Array.isArray(o) || z(o.length) ? jr(o).forEach(function(t, n) {
    e.call(o, t, n, o);
  }) : Ae(o) && Object.keys(o).forEach(function(t) {
    e.call(o, o[t], t, o);
  })), o;
}
var X = Object.assign || function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
    n[s - 1] = arguments[s];
  return Ae(e) && n.length > 0 && n.forEach(function(i) {
    Ae(i) && Object.keys(i).forEach(function(c) {
      e[c] = i[c];
    });
  }), e;
}, ys = /\.\d*(?:0|9){12}\d*$/;
function Re(o) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return ys.test(o) ? Math.round(o * e) / e : o;
}
var ws = /^width|height|left|top|marginLeft|marginTop$/;
function De(o, e) {
  var t = o.style;
  Q(e, function(n, s) {
    ws.test(s) && z(n) && (n = "".concat(n, "px")), t[s] = n;
  });
}
function xs(o, e) {
  return o.classList ? o.classList.contains(e) : o.className.indexOf(e) > -1;
}
function te(o, e) {
  if (!!e) {
    if (z(o.length)) {
      Q(o, function(n) {
        te(n, e);
      });
      return;
    }
    if (o.classList) {
      o.classList.add(e);
      return;
    }
    var t = o.className.trim();
    t ? t.indexOf(e) < 0 && (o.className = "".concat(t, " ").concat(e)) : o.className = e;
  }
}
function be(o, e) {
  if (!!e) {
    if (z(o.length)) {
      Q(o, function(t) {
        be(t, e);
      });
      return;
    }
    if (o.classList) {
      o.classList.remove(e);
      return;
    }
    o.className.indexOf(e) >= 0 && (o.className = o.className.replace(e, ""));
  }
}
function Be(o, e, t) {
  if (!!e) {
    if (z(o.length)) {
      Q(o, function(n) {
        Be(n, e, t);
      });
      return;
    }
    t ? te(o, e) : be(o, e);
  }
}
var _s = /([a-z\d])([A-Z])/g;
function Nt(o) {
  return o.replace(_s, "$1-$2").toLowerCase();
}
function Tt(o, e) {
  return Ae(o[e]) ? o[e] : o.dataset ? o.dataset[e] : o.getAttribute("data-".concat(Nt(e)));
}
function et(o, e, t) {
  Ae(t) ? o[e] = t : o.dataset ? o.dataset[e] = t : o.setAttribute("data-".concat(Nt(e)), t);
}
function Ss(o, e) {
  if (Ae(o[e]))
    try {
      delete o[e];
    } catch {
      o[e] = void 0;
    }
  else if (o.dataset)
    try {
      delete o.dataset[e];
    } catch {
      o.dataset[e] = void 0;
    }
  else
    o.removeAttribute("data-".concat(Nt(e)));
}
var Ir = /\s\s*/, Nr = function() {
  var o = !1;
  if (mt) {
    var e = !1, t = function() {
    }, n = Object.defineProperty({}, "once", {
      get: function() {
        return o = !0, e;
      },
      set: function(i) {
        e = i;
      }
    });
    we.addEventListener("test", t, n), we.removeEventListener("test", t, n);
  }
  return o;
}();
function fe(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(Ir).forEach(function(i) {
    if (!Nr) {
      var c = o.listeners;
      c && c[i] && c[i][t] && (s = c[i][t], delete c[i][t], Object.keys(c[i]).length === 0 && delete c[i], Object.keys(c).length === 0 && delete o.listeners);
    }
    o.removeEventListener(i, s, n);
  });
}
function ue(o, e, t) {
  var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, s = t;
  e.trim().split(Ir).forEach(function(i) {
    if (n.once && !Nr) {
      var c = o.listeners, h = c === void 0 ? {} : c;
      s = function() {
        delete h[i][t], o.removeEventListener(i, s, n);
        for (var v = arguments.length, f = new Array(v), g = 0; g < v; g++)
          f[g] = arguments[g];
        t.apply(o, f);
      }, h[i] || (h[i] = {}), h[i][t] && o.removeEventListener(i, h[i][t], n), h[i][t] = s, o.listeners = h;
    }
    o.addEventListener(i, s, n);
  });
}
function He(o, e, t) {
  var n;
  return se(Event) && se(CustomEvent) ? n = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(e, !0, !0, t)), o.dispatchEvent(n);
}
function Lr(o) {
  var e = o.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var wt = we.location, ks = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function xr(o) {
  var e = o.match(ks);
  return e !== null && (e[1] !== wt.protocol || e[2] !== wt.hostname || e[3] !== wt.port);
}
function _r(o) {
  var e = "timestamp=".concat(new Date().getTime());
  return o + (o.indexOf("?") === -1 ? "?" : "&") + e;
}
function Ze(o) {
  var e = o.rotate, t = o.scaleX, n = o.scaleY, s = o.translateX, i = o.translateY, c = [];
  z(s) && s !== 0 && c.push("translateX(".concat(s, "px)")), z(i) && i !== 0 && c.push("translateY(".concat(i, "px)")), z(e) && e !== 0 && c.push("rotate(".concat(e, "deg)")), z(t) && t !== 1 && c.push("scaleX(".concat(t, ")")), z(n) && n !== 1 && c.push("scaleY(".concat(n, ")"));
  var h = c.length ? c.join(" ") : "none";
  return {
    WebkitTransform: h,
    msTransform: h,
    transform: h
  };
}
function Ds(o) {
  var e = Dr({}, o), t = 0;
  return Q(o, function(n, s) {
    delete e[s], Q(e, function(i) {
      var c = Math.abs(n.startX - i.startX), h = Math.abs(n.startY - i.startY), p = Math.abs(n.endX - i.endX), v = Math.abs(n.endY - i.endY), f = Math.sqrt(c * c + h * h), g = Math.sqrt(p * p + v * v), b = (g - f) / f;
      Math.abs(b) > Math.abs(t) && (t = b);
    });
  }), t;
}
function lt(o, e) {
  var t = o.pageX, n = o.pageY, s = {
    endX: t,
    endY: n
  };
  return e ? s : Dr({
    startX: t,
    startY: n
  }, s);
}
function Cs(o) {
  var e = 0, t = 0, n = 0;
  return Q(o, function(s) {
    var i = s.startX, c = s.startY;
    e += i, t += c, n += 1;
  }), e /= n, t /= n, {
    pageX: e,
    pageY: t
  };
}
function Ce(o) {
  var e = o.aspectRatio, t = o.height, n = o.width, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", i = wr(n), c = wr(t);
  if (i && c) {
    var h = t * e;
    s === "contain" && h > n || s === "cover" && h < n ? t = n / e : n = t * e;
  } else
    i ? t = n / e : c && (n = t * e);
  return {
    width: n,
    height: t
  };
}
function Ms(o) {
  var e = o.width, t = o.height, n = o.degree;
  if (n = Math.abs(n) % 180, n === 90)
    return {
      width: t,
      height: e
    };
  var s = n % 90 * Math.PI / 180, i = Math.sin(s), c = Math.cos(s), h = e * c + t * i, p = e * i + t * c;
  return n > 90 ? {
    width: p,
    height: h
  } : {
    width: h,
    height: p
  };
}
function $s(o, e, t, n) {
  var s = e.aspectRatio, i = e.naturalWidth, c = e.naturalHeight, h = e.rotate, p = h === void 0 ? 0 : h, v = e.scaleX, f = v === void 0 ? 1 : v, g = e.scaleY, b = g === void 0 ? 1 : g, A = t.aspectRatio, D = t.naturalWidth, E = t.naturalHeight, P = n.fillColor, N = P === void 0 ? "transparent" : P, K = n.imageSmoothingEnabled, H = K === void 0 ? !0 : K, ae = n.imageSmoothingQuality, J = ae === void 0 ? "low" : ae, y = n.maxWidth, O = y === void 0 ? 1 / 0 : y, $ = n.maxHeight, U = $ === void 0 ? 1 / 0 : $, B = n.minWidth, ee = B === void 0 ? 0 : B, oe = n.minHeight, ge = oe === void 0 ? 0 : oe, Y = document.createElement("canvas"), q = Y.getContext("2d"), ve = Ce({
    aspectRatio: A,
    width: O,
    height: U
  }), Oe = Ce({
    aspectRatio: A,
    width: ee,
    height: ge
  }, "cover"), Ye = Math.min(ve.width, Math.max(Oe.width, D)), We = Math.min(ve.height, Math.max(Oe.height, E)), tt = Ce({
    aspectRatio: s,
    width: O,
    height: U
  }), rt = Ce({
    aspectRatio: s,
    width: ee,
    height: ge
  }, "cover"), it = Math.min(tt.width, Math.max(rt.width, i)), je = Math.min(tt.height, Math.max(rt.height, c)), pt = [-it / 2, -je / 2, it, je];
  return Y.width = Re(Ye), Y.height = Re(We), q.fillStyle = N, q.fillRect(0, 0, Ye, We), q.save(), q.translate(Ye / 2, We / 2), q.rotate(p * Math.PI / 180), q.scale(f, b), q.imageSmoothingEnabled = H, q.imageSmoothingQuality = J, q.drawImage.apply(q, [o].concat(Cr(pt.map(function(Ie) {
    return Math.floor(Re(Ie));
  })))), q.restore(), Y;
}
var Vr = String.fromCharCode;
function Es(o, e, t) {
  var n = "";
  t += e;
  for (var s = e; s < t; s += 1)
    n += Vr(o.getUint8(s));
  return n;
}
var Ts = /^data:.*,/;
function As(o) {
  var e = o.replace(Ts, ""), t = atob(e), n = new ArrayBuffer(t.length), s = new Uint8Array(n);
  return Q(s, function(i, c) {
    s[c] = t.charCodeAt(c);
  }), n;
}
function Ps(o, e) {
  for (var t = [], n = 8192, s = new Uint8Array(o); s.length > 0; )
    t.push(Vr.apply(null, jr(s.subarray(0, n)))), s = s.subarray(n);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function Os(o) {
  var e = new DataView(o), t;
  try {
    var n, s, i;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var c = e.byteLength, h = 2; h + 1 < c; ) {
        if (e.getUint8(h) === 255 && e.getUint8(h + 1) === 225) {
          s = h;
          break;
        }
        h += 1;
      }
    if (s) {
      var p = s + 4, v = s + 10;
      if (Es(e, p, 4) === "Exif") {
        var f = e.getUint16(v);
        if (n = f === 18761, (n || f === 19789) && e.getUint16(v + 2, n) === 42) {
          var g = e.getUint32(v + 4, n);
          g >= 8 && (i = v + g);
        }
      }
    }
    if (i) {
      var b = e.getUint16(i, n), A, D;
      for (D = 0; D < b; D += 1)
        if (A = i + D * 12 + 2, e.getUint16(A, n) === 274) {
          A += 8, t = e.getUint16(A, n), e.setUint16(A, 1, n);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function js(o) {
  var e = 0, t = 1, n = 1;
  switch (o) {
    case 2:
      t = -1;
      break;
    case 3:
      e = -180;
      break;
    case 4:
      n = -1;
      break;
    case 5:
      e = 90, n = -1;
      break;
    case 6:
      e = 90;
      break;
    case 7:
      e = 90, t = -1;
      break;
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: t,
    scaleY: n
  };
}
var Is = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, n = this.container, s = this.cropper, i = Number(t.minContainerWidth), c = Number(t.minContainerHeight);
    te(s, le), be(e, le);
    var h = {
      width: Math.max(n.offsetWidth, i >= 0 ? i : Pr),
      height: Math.max(n.offsetHeight, c >= 0 ? c : Or)
    };
    this.containerData = h, De(s, {
      width: h.width,
      height: h.height
    }), te(e, le), be(s, le);
  },
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, n = this.options.viewMode, s = Math.abs(t.rotate) % 180 === 90, i = s ? t.naturalHeight : t.naturalWidth, c = s ? t.naturalWidth : t.naturalHeight, h = i / c, p = e.width, v = e.height;
    e.height * h > e.width ? n === 3 ? p = e.height * h : v = e.width / h : n === 3 ? v = e.width / h : p = e.height * h;
    var f = {
      aspectRatio: h,
      naturalWidth: i,
      naturalHeight: c,
      width: p,
      height: v
    };
    this.canvasData = f, this.limited = n === 1 || n === 2, this.limitCanvas(!0, !0), f.width = Math.min(Math.max(f.width, f.minWidth), f.maxWidth), f.height = Math.min(Math.max(f.height, f.minHeight), f.maxHeight), f.left = (e.width - f.width) / 2, f.top = (e.height - f.height) / 2, f.oldLeft = f.left, f.oldTop = f.top, this.initialCanvasData = X({}, f);
  },
  limitCanvas: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, h = n.viewMode, p = i.aspectRatio, v = this.cropped && c;
    if (e) {
      var f = Number(n.minCanvasWidth) || 0, g = Number(n.minCanvasHeight) || 0;
      h > 1 ? (f = Math.max(f, s.width), g = Math.max(g, s.height), h === 3 && (g * p > f ? f = g * p : g = f / p)) : h > 0 && (f ? f = Math.max(f, v ? c.width : 0) : g ? g = Math.max(g, v ? c.height : 0) : v && (f = c.width, g = c.height, g * p > f ? f = g * p : g = f / p));
      var b = Ce({
        aspectRatio: p,
        width: f,
        height: g
      });
      f = b.width, g = b.height, i.minWidth = f, i.minHeight = g, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
    }
    if (t)
      if (h > (v ? 0 : 1)) {
        var A = s.width - i.width, D = s.height - i.height;
        i.minLeft = Math.min(0, A), i.minTop = Math.min(0, D), i.maxLeft = Math.max(0, A), i.maxTop = Math.max(0, D), v && this.limited && (i.minLeft = Math.min(c.left, c.left + (c.width - i.width)), i.minTop = Math.min(c.top, c.top + (c.height - i.height)), i.maxLeft = c.left, i.maxTop = c.top, h === 2 && (i.width >= s.width && (i.minLeft = Math.min(0, A), i.maxLeft = Math.max(0, A)), i.height >= s.height && (i.minTop = Math.min(0, D), i.maxTop = Math.max(0, D))));
      } else
        i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = s.width, i.maxTop = s.height;
  },
  renderCanvas: function(e, t) {
    var n = this.canvasData, s = this.imageData;
    if (t) {
      var i = Ms({
        width: s.naturalWidth * Math.abs(s.scaleX || 1),
        height: s.naturalHeight * Math.abs(s.scaleY || 1),
        degree: s.rotate || 0
      }), c = i.width, h = i.height, p = n.width * (c / n.naturalWidth), v = n.height * (h / n.naturalHeight);
      n.left -= (p - n.width) / 2, n.top -= (v - n.height) / 2, n.width = p, n.height = v, n.aspectRatio = c / h, n.naturalWidth = c, n.naturalHeight = h, this.limitCanvas(!0, !1);
    }
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCanvas(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, De(this.canvas, X({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, n = this.imageData, s = n.naturalWidth * (t.width / t.naturalWidth), i = n.naturalHeight * (t.height / t.naturalHeight);
    X(n, {
      width: s,
      height: i,
      left: (t.width - s) / 2,
      top: (t.height - i) / 2
    }), De(this.image, X({
      width: n.width,
      height: n.height
    }, Ze(X({
      translateX: n.left,
      translateY: n.top
    }, n)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, n = e.aspectRatio || e.initialAspectRatio, s = Number(e.autoCropArea) || 0.8, i = {
      width: t.width,
      height: t.height
    };
    n && (t.height * n > t.width ? i.height = i.width / n : i.width = i.height * n), this.cropBoxData = i, this.limitCropBox(!0, !0), i.width = Math.min(Math.max(i.width, i.minWidth), i.maxWidth), i.height = Math.min(Math.max(i.height, i.minHeight), i.maxHeight), i.width = Math.max(i.minWidth, i.width * s), i.height = Math.max(i.minHeight, i.height * s), i.left = t.left + (t.width - i.width) / 2, i.top = t.top + (t.height - i.height) / 2, i.oldLeft = i.left, i.oldTop = i.top, this.initialCropBoxData = X({}, i);
  },
  limitCropBox: function(e, t) {
    var n = this.options, s = this.containerData, i = this.canvasData, c = this.cropBoxData, h = this.limited, p = n.aspectRatio;
    if (e) {
      var v = Number(n.minCropBoxWidth) || 0, f = Number(n.minCropBoxHeight) || 0, g = h ? Math.min(s.width, i.width, i.width + i.left, s.width - i.left) : s.width, b = h ? Math.min(s.height, i.height, i.height + i.top, s.height - i.top) : s.height;
      v = Math.min(v, s.width), f = Math.min(f, s.height), p && (v && f ? f * p > v ? f = v / p : v = f * p : v ? f = v / p : f && (v = f * p), b * p > g ? b = g / p : g = b * p), c.minWidth = Math.min(v, g), c.minHeight = Math.min(f, b), c.maxWidth = g, c.maxHeight = b;
    }
    t && (h ? (c.minLeft = Math.max(0, i.left), c.minTop = Math.max(0, i.top), c.maxLeft = Math.min(s.width, i.left + i.width) - c.width, c.maxTop = Math.min(s.height, i.top + i.height) - c.height) : (c.minLeft = 0, c.minTop = 0, c.maxLeft = s.width - c.width, c.maxTop = s.height - c.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, n = this.cropBoxData;
    (n.width > n.maxWidth || n.width < n.minWidth) && (n.left = n.oldLeft), (n.height > n.maxHeight || n.height < n.minHeight) && (n.top = n.oldTop), n.width = Math.min(Math.max(n.width, n.minWidth), n.maxWidth), n.height = Math.min(Math.max(n.height, n.minHeight), n.maxHeight), this.limitCropBox(!1, !0), n.left = Math.min(Math.max(n.left, n.minLeft), n.maxLeft), n.top = Math.min(Math.max(n.top, n.minTop), n.maxTop), n.oldLeft = n.left, n.oldTop = n.top, e.movable && e.cropBoxMovable && et(this.face, Qe, n.width >= t.width && n.height >= t.height ? $r : jt), De(this.cropBox, X({
      width: n.width,
      height: n.height
    }, Ze({
      translateX: n.left,
      translateY: n.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), He(this.element, Dt, this.getData());
  }
}, Ns = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, n = this.options.preview, s = t ? this.crossOriginUrl : this.url, i = e.alt || "The image to preview", c = document.createElement("img");
    if (t && (c.crossOrigin = t), c.src = s, c.alt = i, this.viewBox.appendChild(c), this.viewBoxImage = c, !!n) {
      var h = n;
      typeof n == "string" ? h = e.ownerDocument.querySelectorAll(n) : n.querySelector && (h = [n]), this.previews = h, Q(h, function(p) {
        var v = document.createElement("img");
        et(p, st, {
          width: p.offsetWidth,
          height: p.offsetHeight,
          html: p.innerHTML
        }), t && (v.crossOrigin = t), v.src = s, v.alt = i, v.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', p.innerHTML = "", p.appendChild(v);
      });
    }
  },
  resetPreview: function() {
    Q(this.previews, function(e) {
      var t = Tt(e, st);
      De(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, Ss(e, st);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, n = this.cropBoxData, s = n.width, i = n.height, c = e.width, h = e.height, p = n.left - t.left - e.left, v = n.top - t.top - e.top;
    !this.cropped || this.disabled || (De(this.viewBoxImage, X({
      width: c,
      height: h
    }, Ze(X({
      translateX: -p,
      translateY: -v
    }, e)))), Q(this.previews, function(f) {
      var g = Tt(f, st), b = g.width, A = g.height, D = b, E = A, P = 1;
      s && (P = b / s, E = i * P), i && E > A && (P = A / i, D = s * P, E = A), De(f, {
        width: D,
        height: E
      }), De(f.getElementsByTagName("img")[0], X({
        width: c * P,
        height: h * P
      }, Ze(X({
        translateX: -p * P,
        translateY: -v * P
      }, e))));
    }));
  }
}, Ls = {
  bind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    se(t.cropstart) && ue(e, $t, t.cropstart), se(t.cropmove) && ue(e, Mt, t.cropmove), se(t.cropend) && ue(e, Ct, t.cropend), se(t.crop) && ue(e, Dt, t.crop), se(t.zoom) && ue(e, Et, t.zoom), ue(n, hr, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && ue(n, vr, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && ue(n, dr, this.onDblclick = this.dblclick.bind(this)), ue(e.ownerDocument, fr, this.onCropMove = this.cropMove.bind(this)), ue(e.ownerDocument, mr, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && ue(window, gr, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, n = this.cropper;
    se(t.cropstart) && fe(e, $t, t.cropstart), se(t.cropmove) && fe(e, Mt, t.cropmove), se(t.cropend) && fe(e, Ct, t.cropend), se(t.crop) && fe(e, Dt, t.crop), se(t.zoom) && fe(e, Et, t.zoom), fe(n, hr, this.onCropStart), t.zoomable && t.zoomOnWheel && fe(n, vr, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && fe(n, dr, this.onDblclick), fe(e.ownerDocument, fr, this.onCropMove), fe(e.ownerDocument, mr, this.onCropEnd), t.responsive && fe(window, gr, this.onResize);
  }
}, Vs = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, n = this.containerData, s = t.offsetWidth / n.width, i = t.offsetHeight / n.height, c = Math.abs(s - 1) > Math.abs(i - 1) ? s : i;
      if (c !== 1) {
        var h, p;
        e.restore && (h = this.getCanvasData(), p = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(Q(h, function(v, f) {
          h[f] = v * c;
        })), this.setCropBoxData(Q(p, function(v, f) {
          p[f] = v * c;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Ar || this.setDragMode(xs(this.dragBox, St) ? Tr : It);
  },
  wheel: function(e) {
    var t = this, n = Number(this.options.wheelZoomRatio) || 0.1, s = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? s = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? s = -e.wheelDelta / 120 : e.detail && (s = e.detail > 0 ? 1 : -1), this.zoom(-s * n, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, n = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (z(t) && t !== 1 || z(n) && n !== 0 || e.ctrlKey))) {
      var s = this.options, i = this.pointers, c;
      e.changedTouches ? Q(e.changedTouches, function(h) {
        i[h.identifier] = lt(h);
      }) : i[e.pointerId || 0] = lt(e), Object.keys(i).length > 1 && s.zoomable && s.zoomOnTouch ? c = Er : c = Tt(e.target, Qe), !!ds.test(c) && He(this.element, $t, {
        originalEvent: e,
        action: c
      }) !== !1 && (e.preventDefault(), this.action = c, this.cropping = !1, c === Mr && (this.cropping = !0, te(this.dragBox, ht)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var n = this.pointers;
      e.preventDefault(), He(this.element, Mt, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? Q(e.changedTouches, function(s) {
        X(n[s.identifier] || {}, lt(s, !0));
      }) : X(n[e.pointerId || 0] || {}, lt(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, n = this.pointers;
      e.changedTouches ? Q(e.changedTouches, function(s) {
        delete n[s.identifier];
      }) : delete n[e.pointerId || 0], t && (e.preventDefault(), Object.keys(n).length || (this.action = ""), this.cropping && (this.cropping = !1, Be(this.dragBox, ht, this.cropped && this.options.modal)), He(this.element, Ct, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, zs = {
  change: function(e) {
    var t = this.options, n = this.canvasData, s = this.containerData, i = this.cropBoxData, c = this.pointers, h = this.action, p = t.aspectRatio, v = i.left, f = i.top, g = i.width, b = i.height, A = v + g, D = f + b, E = 0, P = 0, N = s.width, K = s.height, H = !0, ae;
    !p && e.shiftKey && (p = g && b ? g / b : 1), this.limited && (E = i.minLeft, P = i.minTop, N = E + Math.min(s.width, n.width, n.left + n.width), K = P + Math.min(s.height, n.height, n.top + n.height));
    var J = c[Object.keys(c)[0]], y = {
      x: J.endX - J.startX,
      y: J.endY - J.startY
    }, O = function(U) {
      switch (U) {
        case $e:
          A + y.x > N && (y.x = N - A);
          break;
        case Ee:
          v + y.x < E && (y.x = E - v);
          break;
        case ke:
          f + y.y < P && (y.y = P - f);
          break;
        case Ve:
          D + y.y > K && (y.y = K - D);
          break;
      }
    };
    switch (h) {
      case jt:
        v += y.x, f += y.y;
        break;
      case $e:
        if (y.x >= 0 && (A >= N || p && (f <= P || D >= K))) {
          H = !1;
          break;
        }
        O($e), g += y.x, g < 0 && (h = Ee, g = -g, v -= g), p && (b = g / p, f += (i.height - b) / 2);
        break;
      case ke:
        if (y.y <= 0 && (f <= P || p && (v <= E || A >= N))) {
          H = !1;
          break;
        }
        O(ke), b -= y.y, f += y.y, b < 0 && (h = Ve, b = -b, f -= b), p && (g = b * p, v += (i.width - g) / 2);
        break;
      case Ee:
        if (y.x <= 0 && (v <= E || p && (f <= P || D >= K))) {
          H = !1;
          break;
        }
        O(Ee), g -= y.x, v += y.x, g < 0 && (h = $e, g = -g, v -= g), p && (b = g / p, f += (i.height - b) / 2);
        break;
      case Ve:
        if (y.y >= 0 && (D >= K || p && (v <= E || A >= N))) {
          H = !1;
          break;
        }
        O(Ve), b += y.y, b < 0 && (h = ke, b = -b, f -= b), p && (g = b * p, v += (i.width - g) / 2);
        break;
      case Fe:
        if (p) {
          if (y.y <= 0 && (f <= P || A >= N)) {
            H = !1;
            break;
          }
          O(ke), b -= y.y, f += y.y, g = b * p;
        } else
          O(ke), O($e), y.x >= 0 ? A < N ? g += y.x : y.y <= 0 && f <= P && (H = !1) : g += y.x, y.y <= 0 ? f > P && (b -= y.y, f += y.y) : (b -= y.y, f += y.y);
        g < 0 && b < 0 ? (h = Je, b = -b, g = -g, f -= b, v -= g) : g < 0 ? (h = qe, g = -g, v -= g) : b < 0 && (h = Ge, b = -b, f -= b);
        break;
      case qe:
        if (p) {
          if (y.y <= 0 && (f <= P || v <= E)) {
            H = !1;
            break;
          }
          O(ke), b -= y.y, f += y.y, g = b * p, v += i.width - g;
        } else
          O(ke), O(Ee), y.x <= 0 ? v > E ? (g -= y.x, v += y.x) : y.y <= 0 && f <= P && (H = !1) : (g -= y.x, v += y.x), y.y <= 0 ? f > P && (b -= y.y, f += y.y) : (b -= y.y, f += y.y);
        g < 0 && b < 0 ? (h = Ge, b = -b, g = -g, f -= b, v -= g) : g < 0 ? (h = Fe, g = -g, v -= g) : b < 0 && (h = Je, b = -b, f -= b);
        break;
      case Je:
        if (p) {
          if (y.x <= 0 && (v <= E || D >= K)) {
            H = !1;
            break;
          }
          O(Ee), g -= y.x, v += y.x, b = g / p;
        } else
          O(Ve), O(Ee), y.x <= 0 ? v > E ? (g -= y.x, v += y.x) : y.y >= 0 && D >= K && (H = !1) : (g -= y.x, v += y.x), y.y >= 0 ? D < K && (b += y.y) : b += y.y;
        g < 0 && b < 0 ? (h = Fe, b = -b, g = -g, f -= b, v -= g) : g < 0 ? (h = Ge, g = -g, v -= g) : b < 0 && (h = qe, b = -b, f -= b);
        break;
      case Ge:
        if (p) {
          if (y.x >= 0 && (A >= N || D >= K)) {
            H = !1;
            break;
          }
          O($e), g += y.x, b = g / p;
        } else
          O(Ve), O($e), y.x >= 0 ? A < N ? g += y.x : y.y >= 0 && D >= K && (H = !1) : g += y.x, y.y >= 0 ? D < K && (b += y.y) : b += y.y;
        g < 0 && b < 0 ? (h = qe, b = -b, g = -g, f -= b, v -= g) : g < 0 ? (h = Je, g = -g, v -= g) : b < 0 && (h = Fe, b = -b, f -= b);
        break;
      case $r:
        this.move(y.x, y.y), H = !1;
        break;
      case Er:
        this.zoom(Ds(c), e), H = !1;
        break;
      case Mr:
        if (!y.x || !y.y) {
          H = !1;
          break;
        }
        ae = Lr(this.cropper), v = J.startX - ae.left, f = J.startY - ae.top, g = i.minWidth, b = i.minHeight, y.x > 0 ? h = y.y > 0 ? Ge : Fe : y.x < 0 && (v -= g, h = y.y > 0 ? Je : qe), y.y < 0 && (f -= b), this.cropped || (be(this.cropBox, le), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    H && (i.width = g, i.height = b, i.left = v, i.top = f, this.action = h, this.renderCropBox()), Q(c, function($) {
      $.startX = $.endX, $.startY = $.endY;
    });
  }
}, Bs = {
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && te(this.dragBox, ht), be(this.cropBox, le), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = X({}, this.initialImageData), this.canvasData = X({}, this.initialCanvasData), this.cropBoxData = X({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  clear: function() {
    return this.cropped && !this.disabled && (X(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), be(this.dragBox, ht), te(this.cropBox, le)), this;
  },
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, Q(this.previews, function(n) {
      n.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, be(this.cropper, cr)), this;
  },
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, te(this.cropper, cr)), this;
  },
  destroy: function() {
    var e = this.element;
    return e[W] ? (e[W] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = n.left, i = n.top;
    return this.moveTo(yt(e) ? e : s + Number(e), yt(t) ? t : i + Number(t));
  },
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.canvasData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (z(e) && (n.left = e, s = !0), z(t) && (n.top = t, s = !0), s && this.renderCanvas(!0)), this;
  },
  zoom: function(e, t) {
    var n = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(n.width * e / n.naturalWidth, null, t);
  },
  zoomTo: function(e, t, n) {
    var s = this.options, i = this.canvasData, c = i.width, h = i.height, p = i.naturalWidth, v = i.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && s.zoomable) {
      var f = p * e, g = v * e;
      if (He(this.element, Et, {
        ratio: e,
        oldRatio: c / p,
        originalEvent: n
      }) === !1)
        return this;
      if (n) {
        var b = this.pointers, A = Lr(this.cropper), D = b && Object.keys(b).length ? Cs(b) : {
          pageX: n.pageX,
          pageY: n.pageY
        };
        i.left -= (f - c) * ((D.pageX - A.left - i.left) / c), i.top -= (g - h) * ((D.pageY - A.top - i.top) / h);
      } else
        ze(t) && z(t.x) && z(t.y) ? (i.left -= (f - c) * ((t.x - i.left) / c), i.top -= (g - h) * ((t.y - i.top) / h)) : (i.left -= (f - c) / 2, i.top -= (g - h) / 2);
      i.width = f, i.height = g, this.renderCanvas(!0);
    }
    return this;
  },
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  rotateTo: function(e) {
    return e = Number(e), z(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, z(t) ? t : 1);
  },
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(z(t) ? t : 1, e);
  },
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, n = this.imageData, s = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (z(e) && (n.scaleX = e, s = !0), z(t) && (n.scaleY = t, s = !0), s && this.renderCanvas(!0, !0)), this;
  },
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, n = this.imageData, s = this.canvasData, i = this.cropBoxData, c;
    if (this.ready && this.cropped) {
      c = {
        x: i.left - s.left,
        y: i.top - s.top,
        width: i.width,
        height: i.height
      };
      var h = n.width / n.naturalWidth;
      if (Q(c, function(f, g) {
        c[g] = f / h;
      }), e) {
        var p = Math.round(c.y + c.height), v = Math.round(c.x + c.width);
        c.x = Math.round(c.x), c.y = Math.round(c.y), c.width = v - c.x, c.height = p - c.y;
      }
    } else
      c = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (c.rotate = n.rotate || 0), t.scalable && (c.scaleX = n.scaleX || 1, c.scaleY = n.scaleY || 1), c;
  },
  setData: function(e) {
    var t = this.options, n = this.imageData, s = this.canvasData, i = {};
    if (this.ready && !this.disabled && ze(e)) {
      var c = !1;
      t.rotatable && z(e.rotate) && e.rotate !== n.rotate && (n.rotate = e.rotate, c = !0), t.scalable && (z(e.scaleX) && e.scaleX !== n.scaleX && (n.scaleX = e.scaleX, c = !0), z(e.scaleY) && e.scaleY !== n.scaleY && (n.scaleY = e.scaleY, c = !0)), c && this.renderCanvas(!0, !0);
      var h = n.width / n.naturalWidth;
      z(e.x) && (i.left = e.x * h + s.left), z(e.y) && (i.top = e.y * h + s.top), z(e.width) && (i.width = e.width * h), z(e.height) && (i.height = e.height * h), this.setCropBoxData(i);
    }
    return this;
  },
  getContainerData: function() {
    return this.ready ? X({}, this.containerData) : {};
  },
  getImageData: function() {
    return this.sized ? X({}, this.imageData) : {};
  },
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && Q(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
      t[n] = e[n];
    }), t;
  },
  setCanvasData: function(e) {
    var t = this.canvasData, n = t.aspectRatio;
    return this.ready && !this.disabled && ze(e) && (z(e.left) && (t.left = e.left), z(e.top) && (t.top = e.top), z(e.width) ? (t.width = e.width, t.height = e.width / n) : z(e.height) && (t.height = e.height, t.width = e.height * n), this.renderCanvas(!0)), this;
  },
  getCropBoxData: function() {
    var e = this.cropBoxData, t;
    return this.ready && this.cropped && (t = {
      left: e.left,
      top: e.top,
      width: e.width,
      height: e.height
    }), t || {};
  },
  setCropBoxData: function(e) {
    var t = this.cropBoxData, n = this.options.aspectRatio, s, i;
    return this.ready && this.cropped && !this.disabled && ze(e) && (z(e.left) && (t.left = e.left), z(e.top) && (t.top = e.top), z(e.width) && e.width !== t.width && (s = !0, t.width = e.width), z(e.height) && e.height !== t.height && (i = !0, t.height = e.height), n && (s ? t.height = t.width / n : i && (t.width = t.height * n)), this.renderCropBox()), this;
  },
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, n = $s(this.image, this.imageData, t, e);
    if (!this.cropped)
      return n;
    var s = this.getData(), i = s.x, c = s.y, h = s.width, p = s.height, v = n.width / Math.floor(t.naturalWidth);
    v !== 1 && (i *= v, c *= v, h *= v, p *= v);
    var f = h / p, g = Ce({
      aspectRatio: f,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), b = Ce({
      aspectRatio: f,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), A = Ce({
      aspectRatio: f,
      width: e.width || (v !== 1 ? n.width : h),
      height: e.height || (v !== 1 ? n.height : p)
    }), D = A.width, E = A.height;
    D = Math.min(g.width, Math.max(b.width, D)), E = Math.min(g.height, Math.max(b.height, E));
    var P = document.createElement("canvas"), N = P.getContext("2d");
    P.width = Re(D), P.height = Re(E), N.fillStyle = e.fillColor || "transparent", N.fillRect(0, 0, D, E);
    var K = e.imageSmoothingEnabled, H = K === void 0 ? !0 : K, ae = e.imageSmoothingQuality;
    N.imageSmoothingEnabled = H, ae && (N.imageSmoothingQuality = ae);
    var J = n.width, y = n.height, O = i, $ = c, U, B, ee, oe, ge, Y;
    O <= -h || O > J ? (O = 0, U = 0, ee = 0, ge = 0) : O <= 0 ? (ee = -O, O = 0, U = Math.min(J, h + O), ge = U) : O <= J && (ee = 0, U = Math.min(h, J - O), ge = U), U <= 0 || $ <= -p || $ > y ? ($ = 0, B = 0, oe = 0, Y = 0) : $ <= 0 ? (oe = -$, $ = 0, B = Math.min(y, p + $), Y = B) : $ <= y && (oe = 0, B = Math.min(p, y - $), Y = B);
    var q = [O, $, U, B];
    if (ge > 0 && Y > 0) {
      var ve = D / h;
      q.push(ee * ve, oe * ve, ge * ve, Y * ve);
    }
    return N.drawImage.apply(N, [n].concat(Cr(q.map(function(Oe) {
      return Math.floor(Re(Oe));
    })))), P;
  },
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !yt(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  setDragMode: function(e) {
    var t = this.options, n = this.dragBox, s = this.face;
    if (this.ready && !this.disabled) {
      var i = e === It, c = t.movable && e === Tr;
      e = i || c ? e : Ar, t.dragMode = e, et(n, Qe, e), Be(n, St, i), Be(n, kt, c), t.cropBoxMovable || (et(s, Qe, e), Be(s, St, i), Be(s, kt, c));
    }
    return this;
  }
}, Rs = we.Cropper, zr = /* @__PURE__ */ function() {
  function o(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (es(this, o), !e || !ms.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = X({}, yr, ze(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return ts(o, [{
    key: "init",
    value: function() {
      var t = this.element, n = t.tagName.toLowerCase(), s;
      if (!t[W]) {
        if (t[W] = this, n === "img") {
          if (this.isImg = !0, s = t.getAttribute("src") || "", this.originalUrl = s, !s)
            return;
          s = t.src;
        } else
          n === "canvas" && window.HTMLCanvasElement && (s = t.toDataURL());
        this.load(s);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var n = this;
      if (!!t) {
        this.url = t, this.imageData = {};
        var s = this.element, i = this.options;
        if (!i.rotatable && !i.scalable && (i.checkOrientation = !1), !i.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (hs.test(t)) {
          fs.test(t) ? this.read(As(t)) : this.clone();
          return;
        }
        var c = new XMLHttpRequest(), h = this.clone.bind(this);
        this.reloading = !0, this.xhr = c, c.onabort = h, c.onerror = h, c.ontimeout = h, c.onprogress = function() {
          c.getResponseHeader("content-type") !== br && c.abort();
        }, c.onload = function() {
          n.read(c.response);
        }, c.onloadend = function() {
          n.reloading = !1, n.xhr = null;
        }, i.checkCrossOrigin && xr(t) && s.crossOrigin && (t = _r(t)), c.open("GET", t, !0), c.responseType = "arraybuffer", c.withCredentials = s.crossOrigin === "use-credentials", c.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var n = this.options, s = this.imageData, i = Os(t), c = 0, h = 1, p = 1;
      if (i > 1) {
        this.url = Ps(t, br);
        var v = js(i);
        c = v.rotate, h = v.scaleX, p = v.scaleY;
      }
      n.rotatable && (s.rotate = c), n.scalable && (s.scaleX = h, s.scaleY = p), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, n = this.url, s = t.crossOrigin, i = n;
      this.options.checkCrossOrigin && xr(n) && (s || (s = "anonymous"), i = _r(n)), this.crossOrigin = s, this.crossOriginUrl = i;
      var c = document.createElement("img");
      s && (c.crossOrigin = s), c.src = i || n, c.alt = t.alt || "The image to crop", this.image = c, c.onload = this.start.bind(this), c.onerror = this.stop.bind(this), te(c, ur), t.parentNode.insertBefore(c, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, n = this.image;
      n.onload = null, n.onerror = null, this.sizing = !0;
      var s = we.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(we.navigator.userAgent), i = function(v, f) {
        X(t.imageData, {
          naturalWidth: v,
          naturalHeight: f,
          aspectRatio: v / f
        }), t.initialImageData = X({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (n.naturalWidth && !s) {
        i(n.naturalWidth, n.naturalHeight);
        return;
      }
      var c = document.createElement("img"), h = document.body || document.documentElement;
      this.sizingImage = c, c.onload = function() {
        i(c.width, c.height), s || h.removeChild(c);
      }, c.src = n.src, s || (c.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", h.appendChild(c));
    }
  }, {
    key: "stop",
    value: function() {
      var t = this.image;
      t.onload = null, t.onerror = null, t.parentNode.removeChild(t), this.image = null;
    }
  }, {
    key: "build",
    value: function() {
      if (!(!this.sized || this.ready)) {
        var t = this.element, n = this.options, s = this.image, i = t.parentNode, c = document.createElement("div");
        c.innerHTML = ps;
        var h = c.querySelector(".".concat(W, "-container")), p = h.querySelector(".".concat(W, "-canvas")), v = h.querySelector(".".concat(W, "-drag-box")), f = h.querySelector(".".concat(W, "-crop-box")), g = f.querySelector(".".concat(W, "-face"));
        this.container = i, this.cropper = h, this.canvas = p, this.dragBox = v, this.cropBox = f, this.viewBox = h.querySelector(".".concat(W, "-view-box")), this.face = g, p.appendChild(s), te(t, le), i.insertBefore(h, t.nextSibling), this.isImg || be(s, ur), this.initPreview(), this.bind(), n.initialAspectRatio = Math.max(0, n.initialAspectRatio) || NaN, n.aspectRatio = Math.max(0, n.aspectRatio) || NaN, n.viewMode = Math.max(0, Math.min(3, Math.round(n.viewMode))) || 0, te(f, le), n.guides || te(f.getElementsByClassName("".concat(W, "-dashed")), le), n.center || te(f.getElementsByClassName("".concat(W, "-center")), le), n.background && te(h, "".concat(W, "-bg")), n.highlight || te(g, ss), n.cropBoxMovable && (te(g, kt), et(g, Qe, jt)), n.cropBoxResizable || (te(f.getElementsByClassName("".concat(W, "-line")), le), te(f.getElementsByClassName("".concat(W, "-point")), le)), this.render(), this.ready = !0, this.setDragMode(n.dragMode), n.autoCrop && this.crop(), this.setData(n.data), se(n.ready) && ue(t, pr, n.ready, {
          once: !0
        }), He(t, pr);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      !this.ready || (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), be(this.element, le));
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = Rs, o;
    }
  }, {
    key: "setDefaults",
    value: function(t) {
      X(yr, ze(t) && t);
    }
  }]), o;
}();
X(zr.prototype, Is, Ns, Ls, Vs, zs, Bs);
const Hs = { class: "flex" }, Ks = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Us = { class: "ml-auto mb-2" }, Ys = { class: "w-full flex justify-center" }, Ws = ["src"], Xs = {
  __name: "Image",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Pe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path }), i = I(null), c = I(null), h = I(!1), p = () => {
      h.value = !h.value, h.value ? c.value = new zr(i.value, {
        crop(f) {
        }
      }) : c.value.destroy();
    }, v = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (f) => {
          dt(n.value, {
            method: "POST",
            params: { q: "upload", adapter: t.selection.adapter, path: t.selection.item.path, file: f },
            name: t.selection.item.basename,
            json: !1
          }).then((g) => {
            i.value.src = s(), p(), e("load");
          }).catch((g) => console.log(g.statusText));
        }
      );
    };
    return onMounted(() => {
      e("load");
    }), (f, g) => (_(), C(ie, null, [
      d("div", Hs, [
        d("h3", Ks, V(o.selection.item.basename), 1),
        d("div", Us, [
          h.value ? (_(), C("button", {
            key: 0,
            onClick: v,
            class: "ml-1 px-2 py-1 rounded border border-transparent shadow-sm bg-blue-700/75 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700/50 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
          }, "Crop")) : re("", !0),
          d("button", {
            class: "ml-1 px-2 py-1 text-blue-500",
            onClick: g[0] || (g[0] = (b) => p())
          }, V(h.value ? "Cancel" : "Edit"), 1)
        ])
      ]),
      d("div", Ys, [
        d("img", {
          ref: (b) => i.value = b,
          class: "max-w-[60vh] max-h-[60vh]",
          src: s(),
          alt: ""
        }, null, 8, Ws)
      ])
    ], 64));
  }
}, Fs = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, qs = /* @__PURE__ */ d("div", null, " Default view.. ", -1), Gs = {
  __name: "Default",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    return ye(() => {
      e("load");
    }), (t, n) => (_(), C(ie, null, [
      d("h3", Fs, V(o.selection.item.basename), 1),
      qs
    ], 64));
  }
}, Js = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, Zs = {
  class: "w-full",
  preload: "",
  controls: ""
}, Qs = ["src"], el = /* @__PURE__ */ Me(" Your browser does not support the video tag. "), tl = {
  __name: "Video",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Pe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, c) => (_(), C(ie, null, [
      d("h3", Js, V(o.selection.item.basename), 1),
      d("div", null, [
        d("video", Zs, [
          d("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Qs),
          el
        ])
      ])
    ], 64));
  }
}, rl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, il = {
  class: "w-full",
  controls: ""
}, nl = ["src"], ol = /* @__PURE__ */ Me(" Your browser does not support the audio element. "), al = {
  __name: "Audio",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Pe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, c) => (_(), C(ie, null, [
      d("h3", rl, V(o.selection.item.basename), 1),
      d("div", null, [
        d("audio", il, [
          d("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, nl),
          ol
        ])
      ])
    ], 64));
  }
}, sl = {
  class: "mb-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, ll = ["data"], cl = ["src"], ul = {
  __name: "Pdf",
  props: {
    selection: Object
  },
  emits: ["load"],
  setup(o, { emit: e }) {
    const t = o, { apiUrl: n } = _e(), s = () => n.value + "?" + Pe({ q: "preview", adapter: t.selection.adapter, path: t.selection.item.path });
    return ye(() => {
      e("load");
    }), (i, c) => (_(), C(ie, null, [
      d("h3", sl, V(o.selection.item.basename), 1),
      d("div", null, [
        d("object", {
          class: "h-[60vh]",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          d("iframe", {
            class: "border-0",
            src: s(),
            width: "100%",
            height: "100%"
          }, `
          <p>
            Your browser does not support PDFs.
            <a href="https://example.com/test.pdf">Download the PDF</a>
            .
          </p>
        `, 8, cl)
        ], 8, ll)
      ])
    ], 64));
  }
}, dl = { class: "sm:flex sm:items-start" }, hl = { class: "mt-3 text-center sm:mt-0 sm:text-left w-full" }, fl = { class: "text-gray-700 dark:text-gray-200 text-sm" }, ml = {
  key: 0,
  class: "flex leading-5"
}, pl = /* @__PURE__ */ d("svg", {
  class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ d("circle", {
    class: "opacity-25 stroke-blue-900 dark:stroke-blue-100",
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    "stroke-width": "4"
  }),
  /* @__PURE__ */ d("path", {
    class: "opacity-75",
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  })
], -1), gl = /* @__PURE__ */ d("span", null, "Loading", -1), vl = [
  pl,
  gl
], bl = {
  name: "VFModalPreview"
}, yl = /* @__PURE__ */ Object.assign(bl, {
  props: {
    selection: Object
  },
  setup(o) {
    const e = o, { apiUrl: t } = _e(), n = inject("emitter"), s = I(!1), i = (h) => {
      var p;
      return ((p = e.selection.item.mime_type) != null ? p : "").startsWith(h);
    }, c = () => {
      const h = t.value + "?" + Pe({ q: "download", adapter: e.selection.adapter, path: e.selection.item.path });
      n.emit("vf-download", h);
    };
    return (h, p) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: p[6] || (p[6] = (v) => R(n).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Close"),
        d("button", {
          type: "button",
          onClick: p[7] || (p[7] = (v) => c()),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Download")
      ]),
      default: G(() => [
        d("div", dl, [
          d("div", hl, [
            d("div", null, [
              i("text") ? (_(), ne(Qa, {
                key: 0,
                selection: o.selection,
                onLoad: p[0] || (p[0] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("image") ? (_(), ne(Xs, {
                key: 1,
                selection: o.selection,
                onLoad: p[1] || (p[1] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("video") ? (_(), ne(tl, {
                key: 2,
                selection: o.selection,
                onLoad: p[2] || (p[2] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("audio") ? (_(), ne(al, {
                key: 3,
                selection: o.selection,
                onLoad: p[3] || (p[3] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : i("application/pdf") ? (_(), ne(ul, {
                key: 4,
                selection: o.selection,
                onLoad: p[4] || (p[4] = (v) => s.value = !0)
              }, null, 8, ["selection"])) : (_(), ne(Gs, {
                key: 5,
                selection: o.selection,
                onLoad: p[5] || (p[5] = (v) => s.value = !0)
              }, null, 8, ["selection"]))
            ]),
            d("div", fl, [
              d("p", null, V(o.selection.item.path), 1),
              d("p", null, "mime_type: " + V(o.selection.item.mime_type), 1),
              s.value == !1 ? (_(), C("div", ml, vl)) : re("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), wl = { class: "sm:flex sm:items-start" }, xl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    })
  ])
], -1), _l = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Sl = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, kl = { class: "mt-2" }, Dl = { class: "flex text-sm text-gray-800 dark:text-gray-400 py-2" }, Cl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ml = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), $l = [
  Ml
], El = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tl = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Al = [
  Tl
], Pl = { class: "ml-1.5" }, Ol = ["onKeyup"], jl = {
  name: "VFModalRename"
}, Il = /* @__PURE__ */ Object.assign(jl, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = I(e.selection.items[0]), i = I(e.selection.items[0].basename), c = () => {
      i.value != "" && t.emit("vf-fetch", {
        q: "rename",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path,
        name: i.value
      });
    };
    return (h, p) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Rename!"),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", wl, [
          xl,
          d("div", _l, [
            d("h3", Sl, "Rename your " + V(s.value.type == "dir" ? "folder" : "file"), 1),
            d("div", kl, [
              d("p", Dl, [
                s.value.type == "dir" ? (_(), C("svg", Cl, $l)) : (_(), C("svg", El, Al)),
                d("span", Pl, V(s.value.basename), 1)
              ]),
              pe(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (v) => i.value = v),
                onKeyup: Ke(c, ["enter"]),
                class: "px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, Ol), [
                [Ue, i.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Nl = { class: "sm:flex sm:items-start" }, Ll = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    })
  ])
], -1), Vl = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, zl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Upload files", -1), Bl = { class: "mt-2" }, Rl = { class: "text-gray-500 mb-1" }, Hl = ["id"], Kl = {
  key: 0,
  class: "py-2"
}, Ul = ["disabled", "onClick"], Yl = {
  name: "VFModalUpload"
}, Wl = /* @__PURE__ */ Object.assign(Yl, {
  props: {
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { apiUrl: n } = _e(), s = I(null), i = I(null), c = I(null), h = I([]), p = I(!0), v = () => {
      s.value.start();
    };
    return ye(() => {
      s.value = new bt.Uploader({
        runtimes: "html5",
        browse_button: c.value,
        container: i.value,
        max_file_size: "10mb",
        multiple_queues: !0,
        file_data_name: "file",
        url: n.value + "?" + Pe({ q: "upload", adapter: e.current.adapter, path: e.current.dirname }),
        init: {
          PostInit: function() {
          },
          FilesAdded: function(f, g) {
            p.value = !1, bt.each(g, function(b) {
              h.value.push({
                id: b.id,
                name: b.name,
                size: bt.formatSize(b.size),
                percent: ""
              });
            });
          },
          UploadProgress: function(f, g) {
            h.value[h.value.findIndex((b) => b.id == g.id)].percent = g.percent + "%";
          },
          UploadComplete: function() {
            p.value = !0, t.emit("vf-fetch", { q: "index", adapter: e.current.adapter, path: e.current.dirname });
          },
          Error: function(f, g) {
          }
        }
      }), s.value.init();
    }), (f, g) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          disabled: p.value,
          onClick: Te(v, ["prevent"]),
          type: "button",
          class: de([p.value ? "bg-red-200 hover:bg-red-200" : "bg-red-600 hover:bg-red-700", "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"])
        }, "Upload!", 10, Ul),
        d("button", {
          type: "button",
          onClick: g[0] || (g[0] = (b) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", Nl, [
          Ll,
          d("div", Vl, [
            zl,
            d("div", Bl, [
              d("div", Rl, [
                (_(!0), C(ie, null, he(h.value, (b) => (_(), C("div", null, [
                  d("div", {
                    id: b.id
                  }, [
                    Me(V(b.name) + " ( " + V(b.size) + ") ", 1),
                    d("b", null, V(b.percent), 1)
                  ], 8, Hl)
                ]))), 256)),
                h.value.length ? re("", !0) : (_(), C("div", Kl, " No files selected!"))
              ]),
              d("div", {
                class: "text-gray-500",
                ref: (b) => i.value = b
              }, [
                d("button", {
                  ref: (b) => c.value = b,
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                }, "Select Files", 512)
              ], 512)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xl = { class: "sm:flex sm:items-start" }, Fl = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), ql = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, Gl = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Archive files", -1), Jl = { class: "mt-2" }, Zl = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Ql = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ec = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), tc = [
  ec
], rc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ic = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), nc = [
  ic
], oc = { class: "ml-1.5" }, ac = /* @__PURE__ */ d("p", { class: "my-1 text-sm text-gray-500" }, "Archive name. (.zip file will be created)", -1), sc = ["onKeyup"], lc = {
  name: "VFModalArchive"
}, cc = /* @__PURE__ */ Object.assign(lc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = I(""), i = I(e.selection.items), c = () => {
      i.value.length && t.emit("vf-fetch", {
        q: "archive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(i.value.map(({ path: h, type: p }) => ({ path: h, type: p }))),
        name: s.value
      });
    };
    return (h, p) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Archive!"),
        d("button", {
          type: "button",
          onClick: p[1] || (p[1] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", Xl, [
          Fl,
          d("div", ql, [
            Gl,
            d("div", Jl, [
              (_(!0), C(ie, null, he(i.value, (v) => (_(), C("p", Zl, [
                v.type == "dir" ? (_(), C("svg", Ql, tc)) : (_(), C("svg", rc, nc)),
                d("span", oc, V(v.basename), 1)
              ]))), 256)),
              ac,
              pe(d("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (v) => s.value = v),
                onKeyup: Ke(c, ["enter"]),
                class: "my-1 px-2 py-1 border rounded dark:bg-gray-500 dark:focus:ring-gray-600 dark:focus:border-gray-600 dark:text-gray-100 w-full",
                placeholder: "Name",
                type: "text"
              }, null, 40, sc), [
                [Ue, s.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), uc = { class: "sm:flex sm:items-start" }, dc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "none",
    "stroke-width": "1.5"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    })
  ])
], -1), hc = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full" }, fc = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Unarchive files", -1), mc = { class: "mt-2" }, pc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, gc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), bc = [
  vc
], yc = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), xc = [
  wc
], _c = { class: "ml-1.5" }, Sc = { class: "my-1 text-sm text-gray-500" }, kc = {
  name: "VFModalUnarchive"
}, Dc = /* @__PURE__ */ Object.assign(kc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage");
    I("");
    const s = I(e.selection.items[0]), i = I([]), c = () => {
      t.emit("vf-fetch", {
        q: "unarchive",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        item: s.value.path
      });
    };
    return (h, p) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: c,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Unarchive!"),
        d("button", {
          type: "button",
          onClick: p[0] || (p[0] = (v) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", uc, [
          dc,
          d("div", hc, [
            fc,
            d("div", mc, [
              (_(!0), C(ie, null, he(i.value, (v) => (_(), C("p", pc, [
                v.type == "dir" ? (_(), C("svg", gc, bc)) : (_(), C("svg", yc, xc)),
                d("span", _c, V(v.basename), 1)
              ]))), 256)),
              d("p", Sc, "Archive will be unarchived at (" + V(o.current.dirname) + ")", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Cc = { class: "sm:flex sm:items-start" }, Mc = /* @__PURE__ */ d("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10" }, [
  /* @__PURE__ */ d("svg", {
    class: "h-6 w-6 stroke-red-600 dark:stroke-red-200",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "2",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ d("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    })
  ])
], -1), $c = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" }, Ec = /* @__PURE__ */ d("h3", {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-400",
  id: "modal-title"
}, "Move files", -1), Tc = { class: "mt-2" }, Ac = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Pc = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), jc = [
  Oc
], Ic = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nc = /* @__PURE__ */ d("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Lc = [
  Nc
], Vc = { class: "ml-1.5" }, zc = /* @__PURE__ */ d("p", { class: "text-sm text-gray-500 pb-1 pt-3" }, "Are you sure you want to move these files to ?", -1), Bc = { class: "flex text-sm text-gray-800 dark:text-gray-400" }, Rc = /* @__PURE__ */ d("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-5 w-5 text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, [
  /* @__PURE__ */ d("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
  })
], -1), Hc = { class: "ml-1.5 overflow-auto" }, Kc = {
  name: "VFModalMove"
}, Uc = /* @__PURE__ */ Object.assign(Kc, {
  props: {
    selection: Object,
    current: Object
  },
  setup(o) {
    const e = o, t = inject("emitter"), { getStore: n } = inject("storage"), s = I(e.selection.items.from), i = () => {
      s.value.length && t.emit("vf-fetch", {
        q: "move",
        adapter: n("adapter", "local"),
        path: e.current.dirname,
        items: JSON.stringify(s.value.map(({ path: c, type: h }) => ({ path: c, type: h }))),
        item: e.selection.items.to.path
      });
    };
    return (c, h) => (_(), ne(xe, null, {
      buttons: G(() => [
        d("button", {
          type: "button",
          onClick: i,
          class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Yes, move!"),
        d("button", {
          type: "button",
          onClick: h[0] || (h[0] = (p) => R(t).emit("vf-modal-close")),
          class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        }, "Cancel")
      ]),
      default: G(() => [
        d("div", Cc, [
          Mc,
          d("div", $c, [
            Ec,
            d("div", Tc, [
              (_(!0), C(ie, null, he(s.value, (p) => (_(), C("p", Ac, [
                p.type == "dir" ? (_(), C("svg", Pc, jc)) : (_(), C("svg", Ic, Lc)),
                d("span", Vc, V(p.path), 1)
              ]))), 256)),
              zc,
              d("p", Bc, [
                Rc,
                d("span", Hc, V(o.selection.items.to.path), 1)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Yc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModalDelete: xa,
  ModalMessage: Ea,
  ModalNewFolder: Va,
  ModalNewFile: Xa,
  ModalPreview: yl,
  ModalRename: Il,
  ModalUpload: Wl,
  ModalArchive: cc,
  ModalUnarchive: Dc,
  ModalMove: Uc
}, Symbol.toStringTag, { value: "Module" })), xt = {
  VueFinder: Qo,
  ...Yc
};
const Fc = {
  install(o) {
    for (const e in xt)
      if (xt.hasOwnProperty(e)) {
        const t = xt[e];
        o.component(t.name, t);
      }
  }
};
export {
  Fc as default
};
