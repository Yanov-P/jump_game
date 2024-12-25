import { ITickable, Transform, Vector2 } from "./engine/index";
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

        const collisionDetector = new CollisionDetector(this.objects);

        this.tickables = [...this.objects, obstacleSpawner, collisionDetector];

        this.renderer = new CanvasRendering("#app", this.objects.map(o => o.renderer));

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
        this.obstacles = [new Obstacle(), new Obstacle(1)];
    }

    tick() {
        this.obstacles.forEach(o => {
            if (o.transform.isAtLeftBound) {
                o.transform.position.set(this.spawnPoint.x + Math.random() * 2000, this.spawnPoint.y);
            }
        })
    }
}

class CollisionDetector implements ITickable {

    objects: GameObject[]
    transforms: Transform[]

    constructor(objects: GameObject[]) {
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