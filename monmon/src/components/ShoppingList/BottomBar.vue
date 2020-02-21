<template>
    <div id="bottom-bar" class="container">
        <div class="wrapper">
            <form class="no-wrap-flex" name="add-item" v-on:submit.prevent="addItem">
<!--                <input type="text" placeholder="Enter item name" v-model="newItemName">-->
                <input type="text" list="newItemsList" name="newItem" v-model="newItemName" placeholder="Enter item name">
                <datalist id="newItemsList" name="newItemsList">
                    <option
                            v-for="(searchResult,index) in searchResults"
                            v-bind:value="searchResult"
                            v-bind:key="index"
                    >
                        {{searchResult}}
                    </option>
                </datalist>
                <select v-model="newItemCategory">
                    <option
                            v-for="category in itemCategories"
                            v-bind:value="category"
                            v-bind:key="category"
                    >{{category}}
                    </option>
                </select>
                <button class="add-item-btn">
                    <div class="bar"></div>
                    <div class="bar"></div>
                </button>
            </form>
        </div>

    </div>

</template>

<script>
    import {search} from "../../assets/js/Dispatcher";

    export default {
        name: 'BottomBar',
        data() {
            return {
                newItemName: "",
                newItemCategory: "",
                searchResults: [],
            }
        },
        computed: {
            itemCategories: function () {
                return this.$store.getters.itemCategories;
            }
        },
        watch: {
            newItemName : function(){
                 this.search();
            },
        },
        methods: {
            async addItem() {
                const item = this.createShoppingItem();
                if (this.newItemName !== "") {
                    let isItemAdded = await this.$store.dispatch('addNewShoppingItem', item);
                    if (isItemAdded) {
                        this.clearValues();
                    }
                } else {
                    console.log("No item name specified-- should do something :P")
                }

            },
            async search(){
                let response = await search(this.newItemName);
                this.searchResults = response;
            },
            clearValues() {
                this.newItemName = "";
                this.newItemCategory = "";
            },
            createShoppingItem() {
                return {
                    itemName: this.newItemName,
                    itemCategory: this.checkItemCategory(),
                    quantity: 0,
                    comment: "",
                    isInCart: false
                }
            },
            checkItemCategory() {
                if (this.newItemCategory === "") {
                    return "Uncategorized";
                } else {
                    return this.newItemCategory;
                }
            },
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    #bottom-bar {
        position: fixed;
        background-color: $background-color;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: $bottom-bar-height;
        z-index: 5;
        padding-top: $default-distance;

        form {
            input, select {
                width: 40%;
                background: none;
                border: none;
                padding: $extra-small-distance;
                box-sizing: border-box;
                border-bottom: 1px solid $default-black;
            }
        }

        .add-item-btn {
            background-color: $brand-yellow;
            width: $large-distance + $default-distance;
            height: $large-distance + $default-distance;
            box-sizing: border-box;
            position: relative;
            border-radius: 50%;

            .bar {
                background-color: $background-color;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .bar:first-of-type {
                height: 75%;
                width: 15%;
            }

            .bar:last-of-type {
                height: 15%;
                width: 75%;
            }
        }
    }
</style>