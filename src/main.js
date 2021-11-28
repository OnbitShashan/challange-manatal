import Vue from 'vue';
import App from '@/app/app.vue';
import vuetify from '@/plugins/vuetify';
import router from '@/app/app-routes';
import VueDebounce from 'vue-debounce';
import store from '@/app/app-state';

Vue.use(VueDebounce);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
