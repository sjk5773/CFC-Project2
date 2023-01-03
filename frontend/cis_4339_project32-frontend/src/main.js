import { createApp } from 'vue'
// import the root component App from a single-file component
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App) 
 /* root component options */
app.use(router)

app.mount('#app')
