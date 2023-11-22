export class Node {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 150;
        this._height = 150;
        this._scaleX = 1;
        this._scaleY = 1;
        this.elm = this._createElement();
        this._active = true;
        this.children = [];
    }
    get x() { return this._x; }
    set x(value) {
        this._x = value;
        this.elm.style.left = this._x + "px";;
    }

    get y() { return this._y; }
    set y(value) {
        this._y = value;
        this.elm.style.top = this._y + "px";;
    }
    get width() { return this._width; }
    set width(value) {
        this._width = value;
        this.elm.style.width = this._width + "px";
    }
    get height() { return this._height; }
    set height(value) {
        this._height = value;
        this.elm.style.height = this._height + "px";
    }
    get scaleX() { return this._scaleX; }
    set scaleX(value) {
        this._scaleX = value;
        this.elm.style.transform = `scaleX(${this._scaleX})`;
    }
    get scaleY() { return this._scaleY; }
    set scaleY(value) {
        this._scaleY = value;
        this.elm.style.transform = `scaleY(${this._scaleY})`;
    }
    get active() { return this._active; }
    set active(value) {
        this._active = value;
        this.elm.style.display = this._active ? "block" : "none";
    }
    _createElement() {
        let elm = document.createElement("div");
        elm.style.position = "absolute";
        elm.style.height = this._height;
        elm.style.width = this._width;
        elm.style.border = '2px solid orange ';
        elm.style.borderRadius = '15%';
        return elm;
    }

    addChild(node) {
        this.children.push(node);
        this.elm.addChild(node);
    }
    removeChild(node) {
        this.elm.removeChild(node);
    }
    show(value) {
        this.active = value;
    }

}