import auth from '@/util/auth'
import { AXIOS } from '@/httpCommons'

export default {
  namespaced: true,
  state: {
    order: {}
  },
  mutations: {
    setOrder (state, payload) {
      state.order = payload
    }
  },
  actions: {
    async getOrder (ctx, id) {
      ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
        if (i) {
          ctx.dispatch('logout')
        }
      })

      let user = JSON.parse(localStorage.getItem('user'))
      if (!user) ctx.dispatch('logout')

      let order = await AXIOS.get('/order/' + id,
        {
          headers: auth()
        })
        .catch(error => {
          console.log(error.response.data)
        })

      console.log(order.data)
      ctx.commit('setOrder', order.data)
    }
  }
}
