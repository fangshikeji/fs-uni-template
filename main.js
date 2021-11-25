import store from './store'
import App from './App'
import http from './utils/http'

import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	app.use(store)
	
	app.config.globalProperties.$http = http
	
  return {
    app
  }
}
