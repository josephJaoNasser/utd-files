<template>
  <div class="vuefinder__image-preview">
    <div class="vuefinder__image-preview__header">
      <h3
        class="vuefinder__image-preview__title"
        id="modal-title"
        :title="app.modal.data.item.path"
      >
        {{ app.modal.data.item.basename }}
      </h3>
      <div class="vuefinder__image-preview__actions">
        <VFButton
          @click.native="crop"
          class="vf-btn-sm"
          variant="success"
          :loading="isCropping"
          v-if="showEdit"
        >
          {{ t("Crop") }}
        </VFButton>
        <button
          class="vuefinder__image-preview__edit-button"
          @click="editMode()"
          v-if="app.features.includes(FEATURES.EDIT)"
        >
          {{ showEdit ? t("Cancel") : t("Edit") }}
        </button>
      </div>
    </div>

    <div class="vuefinder__image-preview__image-container">
      <img
        ref="image"
        class="vuefinder__image-preview__image"
        :src="
          app.requester.getPreviewUrl(
            app.modal.data.adapter,
            app.modal.data.item
          )
        "
        alt=""
      />
    </div>

    <message v-if="message.length" @hidden="message = ''" :error="isError">{{
      message
    }}</message>
  </div>
</template>

<script setup>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { inject, onMounted, ref } from "vue";
import Message from "../Message.vue";
import { FEATURES } from "../../features.js";
import VFButton from "../VFButton.vue";

const emit = defineEmits(["success"]);

const app = inject("ServiceContainer");

const { t } = app.i18n;

const image = ref(null);
const cropper = ref(null);
const showEdit = ref(false);
const message = ref("");
const isError = ref(false);
const isCropping = ref(false);

const editMode = () => {
  showEdit.value = !showEdit.value;

  if (showEdit.value) {
    cropper.value = new Cropper(image.value, {
      crop(event) {},
    });
  } else {
    cropper.value.destroy();
  }
};

const crop = () => {
  isCropping.value = true;
  cropper.value
    .getCroppedCanvas({
      width: 795,
      height: 341,
    })
    .toBlob((blob) => {
      message.value = "";
      isError.value = false;
      const body = new FormData();
      body.set("file", blob);
      app.requester
        .send({
          url: "",
          method: "post",
          params: {
            q: "upload",
            adapter: app.modal.data.adapter,
            path: app.modal.data.item.path,
          },
          body,
        })
        .then((data) => {
          isCropping.value = false;
          message.value = t("Updated.");
          image.value.src = app.requester.getPreviewUrl(
            app.modal.data.adapter,
            app.modal.data.item
          );
          editMode();
          emit("success");
        })
        .catch((e) => {
          isCropping.value = false;
          message.value = t(e.message);
          isError.value = true;
        });
    });
};

onMounted(() => {
  emit("success");
});
</script>
