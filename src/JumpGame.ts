import { Player } from "./game-objects/index";
import { CanvasRendering } from "./rendering/index";

export default class JumpGame {
    private renderer: CanvasRendering
    constructor() {
        const objects = [
            new Player()
        ]
        const renderables = objects.map(o => o.renderer);
        this.renderer = new CanvasRendering("#app", renderables);
        this.renderer.render();
    }
}