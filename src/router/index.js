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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    // mode: process.env.BASE_URL === '/' ? 'history': 'hash',
    // mode: 'hash',
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
