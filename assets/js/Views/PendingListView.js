let props;
export function createWebElement(args){
    props = args;
    const section = createSection();
    const itemCategory = createItemCategory(); //THIS MUST BE PHASED OUT

    section.appendChild(itemCategory);
    return section;
}

function createSection(){
    let element = document.createElement("section");
    element.setAttribute("id", "pending-list");
    return element;
}

function createItemCategory(){
    let element = document.createElement("div");
    let sectionTitle = document.createElement("h2");

    element.classList.add("item-category");
    sectionTitle.classList.add("category-title", "default-padding", "separator-bottom");
    sectionTitle.textContent = "CategoryTitle";

    element.appendChild(sectionTitle);

    return element;

}