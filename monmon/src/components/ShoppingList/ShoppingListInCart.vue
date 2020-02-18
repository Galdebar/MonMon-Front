<template>
    <div id="shopping-list-in-cart" class="wrapper">
        <h1>{{title}}</h1>
        <div class="container">
            <div class="top">
                <div class="no-wrap-flex default-padding">
                    <button v-on:click="deleteAllItems">Clear</button>
                    <button v-on:click="unmarkAllItems">Uncheck All</button>
                </div>
            </div>
            <div>
                <ShoppingItemInCart
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
    import ShoppingItemInCart from "./ShoppingItemInCart";
    import {deleteItems, updateItems} from "../../assets/js/Dispatcher";

    export default {
        name: 'ShoppingListInCart',
        components: {
            ShoppingItemInCart
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
            },
            async deleteAllItems() {
                let responseIsOk = await deleteItems(this.receivedItems);
                if (responseIsOk) {
                    this.$emit("refreshList");
                }
            },
            async unmarkAllItems() {
                let tempArray = await this.receivedItems;
                tempArray.forEach(shoppingItem => {
                    shoppingItem.isInCart = false
                });
                let responseIsOk = await updateItems(tempArray);
                if (responseIsOk) {
                    this.$emit("refreshList");
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    #shopping-list-in-cart {
        h1 {
            display: inline-block;
            background-color: $brand-yellow;
            color: $default-black;
            padding: $small-distance;
            border-radius: $extra-small-distance;
            margin-left: $default-distance;
            transform: translateY(50%);
        }
        .top {
            margin-bottom: $default-distance;

        }

        .container {
            padding-top: $large-distance;

            background-color: $slightly-darker-bg;
            margin-bottom: $bottom-bar-height + $default-distance;
        }
    }
</style>