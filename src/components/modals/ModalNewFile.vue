<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="NewFileSVG" :title="t('New File')"></ModalHeader>
      <div class="vuefinder__new-file-modal__content">
        <div class="vuefinder__new-file-modal__form">
          <p class="vuefinder__new-file-modal__description">
            {{ t("Create a new file") }}
          </p>
          <input
            v-model="name"
            @keyup.enter="createFile"
            class="vuefinder__new-file-modal__input"
            :placeholder="t('File Name')"
            type="text"
          />
          <message v-if="message.length" @hidden="message = ''" error>{{
            message
          }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <VFButton type="button" @click.native="createFile" :loading="isCreating">
        {{ t("Create") }}
      </VFButton>
      <button
        type="button"
        @click="app.modal.close()"
        class="vf-btn vf-btn-secondary"
      >
        {{ t("Cancel") }}
      </button>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from "./ModalLayout.vue";
import { inject, ref } from "vue";
import Message from "../Message.vue";
import ModalHeader from "./ModalHeader.vue";
import NewFileSVG from "../icons/new_file.svg";
import VFButton from "../VFButton.vue";

const app = inject("ServiceContainer");
const { getStore } = app.storage;
const { t } = app.i18n;

const name = ref("");
const message = ref("");
const isCreating = ref(false);

const createFile = () => {
  isCreating.value = true;
  if (name.value !== "") {
    app.emitter.emit("vf-fetch", {
      params: {
        q: "newfile",
        m: "post",
        adapter: app.fs.adapter,
        path: app.fs.data.dirname,
      },
      body: {
        name: name.value,
      },
      onSuccess: () => {
        isCreating.value = false;
        app.emitter.emit("vf-toast-push", {
          label: t("%s is created.", name.value),
        });
      },
      onError: (e) => {
        isCreating.value = false;
        message.value = t(e.message);
      },
    });
  }
};
</script>
