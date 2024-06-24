export class Button {
    constructor({
        name = "standartButton",
        x = 10, y = 10, width = null, height = 40,
        color = "#999999",
        text = "standartButton",
        textColor = "#000000",
        font = "TimesNewRoman",
        textHeight = 40, 
        extX, textY,
        action = null
    }) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width || text.length * (textHeight / 2);
        this.height = height;
        this.color = color;
        this.textColor = textColor;
        this.font = textHeight + "px " + font;
        this.text = text;
        this.textX = (this.x + textX) || this.x;
        this.textY = this.y + this.height - (textY || (((height - textHeight) / 2) + textHeight / 7));

        this.type = "button";
        this.isUpdatable = true;
        this.isInteractive = true;

    }

    isUnderPointer(x, y) {
        if (this.x <= x && this.y <= y && this.x + this.width >= x && this.y + this.height >= y) return true;
        else return false;
    }
}