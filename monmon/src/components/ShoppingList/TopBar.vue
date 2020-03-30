<template>
    <div id="top-bar" class="container">
        <div class="wrapper no-wrap-flex small-padding">
            <BtnStandard class="button-yellow"
            v-on:action="moveHeader">
                <MenuIcon/>
            </BtnStandard>
            <h2>{{title}}</h2>
            <BtnStandard
            v-on:action="filter">
                Filter
            </BtnStandard>
            
        </div>
    </div>
</template>

<script>
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import BtnStandard from '../CommonElements/BtnStandard';

    export default {
        name: 'TopBar',
        components: {
            MenuIcon,
            BtnStandard
        },
        data() {
            return {
                title: "Shopping List"
            }
        },
        methods: {
            moveHeader() {
                this.$emit("moveHeader");
            },
            filter(){
                console.log("should open filter options");
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
        z-index: 5;
    }
</style>