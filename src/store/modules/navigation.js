export default {
  namespaced: true,
  state: {
    drawer: {
      open: false,
      clipped: true,
      fixed: false,
      mini: false
    },
    toolbar: {
      fixed: true,
      clippedLeft: true
    },
    items: [
      { title: 'Booking', icon: 'fa-book', link: '/booking' },
      { title: 'Services', icon: 'fa-concierge-bell', link: '/service' },
      { title: 'Review', icon: 'fa-pencil-alt', link: '/review' },
      { title: 'Profile', icon: 'fa-user', link: '/profile' }
    ]
  },
  mutations: {
    drawerOpen (state, open) {
      state.drawer.open = open
    },
    drawerMini (state, mini) {
      state.drawer.mini = mini
    }
  },
  actions: {}
}
