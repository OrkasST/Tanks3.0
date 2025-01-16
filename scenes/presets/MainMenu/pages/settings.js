import { Button } from "../../../../UI/Button.js";

export function Settings(data, gameSettings, ...callbacks) {
    console.log('callbacks: ', callbacks);
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
        new Button({
            name: "Toggle fullscreen",
            text: "Fullscreen: ON",
            x: window.innerWidth * 0.5 - 120,
            y: window.innerHeight * 0.1 + 310,
            width: 240,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color: data['levels'],
            textColor: "#FFFFFF",
            textX: 14,
            isActive: false,
            action: callbacks[1]
        }),
        new Button({
            name: "Keys",
            text: "Key Bindings",
            x: window.innerWidth * 0.5 - 120,
            y: window.innerHeight * 0.1 + 370,
            width: 240,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color: data['levels'],
            textColor: "#FFFFFF",
            textX: 14,
            isActive: true,
            action: callbacks[2]
        })
    ]
}