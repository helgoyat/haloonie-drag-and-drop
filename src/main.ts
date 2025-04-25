import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import DraggableBox from "./components/DraggableBox.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("draggable-box", DraggableBox);

app.mount("#app");
