import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./tmui"
import {config} from "./config/config"
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  app.use(tmui, { shareDisable: false, ...config } as Tmui.tmuiConfig)
  return {
    app,
    Pinia
  };
}
