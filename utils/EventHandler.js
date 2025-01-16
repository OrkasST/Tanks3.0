export class EventHandler {
    constructor(
        eventList = {
            mouse: ["click"]
        },
        keyBindings,
        statusChangeFunction,
        timeGetterFunction
    ) {
        this.lastEvents = {};
        this.bindings = {}
        for (let action in keyBindings) {
            if (keyBindings[action].lock) navigator.keyboard.lock([keyBindings[action].code])
            if (!Array.isArray(keyBindings[action])) this.bindings[keyBindings[action].code] = action
        }
        for (let type in eventList) {
            this.lastEvents[type] = [];
            for (let name in eventList[type]) {
                document.addEventListener(name, (evt) => {
                    this.lastEvents[type].push(evt);
                    if (eventList[type][name]) evt.preventDefault();
                    if (type === "keyboard") {
                        if (
                            this.bindings[evt.code] &&
                            (
                                (name === "keydown" && !keyBindings[this.bindings[evt.code]].status) ||
                                (name === "keyup" && keyBindings[this.bindings[evt.code]].status)
                            )
                        ) {
                            statusChangeFunction(
                                this.bindings[evt.code],
                                name === "keydown",
                                timeGetterFunction()
                            )
                        }
                    }
                    // console.log(timeGetter());
                })
            }
        }

    }

    getLastEvents() {
        let events = {};
        events.number = 0;
        for (let type in this.lastEvents) {
            events[type] = [...this.lastEvents[type]];
            this.lastEvents[type] = [];
            events.number += events[type].length;
        }

        return events;
    }
}