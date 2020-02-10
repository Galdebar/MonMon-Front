import {createWebElement} from "../../Views/MainFooterView.js";

export default class MainFooter {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.props;
    this.categories;
    this.footerView;
    this.initialize();
  }

  async initialize(){
    this.categories = await this.getItemCategories();
    this.props = this.createProps();
    this.footerView = createWebElement(this.props);
    this.parentElement.appendChild(this.footerView);
  }

  createProps() {
    let container = {};
    container.addItemFnc = () => {
      this.addItem();
    };
    container.categories = this.categories;

    return container;
  }

  async getItemCategories() {
    const url = "http://localhost:8080/getShoppingItemCategories";
    let response = await fetch(url);
    let responseObj = await response.json();
    this.addToForm(responseObj);
    return await responseObj;
  }

  //this should be phased out
  addToForm(object) {
    // const myMap = new Map(Object.entries(object));
    // myMap.forEach(element => {
    //   formObject.appendChild(this.createFormOption(element));
    // });
  }
  //this should be phased out
  // createFormOption(name) {
  //   let element = document.createElement("option");
  //   element.setAttribute("value", name);
  //   element.textContent = name;
  //   return element;
  // }

  addItem(event) {
    event.preventDefault();
    const defaultUrl = "http://localhost:8080/shoppingitems";
    const name = document.querySelector(`form input[type="text"]`).value;
    const category = this.getKeyByValue(
      document.querySelector(`form select[name="category"]`).value
    );
    const item = this.createShoppingItem(name, category);
    // console.log(JSON.stringify(item));
    fetch(defaultUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    }).then(resp => console.log(resp));
  }

  createShoppingItem(name, category) {
    return { itemName: name, itemCategory: category };
  }

  getKeyByValue(value) {
    // console.log(this,this.categories);
    for (let key in this.categories) {
      if (this.categories[key] === value) {
        return key;
      }
    }
  }
}

// let categoriesObj = getItemCategories();
// const formObject = document.querySelector("form>select.item-category");

// async function getItemCategories() {
//   const url = "http://localhost:8080/getShoppingItemCategories";
//   let responseObj;
//   let response = await fetch(url);
//   let data = await response.json();
//   responseObj = data;
//   addToForm(responseObj);
//   return responseObj;
// }

// function addToForm(object) {
//   // console.log(new Map(Object.entries(map)));
//   const myMap = new Map(Object.entries(object));
//   myMap.forEach(element => {
//     // console.log(typeof(element));
//     formObject.appendChild(createFormOption(element));
//   });
// }

// function createFormOption(name) {
//   let element = document.createElement("option");
//   element.setAttribute("value", name);
//   element.textContent = name;
//   return element;
// }

// ADD ITEM

// function addItem(event) {
//   event.preventDefault();
//   const name = document.querySelector(`form input[type="text"]`).value;
//   const category = getKeyByValue(document.querySelector(`form select[name="category"]`).value);
//   const item = createShoppingItem(name, category);
//   console.log(JSON.stringify(item));
//   fetch(defaultUrl, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(item)
//   }).then(resp => console.log(resp));
// }

// function createShoppingItem(name, category) {
//   return { itemName: name, itemCategory: category };
// }

// function getKeyByValue(value) {
//   for (let key in categoriesObj) {
//     if (categoriesObj[key] === value) {
//       console.log(key);
//       return key;
//     }
//   }
// }
