import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

import HighchartsVue from "highcharts-vue";

import "./assets/styles/style.css";
import App from "./App.vue";

import Select from "primevue/select";
import Button from "primevue/button";
import Card from "primevue/card";
import Popover from "primevue/popover";
import Checkbox from "primevue/checkbox";
import Divider from "primevue/divider";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
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
app.use(HighchartsVue);

app.component("Select", Select);
app.component("Button", Button);
app.component("Card", Card);
app.component("Popover", Popover);
app.component("Checkbox", Checkbox);
app.component("Divider", Divider);

app.mount("#app");
