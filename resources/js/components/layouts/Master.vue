<template>
    <div id="app">
        <ul class="nav">
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li><router-link :to="{ name: 'todo' }">App</router-link></li>
            <li v-if="!loggedIn">
                <router-link :to="{ name: 'login' }">Login</router-link>
            </li>
            <li v-if="!loggedIn">
                <router-link :to="{ name: 'register' }">Register</router-link>
            </li>
            <li v-if="loggedIn">
                <router-link :to="{ name: 'logout' }">Logout</router-link>
            </li>
        </ul>
        <transition
            name="router-animation"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
        >
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: "Master",
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 24px;
    height: 100vh;
}

.flex-center {
    display: flex;
    justify-content: center;
}

.nav {
    display: flex;
    list-style: none;
    padding: 15px 0;
    margin: 0;
    justify-content: flex-end;
    background: #f5f8fa;
    border-bottom: 1px solid lightgray;
    margin-bottom: 24px;
}
.nav a {
    color: #646b6f;
    padding: 0 25px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.1rem;
    text-decoration: none;
    text-transform: uppercase;
}

// Auth Pages
label {
    display: block;
    margin-bottom: 4px;
}
.login-heading {
    margin-bottom: 16px;
}
.form-control {
    margin-bottom: 24px;
}
.mb-more {
    margin-bottom: 42px;
}
.login-form {
    max-width: 500px;
    margin: auto;
}
.login-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
}
.btn-submit {
    width: 100%;
    padding: 14px 12px;
    font-size: 18px;
    font-weight: bold;
    background: #60bd4f;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
        background: darken(#60bd4f, 10%);
    }
    &:disabled {
        background: lighten(#60bd4f, 10%);
        cursor: not-allowed;
    }
}
.server-error {
    margin-bottom: 12px;
    font-size: 16ppx;
    padding: 10px 16px;
    color: #a94442;
    background: #f3dede;
    border-radius: 4px;
}
.page-wrapper {
    animation-duration: 0.2s;
}
/* spinner */
.lds-ring-container {
    position: absolute;
    right: 50%;
}
.lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    /* margin: 8px; */
    border: 3px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
