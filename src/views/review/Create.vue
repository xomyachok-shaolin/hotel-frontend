<template>
  <v-app>
    <nav-bar/>
    <v-content>
      <v-container fluid>
        <v-layout row wrap justify-center>
          <v-flex xs12 md5>
            <v-card class="elevation-12">
              <v-form>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Написать отзыв</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    label="Заголовок"
                    placeholder="Заголовок"
                    v-model="form.title"
                    :error-messages="error.title"
                  />
                  <v-text-field
                    type="number"
                    max="10"
                    min="0"
                    title="Оценка"
                    label="Поставьте оценку от 1 до 10"
                    v-model="form.score"
                    :error-messages="error.score"
                  ></v-text-field>
                  <v-textarea
                    name="input-7-1"
                    label="Детали"
                    hint="Расскажите нам, что вы о нас думаете"
                    v-model="form.description"
                    :error-messages="error.description"
                  />
                <div id="errorField" style="color: red"></div>
                </v-card-text>
                <v-card-actions>
                  <v-layout justify-center>
                    <v-btn color="success" @click="doReview(id)">
                      Сохранить
                      <v-icon right dark>fa-sign-in-alt</v-icon>
                    </v-btn>
                  </v-layout>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
// import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'

export default {
  name: 'CreateReview',
  props: ['id'],
  data: () => {
    return {
      form: {
        title: '',
        score: '',
        description: ''
      }
    }
  },
  components: {
    NavBar
  },
  computed: {
    ...mapState({
      'error': state => state.review.error
    })
  },
  methods: {
    ...mapActions({
      doReview: 'review/doReview'
    }),
    ...mapMutations({
      setReviewForm: 'review/setReviewForm'
    })
  },
  watch: {
    form: {
      handler (val) {
        this.setReviewForm(val)
      },
      deep: true
    }
  }
}
</script>
