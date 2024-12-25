import { GameObject } from "../game-objects/index";
import { ITickable, Transform } from "./index";

export class CollisionDetector implements ITickable {

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