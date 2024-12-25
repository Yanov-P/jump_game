export class Transform {
    constructor(position, size) {
        this.position = position !== null && position !== void 0 ? position : new Vector2();
        this.size = size !== null && size !== void 0 ? size : new Vector2();
    }
}
export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
