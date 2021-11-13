// import axios from 'axios'
import auth from '@/util/auth'
import { AXIOS } from '@/httpCommons'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    services: [],
    service: {},
    cart: []
  },
  mutations: {
    setServices (state, payload) {
      state.services = payload
    },
    setService (state, payload) {
      state.service = payload
    },
    setCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    async getServices (ctx) {
      ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
        if (i) {
          ctx.dispatch('logout')
        }
      })

      let user = JSON.parse(localStorage.getItem('user'))
      if (!user) ctx.dispatch('logout')

      let service = await AXIOS.get('/order/service/', {
        headers: auth()
      })
        .catch((error) => {
          console.log(error.response.data)
        })
      ctx.commit('setServices', service.data)
    },
    addService ({ state, commit }, service) {
      let id = state.cart.map(s => s.id)
      let cart = state.cart
      if (!id.includes(service.id)) {
        cart.push(service)
        commit('setCart', cart)
      }
    },
    deleteService ({ state, commit }, index) {
      let cart = state.cart
      cart.splice(index, 1)
      commit('setCart', cart)
    },
    async doSubmitOrder ({ state, commit }, id) {
      if (confirm('Вы уверены, что заказываете?')) {
        let order = await AXIOS.post('/order/', {
          booking_room: id,
          service: state.cart.map(s => s.id),
          total_price: state.cart.reduce((a, b) => a + b.price, 0)
        }, {
          headers: auth()
        }).then(result => {
          console.log('result from server:\n', result)
          if (result.status === 200) {
            commit('setCart', [])
            router.push(`/order/${result.data.id}`)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }

  },
  getters: {

  }
}
