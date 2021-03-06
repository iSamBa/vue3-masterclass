import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

const application = createApp(App)
application.use(router)
const requireComponent = require.context(
  './components',
  true,
  /App[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName =
    baseComponentConfig.name ||
    fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  application.component(baseComponentName, baseComponentConfig)
})
application.mount('#app')
