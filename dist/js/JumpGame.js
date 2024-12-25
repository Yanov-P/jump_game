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
        this.tickables = [...this.objects, obstacleSpawner];
        const renderables = this.objects.map(o => o.renderer);
        this.renderer = new CanvasRendering("#app", renderables);
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
        this.obstacles = [new Obstacle()];
    }
    tick() {
        this.obstacles.forEach(o => {
            console.log(o.transform.position.x, o.transform.isAtLeftBound);
            if (o.transform.isAtLeftBound) {
                o.transform.position.set(this.spawnPoint.x, this.spawnPoint.y);
            }
        });
    }
}
