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
        const transform = new Transform(new Vector2(0, 220), new Vector2(40, 80));
        super(transform, new RectRenderer(transform));
    }
}
