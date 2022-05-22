import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {fbapp} from "@/services/firebase.service"
import { createPinia } from "pinia";
import { SetupCalendar } from 'v-calendar';
import 'v-calendar/dist/style.css';
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App);
app.config.productionTip = false;
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(SetupCalendar, {})

app.mount("#app");

