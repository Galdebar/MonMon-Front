import ShoppingItem from "./ShoppingItem.js";
const listHTMLElement = document.querySelector("#pending-list .list");

class ShoppingList {
  constructor() {
    this.itemsMap = new Map();
    this.indexCount = 0;
  }

  getSize() {
    return this.itemsMap.size;
  }

  addItem(shoppingItem) {
    this.itemsMap.set(this.indexCount, shoppingItem);
    this.indexCount++;
    return this.indexCount - 1;
  }

  getItemByIndex(i) {
    return this.itemsMap.get(i);
  }

  removeItem(i) {
    return this.itemsMap.delete(i);
  }
}

const shoppingList = new ShoppingList();

loadItems();

async function loadItems() {
  showLoading(true);
  const url = "http://localhost:8080/shoppingitems/getAll";
  let responseObj;
  await fetch(url)
    .then(resp => resp.json())
    .then(data => (responseObj = data));
  showLoading(false);
  populateList(responseObj);
}

function showLoading(showLoading) {
  if (showLoading) {
    listHTMLElement.textContent = "Loading";
  } else {
    listHTMLElement.textContent = "";
  }
}

function populateList(array) {
  array.forEach(shoppingItemDTO => {
    let shoppingItem = new ShoppingItem(
      shoppingItemDTO,
      shoppingList.getSize()
    );
    shoppingList.addItem(shoppingItem);
    listHTMLElement.appendChild(shoppingItem.createElement());
  });
}

export async function markItemAsInCart(index) {
  if (index !== NaN) {
    const item = shoppingList.getItemByIndex(parseInt(index));
    item.isInCart = true;
    const defaultUrl = `http://localhost:8080/shoppingitems/{id=${item.id}}`;
    const response = await fetch(defaultUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
    const responseObj = await response.json();

    console.log(responseObj);
    return responseObj;
  }
}
