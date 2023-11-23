import { Node } from "./node.js";

export class Label extends Node {
    constructor(text){
        super();
        this.setText(text);  
    }
    setText(text = "") {
        this.elm.innerText = text;
      }
    }