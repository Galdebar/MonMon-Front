import ShoppingItemList from "../ShoppingItemList.js";
import {createWebElement as createListWebElement } from "../../Views/ListContainerView.js";
import {createWebElement as createTopViewWebElement} from "../../Views/CheckedListTopView.js";

export default class CheckedList{
    constructor(parentElement){
        this.parentElement = parentElement;
        this.props;
        this.topView;
        this.listContainer;
        this.itemsList = new ShoppingItemList();

        this.initialize();
    }

    initialize(){
        this.listContainer = createListWebElement();
        this.topView = createTopViewWebElement();

        this.topView.appendChild(this.listContainer);
        this.parentElement.appendChild(this.topView);
    }
}