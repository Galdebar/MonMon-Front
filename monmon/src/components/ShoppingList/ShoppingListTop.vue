<template>
    <div>
        <h1>ShoppingListTop</h1>
        <button v-on:click="moveHeader">
            <MenuIcon></MenuIcon>
        </button>
    </div>
</template>

<script>
    import MenuIcon from 'vue-material-design-icons/Menu.vue';


    export default {
        name: 'ShoppingListTop',
        components: {
            MenuIcon
        },
        methods :{
            moveHeader(){
                this.$emit("moveHeader" );
            }
        }
    }
</script>

<style scoped>
    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 5;
    }
</style>