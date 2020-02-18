<template>
    <div class="wrapper shopping-category small-padding">

        <h2 class="category-title">{{title}}</h2>
        <div class="container">
            <ShoppingItemPending @editItem="editItem"
                                 v-for="item in items"
                                 v-bind:shopping-item-d-t-o="item"
                                 v-bind:key="item.id"
                                 @refreshList="refreshList"
            />
        </div>

    </div>
</template>

<script>
    import ShoppingItemPending from "./ShoppingItemPending";

    export default {
        name: 'ShoppingListCategory',
        components: {
            ShoppingItemPending,
        },
        props : {
            title: String,
            items: Array
        },
        methods: {
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

    .shopping-category{
        .container {
            margin-top: 0;
            padding-top: $large-distance;
        }
    }

    .category-title{
        display: inline-block;
        background-color: $default-black;
        color: $background-color;
        padding: $small-distance;
        transform: translateY(50%);
        border-radius: $extra-small-distance;
        margin-left: $default-distance;
    }
</style>