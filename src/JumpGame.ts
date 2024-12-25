import { ITickable, Vector2 } from "./engine/index";
import { GameObject, Obstacle, Player } from "./game-objects/index";
import { CanvasRendering } from "./rendering/index";

export default class JumpGame {

    private renderer: CanvasRendering
    private objects: GameObject[]
    private tickables: ITickable[]
    private player: Player

    static width = 1200;
    static height = 300;
    
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
        document.getElementById("tick")?.addEventListener("click", () => this.tick());
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

class ObstacleSpawner implements ITickable {

    obstacles: Obstacle[]
    private spawnPoint = new Vector2(JumpGame.width + 100, 240);

    constructor() {
        this.obstacles = [new Obstacle()];
    }

    tick() {
        this.obstacles.forEach(o => {
            console.log(o.transform.position.x, o.transform.isAtLeftBound)
            if (o.transform.isAtLeftBound) {
                o.transform.position.set(this.spawnPoint.x, this.spawnPoint.y);
            }
        })
    }

}