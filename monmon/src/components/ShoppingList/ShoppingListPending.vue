<template>
    <div id="shopping-list-pending">
        <h1>ShoppingListPending</h1>
        <ShoppingListCategory
                v-for="(item, categoryName) in categorizedItems"
                v-bind:title="categoryName"
                v-bind:items="item"
                v-bind:key="categoryName"
                @refreshList="getItems"
        ></ShoppingListCategory>
    </div>
</template>

<script>
    import ShoppingListCategory from "./ShoppingListCategory";

    export default {
        name: 'ShoppingListPending',
        components: {
            ShoppingListCategory
        },
        data() {
            return {
                items: [],
                categories: [],
            }
        },
        computed: {
            categorizedItems: function(){
                return this.categorizeItems();
            }
        },
        created() {
            this.getCategories();
            this.getItems();
        },
        methods: {
            async getItems() {
                const url = "http://localhost:8080/shoppingitems/getUnmarked";
                let response = await fetch(url);
                let responseArray = await response.json();
                this.items = responseArray;
            },
            async getCategories() {
                const url = "http://localhost:8080/getShoppingItemCategories";
                let response = await fetch(url);
                let responseObj = await response.json();
                this.categories = responseObj;
            },
            categorizeItems(){
                let categorized = {}
                for (let category in this.categories) {
                    let key = this.categories[category];
                    let value = this.items.filter(item => {
                        return item.itemCategory == key;
                    });
                    if (value.length !== 0) {
                        categorized[key] = value;
                    }
                }
                return categorized;
            },
        }
    }
</script>

<style>
    #shopping-list-pending {
        margin-top: 50px;
        padding-bottom: 150px;
    }
</style>