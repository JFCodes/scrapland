import type en from '@/i18n/locales/en'

type StringifyLeaves<T> = {
  [Key in keyof T]: T[Key] extends string
    ? string
    : T[Key] extends readonly unknown[]
      ? T[Key]
      : T[Key] extends object
        ? StringifyLeaves<T[Key]>
        : T[Key]
}

export type MessageSchema = StringifyLeaves<typeof en>
