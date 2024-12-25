import JumpGame from "../JumpGame";
export class UI {
    constructor() {
        this.paused = false;
        this.addListeners();
    }
    addListeners() {
        var _a, _b;
        (_a = document.getElementById("start")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => JumpGame.instance.start());
        (_b = document.getElementById("tick")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => JumpGame.instance.tick());
        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                JumpGame.instance.jumpButtonPressed();
            }
            if (event.code === "KeyP") {
                this.paused = !this.paused;
                if (this.paused) {
                    JumpGame.instance.pause();
                }
                else {
                    JumpGame.instance.resume();
                }
            }
        });
    }
    showModal(message) {
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
    showScore(val) {
        const score = document.getElementById("score");
        if (score) {
            score.innerHTML = val.toString();
        }
    }
}
