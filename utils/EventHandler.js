export class EventHandler {
    constructor (
        eventList = {
            mouse: ["click"]
        },
        keyBindings,
        timeGetter    
    ) {
        this.lastEvents = {};
        this.bindings = {}
        for (let code in keyBindings) {
            this.bindings[code] = {
                status: false,
                lastChange: 0
            }
        }
        for (let type in eventList) {
            this.lastEvents[type] = [];
            for (let name in eventList[type]) {
                window.addEventListener(name, (evt) => {
                    this.lastEvents[type].push(evt);
                    if (eventList[type][name]) evt.preventDefault();
                    console.log(timeGetter());
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