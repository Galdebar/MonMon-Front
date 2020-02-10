import {header} from "../../main.js";
import {createWebElement} from "../../Views/MainHeaderView.js";

export default class MainHeader{
    constructor(parentElement){
        this.parentElement = parentElement;
        this.props;
        this.mainHeaderView;
        this.initialize();
    }

    initialize(){
        this.props = this.createProps();
        this.mainHeaderView = createWebElement(this.props);
        this.parentElement.appendChild(this.mainHeaderView);
    }

    createProps(){
        let container = {};
        container.moveHeaderFnc =()=>{
            header.moveHeader();
        }
        return container;
    }
}