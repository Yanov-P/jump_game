import JumpGame from "../JumpGame";

export class UI {
    
    constructor() {
        this.addListeners();
    }

    addListeners() {
        console.log("acaca")
        document.getElementById("start")?.addEventListener("click", () => JumpGame.instance.start());
        document.getElementById("tick")?.addEventListener("click", () => JumpGame.instance.tick());
        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                JumpGame.instance.jumpButtonPressed();
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
        console.log("hideModal")
        const modal = document.getElementById("modal");
        if (modal) {
            modal.style.display = "none";
        }
    }
}