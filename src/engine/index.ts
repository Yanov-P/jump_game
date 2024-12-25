import JumpGame from "../JumpGame";

export interface ITickable {
    tick: () => void
}

export class Physics {
    static g = 0.98;
}

export class Transform implements ITickable {
    position: Vector2
    size: Vector2
    hasGravity: boolean
    velocity: Vector2

    constructor(dto?: TraformDTO) {
        this.position = dto?.position ?? new Vector2();
        this.size = dto?.size ?? new Vector2();
        this.hasGravity = dto?.hasGravity ?? false;
        this.velocity = dto?.velocity ?? new Vector2();
    }

    get touchesGround(): boolean {
        return (this.size.y + this.position.y) >= JumpGame.height;
    }

    get isAtLeftBound(): boolean {
        return this.position.x + this.size.x <= 0;
    }

    intersects(other: Transform) {
        return this.position.x < other.position.x + other.size.x &&
        this.position.x + this.size.x > other.position.x &&
        this.position.y < other.position.y + other.size.y &&
        this.position.y + this.size.y > other.position.y
    }

    tick() {
        if (this.hasGravity && !this.touchesGround) {
            this.velocity.y += Physics.g;
        }

        if (this.touchesGround) {
            this.velocity.y = 0;
            this.position.y = JumpGame.height - this.size.y;
        }

        this.position.add(this.velocity);
    }
}

export type TraformDTO = {
    position?: Vector2,
    size?: Vector2,
    hasGravity?: boolean,
    velocity?: Vector2
}

export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector2) {
        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
    }

    set(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}
