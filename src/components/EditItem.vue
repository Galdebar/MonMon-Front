<template>
    <div id="editItemView" v-bind:class="{hidden: !isShown}">
        <div class="container popup-container small-padding">
            <div class="top no-wrap-flex">
                <button v-on:click="deleteItem">Delete</button>
                <h1>{{headerTitle}}</h1>
                <button v-on:click="triggerView"><CloseIcon/></button>
            </div>
            <div class="middle">
                <div id="name" class="section">
                    <input
                            type="text"
                            v-model="shoppingItem.itemName"
                    >
                </div>

                <div id="quantity" class="section">
                    <h4>Quantity</h4>
                    <div class="input no-wrap-flex">
                        <button v-on:click="decreaseQuantity">-</button>
                        <input
                                type="number"
                                v-model="shoppingItem.quantity"
                        >
                        <button
                                v-on:click="increaseQuantity"
                        >+
                        </button>
                    </div>

                </div>
                <div id="category" class="section">
                    <h4>Category</h4>
                    <div class="input">
                        <select v-model="shoppingItem.itemCategory">
                            <option
                                    v-for="category in itemCategories"
                                    v-bind:key="category"
                                    v-bind:value="category"
                            >{{category}}
                            </option>
                        </select>
                    </div>
                </div>
                <div id="comment" class="section">
                    <h4>Comment</h4>
                    <div class="input">
                        <textarea
                                placeholder="Add a comment"
                                v-model="shoppingItem.comment"
                        />
                    </div>
                </div>
            </div>

            <div class="bottom no-wrap-flex">
                <button v-on:click="triggerView">Cancel</button>
                <button v-on:click="updateItem"><TickIcon/></button>
            </div>
        </div>
    </div>
</template>

<script>
import CloseIcon from './CommonElements/Icons/CloseIcon';
import TickIcon from './CommonElements/Icons/TickIcon';

    export default {
        name: 'EditItem',
        components:{
            CloseIcon,
            TickIcon,
        },
        data() {
            return {
                headerTitle: 'Edit Item',
                shoppingItem: {},
                isShown: false
            }
        },
        computed: {
            itemCategories: function () {
                return this.$store.getters.itemCategories;
            }
        },
        methods: {
            async updateItem() {
                let isResponseOK = await this.$store.dispatch("updateItem", this.shoppingItem);
                if(isResponseOK){
                    this.triggerView(this.createDummyItem());
                }
            },
            async deleteItem(){
                let responseIsOk = await this.$store.dispatch("deleteItem", this.shoppingItem);
                if(responseIsOk){
                    this.triggerView(this.createDummyItem());
                }
            },
            triggerView(shoppingItemDTO) {
                this.shoppingItem = shoppingItemDTO;
                this.isShown = !this.isShown;
                this.$emit("triggerOverlay");
            },
            createDummyItem(){
                return {
                    id: "",
                    itemName: "",
                    itemCategory: "",
                    quantity: 0,
                    comment: "",
                    inCart: false
                }
            },
            increaseQuantity() {
                this.shoppingItem.quantity++;
            },
            decreaseQuantity() {
                this.shoppingItem.quantity--;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "../assets/scss/Variables";

    #editItemView {
        position: absolute;
        z-index: $header-z-index;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition-duration: $fast-transition;
    }

    #editItemView.hidden {
        top: -150vh;
        transition-duration: $fast-transition;
    }

    .popup-container {
        width: 90vw;
        min-height: 90vh;
        box-shadow: none;
        display: grid;
        grid-template-rows: $top-bar-height 1fr $bottom-bar-height;
    }

    .top {
        h1 {
            width: 100%;
            text-align: center;
        }
    }

    h4{
        color: $grey;
    }

    .middle {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .bottom {
        position: relative;
        bottom: 0;
    }

    .input {
        margin-top: $small-distance;
    }

    .section {
        margin-top: $large-distance;
        width: 100%;
    }

    #name {
        width: 100%;

        input {
            width: 100%;
            font-size: 1.3em;
        }
    }

    #quantity {
        .input {
            input {
                margin: 0 $default-distance;
            }
        }
    }

    #comment {
        width: 100%;

        .input {
            textarea {
                resize: none;
                width: 100%;
            }
        }
    }
</style>