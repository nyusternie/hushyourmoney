import Vue from 'vue'
import VueRouter from 'vue-router'

import Help from '../views/Help.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home,
}, {
    path: '/help',
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
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
})

export default router
