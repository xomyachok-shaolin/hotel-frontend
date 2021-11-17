<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading booking">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row px-5>
            <h1>Детали бронирования №{{booking.id}}</h1>
          </v-layout>
          <v-layout row px-5>
            <h2>{{booking.start_date}} по {{booking.end_date}}</h2>
          </v-layout>
          <v-container fluid grid-list-lg>
            <v-flex xs12 lg12>
              <v-layout row wrap>
                <v-flex xs12 md4 v-for="room in booking.detail" :key="room.id">
                  <v-card color="blue" dark>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Комната №{{ room.room.room_number }}</div>
                        <span>
                          Этаж : {{room.room.floor}}
                          <br>
                          Цена : {{room.room.price}}
                          <br>
                        </span>
                      </div>
                    </v-card-title>
                    <v-card-actions v-if="booking.status === 'Зарегистрировано'">
                       <v-btn color="success" dark :to="`/service/${room.id}`">Услуги</v-btn>
                    </v-card-actions>
                    <v-card-actions v-else>
                      <p>Для использования наших услуг требуется регистрация.</p>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-container>
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
  props: ['id'],
  components: {
    NavBar,
    Loading
  },
  computed: {
    ...mapState({
      booking: state => state.booking.booking
    })
  },
  methods: {
    ...mapWaitingActions('booking', {
      getBooking: 'loading booking'
    })
  },
  beforeMount () {
    this.getBooking(this.id)
  }
}
</script>
