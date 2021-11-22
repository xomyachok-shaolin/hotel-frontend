<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading booking">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row px-4>
            <h1>Сводная информация о выезде</h1>
          </v-layout>
          <v-layout row wrap v-if="permission">
            <v-flex xs12 sm12 md6 pa-2>
              <v-container fluid>
                <v-card color="blue" dark v-if="total > 0">
                  <v-card-title primary-title>
                    <div class="headline">Детали платежа</div>
                  </v-card-title>

                  <v-container fluid style="background-color: white;">
                    <v-layout row wrap>
                      <v-flex xs12 md12>
                        <v-select
                          item-value="id"
                          :items="[{id: '01', title:'Наличные'}, {id:'02', title:'Кредитная карта'}]"
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
                        <v-text-field mask="date" label="ММ/ГГ" title="VALID THRU" light/>
                      </v-flex>
                    </v-layout>
                  </v-container>

                  <v-layout row justify-center>
                    <v-btn
                      color="success"
                      v-if="(form.type === '01' && isAdmin) || (form.type === '02')"
                      @click="doPayment({booking_id:id, payment_type: form.type, amount: total})"
                    >Оплатить</v-btn>
                  </v-layout>
                </v-card>

                <v-card color="blue" dark v-else>
                  <v-card-title primary-title>
                    <div class="headline">Оплата не требуется</div>
                  </v-card-title>

                  <v-layout row justify-center>
                    <v-btn color="success" @click="checkOut">Освободить номер</v-btn>
                  </v-layout>
                </v-card>
              </v-container>
            </v-flex>
            <v-flex xs12 sm12 md6 pa-2>
              <v-container fluid>
                <v-card color="blue" dark>
                  <v-card-title primary-title>
                    <div class="headline">Резюме бронирования (дополнительные услуги)</div>
                  </v-card-title>
                  <v-list light>
                    <fragment v-for="d in booking.detail" :key="d.id">
                      <fragment v-for="o in d.orders" :key="o.id">
                        <v-list-tile v-for="s in o.services" :key="s.id">
                          <v-list-tile-content>
                            <v-list-tile-title>{{s.title}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{s.type}}</v-list-tile-sub-title>
                          </v-list-tile-content>

                          <v-list-tile-action>
                            <v-list-tile-action>{{s.price}} руб</v-list-tile-action>
                          </v-list-tile-action>
                        </v-list-tile>
                      </fragment>
                    </fragment>
                    <fragment v-if="total > 0">
                      <v-divider></v-divider>

                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-title>Итого</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>{{total}} руб</v-list-tile-action>
                      </v-list-tile>
                    </fragment>
                    <v-list-tile v-else>
                      <v-list-tile-content>
                        <v-list-tile-title>Нет дополнительных услуг</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-else>
            <v-flex>
              <h1 class="red--text">Доступ запрещен</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-wait>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import router from '@/router'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Checkout',
  props: ['id'],
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {
      form: {
        type: '01'
      }
    }
  },
  computed: {
    ...mapGetters(['isAdmin']),
    ...mapState({
      booking: state => state.booking.booking
    }),
    total () {
      let service = this.booking.detail || []
      service = service.reduce((a, b) => a + b.orders.reduce((a, b) => a + b.total_price, 0), 0)

      return service
    },
    permission () {
      console.log(Object.entries(this.booking).length === 0 && this.booking.constructor === Object)
      return !(Object.entries(this.booking).length === 0 && this.booking.constructor === Object)
    }
  },
  methods: {
    ...mapWaitingActions('booking', {
      getBooking: 'loading booking'
    }),
    ...mapActions({
      doPayment: 'booking/doPaymentCheckout',
      doCheckout: 'booking/doCheckout'
    }),
    checkOut () {
      this.doCheckout(this.id)
      router.push('/booking')
    }
  },
  beforeMount () {
    this.getBooking(this.id)
  }
}
</script>
