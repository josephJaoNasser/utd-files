<template>
  <div class="wrapper">
    <!-- <div style="font-weight: bold;padding: 10px">Inline select button example</div>
    <vue-finder
      id='my_vuefinder'
      :request="request"
      :max-file-size="maxFileSize"
      :features="features"
      :select-button="handleSelectButton"
      full-screen
    /> -->

    <br />
    <br />
    <div style="font-weight: bold; padding: 10px">External select example</div>
    <vue-finder
      id="my_vuefinder2"
      theme="light"
      :request="request"
      :max-file-size="maxFileSize"
      :features="features"
      @select="handleSelect"
    />

    <button
      class="btn"
      @click="handleButton"
      :disabled="!selectedFiles?.length"
    >
      Show Selected ({{ selectedFiles?.length ?? 0 }} selected)
    </button>

    <div v-show="selectedFiles?.length">
      <h3>Selected Files ({{ selectedFiles?.length }} selected)</h3>
      <ul>
        <li v-for="file in selectedFiles" :key="file.path">
          {{ file }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { FEATURES, FEATURE_ALL_NAMES } from "../src/features.js";

/** @type {import('../src/utils/ajax.js').RequestConfig} */

const request = {
  baseUrl: "https://files.uptodateconnect.com/api/files",
  params: {
    account_id: import.meta.env.VITE_ACCOUNT_ID,
  },
  headers: {
    authorization: "Bearer " + import.meta.env.VITE_TEST_TOKEN,
  },
  // body: { additionalBody1: ["yes"] },
};

const maxFileSize = ref("500MB");

const features = computed(() => {
  const excludedFeatures = [FEATURES.FULL_SCREEN];
  return [...FEATURE_ALL_NAMES].filter(
    (feature) => !excludedFeatures.includes(feature)
  );
});

const selectedFiles = ref([]);

// an example how to show selected files, outside of vuefinder
// you can create a ref object and assign the items to it,
// then with a button click, you can get the selected items easily
const handleSelect = (selection) => {
  selectedFiles.value = selection;
};

const handleButton = () => {
  console.log(selectedFiles.value);
};

const handleSelectButton = {
  // show select button
  active: true,
  // allow multiple selection
  multiple: false,
  // handle click event
  click: (items, event) => {
    if (!items.length) {
      alert("No item selected");
      return;
    }
    alert("Selected: " + items[0].path);
    console.log(items, event);
  },
};
</script>

<style>
body {
  margin: 0;
  background: #eeeeee;
}
.wrapper {
  max-width: 800px;
  margin: 80px auto;
}
.btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  outline: none;
}
</style>
