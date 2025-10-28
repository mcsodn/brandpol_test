import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import "./assets/styles/style.css";
import App from "./App.vue";

import Select from "primevue/select";
import Button from "primevue/button";
import Card from "primevue/card";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "light",
      cssLayer: false,
    },
  },
});

app.component("Select", Select);
app.component("Button", Button);
app.component("Card", Card);

app.mount("#app");
