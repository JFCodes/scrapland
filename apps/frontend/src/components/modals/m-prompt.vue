<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
// App
import type { ModalPromptProps } from '@/components/modals/types'
import type { InjectedProps } from '@/stores/modals'
// Components
import CompModalBase from '@/components/modals/m-base.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

const props = defineProps<ModalPromptProps & InjectedProps<boolean>>()

const { t } = useI18n()

const isConfirming = ref(false)

const confirm = async () => {
  if (props.onConfirm) {
    isConfirming.value = true
    try {
      await props.onConfirm()
    } finally {
      isConfirming.value = false
    }
  }

  props.closeModal(true)
}
</script>

<template>
  <CompModalBase
    :close-on-escape-press="closeOnEscape ?? false"
    :width="400" @close="closeModal(false)"
    :is-loading="isConfirming">
    <template #header>
      <p>{{ title }}</p>
    </template>

    <template v-if="messages" #content>
      <p v-for="(message, index) in messages" :key="`message-${index}`">
        {{ message }}
      </p>
    </template>

    <template #footer>
      <div class="--group --group--end">
        <CompUiButton :label="cancelText || t('global.cancel')" @click="closeModal(false)" />
        <CompUiButton
          filled
          :label="confirmText || t('global.confirm')"
          :type="confirmButtonType ?? 'success'"
          @click="confirm" />
      </div>
    </template>
  </CompModalBase>
</template>
