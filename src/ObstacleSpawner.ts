import { ITickable, Vector2 } from "./engine/index";
import { Obstacle } from "./game-objects/index";
import JumpGame from "./JumpGame";

export class ObstacleSpawner implements ITickable {

    obstacles: Obstacle[]
    private spawnPoint = new Vector2(JumpGame.width + 100, 240);

    constructor() {
        this.obstacles = [new Obstacle(), new Obstacle(1)];
    }

    tick() {
        this.obstacles.forEach(o => {
            if (o.transform.isAtLeftBound) {
                JumpGame.instance.addScore();
                o.transform.position.set(this.spawnPoint.x + Math.random() * 2000, this.spawnPoint.y);
            }
        })
    }

    reset() {
        this.obstacles.forEach((o, i) => {
            o.transform.position.x = 900 * (i + 1);
        })
    }
}