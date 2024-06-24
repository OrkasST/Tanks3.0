export class EventHandler {
    constructor (eventList = {
        mouse: ["click"]
    }) {
        this.lastEvents = {};
        for (let name in eventList) {
            this.lastEvents[name] = [];
            for (let i = 0; i < eventList[name].length; i++) {
                window.addEventListener(eventList[name][i], (evt) => {
                    this.lastEvents[name].push(evt);
                })
            }
        }
        
    }

    getLastEvents() {
        let events = {};
        events.number = 0;
        for (let name in this.lastEvents) {
            events[name] = [...this.lastEvents[name]];
            this.lastEvents[name] = [];
            events.number += events[name].length;
        }

        return events;
    }
}