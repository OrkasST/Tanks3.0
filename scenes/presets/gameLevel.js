export class GameLevel extends Scene {
    constructor(name, startTime, data) {
        super({
            name,
            objects: [
                  
            ],
            startTime,
            background: "#000000"
        });
        this.mainPage = {...this.objects};
        this.pages = {

        }
    }

    changePage(page) {
        this.objects = this.pages[page];
    }

    update(time, data) {
        if (data.events.mouse.length > 0) {
            // debugger;
            for (let i = 0; i < this.objects.length; i++) {
                if (this.objects[i].isInteractive &&
                    this.objects[i].isUnderPointer(
                        data.events.mouse[data.events.mouse.length-1].clientX,
                        data.events.mouse[data.events.mouse.length-1].clientY
                    )
                ) {
                    this.objects[i].action();
                }
            }
        }
    }
}