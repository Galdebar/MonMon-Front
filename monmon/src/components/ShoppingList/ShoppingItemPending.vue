<template>
    <div class="shopping-item default-padding">
        <div v-on:click="editItem" class="edit-btn">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <div class="text">
            <h3>
                {{shoppingItemDTO.itemName}}
                <span
                    v-if="shoppingItemDTO.quantity !== 0"
                >
                    {{shoppingItemDTO.quantity}}
                </span>
            </h3>
            <h5
                    v-bind:class="{shown: shoppingItemDTO.comment.length > 0}"
            >
                {{shoppingItemDTO.comment}}
            </h5>
        </div>

        <button v-on:click="markAsBought"/>
    </div>

</template>
<script>
    import {updateItem} from "../../assets/js/Dispatcher";
    import {deleteItem} from "../../assets/js/Dispatcher";

    export default {
        name: 'ShoppingItemPending',
        props: {
            shoppingItemDTO: Object
        },
        created() {
        },
        data() {
            return {
                shoppingItem: {}
            }
        },

        methods: {
            editItem() {
                this.$emit("editItem", this.createShoppingItem());
            },
            async markAsBought() {
                let tempShoppingItem = this.createShoppingItem();
                tempShoppingItem.isInCart = true;
                let responseIsOk = await updateItem(tempShoppingItem);
                if (responseIsOk) {
                    this.$emit("refreshList");
                }
            },
            async deleteItem() {
                let responseIsOk = await deleteItem(this.shoppingItemDTO);
                if (responseIsOk) {
                    this.$emit("refreshList");
                }
            },
            createShoppingItem() {
                return {
                    id: this.shoppingItemDTO.id,
                    itemName: this.shoppingItemDTO.itemName,
                    itemCategory: this.shoppingItemDTO.itemCategory,
                    quantity: this.shoppingItemDTO.quantity,
                    comment: this.shoppingItemDTO.comment,
                    isInCart: this.shoppingItemDTO.isInCart
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/Variables";

    .shopping-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: $small-distance;

        .edit-btn {
            height: $default-distance;
            width: $default-distance;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .dot {
                height: $extra-small-distance;
                width: $extra-small-distance;
                border-radius: $extra-small-distance;
                background-color: $brand-yellow;
            }
        }

        .text {
            margin: 0 $default-distance;
            justify-self: flex-start;
            width: 100%;
            overflow: hidden;

            h5 {
                color: $grey;
                margin-top: 0;
            }
            h5.shown{
                margin-top: $small-distance;
            }
        }

        button {
            justify-self: flex-end;
        }
    }
</style>