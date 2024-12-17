export interface IAlertOptions {
  title?: string
  content?: string
  confirm?: () => Promise<void> | void
  cancel?: () => void
}
