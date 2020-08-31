<template>
    <div id="landing" class="full-screen-yellow">
        <transition name="component-fade" mode="out-in">
            <LoginState
                    v-if="showLogin"
                    key="login"
                    v-on:go-to-registration="changeScreen"
            />
            <SignUpState
                    v-else
                    key="sign-up"
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
                showLogin: true
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
        // transition: opacity $fast-transition ease,
        //             transform $fast-transition ease;
        transition: all $default-transition ease;
    }

    .component-fade-enter, .component-fade-leave-to
        /* .component-fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
        // transform: translateX(100px);
    }


</style>