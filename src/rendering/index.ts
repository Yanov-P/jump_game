import { Transform, Vector2 } from "../engine/index";

export interface ICanvasRenderable {
    render: (context: CanvasRenderingContext2D) => void
}

export class CanvasRendering {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private renderables: ICanvasRenderable[]

    constructor(elementSelector: string, gameObjects: ICanvasRenderable[]) {

        this.renderables = gameObjects;

        const rootElement = document.querySelector(elementSelector);
        if (!rootElement) {
            throw new Error(`Can't find element with selector ${elementSelector}`);
        }
        
        this.canvas = document.createElement('canvas');
        rootElement.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!this.context) {
            throw new Error('Failed to get 2D context');
        }

        // Set canvas size to match its parent
        this.canvas.width = rootElement.clientWidth;
        this.canvas.height = rootElement.clientHeight;
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Fill the canvas with white color
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.renderables.forEach(r => r.render(this.context));
    }
}

export class RectRenderer implements ICanvasRenderable {

    private transform: Transform;
    private fillStyle: CanvasFillStrokeStyles["fillStyle"]

    constructor(transform: Transform = new Transform(), fillStyle: CanvasFillStrokeStyles["fillStyle"] = "purple") {
        this.transform = transform;
        this.fillStyle = fillStyle;
        console.log("renderer")
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.fillStyle;
        context.fillRect(this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
        console.log(this.transform)
    };

    setTransform(transform: Transform) {
        this.transform = transform;
    }
}