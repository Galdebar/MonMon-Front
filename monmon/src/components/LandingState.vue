<template>
    <div id="landing" class="full-screen-yellow">
        <transition name="component-fade" mode="out-in">
            <LoginState
                    v-if="showLogin"
                    v-on:go-to-registration="changeScreen"
            />
            <SignUpState
                    v-else
                    v-on:go-to-login="changeScreen"
            />
        </transition>
    </div>

</template>

<script>
    import LoginState from "./Landing/Login";
    import SignUpState from "./Landing/SignUp";

    export default {
        name: 'LandingState',
        components: {
            LoginState,
            SignUpState,
        },
        data() {
            return {
                showLogin: false
            }
        },
        methods: {
            changeScreen() {
                this.showLogin = !this.showLogin;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/Variables";

    #landing {
        background-color: $brand-yellow;
    }

    .component-fade-enter-active, .component-fade-leave-active {
        transition: all $fast-transition ease;
    }

    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: translateX(100px);
    }


</style>