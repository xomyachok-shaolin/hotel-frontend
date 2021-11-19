<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height id="register-page">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card v-if="!getLoaded" class="elevation-12">
              <form ref="form" lazy-validation @submit.prevent="submitHandler" id="register-form">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    v-model="login"
                    prepend-icon="fa-user"
                    name="login"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-inbox"
                    name="email"
                    label="Email Address"
                    type="email"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  />
                  <v-text-field
                    prepend-icon="fa-file-signature"
                    name="first_name"
                    label="First name"
                    type="text"
                    v-model="first_name"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-file-signature"
                    name="last_name"
                    label="Last name"
                    type="text"
                    v-model="last_name"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-phone"
                    mask="phone"
                    name="phone"
                    label="Phone number"
                    type="text"
                    v-model="phone_number"
                  ></v-text-field>
                  <v-textarea
                    prepend-icon="fa-address-card"
                    auto-grow
                    name="address"
                    label="Address"
                    v-model="address"
                    rows="2"
                  ></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" to="/">
                    <v-icon left dark>fa-long-arrow-alt-left</v-icon>Назад
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" type="submit" form="register-form">
                    Сохранить
                    <v-icon right dark>fa-check</v-icon>
                  </v-btn>
                </v-card-actions>
              </form>
            </v-card>
            <loading v-else/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Loading from '@/components/Loading.vue'

import { email, required, minLength, alpha, helpers } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

// Каретка ^ означает совпадение с началом текста, а доллар $ – с концом.
// Квантификатор звёздочка означает 0 или больше количеств повторений.
const alphaName = helpers.regex('alphaName', /^[a-zA-Za-яА-Я]*$/)

export default {
  components: { Loading },
  name: 'registrationComponent',
  data: () => ({
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    login: '',
    email: '',
    password: ''
  }),
  validations: {
    first_name: {
      alphaName,
      required
    },
    last_name: {
      alphaName,
      required
    },
    address: {
      required
    },
    phone_number: {
      alphaName,
      required
    },
    login: {
      alpha,
      required
    },
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(5)
    }
  },
  computed: mapGetters(['getLoaded']),
  methods: {
    ...mapActions(['createUser']),

    submitHandler () {
      if (this.$invalid) {
        this.$touch()
      } else {
        this.createUser({
          first_name: this.first_name,
          last_name: this.last_name,
          address: this.address,
          phone_number: this.phone_number,
          email: this.email,
          login: this.login,
          password: this.password,
          vm: this
        })
      }
    }
  }

}
</script>

<style>
#register-page {
  background-image: url("../assets/background.jpg");
  background-size: cover;
}
</style>
