export class Data {
    constructor({bindings, eventList, scenesInfo}) {
        this.player = { }

        this.gameSettings = {
            keyBindings: { ...bindings },
            events: { ...eventList },
            scenesInfo: { ...scenesInfo },
            isFullscreened: true
        }

        this.nextScene = null
    }

    changeKeyStatus(key, status, lastChange) {
        if (!this.gameSettings.keyBindings[key]) return;
        this.gameSettings.keyBindings[key].status = status
        this.gameSettings.keyBindings[key].lastChange = lastChange
        console.log(`Changed ${key}: `, this.gameSettings.keyBindings[key]);
    }

    changeKeyBinding(key, code) {
        this.gameSettings.keyBindings[key].code = code
    }

    changeFullscreenType(isOn) {
        this.gameSettings.isFullscreened = isOn
    }

}