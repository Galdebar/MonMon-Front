<template>
    <div id="shopping-list-main">
        <ShoppingListPending
                ref="shoppingListPending"
                v-bind:received-items="pendingItems"
                @refreshList="getItems"
                @editItem="editItem"
        />
        <ShoppingListInCart
                v-bind:received-items="itemsInCart"
                @refreshList="getItems"
        />
    </div>
</template>

<script>
    import ShoppingListPending from "./ShoppingListPending";
    import ShoppingListInCart from "./ShoppingListInCart";

    import {getAllShoppingItems} from "../../assets/js/Dispatcher";

    export default {
        name: 'ShoppingListMain',
        components: {
            ShoppingListPending,
            ShoppingListInCart
        },
        props: {
            categories: {}
        },
        data() {
            return {
                allItems: [],
                isOverlayHidden : true,
            }
        },
        computed: {
            pendingItems: function(){
                return this.splitItems(false);
            },
            itemsInCart: function(){
                return this.splitItems(true);
            }
        },
        created() {
            this.getItems();
        },
        methods:{
            async getItems() {
                this.allItems = await getAllShoppingItems();
            },
            splitItems(isInCart){
                let filtered = [];

                this.allItems.forEach(item => {
                    if(item.isInCart === isInCart){
                        filtered.push(item);
                    }
                });
                return filtered;
            },
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
