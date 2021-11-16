<template>
  <v-app>
    <nav-bar/>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Оплата завершена. Спасибо!</v-toolbar-title>
              </v-toolbar>
              <v-container>
                <h2
                  style="color:red; font-size: 2em; text-align:center;"
                >Пожалуйста, регистрируйтесь до 14:00.</h2>Примечание:
                <ol>
                  <li>Документы, удостоверяющие личность, необходимы в процессе регистрации; в противном случае это бронирование будет аннулировано.</li>
                  <li>Если вы выбрали метод наличными, оплатите на стойке регистрации.</li>
                </ol>
              </v-container>
              <v-card-actions>
                <v-layout justify-center>
                  <v-btn color="success" to="/booking">
                    <v-icon left dark>fa-long-arrow-alt-left</v-icon>Назад
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>
