import { markRaw, ref, type Component } from 'vue'
import { defineStore } from 'pinia'

type ActivePanel<Props extends object> = {
  component: Component
  props: Props
  id: string
}

export const usePanelStore = defineStore('panel', () => {
  const activePanel = ref<null | ActivePanel<object>>(null)

  const closeCurrent = (): void => {
    activePanel.value = null
  }

  const show = <Props extends object>(component: Component, props: Props) => {
    activePanel.value = {
      component: markRaw(component),
      id: crypto.randomUUID(),
      props,
    }
  }

  return {
    closeCurrent,
    show,
    activePanel,
  }
})
