<template>
    <div id="app">
        <MainState v-if="isLoggedIn"/>
        <LoginState v-else></LoginState>
    </div>
</template>

<script>
    import MainState from "./components/MainState";
    import LoginState from "./components/LoginState";
    import 'normalize.css';
    import './assets/scss/GlobalComponents.scss'

    export default {
        name: 'App',
        components: {
            MainState,
            LoginState
        },
        computed: {
            isLoggedIn: function(){
                return this.$store.getters.isUserLoggedIn;
            }
        }
    }
</script>

<style>
</style>
