import JumpGame from "../JumpGame";
export class Physics {
}
Physics.g = 0.98;
export class Transform {
    constructor(dto) {
        var _a, _b, _c, _d;
        this.position = (_a = dto === null || dto === void 0 ? void 0 : dto.position) !== null && _a !== void 0 ? _a : new Vector2();
        this.size = (_b = dto === null || dto === void 0 ? void 0 : dto.size) !== null && _b !== void 0 ? _b : new Vector2();
        this.hasGravity = (_c = dto === null || dto === void 0 ? void 0 : dto.hasGravity) !== null && _c !== void 0 ? _c : false;
        this.velocity = (_d = dto === null || dto === void 0 ? void 0 : dto.velocity) !== null && _d !== void 0 ? _d : new Vector2();
    }
    get touchesGround() {
        return (this.size.y + this.position.y) >= JumpGame.height;
    }
    get isAtLeftBound() {
        return this.position.x + this.size.x <= 0;
    }
    intersects(other) {
        return this.position.x < other.position.x + other.size.x &&
            this.position.x + this.size.x > other.position.x &&
            this.position.y < other.position.y + other.size.y &&
            this.position.y + this.size.y > other.position.y;
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
export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
    }
    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}
