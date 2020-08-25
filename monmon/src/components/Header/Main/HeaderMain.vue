<template>
    <div >
        <div class="header-top no-wrap-flex separator-bottom-dark small-padding">
            <Logo/>
            <button class="white" v-on:click="closeHeader">
                <CloseIcon/>
            </button>
        </div>
        <User/>
        <button class="yellow" v-on:click="goToSettings">Settings</button>
    </div>
</template>

<script>
    import CloseIcon from '../../CommonElements/Icons/CloseIcon';
    import Logo from "./Logo";
    import User from "./User";

    export default {
        name: "HeaderMain",
        components: {
            Logo,
            CloseIcon,
            User,
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

</style>