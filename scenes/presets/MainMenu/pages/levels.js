import { Button } from "../../../../UI/Button.js";
import { LevelChoiseButton } from "../../../../UI/LevelChoiseButton.js";

export function Levels(data, ...callbacks) {
    return [
        new Button({
            name: "Return",
            text: "Back",
            x: window.innerWidth * 0.1,
            y: window.innerHeight * 0.1,
            width: 88,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color: data['levels'],
            textColor: "#FFFFFF",
            textX: 8,
            action: callbacks[0]
        }),
        new LevelChoiseButton(callbacks[1], "Level 1", data['levels']),
        new LevelChoiseButton(callbacks[2], "Level 2", data['levels'], false, { x: 180, y: 0 }),
        new LevelChoiseButton(callbacks[3], "Level 3", data['levels'], false, { x: 180 * 2, y: 0 }),
        new LevelChoiseButton(callbacks[4], "Level 4", data['levels'], false, { x: 180 * 3, y: 0 }),
        new LevelChoiseButton(callbacks[5], "Level 5", data['levels'], false, { x: 0, y: 50 }),
        new LevelChoiseButton(callbacks[6], "Level 6", data['levels'], false, { x: 180, y: 50 }),

    ]
}