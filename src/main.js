import Vue from 'vue'
import VueWait from 'vue-wait'
import { Plugin } from 'vue-fragment'
import Vuelidate from 'vuelidate/src'

import App from './App.vue'
import router from './router'
import store from './store/index'

import './plugins/vuetify'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(Plugin)
Vue.use(VueWait)

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App)
}).$mount('#app')
