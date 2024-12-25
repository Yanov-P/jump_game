import JumpGame from "../JumpGame";

export class UI {

    private paused = false;
    
    constructor() {
        this.addListeners();
    }

    addListeners() {
        document.getElementById("start")?.addEventListener("click", () => JumpGame.instance.start());
        document.getElementById("tick")?.addEventListener("click", () => JumpGame.instance.tick());
        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                JumpGame.instance.jumpButtonPressed();
            }
            if (event.code === "KeyP") {
                this.paused = !this.paused;
                if (this.paused) {
                    JumpGame.instance.pause();
                } else {
                    JumpGame.instance.resume();
                }
            }
        });
    }

    showModal(message: string) {
        const modal = document.getElementById("modal");
        const messageContainer = document.getElementById("message");
        if (messageContainer) {
            messageContainer.innerHTML = message;
        }
        if (modal) {
            modal.style.display = "flex";
        }
    }

    hideModal() {
        const modal = document.getElementById("modal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    showScore(val: number) {
        const score = document.getElementById("score");
        if (score) {
            score.innerHTML = val.toString();
        }
    }
}