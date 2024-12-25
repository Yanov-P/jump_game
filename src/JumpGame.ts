import { GameObject, Obstacle, Player } from "./game-objects/index";
import { CanvasRendering } from "./rendering/index";

export default class JumpGame {

    private renderer: CanvasRendering
    private objects: GameObject[]

    static width = 1200;
    static height = 300;
    
    constructor() {
        this.objects = [
            new Player(),
            new Obstacle()
        ]
        const renderables = this.objects.map(o => o.renderer);
        this.renderer = new CanvasRendering("#app", renderables);
        this.tick();
        this.startGameLoop();

        document.getElementById("tick")?.addEventListener("click", () => this.tick());
    }

    startGameLoop() {
        const gameLoop = () => {
            this.tick();
            setTimeout(gameLoop, 1000 / 60); // 60 FPS
        };
        gameLoop();
    }

    tick() {
        console.log("tick")
        this.objects.forEach(o => o.tick());
        this.renderer.render();
    }
}