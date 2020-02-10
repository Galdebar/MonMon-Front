import { createWebElement } from "../../Views/PendingListView.js";
import { createWebElement as createListWebElement } from "../../Views/ListContainerView.js";
import ShoppingItem from "../ShoppingItem.js";
import ShoppingItemList from "../ShoppingItemList.js";

export default class PendingList {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.props;
    this.listView;
    this.itemsList = new ShoppingItemList();
    this.listContainer;

    this.initialize();
  }

  initialize() {
    this.listContainer = createListWebElement();
    this.listView = createWebElement(this.props);
    this.listView.appendChild(this.listContainer);
    this.parentElement.appendChild(this.listView);
    this.reloadItemsMap();
  }

  async reloadItemsMap() {
    this.itemsList = new ShoppingItemList();
    const url = "http://localhost:8080/shoppingitems/getAll";
    let response = await fetch(url);
    let responseObj = await response.json();
    this.showLoading(false);
    this.populateList(responseObj);
  }

  showLoading(showLoading) {
    if (showLoading) {
      this.listContainer.textContent = "Loading";
    } else {
      this.listContainer.textContent = "";
    }
  }

  populateList(array){
    array.forEach(shoppingItemDTO => {
        let shoppingItem = new ShoppingItem(
            shoppingItemDTO,
            this.createItemProps(shoppingItemDTO.id),
            this
        );
        this.itemsList.addItem(shoppingItem);
        const key = this.itemsList.getItemIndexFromId(shoppingItem.id);
        // console.log(this.itemsList.getItemIndexFromId(shoppingItem.id));
        this.listContainer.appendChild(shoppingItem.webElement);
    });
  }

  createItemProps(index){
      let container ={};
      container.checkItemFnc = () =>{
          this.markItemAsChecked(index);
      };

      return container;
  }

  async markItemAsChecked(index){
      if(index !== NaN){
          const item = this.itemsList.getItemByIndex(index);
          item.isInCart = true;
          const defaultUrl = `http://localhost:8080/shoppingitems/{id=${item.id}}`;        
          const response = await fetch(defaultUrl, {  
            method: "PUT",  
            headers: { "Content-Type": "application/json" },  
            body: JSON.stringify(item)
        })
        const responseObj = await response.json();
        item.removeWebElement();
        console.log(this.itemsList);
        this.itemsList.removeItem(index)
      }
  }
}
