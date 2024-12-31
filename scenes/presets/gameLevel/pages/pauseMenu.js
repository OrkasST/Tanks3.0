import { Button } from "../../../../UI/Button.js";
import { Window } from "../../../../UI/Window.js";

export function PauseMenu(data, ...callbacks) {
    return [
        new Window({}),
        new Button({
            name: "Return",
            text: "Back",
            x: window.innerWidth * 0.1,
            y: window.innerHeight * 0.1,
            width: 88,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color: "#AAAAAA",
            textColor: "#FFFFFF",
            textX: 8,
            action: callbacks[0]
        }),
    ]
}