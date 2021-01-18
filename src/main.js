import Vue from 'vue'
import App from './App.vue'
import {store} from "./store";
import {router} from "@/route";
require("./init.js");
window.axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const status = error.response ? error.response.status : null;

  if (status === 401) {
    var refresh_count = store.getters['user/refreshCount'];
    refresh_count = refresh_count+1;
    store.dispatch('user/updateRefreshCount',refresh_count);
    if(refresh_count>3){
      store.dispatch('user/logout');
      router.push({name:"login"});
    }
    store.dispatch('user/refreshToken').then(()=>{
      return window.axios.request(error.config);
    }).catch((err) =>{
      window.cmsHattApp.showError(err)
    });

  }

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

Vue.component('ht-header',require('./components/Layouts/Header').default);
Vue.component('ht-footer',require('./components/Layouts/Footer').default);
Vue.component('ht-pie-chart',require('./components/Layouts/PieChart').default);





new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
