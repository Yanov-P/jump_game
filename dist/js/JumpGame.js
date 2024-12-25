import { Vector2 } from "./engine/index";
import { Obstacle, Player } from "./game-objects/index";
import { CanvasRendering } from "./rendering/index";
class JumpGame {
    constructor() {
        this.player = new Player();
        const obstacleSpawner = new ObstacleSpawner();
        this.objects = [
            this.player,
            ...obstacleSpawner.obstacles
        ];
        const collisionDetector = new CollisionDetector(this.objects);
        this.tickables = [...this.objects, obstacleSpawner, collisionDetector];
        this.renderer = new CanvasRendering("#app", this.objects.map(o => o.renderer));
        this.addListeners();
        this.startGameLoop();
    }
    addListeners() {
        var _a;
        (_a = document.getElementById("tick")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.tick());
        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                this.jumpButtonPressed();
            }
        });
    }
    jumpButtonPressed() {
        this.player.jump();
    }
    startGameLoop() {
        const gameLoop = () => {
            this.tick();
            setTimeout(gameLoop, 1000 / 60); // 60 FPS
        };
        gameLoop();
    }
    tick() {
        this.tickables.forEach(t => t.tick());
        this.renderer.render();
    }
}
JumpGame.width = 1200;
JumpGame.height = 300;
export default JumpGame;
class ObstacleSpawner {
    constructor() {
        this.spawnPoint = new Vector2(JumpGame.width + 100, 240);
        this.obstacles = [new Obstacle(), new Obstacle(1)];
    }
    tick() {
        this.obstacles.forEach(o => {
            if (o.transform.isAtLeftBound) {
                o.transform.position.set(this.spawnPoint.x + Math.random() * 2000, this.spawnPoint.y);
            }
        });
    }
}
class CollisionDetector {
    constructor(objects) {
        this.objects = objects;
        this.transforms = this.objects.map(o => o.transform);
    }
    tick() {
        for (let i = 0; i < this.transforms.length; i++) {
            for (let j = i + 1; j < this.transforms.length; j++) {
                if (this.transforms[i].intersects(this.transforms[j])) {
                    this.objects[i].intersects(this.objects[j]);
                    this.objects[j].intersects(this.objects[i]);
                }
            }
        }
    }
}
