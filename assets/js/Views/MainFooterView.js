let props;

export function createWebElement(args) {
  props = args;
  console.log(props);
  let footer = createFooter();
  let form = createForm();

  footer.appendChild(form);

  return footer;
}

function createFooter(){
    let element = document.createElement("footer");
    element.classList.add("default-padding");
    return element;
}

function createForm(){
    let form = document.createElement("form");
    let itemNameField = document.createElement("input");
    let categorySelectField = document.createElement("select");
    let addButton = document.createElement("button");

    form.classList.add("no-wrap-flex");
    itemNameField.setAttribute("type", "text");
    itemNameField.setAttribute("placeholder", "Enter item name");
    categorySelectField.setAttribute("name", "category");
    categorySelectField.setAttribute("aria-placeholder", "Select Category");
    categorySelectField.classList.add("item-category");
    addCategoriestoSelectField(categorySelectField);
    addButton.classList.add("add-item");
    addButton.textContent = "Add!";
    addButton.addEventListener("click", props.addItemFnc);

    form.appendChild(itemNameField);
    form.appendChild(categorySelectField);
    form.appendChild(addButton);
    return form;
}

function addCategoriestoSelectField(parentObject){
    const myMap = new Map(Object.entries(props.categories));
    myMap.forEach(element => {
      parentObject.appendChild(createFormOption(element));
    });
}

function createFormOption(name) {
    let element = document.createElement("option");
    element.setAttribute("value", name);
    element.textContent = name;
    return element;
  }
