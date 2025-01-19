import { GameObject } from "../GameObject.js";

export class Cursor extends GameObject {
    constructor() {
        super({
            type: "UI",
            color: null, //"#ff00ff",
            width: 64, height: 64
        })
        this.name = "AIM";

        this.isFilling = false;
        this.fillingStartAngle = -Math.PI / 2
        this.angle = 360
        this._modifier = Math.PI / 180;
        this.filedAngle = this.fillingStartAngle + this.angle * this._modifier
    }

    appendTexture(name, image) {
        super.appendTexture(name, image)
        this.image = [
            {
                isCircle: true,
                x: this.x + this.width / 2, y: this.y + this.height / 2,
                r: 26,
                color: "#000000",
                filled: false,
                lineWidth: 4,
                startAt: this.fillingStartAngle,
                angle: this.filedAngle
            },
            {
                isCircle: true,
                x: this.x + this.width / 2, y: this.y + this.height / 2,
                r: 26,
                color: "#5eabec",
                filled: false,
                lineWidth: 4,
                startAt: this.fillingStartAngle,
                angle: this.filedAngle
            },
            image,
        ]
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
        this.image[0].x = x + this.width / 2
        this.image[0].y = y + this.height / 2
        this.image[1].x = x + this.width / 2
        this.image[1].y = y + this.height / 2
    }

    updateFilling() {
        this.image[1].angle = this.fillingStartAngle + this.angle * this._modifier;
    }

    startRefill(duration) {
        this.step = 360 / duration;
        this.angle = -this.step;
        this.isFilling = true;
    }

    update(time) {
        if (this.isFilling) {
            this.angle += this.step * (time - this.lastUpdateTime);
            if (this.angle >= 360) {
                this.angle = 360;
                this.isFilling = false;
            }
            this.updateFilling()
        }

        this.lastUpdateTime = time;
    }
}