<template>
    <div id="shopping-list-in-cart" class="wrapper">
        <div class="container">
            <div class="top">
                <h1>{{title}}</h1>
            </div>
            <div>
                <ShoppingItem
                        v-for="item in receivedItems"
                        v-bind:shopping-item-d-t-o="item"
                        v-bind:key="item.id"
                        @refreshList="refreshList"
                />
            </div>
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
        props: {
            receivedItems: Array
        },
        data() {
            return {
                title: "In Cart",
            }
        },
        methods: {
            refreshList() {
                this.$emit("refreshList");
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    #shopping-list-in-cart {

        .container{
            padding-top: $default-distance;
        }

        .top {
            margin-bottom: $default-distance;
            h1 {
                display: inline-block;
                background-color: $brand-green;
                color: $background-color;
                padding: $small-distance;
                border-radius: $extra-small-distance;
                margin-left: $default-distance;

            }
        }

        .container {
            background-color: $slightly-darker-bg;
            margin-top: $large-distance;
            margin-bottom: $bottom-bar-height + $default-distance;
        }
    }
</style>