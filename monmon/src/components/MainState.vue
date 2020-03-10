<template>
    <div>
        <Header ref="header" @hideOverlay="triggerOverlay"/>
        <EditItem
                ref="editItemView"
                @triggerOverlay="triggerOverlay"
                @refreshList="refreshList"
        />
        <TopBar @moveHeader="moveHeader"/>
        <div id="main-color-overlay" v-bind:class="{hidden: !isOverlayShown}"></div>
        <ShoppingListMain
                ref="shoppingListMain"
                @editItem="editItem"
        />
        <BottomBar
                @refreshList="refreshList"
        />
    </div>

</template>

<script>
    import Header from "./Header/Header";
    import TopBar from "./ShoppingList/TopBar";
    import ShoppingListMain from "./ShoppingList/ShoppingListMain";
    import BottomBar from "./ShoppingList/BottomBar";
    import EditItem from "./EditItem";


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
                isEditingItem: false,
                isOverlayShown: false
            }
        },
        mounted() {
            // this.$store.dispatch("refreshItemsList");
            // this.$store.dispatch("refreshCategories");
            this.$store.dispatch("loadItemsAndCategories");
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
            },
            editItem(shoppingItemDTO){
                this.$refs.editItemView.triggerView(shoppingItemDTO);
            }
        }
    }

</script>