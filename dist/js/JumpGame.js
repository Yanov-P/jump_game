import { Obstacle, Player } from "./game-objects/index";
import { CanvasRendering } from "./rendering/index";
class JumpGame {
    constructor() {
        var _a;
        this.objects = [
            new Player(),
            new Obstacle()
        ];
        const renderables = this.objects.map(o => o.renderer);
        this.renderer = new CanvasRendering("#app", renderables);
        this.tick();
        this.startGameLoop();
        (_a = document.getElementById("tick")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.tick());
    }
    startGameLoop() {
        const gameLoop = () => {
            this.tick();
            setTimeout(gameLoop, 1000 / 60); // 60 FPS
        };
        gameLoop();
    }
    tick() {
        console.log("tick");
        this.objects.forEach(o => o.tick());
        this.renderer.render();
    }
}
JumpGame.width = 1200;
JumpGame.height = 300;
export default JumpGame;
