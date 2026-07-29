// App
import type { ModalAdHousingGalleryProps, ModalPromptProps } from '@/components/modals/types'
import { useModalsStore } from '@/stores/modals'
// Components
import CompModalAdHousingGallery from '@/components/modals/m-ad-housing-gallery.vue'
import CompModalPrompt from '@/components/modals/m-prompt.vue'

export function useModals () {
  const modalsStore = useModalsStore()

  const adHousingGallery = (props: ModalAdHousingGalleryProps) => {
    return modalsStore.launch<ModalAdHousingGalleryProps>(CompModalAdHousingGallery, props)
  }

  const prompt = (props: ModalPromptProps) => {
    return modalsStore.launch<ModalPromptProps, boolean>(CompModalPrompt, props)
  }

  return {
    adHousingGallery,
    prompt,
  }
}
