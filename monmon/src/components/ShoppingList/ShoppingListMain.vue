<template>
    <div id="shopping-list-main">
        <ShoppingListTop @moveHeader="moveHeader"></ShoppingListTop>
        <ShoppingListPending ref="shoppingListPending"></ShoppingListPending>
        <ShoppingListInCart></ShoppingListInCart>
        <ShoppingListBottom @refreshList="refreshList"></ShoppingListBottom>
    </div>
</template>

<script>
    import ShoppingListTop from "./ShoppingListTop";
    import ShoppingListBottom from "./ShoppingListBottom";
    import ShoppingListPending from "./ShoppingListPending";
    import ShoppingListInCart from "./ShoppingListInCart";

    export default {
        name: 'ShoppingListMain',
        components: {
            ShoppingListTop,
            ShoppingListBottom,
            ShoppingListPending,
            ShoppingListInCart
        },
        methods:{
            moveHeader(){
                this.$emit("moveHeader");
            },
            refreshList(){
                this.$refs.shoppingListPending.getItems();
            }
        }
    }
</script>
