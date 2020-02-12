<template>
    <div>
        <h3>{{shoppingItemDTO.itemName}}<span v-if="shoppingItemDTO.quantity != 0">{{shoppingItemDTO.quantity}}</span></h3>
        <h6>{{shoppingItemDTO.comment}}</h6>
        <button v-on:click="markItem">Mark</button>
    </div>

</template>
<script>
    export default {
        name: 'ShoppingItem',
        props: {
            shoppingItemDTO: Object
        },
        methods: {
            async markItem(){
                this.shoppingItemDTO.isInCart = true;
                const shoppingItem = this.createShoppingItem();
                const url = `http://localhost:8080/shoppingitems/{id=${this.shoppingItemDTO.id}`;
                let response = await fetch(url,{
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.shoppingItemDTO)
                });
                this.$emit("refreshList");
            },
            createShoppingItem(){
                return {
                    itemName: this.shoppingItemDTO.itemName,
                    itemCategory: this.shoppingItemDTO.itemCategory,
                    quantity:this.shoppingItemDTO.quantity,
                    comment:this.shoppingItemDTO.comment,
                    isInCart:this.shoppingItemDTO.isInCart
                }
            }
        }
    }
</script>