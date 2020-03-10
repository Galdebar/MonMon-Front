<template>
    <div id="shopping-list-pending" >
        <transition-group name="list-complete">
            <ShoppingListCategory
                    v-for="categoryName in itemCategories"
                    v-bind:title="categoryName"
                    v-bind:key="categoryName"
                    @editItem="editItem"
                    class="list-complete-item"
            />
        </transition-group>
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

    .list-complete-item{
        transition: all $default-transition;
    }

    .categories-list-enter{
        opacity: 0;
        transform: translateX($large-distance);
    }
    .list-complete-leave-active{
        position: absolute;
    }
</style>