import { ITickable, Transform, Vector2 } from "./engine/index";
import { GameObject, Obstacle, Player } from "./game-objects/index";
import { CanvasRendering } from "./rendering/index";
import { UI } from "./ui/index";

export default class JumpGame {

    static instance: JumpGame
    static width = 1200;
    static height = 300;

    private renderer: CanvasRendering
    private objects: GameObject[]
    private tickables: ITickable[]
    private player: Player
    private tickSpeed = 0;
    private ui: UI
    
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

        this.ui = new UI();
        this.startGameLoop();
        JumpGame.instance = this;
    }

    jumpButtonPressed() {
        this.player.jump();
    }

    startGameLoop() {
        const gameLoop = () => {
            this.tick();
            const timeoutDuration = 1000 / (60 * this.tickSpeed);
            if (!Number.isFinite(timeoutDuration)) {
                return;
            }
            setTimeout(gameLoop, 1000 / (60 * this.tickSpeed)); // 60 FPS
        };
        gameLoop();
    }

    tick() {
        this.tickables.forEach(t => t.tick());
        this.renderer.render();
    }

    end() {
        this.tickSpeed = 0;
        this.ui.showModal("You lose!");
    }

    start() {
        console.log("start")
        this.ui.hideModal();
        this.tickSpeed = 1;
        this.startGameLoop();
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