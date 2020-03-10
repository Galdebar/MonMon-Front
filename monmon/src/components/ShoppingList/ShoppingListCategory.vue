<template>
    <div class="wrapper shopping-category small-padding">

        <h2 class="category-title">{{title}}</h2>
        <div class="container">
            <transition-group name="list-complete">
                <ShoppingItemPending @editItem="editItem"
                                     v-for="item in items"
                                     v-bind:shopping-item-d-t-o="item"
                                     v-bind:key="item.id"
                                     class="list-complete-item"
                />
            </transition-group>
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
        },
        computed: {
            items: function(){
                return this.$store.getters.getPendingItemsByCategory(this.title);
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

    .list-complete-item {
        transition: all $fast-transition;
    }
    .list-complete-enter, .list-complete-leave-to{
        opacity: 0;
        height: 1px;
        transform: translateY(30px);
    }
    .list-complete-leave-active {
        position: absolute;
    }
</style>