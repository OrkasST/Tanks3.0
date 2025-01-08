export class Spawner {
    constructor({
        position,
        data,
        type= "enemy",
        createFunction,
        interval = 2000,
        time = 0,
        source
    }) {
        this.x = position.x;
        this.y = position.y;
        this.id = position.id;
        this.type = type;
        this.data = data;
        this.createFunction = createFunction;
        this.interval = interval;
        this.source = source;

        this.lastCreationTime = time;
    }

    update(time) {
        if (time - this.lastCreationTime >= this.interval) {
            this.source.push(this.createFunction(this.type, {...this.data, x: this.x, y: this.y, spawnerId: this.id}))
        }
    }
}