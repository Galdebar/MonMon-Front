<template>
    <div id="shopping-list-main">
        <ShoppingListPending
                ref="shoppingListPending"
                @editItem="editItem"
        />
        <ShoppingListInCart
        />
    </div>
</template>

<script>
    import ShoppingListPending from "./ShoppingListPending";
    import ShoppingListInCart from "./ShoppingListInCart";


    export default {
        name: 'ShoppingListMain',
        components: {
            ShoppingListPending,
            ShoppingListInCart
        },
        data() {
            return {
                isOverlayHidden : true,
            }
        },
        methods:{
            editItem(shoppingItemDTO){
                this.$emit("editItem", shoppingItemDTO);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    #shopping-list-main{
        width: 100vw;
        height: 100vh;
        overflow-y: scroll;
        -ms-overflow-style: none;
        background-color: $deep-bg-color;
    }


    #shopping-list-main::-webkit-scrollbar {
        display: none;
    }
</style>
