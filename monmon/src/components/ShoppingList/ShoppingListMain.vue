<template>
    <div id="shopping-list-main">
        <transition-group name="list-complete">
            <ShoppingListPending
                    ref="shoppingListPending"
                    @editItem="editItem"
                    class="list-complete-item"
                    v-bind:key="pendingListKey"
            />
            <ShoppingListInCart
                    v-if="!isCartEmpty"
                    class="list-complete-item"
                    v-bind:key="inCartListKey"
            />
        </transition-group>
        <div id="list-bottom-break"></div>
    </div>
</template>

<script>
    import ShoppingListPending from "./ShoppingListPending";
    import ShoppingListInCart from "./ShoppingListInCart";


    export default {
        name: 'ShoppingListMain',
        components: {
            ShoppingListPending,
            ShoppingListInCart
        },
        data() {
            return {
                isOverlayHidden : true,
                pendingListKey: "pending",
                inCartListKey: "inCart",
            }
        },
        computed:{
            isCartEmpty(){
                if(this.$store.getters.getItems(true).length === 0){
                    return true;
                } else return false;
            }
        },
        methods:{
            editItem(shoppingItemDTO){
                this.$emit("editItem", shoppingItemDTO);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    #shopping-list-main{
        width: 100vw;
        height: 100vh;
        overflow-y: scroll;
        -ms-overflow-style: none;
        background-color: $deep-bg-color;

        #list-bottom-break{
            margin-bottom: $extra-large-distance + $large-distance;
        }
    }


    #shopping-list-main::-webkit-scrollbar {
        display: none;
    }


    .list-complete-item {
        transition: all $fast-transition;
    }
    .list-complete-enter, .list-complete-leave-to{
        opacity: 0;
        transform: translateY(-30px);
    }
    .list-complete-leave-active {
        position: absolute;
    }
</style>
