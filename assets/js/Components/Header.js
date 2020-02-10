import { createWebElement } from "../Views/HeaderView.js";

export default class Header {
  constructor() {
    this.isHeaderOpen = false;
    this.listColorOverlay = document.getElementById("main-color-overlay");
    this.parentElement = document.getElementById("app");
    this.props;
    this.headerView;
    this.openHeaderBtn;
    this.closeHeaderBtn;
    this.initialize();
    
  }

  initialize(){
    this.props = this.createProps();
    this.headerView = createWebElement(this.props);
    this.parentElement.appendChild(this.headerView);

    this.openHeaderBtn = document.getElementById("open-header-btn");
    this.closeHeaderBtn = document.getElementById("close-header-btn");
  }

  createProps() {
    let container = {};
    container.moveHeaderFnc = () => {
      this.moveHeader();
    };

    return container;
  }

  moveHeader() {
    if (this.isHeaderOpen) {
      this.closeHeader();
    } else {
      this.openHeader();
    }
  }


  openHeader() {
    const header = document.querySelector("header");
    const listColorOverlay = document.getElementById("main-color-overlay");
    const main = document.querySelector("main");
    header.classList.remove("hidden");
    header.classList.add("shown");
    main.classList.add("hidden");
    main.classList.remove("shown");
    listColorOverlay.classList.remove("hidden");
    listColorOverlay.classList.add("shown");
    this.isHeaderOpen = true;
  }

  closeHeader() {
    const header = document.querySelector("header");
    const listColorOverlay = document.getElementById("main-color-overlay");
    const main = document.querySelector("main");
    header.classList.remove("shown");
    header.classList.add("hidden");
    main.classList.add("shown");
    main.classList.remove("hidden");
    listColorOverlay.classList.remove("shown");
    listColorOverlay.classList.add("hidden");
    this.isHeaderOpen = false;
  }
}

// let isHeaderOpen = false;
// const header = document.querySelector("header");
// const listColorOverlay = document.getElementById("main-color-overlay");
// const main = document.querySelector("main");
// // const headerView = createWebElement();

// // document
// //   .getElementById("open-header-btn")
// //   .addEventListener("click", moveHeader); // this should be moved to main
// // document
// //   .getElementById("close-header-btn")
// //   .addEventListener("click", moveHeader);

// export function moveHeader() {
//   if (isHeaderOpen) {
//     closeHeader();
//   } else {
//     openHeader();
//   }
// }

// function openHeader() {
//   const header = document.querySelector("header");
//   header.classList.remove("hidden");
//   header.classList.add("shown");
//   main.classList.add("hidden");
//   main.classList.remove("shown");
//   listColorOverlay.classList.remove("hidden");
//   listColorOverlay.classList.add("shown");
//   isHeaderOpen = true;
// }

// function closeHeader() {
//   const header = document.querySelector("header");
//   header.classList.remove("shown");
//   header.classList.add("hidden");
//   main.classList.add("shown");
//   main.classList.remove("hidden");
//   listColorOverlay.classList.remove("shown");
//   listColorOverlay.classList.add("hidden");
//   isHeaderOpen = false;
// }
