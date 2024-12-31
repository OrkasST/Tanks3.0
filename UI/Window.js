export class Window {
    constructor({
        name = "standartWindow",
        x = window.innerWidth * 0.1, y = window.innerHeight * 0.1, width = window.innerWidth * 0.8, height = window.innerHeight * 0.8,
        color = "#FFFFFF",
        textColor = "#000000",
        font = "TimesNewRoman",
        textHeight = 40, 
        textX = 20, textY = 20,
        text = "SAMPLE WINDOW TEXT"
    }) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height
        this.color = color;
        this.textColor = textColor;
        this.font = textHeight + "px " + font;
        this.text = text;
        this.textX = this.x + textX;
        this.textY = this.y + textY + textHeight;

        this.type = "window";
        this.isUpdatable = true;
        this.isInteractive = true;

        this.log = {
            lg: true
        }
    }

    isUnderPointer(x, y) {
        // debugger;
        if (this.isActive && this.x <= x && this.y <= y && this.x + this.width >= x && this.y + this.height >= y) return true;
        else return false;
    }
}