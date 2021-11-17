/* eslint-disable no-useless-return */
// import axios from 'axios'
import auth from '@/util/auth'
import router from '@/router'
import { AXIOS } from '@/httpCommons'

export default {
  namespaced: true,
  state: {
    bookings: [],
    booking: {},
    createForm: {},
    availableRoom: [],
    error: {}
  },
  mutations: {
    setBookings (state, payload) {
      state.bookings = payload
    },
    setBooking (state, payload) {
      state.booking = payload
    },
    setNights (state, payload) {
      state.nights = payload
    },
    setCreateForm (state, payload) {
      state.createForm = payload
    },
    setAvailableRooms (state, payload) {
      state.availableRoom = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    async getBookings (ctx) {
      ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
        if (i) {
          ctx.dispatch('logout')
        }
      })

      let user = JSON.parse(localStorage.getItem('user'))
      if (!user) ctx.dispatch('logout')
      let bookings = await AXIOS.get('/booking/', {
        headers: auth()
      })
        .catch((error) => {
          console.log(error.response.data)
        })
      console.log(bookings.data)

      bookings = bookings.data

      let personalBookings = bookings.data.filter(function (el) {
        return el.user.idUser === user.idUser
      })

      if (user.roles[0] !== 'ADMIN') bookings = personalBookings

      ctx.commit('setBookings', bookings)
    },
    async getBooking (ctx, id) {
      ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
        if (i) {
          ctx.dispatch('logout')
        }
      })

      let user = JSON.parse(localStorage.getItem('user'))
      if (!user) ctx.dispatch('logout')

      let booking = await AXIOS.get('/booking/' + id, {
        headers: auth()
      })
        .catch(error => {
          console.log(error.response.data)
        })

      console.log(booking.data)

      ctx.commit('setBooking', booking.data)
    },
    async getAvailableRoom (ctx, date) {
      ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
        if (i) {
          ctx.dispatch('logout')
        }
      })
      const { startDate, endDate } = date
      let rooms = await AXIOS.get(`/booking/room/?start_date=${startDate}&&end_date=${endDate}`, {
        headers: auth()
      })
        .catch(error => {
          console.log(error.response.data)
        })

      console.log(rooms)

      rooms = Array.from(rooms.data)
      rooms = rooms.map(r => ({ ...r, title: `(${r.type.title}) ${r.room_number} - ${r.price} руб` }))

      ctx.commit('setAvailableRooms', rooms)
    },
    async doCreateBooking (ctx) {
      if (confirm('Вы уверены, что бронируете?')) {
        ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
          if (i) {
            ctx.dispatch('logout')
          }
        })

        let user = JSON.parse(localStorage.getItem('user'))

        await AXIOS.post('/booking/', {
          ...ctx.state.createForm,
          user: user.idUser
        }, {
          headers: auth()
        }).then(result => {
          console.log('result from server:\n', result)
          if (result.status === 200) {
            router.push(`/booking/payment/${result.data.id}`)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    async doPayment ({ dispatch }, payment) {
      console.log(payment)
      if (confirm('Вы уверены, что хотите продолжите?')) {
        await AXIOS.post('/payment/', {
          ...payment
        }, {
          headers: auth()
        }).then(result => {
          console.log('result from server:\n', result)
          if (result.status === 200) {
            router.push('/payment/completed')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    async doPaymentCheckout ({ dispatch }, payment) {
      if (confirm('Вы уверены, что хотите продолжите?')) {
        await AXIOS.post('/payment/out', {
          ...payment
        }, {
          headers: auth()
        }).then(result => {
          console.log('result from server:\n', result)
          if (result.status === 200) {
            router.push('/booking/checkout/completed')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
