export class EventHandler {
    constructor (eventList = {
        mouse: ["click"]
    }) {
        this.lastEvents = {};
        for (let type in eventList) {
            this.lastEvents[type] = [];
            for (let name in eventList[type]) {
                window.addEventListener(name, (evt) => {
                    this.lastEvents[type].push(evt);
                    if (eventList[type][name]) evt.preventDefault();
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