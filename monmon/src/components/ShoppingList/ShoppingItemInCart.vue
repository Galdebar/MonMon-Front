<template>
    <div class="shopping-item default-padding">
        <button v-on:click="deleteItem">X</button>
        <div class="text">
            <h3>
                {{shoppingItemDTO.itemName}}
            </h3>
        </div>
        <button v-on:click="unmarkAsBought">Y</button>
    </div>

</template>
<script>

    export default {
        name: 'ShoppingItemInCart',
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
            async unmarkAsBought() {
                let tempShoppingItem = this.createShoppingItem();
                tempShoppingItem.isInCart = false;
                this.$store.dispatch("updateItem", tempShoppingItem);
            },
            async deleteItem() {
                this.$store.dispatch("deleteItem", this.shoppingItemDTO);
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

            h3{
                text-decoration: line-through;
            }
        }

        button {
            justify-self: flex-end;
        }
    }
</style>