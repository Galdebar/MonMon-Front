<template>
    <div>
        <div class="header-top no-wrap-flex separator-bottom-dark">
            <Logo/>
            <button class="white" v-on:click="closeHeader">
                <MenuIcon/>
            </button>
        </div>
        <User/>
        <HeaderOptions/>
        <button v-on:click="goToSettings">Settings</button>
    </div>
</template>

<script>
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import Logo from "./Logo";
    import HeaderOptions from "./HeaderOptions";
    import User from "./User";

    export default {
        name: "HeaderMain",
        components: {
            Logo,
            MenuIcon,
            User,
            HeaderOptions
        },
        methods: {
            closeHeader() {
                this.$emit("close-header");
            },
            goToSettings(){
                this.$emit("go-to-settings");
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/Variables";

    .top {
        padding: $default-distance 0;
    }
</style>