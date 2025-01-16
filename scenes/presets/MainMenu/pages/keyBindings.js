import { Button } from "../../../../UI/Button.js";

export function KeyBindings(data, bindings, ...callbacks) {
    console.log('bindings: ', bindings);
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

        ...bindings.bindingsList.map((el, ind) => {
            return [
                {
                    type: "text",
                    name: "lable",
                    x: window.innerWidth * 0.15,
                    y: window.innerHeight * 0.3 + 60 * ind,
                    isUpdatable: false,
                    font: "40px TimesNewRoman",
                    color: "#FFFFFF",
                    text: `${bindings[el].actionName}:`
                },
                new Button({
                    name: `${bindings[el].actionName}: Button`,
                    text: bindings[el].code,
                    x: window.innerWidth * 0.2 + 500,
                    y: window.innerHeight * 0.3 - 36 + 60 * ind,
                    width: bindings[el].code.length * 20 + 20,
                    height: 40,
                    font: "TimesNewRoman",
                    textHeight: 35,
                    color: '#FFFFFF',
                    textColor: "#000000",
                    textX: 20,
                    action: () => callbacks[1](el)
                })
            ]
        }).flat(),
    ]
}