import { createPinia } from 'pinia';
import { createApp } from 'vue';
import vuetify from './plugins/vuetify';
import { router } from './router/index.js';
import App from './App.vue';
import 'vuetify/styles';
import './styles.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount('#app');
