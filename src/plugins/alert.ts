import { createApp, inject } from 'vue'
import type { App, Plugin } from 'vue'
import AlertDialog from '@/components/AlertDialog/index.vue'
import type { IAlertOptions } from '@/resources/interfaces'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $showAlert: (options: IAlertOptions) => void
  }
}

const INJECTION_KEY = Symbol('showAlert')

export const AlertPlugin: Plugin = {
  install(app: App) {
    const alertDiv = document.createElement('div')
    alertDiv.id = 'alert-container'
    document.body.appendChild(alertDiv)

    // Create the alert component
    const alertApp = createApp(AlertDialog)
    const instance = alertApp.mount(alertDiv) as InstanceType<typeof AlertDialog>

    const showAlert = (options: IAlertOptions) => {
      instance.show(options)
    }

    // Add to global properties
    app.config.globalProperties.$showAlert = showAlert

    // Provide for composition API
    app.provide(INJECTION_KEY, showAlert)
  }
}

// Composable for using the alert
export const useAlert = () => {
  const showAlert = inject(INJECTION_KEY) as (options: IAlertOptions) => void
  if (!showAlert) {
    throw new Error('Alert plugin not installed')
  }
  return showAlert
}
