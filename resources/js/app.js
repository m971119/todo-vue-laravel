import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// import Login from './components/auth/Login';

import Master from "./components/layouts/Master";
import { store } from "./store/store";

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: "history"
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.loggedIn) {
            next({
                name: "login"
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: "todo"
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

new Vue({
    el: "#app",
    store: store,
    router,
    render: h => h(Master)
});
