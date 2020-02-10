let props;
export function createWebElement(args){
    props = args;
    let section = createSection();
    let wrapper = createWrapper();
    let title = createTitle();
    let buttonContainer = createButtonContainer();

    wrapper.appendChild(title);
    wrapper.appendChild(buttonContainer);
    section.appendChild(wrapper);

    return section;
}

function createSection(){
    let element = document.createElement("section");
    element.setAttribute("id", "checked-list");
    return element;
}

function createWrapper(){
    let element = document.createElement("div");
    element.classList.add("wrapper", "flex-wrap");
    return element;
}

function createTitle(){
    let element = document.createElement("h1");
    element.textContent = "In Cart";
    return element;
}

function createButtonContainer(){
    let container = document.createElement("div");
    const unckechAllBtn = createButton("UncheckAll" );
    const clearBtn = createButton("Clear");

    container.classList.add("flex-wrap");

    container.appendChild(unckechAllBtn);
    container.appendChild(clearBtn);

    return container;
}

function createButton(title){
    let button = document.createElement("button");
    button.textContent = title;
    return button;
}