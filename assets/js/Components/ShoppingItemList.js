export default class ShoppingList {
    constructor() {
      this.itemsMap = new Map();
      this.indexCount = 0;
    }
  
    getSize() {
      return this.itemsMap.size;
    }
  
    addItem(shoppingItem) {
      this.itemsMap.set(shoppingItem.id, shoppingItem);
      this.indexCount++;
      return this.indexCount - 1;
    }
  
    getItemByIndex(i) {
      return this.itemsMap.get(i);
    }

    getItemIndexFromId(id){
      // console.log(this.itemsMap.values());
      for (let key in this.itemsMap.keys()){
        console.log("something");

        if(this.itemsMap[key].id === id){
          return key;
        }
      }
    }
  
    removeItem(i) {
      return this.itemsMap.delete(i);
    }

  }