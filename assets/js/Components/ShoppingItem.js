 import ElementFactory from "./ElementFactory.js";
 import {createWebElement} from "../Views/ShoppingItemView.js";
//  import {markItemAsInCart} from "./ShoppingList_OLD.js/index.js";
 let props;
 export default class ShoppingItem {
  constructor(shoppingItemDTO,receivedProps, parentRef) {
    props = receivedProps;
    this.parentListRef = parentRef;
    this.itemName = shoppingItemDTO.itemName;
    this.id = shoppingItemDTO.id;
    this.itemCategory = shoppingItemDTO.itemCategory;
    this.quantity = shoppingItemDTO.quantity;
    this.comment = shoppingItemDTO.quantity;
    this.isInCart = shoppingItemDTO.isInCart;
    this.elementFactory = new ElementFactory();
    this.webElement = null;
    this.initialize();
  }

  initialize(){
    this.webElement = createWebElement(this);
    this.webElement.addEventListener("click", this.testEvent);
  }

  setQuantity(quantity) {
    if (!isNaN(quantity)) {
      this.quantity = quantity;
    }
  }

  setComment(comment) {
    this.comment = comment;
  }

  setItemCategory(category) {
    this.itemCategory = category;
  }

  setIsInCart(isInCart){
      this.isInCart = isInCart;
  }

  removeWebElement(){
    console.log("trying to remove web element");
    this.webElement.remove();
  }

  testEvent(){
    console.log(this);
  }


  markItem(event) {
    event.stopPropagation();
    // console.log(this.parentListRef);
    console.log(this);
    // props.checkItemFnc();
    // this.parentListRef.markItemAsChecked(id);
  }

  editItem() {
    alert("Item should be edited");
  }


}
