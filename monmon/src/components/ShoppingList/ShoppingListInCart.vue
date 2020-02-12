<template>
    <div id="shopping-list-in-cart">
        <div class="top">
            <h1>{{title}}</h1>
        </div>
        <div class="container">
            <ShoppingItem
                v-for="item in items"
                v-bind:shopping-item-d-t-o="item"
                v-bind:key="item.id"
                @refreshList="refreshList"
            ></ShoppingItem>
        </div>
    </div>
</template>

<script>
    import ShoppingItem from "./ShoppingItem";
    export default {
        name: 'ShoppingListInCart',
        components: {
            ShoppingItem
        },
        props : {
          items: Array
        },
        data() {
            return {
                title: "In Cart",
            }
        },
        methods:{
            refreshList(){
                this.$emit("refreshList");
            }
        }
    }
</script>