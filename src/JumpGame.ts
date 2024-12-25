import { CollisionDetector } from "./engine/CollisionDetector";
import { ITickable } from "./engine/index";
import { GameObject, Player } from "./game-objects/index";
import { ObstacleSpawner } from "./ObstacleSpawner";
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
    private obstacleSpawner: ObstacleSpawner
    private _score = 0;
    get score() {
        return this._score;
    }
    set score(val: number) {
        this.ui.showScore(val);
        this._score = val;
    }
    
    constructor() {
        this.player = new Player();
        this.obstacleSpawner = new ObstacleSpawner();

        this.objects = [
            this.player,
            ...this.obstacleSpawner.obstacles
        ];

        const collisionDetector = new CollisionDetector(this.objects);

        this.tickables = [...this.objects, this.obstacleSpawner, collisionDetector];

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
        this.ui.showModal("You lose! Score: " + this.score);
    }

    pause() {
        this.tickSpeed = 0;
        this.ui.showModal("Pause")
    }

    start() {
        this.ui.hideModal();
        this.tickSpeed = 1;
        this.score = 0;
        this.obstacleSpawner.reset();
        this.startGameLoop();
    }

    resume() {
        this.ui.hideModal();
        this.tickSpeed = 1;
        this.startGameLoop();
    }

    addScore() {
        this.score++;
    }
}