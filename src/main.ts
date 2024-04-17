import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/index.css';
import App from './App.vue';
import router from './router';
// import vue-panzoom

const app = createApp(App)

app.use(router)
const pinia = createPinia();
app.use(pinia);

app.mount('#app');
