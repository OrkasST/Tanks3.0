import { Button } from "../../../../UI/Button.js";

export function KeyBindings(data, bindings, ...callbacks) {
    //Reworking
    console.log('data: ', data);
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
        {
            type: "text",
            name: "lable",
            x: window.innerWidth * 0.2,
            y: window.innerHeight * 0.3,
            isUpdatable: false,
            font: "40px TimesNewRoman",
            color: "#FFFFFF",
            text: "Open pause menu:"
        },
        new Button({
            name: "Switch Pause Button",
            text: bindings["PauseMenu"][0],
            x: window.innerWidth * 0.2 + 400,
            y: window.innerHeight * 0.3 - 36,
            width: 88,
            height: 40,
            font: "TimesNewRoman",
            textHeight: 35,
            color: '#FFFFFF',
            textColor: "#000000",
            textX: 36,
            action: callbacks[1]
        })
    ]
}