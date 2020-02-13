<template>
    <div id="add-new-item">
        <form name="add-item" v-on:submit.prevent="addItem">
            <input type="text" placeholder="Enter item name" v-model="newItemName">
            <select v-model="newItemCategory" >
                <option
                        v-for="category in categories"
                        v-bind:value="category"
                        v-bind:key="category"
                >{{category}}
                </option>
            </select>
            <button>Add Item</button>
        </form>
    </div>

</template>

<script>
    export default {
        name: 'BottomBar',
        props: {
            categories: {}
        },
        data() {
            return {
                newItemName: "",
                newItemCategory: "",
            }
        },
        methods: {
            async addItem() {
                const defaultUrl = "http://localhost:8080/shoppingitems";
                const item = this.createShoppingItem();
                let response = await fetch(defaultUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(item)
                });
                this.clearValues();
                this.$emit("refreshList", item.itemCategory);
            },
            clearValues(){
              this.newItemName = "";
              this.newItemCategory = "";
            },
            createShoppingItem(){
                return {
                    itemName: this.newItemName,
                    itemCategory: this.newItemCategory,
                    quantity: 0,
                    comment: "",
                    isInCart: false
                }
            },
        }

    }
</script>

<style scoped>
    #add-new-item {
        position: fixed;
        background-color: grey;
        bottom: 0;
        left: 0;
        width: 100vw;
        z-index: 5;
        padding-bottom: 20px;
    }
</style>