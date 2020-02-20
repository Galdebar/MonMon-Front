<template>
    <div id="shopping-list-pending" >
        <ShoppingListCategory
                v-for="(categoryName) in itemCategories"
                v-bind:title="categoryName"
                v-bind:key="categoryName"
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
        computed: {
            itemCategories : function(){
                return this.$store.getters.notEmptyCategories;
            }
        },
        methods: {
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