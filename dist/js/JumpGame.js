import { Obstacle, Player } from "./game-objects/index";
import { CanvasRendering } from "./rendering/index";
export default class JumpGame {
    constructor() {
        const objects = [
            new Player(),
            new Obstacle()
        ];
        const renderables = objects.map(o => o.renderer);
        this.renderer = new CanvasRendering("#app", renderables);
        this.renderer.render();
    }
}
