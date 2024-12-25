import { Transform, Vector2 } from "../engine/index";
import { RectRenderer } from "../rendering/index";
export class GameObject {
    constructor(transform = new Transform(), renderer = new RectRenderer()) {
        this.transform = transform;
        this.renderer = renderer;
    }
}
export class Player extends GameObject {
    constructor() {
        const transform = new Transform(new Vector2(50, 220), new Vector2(40, 80));
        super(transform, new RectRenderer(transform));
    }
}
export class Obstacle extends GameObject {
    constructor() {
        const transform = new Transform(new Vector2(900, 240), new Vector2(20, 60));
        super(transform, new RectRenderer(transform));
    }
}
