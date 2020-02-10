export default class ElementFactory{
    constructor(){}
    createSimpleComponent(type){
        return component = document.createElement(type);
    }
    
     createComponent(type){
        let component = document.createElement(type);
        const componentID = this.createComponentID();
        component.textContent = "";
        component.setAttribute("data", componentID);
        return component;
    }
    
     createButton(text, fnc, id, className){
        let button = document.createElement("button");
        const componentID = this.createComponentID();
        button.setAttribute("data", componentID);
        button.addEventListener("click", fnc);
        button.textContent = text;
    
        if(id !== undefined){
            button.setAttribute("id", id);
        }
        if(className !== undefined){
            button.classList.add(className);
        }
    
        return button; 
    }
    
    createComponentID(){
        return Math.floor(Math.random()* Number.MAX_SAFE_INTEGER);
    }
}
