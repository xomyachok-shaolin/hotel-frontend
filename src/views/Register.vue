<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height id="register-page">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card v-if="!getLoaded" class="elevation-12">
              <form
                ref="form"
                lazy-validation
                @submit.prevent="submitHandler"
                id="register-form"
              >
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Регистрация</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <p>
                    <v-text-field
                      v-model="login"
                      prepend-icon="fa-user"
                      name="login"
                      label="Логин"
                      type="text"
                      :class="{
                        invalid:
                          ($v.login.$dirty && !$v.login.required) ||
                          ($v.login.$dirty && !$v.login.alpha),
                      }"
                    ></v-text-field>
                    <small
                      v-if="$v.login.$dirty && !$v.login.required"
                      style="color: red"
                      >Поле не может быть пустым</small
                    >
                  </p>
                  <p>
                    <v-text-field
                      prepend-icon="fa-inbox"
                      name="email"
                      label="Электронная почта"
                      type="email"
                      v-model="email"
                      :class="{
                        invalid:
                          ($v.email.$dirty && !$v.email.required) ||
                          ($v.email.$dirty && !$v.email.required),
                      }"
                    />
                    <small
                      v-if="$v.email.$dirty && !$v.email.required"
                      style="color: red"
                      >Поле email не может быть пустым
                    </small>
                    <small
                      v-else-if="$v.email.$dirty && !$v.email.email"
                      style="color: red"
                      >Введите корректный Email</small
                    >
                  </p>

                  <p>
                    <v-text-field
                      prepend-icon="fa-lock"
                      name="password"
                      label="Пароль"
                      type="password"
                      v-model="password"
                      :class="{
                        invalid:
                          ($v.password.$dirty && !$v.password.required) ||
                          ($v.password.$dirty && !$v.password.minLength),
                      }"
                    />
                    <small
                      v-if="$v.password.$dirty && !$v.password.required"
                      style="color: red"
                      >Введите пароль</small
                    >

                    <small
                      v-else-if="$v.password.$dirty && !$v.password.minLength"
                      style="color: red"
                    >
                      Пароль должен быть 5 символов. Сейчас он
                      {{ password.length }}
                    </small>
                  </p>
                  <p>
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="first_name"
                      label="Имя"
                      type="text"
                      v-model="first_name"
                      :class="{
                        invalid:
                          ($v.first_name.$dirty && !$v.first_name.required) ||
                          ($v.first_name.$dirty && !$v.first_name.alphaName),
                      }"
                    />
                    <small
                      v-if="$v.first_name.$dirty && !$v.first_name.required"
                      style="color: red"
                      >Поле не может быть пустым</small
                    >
                    <small
                      v-else-if="
                        $v.first_name.$dirty && !$v.first_name.alphaName
                      "
                      style="color: red"
                      >Имя может содержать только символы кириллицы</small
                    >
                  </p>
                  <p>
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="last_name"
                      label="Фамилия"
                      type="text"
                      v-model="last_name"
                      :class="{
                        invalid:
                          ($v.last_name.$dirty && !$v.last_name.required) ||
                          ($v.last_name.$dirty && !$v.last_name.alphaName),
                      }"
                    ></v-text-field>
                    <small
                      v-if="$v.last_name.$dirty && !$v.last_name.required"
                      style="color: red"
                      >Поле не может быть пустым</small
                    >
                    <small
                      v-else-if="$v.last_name.$dirty && !$v.last_name.alphaName"
                      style="color: red"
                      >Фамилия может содержать только символы кириллицы</small
                    >
                  </p>
                  <p>
                    <v-text-field
                      prepend-icon="fa-phone"
                      mask="phone"
                      name="phone"
                      label="Номер телефона"
                      type="text"
                      v-model="phone_number"
                      :class="{
                        invalid:
                          $v.phone_number.$dirty && !$v.phone_number.required,
                      }"
                    ></v-text-field>
                    <small
                      v-if="$v.phone_number.$dirty && !$v.phone_number.required"
                      style="color: red"
                      >Поле не может быть пустым</small
                    >
                  </p>
                  <p>
                    <v-textarea
                      prepend-icon="fa-address-card"
                      auto-grow
                      name="address"
                      label="Адрес"
                      v-model="address"
                      rows="2"
                      :class="{
                        invalid: $v.address.$dirty && !$v.address.required,
                      }"
                    ></v-textarea>
                    <small
                      v-if="$v.address.$dirty && !$v.address.required"
                      style="color: red"
                      >Поле не может быть пустым</small
                    >
                  </p>
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
            <loading v-else />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Loading from '@/components/Loading.vue'

import {
  email,
  required,
  minLength,
  helpers
} from 'vuelidate/lib/validators'
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
      required
    },
    login: {
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
      if (this.$v.$invalid) {
        this.$v.$touch()
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
  background-image: url('../assets/background.jpg');
  background-size: cover;
}
small {
  margin-left: 35px;
}
</style>
