<template>
    <div id="login-view">
        <Logo/>
        <h1>Hello</h1>
        <h2>This is the Login Page</h2>
    </div>
</template>

<script>
    import Logo from "./Header/Logo";

    export default {
        name: 'LoginState',
        components: {
            Logo
        }

    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/Variables";

    #login-view{
        background-color: $brand-yellow;
        width: 100vw;
        height: 100vh;

    }
</style>