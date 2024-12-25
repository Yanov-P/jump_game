import { Transform, Vector2 } from "../engine/index";
import JumpGame from "../JumpGame";
import { ICanvasRenderable, RectRenderer } from "../rendering/index";

export abstract class GameObject {
    transform: Transform
    renderer: ICanvasRenderable
    constructor(transform = new Transform(), renderer = new RectRenderer()) {
        this.transform = transform;
        this.renderer = renderer;
    }
    tick() {
        this.transform.tick();
    }
}

export class Player extends GameObject {
    constructor() {
        const transform = new Transform({
            position: new Vector2(50, 50), 
            size: new Vector2(40, 80),
            hasGravity: true
        })
        super(transform, new RectRenderer(transform));
    }

    jump() {
        if (!this.transform.touchesGround) {
            return;
        }
        this.transform.position.y = JumpGame.height - this.transform.size.y - 2;
        this.transform.velocity.y = -20;
    }
}

export class Obstacle extends GameObject {
    constructor() {
        const transform = new Transform({
            position: new Vector2(900, 240),
            size: new Vector2(20, 60),
            velocity: new Vector2(-10, 0)
        });
        super(transform, new RectRenderer(transform, "red"))
    }
}