<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading booking">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row pa-3>
            <h1>Оплата бронирования</h1>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6 pa-2>
              <v-container fluid>
                <v-card color="blue" dark>
                  <v-card-title primary-title>
                    <div class="headline">Детали платежа</div>
                  </v-card-title>

                  <v-container fluid style="background-color: white;">
                    <v-layout row wrap>
                      <v-flex xs12 md12>
                        <v-select
                          :items="[{id:'01', title:'Наличные'}, {id:'02', title:'Кредитная карта'}]"
                          item-value="id"
                          item-text="title"
                          label="Способ оплаты"
                          title="Способ оплаты"
                          v-model="form.type"
                          light
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 md12 v-if="form.type === '02'">
                        <v-text-field
                          mask="credit-card"
                          label="Кредитная карта"
                          title="Кредитная карта"
                          light
                        />
                      </v-flex>
                      <v-flex xs6 md12 v-if="form.type === '02'">
                        <v-text-field label="CVV" title="CVV" light/>
                      </v-flex>
                      <v-flex xs6 md12 v-if="form.type === '02'">
                        <v-text-field mask="date" label="MM/YY" title="VALID THRU" light/>
                      </v-flex>
                    </v-layout>
                  </v-container>

                  <v-layout row justify-center>
                    <v-btn v-if="(form.type === '01' && isAdmin) || (form.type === '02')"
                      color="success"
                      @click="doPayment({booking_id:id, payment_type: form.type, amount: total})"
                    >Оплатить</v-btn>
                    <v-btn v-if="form.type === '01' && !isAdmin"
                      color="success"
                      @click="doContinue()"
                    >Продолжить</v-btn>
                  </v-layout>
                </v-card>
              </v-container>
            </v-flex>
            <v-flex xs12 sm12 md6 pa-2>
              <v-container fluid>
                <v-card color="blue" dark>
                  <v-card-title primary-title>
                    <div class="headline">Резюме бронирования</div>
                  </v-card-title>
                  <v-list light>
                    <v-list-tile v-for="room in booking.detail" :key="room.id">
                      <v-list-tile-content>
                        <v-list-tile-title>Комната {{room.room.room_number}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{booking.night}} ночей</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action>{{room.room.price * booking.night}} руб</v-list-tile-action>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Итого</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>{{total}} руб</v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-wait>
  </v-app>
</template>

<script>
import router from '@/router'
import { mapState, mapActions, mapGetters } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  props: ['id'],
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {
      form: {
        type: '02'
      }
    }
  },
  computed: {
    ...mapGetters(['isAdmin']),
    ...mapState({
      booking: state => state.booking.booking
    }),
    total () {
      let booking = this.booking.detail || []
      return booking.reduce((a, b) => a + (b.room.price * this.booking.night), 0)
    }
  },
  methods: {
    ...mapWaitingActions('booking', {
      getBooking: 'loading booking'
    }),
    ...mapActions({
      doPayment: 'booking/doPayment'
    }),
    doContinue: function (params) {
      router.push('/payment/completed')
    }
  },
  beforeMount () {
    this.getBooking(this.id)
  }
}
</script>
