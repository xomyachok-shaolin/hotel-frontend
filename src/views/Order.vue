<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading order">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <v-flex md6 xs12>
              <v-card color="blue" dark>
                <v-card-title primary-title>
                  <div class="headline">Чек по заказу №{{id}}</div>
                </v-card-title>
                <v-list light>
                  <v-list-tile v-for="s in order.services" :key="s.id">
                    <v-list-tile-content>
                      <v-list-tile-title>{{s.title}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{s.type}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action>{{s.price}} руб</v-list-tile-action>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-divider></v-divider>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Итого</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>{{order.total_price}} руб</v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-card-actions>
                  <v-btn color="success" to="/booking">Назад</v-btn>
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
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'OrderReceipt',
  props: ['id'],
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {

    }
  },
  computed: {
    ...mapState({
      order: state => state.order.order
    })
  },
  methods: {
    ...mapWaitingActions('order', {
      getOrder: 'loading order'
    })
  },
  beforeMount () {
    this.getOrder(this.id)
  }
}
</script>
