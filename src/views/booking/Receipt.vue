<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading booking">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <v-flex md6 xs12 v-if="permission">
              <v-card color="blue" dark>
                <v-card-title primary-title>
                  <div class="headline">Квитанция о бронировании №{{id}} ({{booking.night}} <template v-if="booking.night===1">ночь</template>
                          <template v-else>ночей</template>)</div>
                </v-card-title>

                <v-list light>
                  <v-list-tile v-for="d in booking.detail" :key="d.id">
                    <v-list-tile-content>
                      <v-list-tile-title>Комната {{d.room.room_number}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{d.room.type.title}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action>{{d.room.price}} руб</v-list-tile-action>
                    </v-list-tile-action>
                  </v-list-tile>

                  <fragment v-for="d in booking.detail" :key="d.id">
                    <fragment v-for="o in d.orders" :key="o.id">
                      <v-list-tile v-for="s in o.services" :key="s.id">
                        <v-list-tile-content>
                          <v-list-tile-title>{{s.title}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{s.type.title}}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                          <v-list-tile-action>{{s.price}} руб</v-list-tile-action>
                        </v-list-tile-action>
                      </v-list-tile>
                    </fragment>
                  </fragment>

                  <v-divider></v-divider>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>Итого</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>{{total}} руб</v-list-tile-action>
                  </v-list-tile>
                </v-list>

                <v-card-actions>
                  <v-btn color="success" to="/booking">Назад</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex v-else>
              <h1 class="red--text">Доступ запрещен</h1>
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
  name: 'Receipt',
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
      booking: state => state.booking.booking
    }),
    total () {
      let booking = this.booking.detail || []
      booking = booking.reduce((a, b) => a + (b.room.price * this.booking.night), 0)

      let service = this.booking.detail || []
      service = service.reduce((a, b) => a + b.orders.reduce((a, b) => a + b.total_price, 0), 0)

      return booking + service
    },
    permission () {
      return !(Object.entries(this.booking).length === 0 && this.booking.constructor === Object)
    }
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
