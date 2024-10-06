<template>
  <div class="vuefinder__folder-loader-indicator">
    <LoadingSVG
      v-if="loading"
      class="vuefinder__folder-loader-indicator--loading"
    />
    <div class="vuefinder__folder-loader-indicator--icon" v-else>
      <SquareMinusSVG
        class="vuefinder__folder-loader-indicator--minus"
        v-if="opened && getLoadedFolder()?.folders.length"
      />
      <SquarePlusSVG
        class="vuefinder__folder-loader-indicator--plus"
        v-if="!opened"
      />
    </div>
  </div>
</template>

<script>
import { ref, inject, watch, computed } from "vue";

import SquarePlusSVG from "./icons/plus.svg";
import SquareMinusSVG from "./icons/minus.svg";
import LoadingSVG from "./icons/loading.svg";
import upsert from "../utils/upsert";

export default {
  props: {
    adapter: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SquarePlusSVG,
    SquareMinusSVG,
    LoadingSVG,
  },
  model: {
    prop: "value",
    event: "input",
  },
  setup(props) {
    const app = inject("ServiceContainer");
    const { t } = app.i18n;
    const opened = computed({
      get: () => props.value,
      set: (value) => emit("input", value),
    });

    const loading = ref(false);

    watch(
      () => opened.value,
      () => {
        if (!getLoadedFolder()?.folders.length) {
          fetchSubFolders();
        }
      }
    );

    const toggleIndicator = () => {
      opened.value = !opened.value;
    };

    const getLoadedFolder = () => {
      return app.treeViewData.find((e) => e.path === props.path);
    };

    const fetchSubFolders = () => {
      loading.value = true;
      app.requester
        .send({
          url: "",
          method: "get",
          params: {
            q: "subfolders",
            adapter: props.adapter,
            path: props.path,
          },
        })
        .then((data) => {
          upsert(app.treeViewData, { path: props.path, ...data });
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      opened,
      loading,
      getLoadedFolder,
      toggleIndicator,
    };
  },
};
</script>
