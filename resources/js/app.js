/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from "vue";
import { store } from "./store/store";
import App from "./App.vue";
export const eventBus = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component("app", require("./App.vue"));

new Vue({
    el: "#app",
    component: { App },
    template: "<app/>",
    store: store
});
