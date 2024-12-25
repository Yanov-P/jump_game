export class Transform {
    position: Vector2
    size: Vector2
    constructor(position?: Vector2, size?: Vector2) {
        this.position = position ?? new Vector2();
        this.size = size ?? new Vector2();
    }
}

export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}
