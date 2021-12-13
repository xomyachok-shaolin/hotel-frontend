<template>
  <v-navigation-drawer
    :clipped="clipped"
    :fixed="fixed"
    :mini-variant="mini"
    v-model="drawerOpen"
    app
  >
    <v-list>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="../assets/hotelservice.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{getUserDataProfile.first_name}} {{getUserDataProfile.last_name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile @click="doLogout">
        <v-list-tile-action>
          <v-icon color="red">fa-sign-out-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="red--text">Выйти</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUserDataProfile', 'isLoadDataProfile']),
    ...mapState({
      open: state => state.navigation.drawer.open,
      clipped: state => state.navigation.drawer.clipped,
      fixed: state => state.navigation.drawer.fixed,
      mini: state => state.navigation.drawer.mini,
      items: state => state.navigation.items,
      info: state => state.user.info
    }),
    drawerOpen: {
      get () { return this.open },
      set (v) { this.drawer(v) }
    }
  },
  methods: {
    ...mapMutations({
      drawer: 'navigation/drawerOpen'
    }),
    ...mapActions({
      ...mapActions(['loadUserData']),
      doLogout: 'logout'
    })
  },
  beforeMount () {
    this.loadUserData()
  }
}
</script>

<style>
</style>
