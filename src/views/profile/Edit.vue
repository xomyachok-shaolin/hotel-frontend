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
                  <v-toolbar-title>Редактирование профиля</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="firstname"
                      label="Firstname"
                      type="text"
                      v-model="form.first_name"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="lastname"
                      label="Lastname"
                      type="text"
                      v-model="form.last_name"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-phone"
                      name="phone"
                      mask="phone"
                      label="Phone Number"
                      type="text"
                      v-model="form.phone_number"
                    ></v-text-field>
                    <v-textarea
                      prepend-icon="fa-address-card"
                      auto-grow
                      name="address"
                      label="Address"
                      rows="2"
                      v-model="form.address"
                    ></v-textarea>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="error" to="/profile">
                    <v-icon left dark>fa-times</v-icon>Отмена
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="doUpdateProfile">
                    Сохранить
                    <v-icon right dark>fa-edit</v-icon>
                    <template slot="waiting">
        <loading/>
      </template>
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
import { mapState, mapActions, mapMutations } from 'vuex'
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
    })
  },
  methods: {
    ...mapActions(['doUpdateProfile']),
    ...mapMutations(['setUpdateForm']),
    ...mapWaitingActions('user', {
      loadUserData: 'loading user'
    })
  },
  watch: {
    form: {
      handler (val) {
        this.setUpdateForm(val)
      },
      deep: true
    }
  },
  beforeMount () {
    this.form = JSON.parse(localStorage.getItem('user'))

    delete this.form.login
    delete this.form.email
    delete this.form.gender
  }
}
</script>
