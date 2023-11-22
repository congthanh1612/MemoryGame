// export class Label { // entity

//     constructor() {
//         this._scaleX = 1;
//         this.element = document.createElement("div");
//         document.body.appendChild(this.element);
//         this.element.style.width = "200px";
//         this.element.style.height = "200px";
//         this.element.style.backgroundColor = "orange";
//         this.element.style.border = "2px solid blue";
//     }

//     get x() { return this._x; }
//     set x(value) {
//         this._x = value;
//         this.elm.style.left = this._x + "px";
//     }

//     get y() { return this._y; }
//     set y(value) {
//         this._y = value;
//         this.elm.style.top = this._y + "px";
//     }

//     get string() { return this._string; }
//     set string(value) {
//         this._string = value;
//         this.elm.innerText = value;
//     }

//     _createElement() {
//         let elm = document.createElement("p");
//         elm.style.position = "absolute";
//         return elm;
//     }
// }