import { Button } from "./Button.js";

export class LevelChoiseButton extends Button {
    constructor(
        action, text = "level", color = "#000000", isActive = true,
        offset = {x: 0, y: 0}
    ) {
        super({
            name: "Level Start",
            text,
            x: window.innerWidth * 0.3 + offset.x,
            y: window.innerHeight * 0.3 + offset.y,
            width: 120,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color,
            textColor: "#FFFFFF",
            textX: 10,
            isActive,
            action
        })
    }
}