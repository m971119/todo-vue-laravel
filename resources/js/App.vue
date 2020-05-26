<template>
    <div id="app" class="container">
        <img class="logo" alt="Vue logo" src="logo.png" />
        <todo-list></todo-list>
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import TodoList from "./components/TodoList";

export default {
    name: "App",
    components: {
        // HelloWorld,
        TodoList
    }
};
</script>

<style>
/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 24px;
} */
.container {
    max-width: 600px;
    margin: 0 auto;
}
.logo {
    display: block;
    margin: 20px auto;
    height: 75px;
}
</style>
