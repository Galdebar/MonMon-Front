import MainHeader from "./MainHeader.js";
import MainFooter from "./MainFooter.js";
import PendingList from "./PendingList.js";
import CheckedList from "./CheckedList.js";
import {createWebElement as createMainContainerWebElement} from "../../Views/MainContainerView.js";

export default class Main {
  constructor() {
    this.parentElement = document.getElementById("app");
    this.mainContainer = createMainContainerWebElement();
    this.mainHeader = new MainHeader(this.mainContainer);
    this.mainFooter = new MainFooter(this.mainContainer);
    this.pendingList = new PendingList(this.mainContainer);
    this.checkedList = new CheckedList(this.mainContainer);

    this.parentElement.appendChild(this.mainContainer);
  }
}
