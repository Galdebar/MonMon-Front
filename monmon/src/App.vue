<template>
    <div id="app">
        <MainState/>
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
</style>
