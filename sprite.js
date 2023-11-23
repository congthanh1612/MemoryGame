import { Node } from "./node.js";
export class Sprite extends Node {
    constructor() {
        super();
        this._imageSrc = '';
    }
    _createElement() {
        let elm = document.createElement("img");
        elm.style.height = this._height;
        elm.style.width = this._width;
        elm.style.position = "absolute";
        // elm.style.borderRadius = '15%';
        // elm.style.border = '2px black';
        return elm;
    }
    get imageSrc() { return this._imageSrc; }
    set imageSrc(value) {
        this._imageSrc = value;
        this.elm.src = this._imageSrc;
    }
}