/* eslint-disable no-unused-vars */
import { AXIOS } from '@/httpCommons'
import auth from '../../util/auth'
import router from '@/router'

export default {
  state: {
    message: '',
    UserDataProfile: [],
    isLoadDataProfile: false,
    info: {},
    update: {},
    loaded: false
  },

  mutations: {
    cleanUserDataProfile (state) {
      state.UserDataProfile = []
    },
    async fillUserDataProfile (state, data) {
      state.UserDataProfile = data
      state.isLoadDataProfile = true
    },
    setUpdateForm (state, payload) {
      state.update = payload
    },
    changeLoaded (state) {
      state.loaded = !state.loaded
    }
  },

  getters: {
    isAuth () {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user === null) {
        return false
      } else {
        return true
      }
    },
    isAdmin () {
      let user = JSON.parse(localStorage.getItem('user'))
      if (typeof user === 'undefined' || user === null) {
        return false
      } else {
        if (user.roles[0] === 'ADMIN') {
          return true
        } else {
          return false
        }
      }
    },
    getUserDataProfile (state) {
      return state.UserDataProfile
    },
    isLoadDataProfile (state) {
      return state.isLoadDataProfile
    },
    getLoaded (state) {
      return state.loaded
    }
  },

  actions: {
    async createUser (ctx, data) {
      ctx.commit('changeLoaded')

      let isErrorExist = false
      let response = await AXIOS.post('/registration/createUser',
        {
          first_name: data.first_name,
          last_name: data.last_name,
          address: data.address,
          phone_number: data.phone_number,
          name: data.name,
          email: data.email,
          login: data.login,
          password: data.password
        }
      ).then(result => {
        ctx.commit('changeLoaded')
        if (result.status === 200) {
          let isErrorExist = true
          let message = result.data.message
          data.vm.$bvModal.msgBoxOk(message, {
            title: 'Регистрация',
            size: 'md',
            buttonSize: 'lg',
            okVariant: 'success',
            okTitle: 'Принять',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
            .then(value => {
              if (value) {
                document.location.href = '/'
              }
            })
        }
      }).catch(error => {
        ctx.commit('changeLoaded')
        console.log(error.response.data)
        let message = error.response.data.message
        setTimeout(() => (data.vm.$bvToast.toast(message, {
          title: 'Ошибка',
          variant: 'danger',
          solid: true
        })), 10)
      }
      )
    },

    checkAuthData () {
      let token = JSON.parse(localStorage.getItem('user'))
      // console.log(token)
      if (token !== null) {
        token = token.jwt
        let jsonJWT = JSON.parse(atob(token.split('.')[1]))
        // console.log(jsonJWT)

        let finish = jsonJWT.exp * 1000
        let curDate = Date.now()
        // console.log("finish: \t" + finish + "\nCurDate:\t" + curDate)

        if (finish >= curDate) {
          return false
        } else {
          return true
        }
      }
      return false
    },

    async loadUserData (ctx) {
      ctx.dispatch('checkAuthData').then(i => {
        if (i) {
          ctx.dispatch('logout')
        }
      })
      let isErrorExist = false

      let user = JSON.parse(localStorage.getItem('user'))
      if (!user) ctx.dispatch('logout')

      let idUser = user.idUser

      let response = await AXIOS.get('/user/' + idUser,
        {
          headers: auth()
        })
        .catch(error => {
          isErrorExist = true
          console.log(error.response.data)
        })

      console.log(response.data)
      ctx.commit('cleanUserDataProfile')
      ctx.commit('fillUserDataProfile', response.data.user)
    },

    async loginSubmitHandler (ctx, data) {
      let response = await AXIOS.post('/authenticate',
        {
          login: data.login,
          password: data.password
        }
      ).then(result => {
        console.log('result from server:\n', result)
        if (result.status === 200) {
          localStorage.setItem('user', JSON.stringify(result.data))
          router.push('/booking')
        }
      }).catch(error => {
        let erMes = document.getElementById('errorField')
        erMes.innerText = error.response.data.message
      })
    },

    logout () {
      localStorage.removeItem('user')
      document.location.href = '/'
    },
    async doUpdateProfile (ctx) {
      ctx.commit('changeLoaded')
      let user = await AXIOS.post('/user/changeBaseUserData',
        {
          ...ctx.state.update
        }, {
          headers: auth()
        }).then(result => {
        console.log('result from server:\n', result)
        if (result.status === 200) {
          router.push('/profile')
        }
      }).catch(error => {
        console.log(error)
      })
      ctx.commit('changeLoaded')
    }
  }
}
