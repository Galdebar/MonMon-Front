let props;

export function createWebElement(args) {
  props = args;
  const header = createHeader();
  const flexWrap = createFlexWrap();
  const openHeaderBtn = createOpenHeaderBtn();
  const listTitle = createListTitle();
  const filterBtn = createFilterBtn();

  flexWrap.appendChild(openHeaderBtn);
  flexWrap.appendChild(listTitle);
  flexWrap.appendChild(filterBtn);
  header.appendChild(flexWrap);

  return header;
}

function createHeader(){
  let element = document.createElement("header");
  element.classList.add("masking-shadow");
  return element;
}

function createFlexWrap(){
  let element = document.createElement("div");
  element.classList.add("no-wrap-flex");
  return element;
}

function createOpenHeaderBtn(){
  let element = document.createElement("button");
  let icon = document.createElement("i");

  element.setAttribute("id", "open-header-btn");
  element.classList.add("square-btn");
  element.addEventListener("click", props.moveHeaderFnc);
  icon.classList.add("material-icons");
  icon.textContent = "menu";

  element.appendChild(icon);

  return element;
}

function createListTitle(){
  let element = document.createElement("div");
  let h2 = document.createElement("h2");
  let text = document.createTextNode("List Title");

  element.setAttribute("id", "list-title");

  h2.appendChild(text);
  element.appendChild(h2);

  return element;
}

function createFilterBtn(){
  let element = document.createElement("button");
  let icon = document.createElement("i");

  element.classList.add("square-btn");
  icon.classList.add("material-icons");
  icon.textContent = "filter_list";

  element.appendChild(icon);

  return element;
}
