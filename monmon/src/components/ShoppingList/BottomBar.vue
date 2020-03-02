<template>
    <div id="bottom-bar" class="container">
        <div class="wrapper">
            <form class="no-wrap-flex" name="add-item" v-on:submit.prevent="addItem">
                <input type="text" list="newItemsList" name="newItem" v-model="newItemName" placeholder="Enter item name">
                <datalist id="newItemsList" name="newItemsList">
                    <option
                            v-for="(searchResult,index) in searchResults"
                            v-bind:value="searchResult.keyword"
                            v-bind:key="index"
                    >
                        {{searchResult.keyword}}
                    </option>
                </datalist>
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
                searchResults: [],
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
            },
            createShoppingItem() {
                return {
                    itemName: this.newItemName,
                    itemCategory: "",
                    quantity: 0,
                    comment: "",
                    isInCart: false
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
                width: 100%;
                background: none;
                border: none;
                padding: $extra-small-distance;
                box-sizing: border-box;
                border-bottom: 1px solid $default-black;
                margin-right: $default-distance;
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