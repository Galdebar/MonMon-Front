<template>
    <div>
        <h2>{{title}}</h2>
        <ShoppingItem
                v-for="item in items"
                v-bind:shopping-item-d-t-o="item"
                v-bind:key="item.id"
                @refreshList="refreshList"
        ></ShoppingItem>
    </div>
</template>

<script>
    import ShoppingItem from "./ShoppingItem";

    export default {
        name: 'ShoppingListCategory',
        components: {
            ShoppingItem,
        },
        props : {
            title: String,
            items: Array
        },
        methods: {
            refreshList(){
                this.$emit("refreshList");
            }
        }
    }
</script>