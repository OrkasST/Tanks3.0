export class Drawer {
    constructor(screen) {
        this.screen = screen;
        this.ctx = this.screen.getContext("2d");
    }

    clear() {
        this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    }

    rect({
        x = 0, y = 0, width = 10, height = 10, color = "#000000", filled = true
    }) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        filled ? this.ctx.fillRect(x, y, width, height) : this.ctx.strokeRect(x, y, width, height);
        this.ctx.closePath();
    }

    image({
        image = null,
        ax = 0,
        ay = 0,
        awidth = 10,
        aheight = 10,
        bx = null,
        by = null,
        bwidth = null,
        bheight = null,
    }) {
        if(!image) return;
        this.ctx.beginPath();
        this.ctx.closePath();
    }

    circle({
        x = 10, y = 10, r = 10, color = "#000000", filled = true
    }) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        filled ? this.ctx.fill() : this.ctx.stroke();
        this.ctx.closePath();
    }

    line({
        x1 = 0, y1 = 0, x2 = 10, y2 = 10
    }) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    text({
        font = "20px TimesNewRoman",
        color = "#000000",
        x = 20,
        y = 20,
        text = "NO USER TEXT",
    }) {
        this.ctx.beginPath();
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
        this.ctx.closePath();
    }

    error({
        x = 0, y = 0, width = 10, height = 10
    }) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000000";
        this.ctx.strokeStyle = "#FF0000";
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x+width*0.25, y+height*0.25, width*0.75, height*0.75);
        this.ctx.closePath();
    }
}