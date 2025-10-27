import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "./assets/styles/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  },
});

app.mount("#app");
