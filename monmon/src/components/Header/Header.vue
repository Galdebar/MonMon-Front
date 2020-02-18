<template>
    <header ref="header" v-bind:class="{ hidden:isHidden }">
        <div class="top no-wrap-flex separator-bottom-dark">
            <Logo/>
            <button class="white" v-on:click="moveHeader ">
                <MenuIcon/>
            </button>
        </div>
        <User/>
        <HeaderOptions/>

    </header>
</template>

<script>
    import Logo from "./Logo.vue";
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import HeaderOptions from "./HeaderOptions";
    import User from "./User";

    export default {
        name: 'Header',
        data() {
            return {
                isHidden: true,
            }
        },
        components: {
            Logo,
            MenuIcon,
            User,
            HeaderOptions
        },
        methods: {
            moveHeader() {
                if (this.isHidden) {
                    this.isHidden = false;
                } else {
                    this.isHidden = true;
                    this.$emit("hideOverlay");
                }
            }
        }

    }

</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    header {
        height: 100vh;
        width: 80vw;
        position: absolute;
        padding: 0 $default-distance;
        box-sizing: border-box;
        top:0;
        left:0;
        z-index: $header-z-index;
        transition-duration: $fast-transition;
        background-color: $brand-yellow;
        -webkit-box-shadow: 2px 0px 32px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 2px 0px 32px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 2px 0px 32px 0px rgba(0, 0, 0, 0.75);
    }

    header.hidden {
        left: -100vw;
        transition-duration: 0.3s;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: $default-distance 0;
    }
</style>