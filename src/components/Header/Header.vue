<template>
    <header ref="header" v-bind:class="{ hidden:isHidden }">
        <transition name="component-fade" mode="out-in">
            <HeaderMain
                    v-on:close-header="moveHeader"
                    v-on:go-to-settings="toggleSettings"
                    v-if="!isSettingsOpen"
            />
            <Settings
                    v-else
                    v-on:close-header="moveHeader"
                    v-on:close-settings="toggleSettings"
            />
        </transition>


    </header>
</template>

<script>
    import HeaderMain from "./Main/HeaderMain";
    import Settings from "./Settings/Settings";

    export default {
        name: 'Header',
        data() {
            return {
                isHidden: true,
                isSettingsOpen: false
            }
        },
        components: {
            HeaderMain,
            Settings
        },
        methods: {
            moveHeader() {
                if (this.isHidden) {
                    this.isHidden = false;
                } else {
                    this.isHidden = true;
                    this.isSettingsOpen = false;
                    this.$emit("hideOverlay");
                }
            },
            toggleSettings() {
                this.isSettingsOpen = !this.isSettingsOpen;
            }
        }

    }

</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    header {
        height: 100vh;
        overflow: scroll;
        -ms-overflow-style: none;
        width: 80vw;
        position: absolute;
        padding: 0 $default-distance;
        box-sizing: border-box;
        top: 0;
        left: 0;
        z-index: $header-z-index;
        transition-duration: $fast-transition;
        background-color: $brand-yellow;
        -webkit-box-shadow: 2px 0px 32px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 2px 0px 32px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 2px 0px 32px 0px rgba(0, 0, 0, 0.75);
    }

    header::-webkit-scrollbar{
        display: none;
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