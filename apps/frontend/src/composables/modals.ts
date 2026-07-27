// App
import type { ModalAdHousingGalleryProps } from '@/components/modals/types'
import { useModalsStore } from '@/stores/modals'
// Components
import CompModalAdHousingGallery from '@/components/modals/m-ad-housing-gallery.vue'

export function useModals () {
  const modalsStore = useModalsStore()

  const adHousingGallery = (props: ModalAdHousingGalleryProps) => {
    return modalsStore.launch<ModalAdHousingGalleryProps>(CompModalAdHousingGallery, props)
  }

  return {
    adHousingGallery,
  }
}