import { defineStore } from 'pinia'
import { markRaw, ref, type Component } from 'vue'

type ActiveModal<Props extends object, ReturnType> = {
  injectedProps: InjectedProps<ReturnType>
  component: Component
  props: Props
  id: string
}

export type InjectedProps<ReturnType> = {
  closeModal: (value: null | ReturnType) => void
}

export const useModalsStore = defineStore('modals', () => {
  const activeModals = ref<Array<ActiveModal<object, null>>>([])

  const dismiss = (modalId: string): void => {
    const modalIndex = activeModals.value.findIndex(modal => modal.id === modalId)
    if (modalIndex !== -1) activeModals.value.splice(modalIndex, 1)
  }

  const dismissAll = (): void => {
    for (const modal of [...activeModals.value]) {
      modal.injectedProps.closeModal(null)
    }
  }

  const launch = <Props extends object, ReturnType>(
    component: Component,
    props: Props
  ): { resolution: Promise<null |ReturnType>, id: string } => {

    const id = crypto.randomUUID()
    const rawComponent = markRaw(component)

    const resolution = new Promise<null | ReturnType>(resolve => {
      const injectedProps: InjectedProps<ReturnType> = {
        closeModal: (value: null | ReturnType) => {
          dismiss(id)
          resolve(value)
        }
      }

      const instance: ActiveModal<Props, ReturnType> = {
        component: rawComponent,
        injectedProps,
        props,
        id
      }

      activeModals.value.push(instance)
    })

    return { resolution, id}
  }

  return {
    dismissAll,
    launch,
    activeModals,
  }
})
