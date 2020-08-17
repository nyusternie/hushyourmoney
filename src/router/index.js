import Vue from 'vue'
import VueRouter from 'vue-router'

import Help from '../views/Help.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
}, {
    path: '/help',
    name: 'About',
    component: Help,
}]

const router = new VueRouter({
    routes
})

export default router
