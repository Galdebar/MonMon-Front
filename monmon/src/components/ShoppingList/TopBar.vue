<template>
    <div id="top-bar" class="container">
        <div class="wrapper no-wrap-flex small-padding">
            <button class="yellow" v-on:click="moveHeader">
                <MenuIcon/>
            </button>
            <h2>{{title}}</h2>
            <button>Filter</button>
        </div>
    </div>
</template>

<script>
    import MenuIcon from 'vue-material-design-icons/Menu.vue';


    export default {
        name: 'TopBar',
        components: {
            MenuIcon
        },
        data() {
            return {
                title: "Shopping List"
            }
        },
        methods: {
            moveHeader() {
                this.$emit("moveHeader");
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    #top-bar {
        position: fixed;
        background-color: $background-color;
        top: 0;
        left: 0;
        width: 100vw;
        height: $top-bar-height;
        z-index: 5;
    }
</style>