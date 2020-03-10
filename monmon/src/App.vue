<template>
    <div id="app">
        <transition name="component-fade" mode="out-in">
            <Loading v-if="isLoading"/>
        </transition>
        <transition name="component-fade" mode="out-in">
            <MainState v-if="isLoggedIn"/>
            <LandingState v-else/>
        </transition>
    </div>
</template>

<script>
    import MainState from "./components/MainState";
    import LandingState from "./components/LandingState";
    import Loading from "./components/CommonElements/Loading";
    import 'normalize.css';
    import './assets/scss/GlobalComponents.scss'

    export default {
        name: 'App',
        components: {
            MainState,
            LandingState,
            Loading
        },
        computed: {
            isLoggedIn: function(){
                return this.$store.getters.isUserLoggedIn;
            },
            isLoading: function(){
                return this.$store.getters.isLoading;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "assets/scss/Variables";
    #app{
        background-color: $brand-yellow;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity $default-transition ease;
    }
    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
