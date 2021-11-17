import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import navigation from './modules/navigation'
import booking from './modules/booking'
import service from './modules/service'
import review from './modules/review'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    booking,
    service,
    review,
    user,
    order,
    navigation
  }
})
