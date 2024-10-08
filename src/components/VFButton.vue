<template>
  <button v-bind="$attrs" class="vf-btn" :class="variantClasses[variant]">
    <slot v-if="!loading"> </slot>
    <LoadingSVG v-else />
  </button>
</template>

<script setup>
import LoadingSVG from "./icons/loading.svg";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = {
  primary: "vf-btn-primary",
  secondary: "vf-btn-secondary",
  danger: "vf-btn-danger",
  success: "vf-btn-success",
};
</script>
