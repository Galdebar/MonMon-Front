import ElementFactory from "../Components/ElementFactory.js"
const factory = new ElementFactory();

export function createWebElement(shoppingItem) {
    let element = document.createElement("div");
    const title = createTitle(shoppingItem.itemName, shoppingItem.quantity);
    const editBtn = createEditBtn(shoppingItem.editItem);
    const comment = createComment(shoppingItem.comment);
    const checkBtn = createCheckBtn(shoppingItem.markItem, shoppingItem.indexInList);

    const textSection = document.createElement("div");
    textSection.classList.add("text");
    textSection.appendChild(title);
    textSection.appendChild(comment);

    element.classList.add(
      "shopping-item",
      "no-wrap-flex",
      "separator-bottom",
      "separator-top",
      "default-padding"
    );
    element.setAttribute("key", shoppingItem.id);

    element.appendChild(editBtn);
    element.appendChild(textSection);
    element.appendChild(checkBtn);

    return element;
}

export function removeItemListeners(shoppingItemWebObj){

}

function createTitle(name, quantity) {
    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = quantity;
    quantitySpan.classList.add("quantity");
    const heading = document.createElement("h3");
    const headingText = document.createTextNode(name);
    heading.appendChild(headingText);
    heading.appendChild(quantitySpan);

    return heading;
  }

  function createComment(text) {
    const heading = document.createElement("h5");

    if (text != null) {
      heading.classList.add("comment");
      heading.appendChild(document.createTextNode(text));
    }

    return heading;
  }

  function createEditBtn(func) {
    const button = factory.createButton("", func);
    const icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.textContent = "settings";
    button.classList.add("edit", "round-btn");
    button.appendChild(icon);

    return button;
  }

   function createCheckBtn(func, index) {
    const button = document.createElement("button");
    button.addEventListener("click", func);
    const icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.textContent = "check_circle_outline";
    button.classList.add("checkmark", "round-btn");
    button.appendChild(icon);

    return button;
  }