import ElementFactory from "../Components/ElementFactory.js";
const factory = new ElementFactory();
let functions;

export function createWebElement(args){
    functions = args;
    let header = createHeader();
    let wrapper = createWrapper();
    let flexWrapper = createFlexWrapper();
    let logo = createLogo();
    let closeHeaderBtn = createCloseHeaderBtn();
    let userElement = createUserElement();
    let nav = createNav();

    flexWrapper.appendChild(logo);
    flexWrapper.appendChild(closeHeaderBtn);
    wrapper.appendChild(flexWrapper);
    wrapper.appendChild(userElement);
    wrapper.appendChild(nav);
    header.appendChild(wrapper);

    return header;
}

function createHeader(){
    let element = document.createElement("header");
    element.classList.add("hidden");
    return element;
}

function createWrapper(){
    let element = document.createElement("div");
    element.classList.add("header-wrapper", "default-padding");
    return element;
}

function createFlexWrapper(){
    let element = document.createElement("div");
    element.classList.add("no-wrap-flex", "header-top");
    return element;
}

function createLogo(){
    let element = document.createElement("div");
    element.classList.add("logo");
    let h1 = document.createElement("h1");
    let text = document.createTextNode("Mon");
    let span = document.createElement("span");
    
    span.appendChild(text);
    h1.appendChild(span);
    h1.appendChild(text);
    element.appendChild(h1);

    return element;
}

function createCloseHeaderBtn(){
    let element = document.createElement("button");
    element.setAttribute("id","close-header-btn");
    let icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.textContent = "menu_open";
    
    element.appendChild(icon);
    element.addEventListener("click", functions.moveHeaderFnc);

    return element;
}

function createUserElement(){
    let element = document.createElement("div");
    element.classList.add("user");
    let p = document.createElement("p");
    p.textContent = "Galdebar@gmail.com";
    
    element.appendChild(p);

    return element;
}

function createNav(){
    let element = document.createElement("nav");
    let a1 = document.createElement("a");
    let a2 = document.createElement("a");
    let a3 = document.createElement("a");
    let a4 = document.createElement("a");

    a1.setAttribute("href", "#");
    a1.textContent = "Shopping List";
    a2.setAttribute("href", "#");
    a2.textContent = "Todo List";
    a3.setAttribute("href", "#");
    a3.textContent = "Share";
    a4.setAttribute("href", "#");
    a4.textContent = "Settings";

    element.appendChild(a1);
    element.appendChild(a2);
    element.appendChild(a3);
    element.appendChild(a4);

    return element;
}