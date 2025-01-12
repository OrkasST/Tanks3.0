import { Part } from "./TankPart.js";

export class Tower extends Part {
    constructor(data) {
        super({
            ...data,
            color: "#00FF00",
            offsetX: -20,
            offsetY: -20,
            width: 200,
            height: 40
        })
        this.reloadDuration = data.reloadDuration
    }
    
    shoot(time) {
        if(this.isReloading) return;
        this.image.setColumn(0)
        this.reload(time)
    }
    reload(time) {
        if (this.isReloading) {
            if (time >= this.ReloadStartTime + this.reloadDuration) {
                this.image.reset()
                this.image = this.textures["tower"]
                this.image.setColumn(1)
                this.image.frame({rotation: this.rotation})
                this.isReloading = false
            }
            return;
        }
        this.isReloading = true
        this.ReloadStartTime = time
        this.image = this.textures["tower_reload"]
        this.image.setDuration(this.reloadDuration)
    }

    update(x, y, time) {
        this.rotate({deltaTime: time - this.ReloadStartTime})
        if (this.isReloading) this.reload(time)
        super.update(x, y, time)
    }
}