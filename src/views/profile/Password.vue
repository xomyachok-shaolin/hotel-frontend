<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading user">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8 lg6>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Изменение пароля</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      prepend-icon="fa-lock"
                      name="password"
                      label="Пароль"
                      type="password"
                      v-model="form.password"
                      :error-messages="match"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-lock"
                      name="cpassword"
                      label="Подтверждение пароля"
                      type="password"
                      v-model="form.cpassword"
                      :error-messages="match"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="error" to="/profile">
                    <v-icon left dark>fa-times</v-icon>Отмена
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="doUpdateProfile" :disabled="disable">
                    Сохранить
                    <v-icon right dark>fa-edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-wait>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Profile',
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {
      form: {}
    }
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      error: state => state.user.error
    }),
    match () {
      return this.form.password !== this.form.cpassword ? ['Password not match'] : []
    },
    disable () {
      return this.form.password !== this.form.cpassword || (this.form.password === '' && this.form.cpassword === '')
    }
  },
  methods: {
    ...mapWaitingActions('user', {
      doGetInfo: 'loading user'
    }),
    ...mapActions(['doUpdateProfile']),
    ...mapMutations(['setUpdateForm'])
  },
  watch: {
    form: {
      handler (v) {
        let user = JSON.parse(localStorage.getItem('user'))
        this.form.idUser = user.idUser
        this.form.login = user.login
        this.setUpdateForm(v)
      },
      deep: true
    }
  }
}
</script>
