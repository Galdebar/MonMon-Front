<template>
    <div id="shopping-list-pending" >
        <ShoppingListCategory
                v-for="(item, categoryName) in categorizedItems"
                v-bind:title="categoryName"
                v-bind:items="item"
                v-bind:key="categoryName"
                @refreshList="refreshList"
                @editItem="editItem"
        />
    </div>
</template>

<script>
    import ShoppingListCategory from "./ShoppingListCategory";

    export default {
        name: 'ShoppingListPending',
        components: {
            ShoppingListCategory
        },
        props:{
          receivedItems: Array,
        },
        data() {
            return {
                items: [],
                categories: [],
            }
        },
        watch : {
            receivedItems : function() {
                this.items = this.receivedItems;
            }
        },
        computed: {
            categorizedItems: function(){
                return this.categorizeItems();
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            async getCategories() {
                const url = "http://localhost:8080/getShoppingItemCategories";
                let response = await fetch(url);
                let responseObj = await response.json();
                this.categories = responseObj;
            },
            categorizeItems(){
                let categorized = {};
                for (let category in this.categories) {
                    let key = this.categories[category];
                    let value = this.items.filter(item => {
                        return item.itemCategory === key;
                    });
                    if (value.length !== 0) {
                        categorized[key] = value;
                    }
                }
                return categorized;
            },
            refreshList(){
                this.$emit("refreshList");
            },
            editItem(shoppingItemDTO){
                this.$emit("editItem", shoppingItemDTO);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    #shopping-list-pending{
        margin-top: $top-bar-height;
    }
</style>