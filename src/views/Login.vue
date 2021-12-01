<template>
  <v-app>
    <v-content id="login-page">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Авторизация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="submitHandler" id="check-login-form">
                  <v-text-field
                    prepend-icon="fa-user"
                    name="login"
                    v-model="login"
                    label="Имя пользователя"
                    type="text"
                  />
                  <v-text-field
                    prepend-icon="fa-lock"
                    name="password"
                    label="Пароль"
                    id="password"
                    v-model="password"
                    type="password"
                  />
                  <div id="errorField" style="color: red"></div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/register">
                  Регистрация
                  <v-icon right dark>fa-user-plus</v-icon>
                </v-btn>
                <v-btn color="success" type="submit" form="check-login-form">
                  Войти
                  <v-icon right dark>fa-sign-in-alt</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'authComponent',
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['loginSubmitHandler', 'logout']),

    submitHandler () {
      if (this.login !== '' && this.password !== '') {
        this.loginSubmitHandler({
          login: this.login,
          password: this.password
        })
      }
    }
  }

}
</script>

<style scoped>
#login-page {
  background-image: url("../assets/background.jpg");
  background-size: cover;
}
</style>
