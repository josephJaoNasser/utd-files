<template>
  <ModalLayout>
    <div>
      <ModalHeader :icon="LockSVG" :title="t('Lock the files')"></ModalHeader>
      <div class="vuefinder__lock-modal__content">
        <div class="vuefinder__lock-modal__form">
          <div class="vuefinder__lock-modal__files vf-scrollbar">
            <p v-for="item in items" class="vuefinder__lock-modal__file">
              <svg
                v-if="item.type === 'dir'"
                class="vuefinder__lock-modal__icon vuefinder__lock-modal__icon--dir"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <svg
                v-else
                class="vuefinder__lock-modal__icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span class="vuefinder__lock-modal__file-name">{{
                item.basename
              }}</span>
            </p>
          </div>
          <input
            v-model="password"
            @keyup.enter="lock"
            class="vuefinder__lock-modal__input"
            :placeholder="t('Password')"
            type="password"
          />
          <message v-if="message.length" @hidden="message = ''" error>{{
            message
          }}</message>
        </div>
      </div>
    </div>

    <template v-slot:buttons>
      <VFButton type="button" @click="lock" :loading="isLocking">
        {{ t("Lock") }}
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
const app = inject("ServiceContainer");
const { t } = app.i18n;
import LockSVG from "../icons/lock.svg";
import ModalHeader from "./ModalHeader.vue";
import VFButton from "../VFButton.vue";

const password = ref("");
const message = ref("");
const isLocking = ref(false);

const items = ref(app.modal.data.items);

const lock = () => {
  if (!items.value.length) {
    return;
  }

  if (password.value.length < 6) {
    message.value = t("Please enter a password of at least 6 characters");
    return;
  }

  isLocking.value = true;
  message.value = "";

  const paths = items.value.map(({ path }) => path);
  app.requester
    .lockFiles(paths, password.value)
    .then((res) => {
      isLocking.value = false;
      app.emitter.emit("vf-toast-push", {
        label: t("The file(s) are locked."),
      });
    })
    .catch((err) => {
      console.error(err);
      message.value = t(err.message ?? "Failed to lock file(s)");
      isLocking.value = false;
    });
};
</script>
