import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/profile/edit',
      name: 'profileEdit',
      component: () => import('./views/profile/Edit.vue')
    },
    {
      path: '/profile/password',
      name: 'profileEditPassword',
      component: () => import('./views/profile/Password.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('./views/Location.vue')
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('./views/Booking.vue')
    },
    {
      path: '/booking/create',
      name: 'create_booking',
      component: () => import('./views/booking/Create.vue')
    },
    {
      path: '/booking/payment/:id',
      props: true,
      name: 'pay_booking',
      component: () => import('./views/booking/Payment.vue')
    },
    {
      path: '/booking/checkout/completed',
      name: 'bookingCheckoutCompleted',
      props: true,
      component: () => import('./views/checkout/Completed.vue')
    },
    {
      path: '/booking/checkout/:id',
      name: 'bookingCheckout',
      props: true,
      component: () => import('./views/checkout/Summary.vue')
    },
    {
      path: '/booking/receipt/:id',
      name: 'bookingReceipt',
      props: true,
      component: () => import('./views/booking/Receipt.vue')
    },
    {
      path: '/booking/detail/:id',
      name: 'bookingDetail',
      props: true,
      component: () => import('./views/booking/Detail.vue')
    },
    {
      path: '/booking/privilege/:id',
      name: 'privilege',
      props: true,
      component: () => import('./views/Privilege.vue')
    },
    {
      path: '/service',
      name: 'service',
      props: true,
      component: () => import('./views/ServiceList.vue')
    },
    {
      path: '/service/:id',
      name: 'serviceDetail',
      props: true,
      component: () => import('./views/Service.vue')
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('./views/Review.vue')
    },
    {
      path: '/review/create/:id',
      name: 'create_review',
      props: true,
      component: () => import('./views/review/Create.vue')
    },
    {
      path: '/review/edit/:id',
      name: 'edit_review',
      props: true,
      component: () => import('./views/review/Edit.vue')
    },
    {
      path: '/order/:id',
      name: 'orderDetail',
      props: true,
      component: () => import('./views/Order.vue')
    },
    {
      path: '/payment/completed',
      name: 'paymentCompleted',
      props: true,
      component: () => import('./views/payment/Completed.vue')
    }
  ]
})

export default router
