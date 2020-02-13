<template>
    <div id="shopping-list-main">
        <ShoppingListPending
                ref="shoppingListPending"
                v-bind:received-items="pendingItems"
                @refreshList="getItems"
        ></ShoppingListPending>
        <ShoppingListInCart
                v-bind:received-items="itemsInCart"
                @refreshList="getItems"
        ></ShoppingListInCart>
    </div>
</template>

<script>
    import TopBar from "./TopBar";
    import BottomBar from "./BottomBar";
    import ShoppingListPending from "./ShoppingListPending";
    import ShoppingListInCart from "./ShoppingListInCart";

    import {getAllShoppingItems} from "../../assets/js/Dispatcher";

    export default {
        name: 'ShoppingListMain',
        components: {
            TopBar,
            BottomBar,
            ShoppingListPending,
            ShoppingListInCart
        },
        props: {
            categories: {}
        },
        data() {
            return {
                allItems: [],
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
        }
    }
</script>

<style>
    #shopping-list-main{
        width: 100vw;
        height: calc(100vh - 34px - 68.8px);
        margin-top: 34px;
        overflow-y: scroll;
        -ms-overflow-style: none;
    }
    #shopping-list-main::-webkit-scrollbar{
        display: none;
    }
</style>
