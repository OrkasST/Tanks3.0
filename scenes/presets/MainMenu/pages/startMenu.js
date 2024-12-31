import { Button } from "../../../../UI/Button.js";

export function StartMenu(data, ...callbacks) {
    return [
        {
            type: "block",
            name: "logo",
            x: window.innerWidth * 0.5 - 128,
            y: window.innerHeight * 0.2,
            width: 256,
            height: 171,
            isUpdatable: false,
            color: data["lable_image"]
        },
        {
            type: "text",
            name: "lable",
            x: window.innerWidth * 0.5 - 93,
            y: window.innerHeight * 0.3,
            isUpdatable: false,
            font: "40px TimesNewRoman",
            color: "#FFFFFF",
            text: "Main Menu"
        },
        new Button({
            name: "Level Choose",
            text: "Levels",
            x: window.innerWidth * 0.5 - 64,
            y: window.innerHeight * 0.2 + 250,
            width: 128,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color: data['levels'],
            textColor: "#FFFFFF",
            textX: 16,
            action: callbacks[0]
        }),
        new Button({
            name: "Game Settings",
            text: "Settings",
            x: window.innerWidth * 0.5 - 64,
            y: window.innerHeight * 0.2 + 310,
            width: 128,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color: data['levels'],
            textColor: "#FFFFFF",
            textX: 7,
            action: callbacks[1]
        })
    ]
}