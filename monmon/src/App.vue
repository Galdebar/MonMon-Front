<template>
    <div id="app">
        <MainState></MainState>
    </div>
</template>

<script>
    import MainState from "./components/MainState";
    import 'normalize.css';
    import './assets/scss/GlobalComponents.scss'

    export default {
        name: 'App',
        components: {
            MainState
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
