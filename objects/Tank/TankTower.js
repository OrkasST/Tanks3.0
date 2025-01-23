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
        this.reloadDuration = data.reloadDuration || 0
        this.z = 2;
    }
    
    shoot(time) {
        if(this.isReloading) return;
        this.image.setFrame(0)
        this.reload(time)
    }
    reload(time) {
        if (this.isReloading) {
            if (time >= this.ReloadStartTime + this.reloadDuration) {
                this.image = this.textures["tower"]
                this.image.setFrame(1)
                this.image.update(time, this.rotation)
                this.isReloading = false
            }
            return;
        }
        this.isReloading = true
        this.ReloadStartTime = time
        this.image = this.textures["tower_reload"]
        this.image.reset(time)
        this.image.setDuration(this.reloadDuration)
    }

    update(x, y, time) {
        this.rotate({deltaTime: time})
        if (this.isReloading) this.reload(time)
        super.update(x, y, time)
    }
}