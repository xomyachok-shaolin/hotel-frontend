import auth from '@/util/auth'
import { AXIOS } from '@/httpCommons'
import router from '../../router'

export default {
  namespaced: true,
  state: {
    error: {},
    review: {}
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
    setReviewForm (state, payload) {
      state.review = payload
    }
  },
  actions: {
    async doReview (ctx, id) {
      ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
        if (i) {
          ctx.dispatch('logout')
        }
      })

      await AXIOS.post('/review/', {
        ...ctx.state.review,
        booking_id: id
      }, {
        headers: auth()
      }).then(result => {
        console.log('result from server:\n', result)
        if (result.status === 200) {
          ctx.commit('setReviewForm', {})
          router.push('/review')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    async doEditReview (ctx, id) {
      ctx.dispatch('checkAuthData', null, { root: true }).then((i) => {
        if (i) {
          ctx.dispatch('logout')
        }
      })

      await AXIOS.post(`/review/${id}/`,
        {
          ...ctx.state.review
        }, {
          headers: auth()
        }).then(result => {
        console.log('result from server:\n', result)
        if (result.status === 200) {
          ctx.commit('setReviewForm', {})
          ctx.commit('setError', {})
          router.push('/review')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  getters: {}
}
