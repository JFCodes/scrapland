// App
import type { UiButtonType } from '@/components/types'

export type ModalAdHousingGalleryProps = {
  images: Array<string>
  activeIndex: number
}

export type ModalPromptProps = {
  onConfirm?: () => void | Promise<void>
  confirmButtonType?: UiButtonType
  closeOnEscape?: boolean
  messages?: Array<string>
  confirmText?: string
  cancelText?: string
  title: string
}
