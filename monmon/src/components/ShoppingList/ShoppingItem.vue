<template>
    <div>
        <h3>{{shoppingItemDTO.itemName}}<span v-if="shoppingItemDTO.quantity != 0">{{shoppingItemDTO.quantity}}</span></h3>
        <h6>{{shoppingItemDTO.comment}}</h6>
        <button v-on:click="markItem">{{buttonText}}</button>
    </div>

</template>
<script>
    import {updateItem} from "../../assets/js/Dispatcher";
    import {deleteItem} from "../../assets/js/Dispatcher";

    export default {
        name: 'ShoppingItem',
        props: {
            shoppingItemDTO: Object
        },
        created() {
            this.assignText();
        },
        data(){
            return{
                buttonText : "",
                shoppingItem : {}
            }
        },
        methods: {
            markItem(){
                console.log(this.shoppingItem);
                if(this.shoppingItemDTO.isInCart){
                    this.deleteItem();
                } else{
                    this.markAsBought();
                }
            },
            async markAsBought(){
                let tempShoppingItem = this.createShoppingItem();
                tempShoppingItem.isInCart = true;
                let responseIsOk = await updateItem(tempShoppingItem);
                if(responseIsOk){
                    this.$emit("refreshList");
                }
            },
            async deleteItem(){
                let responseIsOk = await deleteItem(this.shoppingItemDTO);
                if(responseIsOk){
                    this.$emit("refreshList");
                }
            },
            createShoppingItem(){
                return {
                    id : this.shoppingItemDTO.id,
                    itemName: this.shoppingItemDTO.itemName,
                    itemCategory: this.shoppingItemDTO.itemCategory,
                    quantity:this.shoppingItemDTO.quantity,
                    comment:this.shoppingItemDTO.comment,
                    isInCart:this.shoppingItemDTO.isInCart
                }
            },
            assignText(){
                if(this.shoppingItemDTO.isInCart){
                    this.buttonText = "Delete"
                } else{
                    this.buttonText = "Mark"
                }
            }
        }
    }
</script>