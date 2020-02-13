<template>
    <div>
        <Header ref="header"></Header>
        <TopBar @moveHeader="moveHeader"></TopBar>
        <ShoppingListMain class="container"
                ref="shoppingListMain"
                v-bind:categories="categories"
        ></ShoppingListMain>
        <BottomBar
                @refreshList="refreshList"
                v-bind:categories="categories"
        ></BottomBar>
    </div>

</template>

<script>
    import Header from "./Header/Header";
    import TopBar from "./ShoppingList/TopBar";
    import ShoppingListMain from "./ShoppingList/ShoppingListMain";
    import BottomBar from "./ShoppingList/BottomBar";

    import {getShoppingItemCategories} from "../assets/js/Dispatcher";

    export default {
        name: 'MainState',
        components: {
            Header,
            TopBar,
            ShoppingListMain,
            BottomBar
        },
        data() {
            return {
                categories: {}
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            moveHeader() {
                this.$refs.header.moveHeader();
            },
            refreshList() {
                this.$refs.shoppingListMain.getItems();
            },
            async getCategories() {
                this.categories = await getShoppingItemCategories();
            },
        }
    }

</script>