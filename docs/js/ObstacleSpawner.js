import { Vector2 } from "./engine/index";
import { CarObstacle, HelicopterObstacle, ManObstacle } from "./game-objects/index";
import JumpGame from "./JumpGame";
export class ObstacleSpawner {
    constructor() {
        this.spawnPoint = new Vector2(JumpGame.width + 100, 240);
        this.obstacles = [new ManObstacle(), new CarObstacle(1), new ManObstacle(2), new HelicopterObstacle(3)];
    }
    tick() {
        this.obstacles.forEach(o => {
            if (o.transform.isAtLeftBound) {
                JumpGame.instance.addScore();
                o.transform.position.set(this.spawnPoint.x + Math.random() * 2000, o.transform.position.y);
            }
        });
    }
    reset() {
        this.obstacles.forEach((o, i) => {
            o.transform.position.x = 900 * (i + 1);
        });
    }
}