import Vue from 'vue'
import App from './App.vue'
import {store} from "./store";
import {router} from "@/route";
require("./init.js");


Vue.component('ht-header',require('./components/Layouts/Header').default);
Vue.component('ht-footer',require('./components/Layouts/Footer').default);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
