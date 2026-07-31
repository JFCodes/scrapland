// App
import type { ModalAdHousingGalleryProps, ModalPromptProps } from '@/components/modals/types'
import { useModalsStore } from '@/stores/modals'
// Components
import CompModalAdHousingGallery from '@/components/modals/m-ad-housing-gallery.vue'
import CompModalPickTaskType from '@/components/modals/m-pick-task-type.vue'
import CompModalPrompt from '@/components/modals/m-prompt.vue'
import { E_TASK_TYPE } from '@scrapland/data-model'

export function useModals () {
  const modalsStore = useModalsStore()

  const adHousingGallery = (props: ModalAdHousingGalleryProps) => {
    return modalsStore.launch<ModalAdHousingGalleryProps>(CompModalAdHousingGallery, props)
  }

  const pickTaskType = () => {
    return modalsStore.launch<object, null | E_TASK_TYPE>(CompModalPickTaskType, {})
  }

  const prompt = (props: ModalPromptProps) => {
    return modalsStore.launch<ModalPromptProps, boolean>(CompModalPrompt, props)
  }
  
  return {
    adHousingGallery,
    pickTaskType,
    prompt,
  }
}
