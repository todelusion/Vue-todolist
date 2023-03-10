import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import axios from 'axios';

//sweetalert2
import Swal from 'sweetalert2';
window.Swal = Swal;


import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faPlus, faCheck, faTrash);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router, axios);
app.mount("#app");
