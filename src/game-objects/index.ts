import { ITickable, Transform, Vector2 } from "../engine/index";
import JumpGame from "../JumpGame";
import { ICanvasRenderable, ImageRenderer, RectRenderer } from "../rendering/index";

export abstract class GameObject implements ITickable {
    transform: Transform
    renderer: ICanvasRenderable
    constructor(transform = new Transform(), renderer?: ICanvasRenderable) {
        this.transform = transform;
        this.renderer = renderer ?? new RectRenderer();
    }
    tick() {
        this.transform.tick();
        if ('tick' in this.renderer && typeof this.renderer.tick === 'function') {
            (this.renderer as ITickable).tick();
        }
    }
    intersects(other: GameObject) {
        console.log(`${this.constructor.name} intersects ${other.constructor.name}`);
    }
}

export class Player extends GameObject {
    constructor() {
        const transform = new Transform({
            position: new Vector2(50, 50), 
            size: new Vector2(60, 90),
            hasGravity: true
        })
        super(transform, new ImageRenderer([
            "../../img/walk1.png",
            "../../img/walk2.png",
        ], transform));
    }

    jump() {
        if (!this.transform.touchesGround) {
            return;
        }
        this.transform.position.y = JumpGame.height - this.transform.size.y - 2;
        this.transform.velocity.y = -20;
    }

    intersects(other: GameObject): void {
        super.intersects(other);
        if(other instanceof Obstacle) {
            JumpGame.instance.end();
        }
    }
}

export class Obstacle extends GameObject {
    constructor(index = 0, initTransform?: Transform, initRenderer?: ICanvasRenderable) {
        const transform = initTransform ?? new Transform({
            position: new Vector2(900 * (index + 1), 240),
            size: new Vector2(20, 60),
            velocity: new Vector2(-7, 0)
        });
        const renderer = initRenderer ?? new RectRenderer(transform, "red");
        super(transform, renderer);
    }
}

export class CarObstacle extends Obstacle {
    constructor(index = 0) {
        const transform = new Transform({
            position: new Vector2(900 * (index + 1), 280),
            size: new Vector2(120, 50),
            velocity: new Vector2(-9, 0)
        });
        super(index, transform, new ImageRenderer([
            "../../img/car.png",
            "../../img/car1.png",
            "../../img/car.png",
            "../../img/car2.png",
        ], transform));
    }
}

export class ManObstacle extends Obstacle {
    constructor(index = 0) {
        const transform = new Transform({
            position: new Vector2(900 * (index + 1), 240),
            size: new Vector2(60, 90),
            velocity: new Vector2(-7, 0)
        });
        super(index, transform, new ImageRenderer([
            "../../img/man.png",
            "../../img/man1.png",
        ], transform));
    }
}

export class HelicopterObstacle extends Obstacle {
    constructor(index = 0) {
        const transform = new Transform({
            position: new Vector2(900 * (index + 1), 30),
            size: new Vector2(100, 30),
            velocity: new Vector2(-10, 0)
        });
        super(index, transform, new ImageRenderer([
            "../../img/helicopter.png",
        ], transform));
    }
}