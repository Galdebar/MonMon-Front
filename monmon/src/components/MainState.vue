<template>
    <div>
        <Header ref="header" @hideOverlay="triggerOverlay"/>
        <EditItem
                ref="editItemView"
                v-bind:categories="categories"
                @triggerOverlay="triggerOverlay"
                @refreshList="refreshList"
        />
        <TopBar @moveHeader="moveHeader"/>
        <div id="main-color-overlay" v-bind:class="{hidden: !isOverlayShown}"></div>
        <ShoppingListMain
                ref="shoppingListMain"
                v-bind:categories="categories"
                @editItem="editItem"
        />
        <BottomBar
                @refreshList="refreshList"
                v-bind:categories="categories"
        />
    </div>

</template>

<script>
    import Header from "./Header/Header";
    import TopBar from "./ShoppingList/TopBar";
    import ShoppingListMain from "./ShoppingList/ShoppingListMain";
    import BottomBar from "./ShoppingList/BottomBar";
    import EditItem from "./EditItem";

    import {getShoppingItemCategories} from "../assets/js/Dispatcher";

    export default {
        name: 'MainState',
        components: {
            Header,
            TopBar,
            ShoppingListMain,
            BottomBar,
            EditItem
        },
        data() {
            return {
                categories: {},
                isEditingItem: false,
                isOverlayShown: false
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            moveHeader() {
                this.$refs.header.moveHeader();
                this.triggerOverlay();
            },
            triggerOverlay(){
                this.isOverlayShown = !this.isOverlayShown;
            },
            refreshList() {
                this.$refs.shoppingListMain.getItems();
            },
            async getCategories() {
                this.categories = await getShoppingItemCategories();
                console.log(this.categories);
            },
            editItem(shoppingItemDTO){
                this.$refs.editItemView.triggerView(shoppingItemDTO);
            }
        }
    }

</script>