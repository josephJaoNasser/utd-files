<template>
  <div class="vuefinder__folder-indicator">
    <div class="vuefinder__folder-indicator--icon">
      <SquareMinusSVG class="vuefinder__folder-indicator--minus" v-if="value" />
      <SquarePlusSVG class="vuefinder__folder-indicator--plus" v-if="!value" />
    </div>
  </div>
</template>

<script>
import SquarePlusSVG from "./icons/plus.svg";
import SquareMinusSVG from "./icons/minus.svg";

export default {
  name: "FolderIndicator",
  components: {
    SquarePlusSVG,
    SquareMinusSVG,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    updateValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
