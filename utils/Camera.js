export class Camera {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.modifiers = {
      x: 0,
      y: 0,
    };

    this.movement = {
      x: 0,
      y: 0
    }

    this.triggerFrame = null
  }

  setFocus(obj) { 
    this.focuseObj = obj
    this.triggerFrame = {
      x1: this.modifiers.x * 0.4,
      x2: this.modifiers.x * 1.6,
      y1: this.modifiers.y * 0.4,
      y2: this.modifiers.y * 1.6,
    }
    this.position.x = -this.focuseObj.x + this.modifiers.x - this.focuseObj.width/2;
    this.position.y = -this.focuseObj.y + this.modifiers.y - this.focuseObj.height/2;
  }

  update() {
    // camera mechanics update started 09.01.2025 0.31
    if (
      (this.focuseObj.x + this.position.x <= this.triggerFrame.x1) ||
      (this.focuseObj.x + this.focuseObj.width + this.position.x >= this.triggerFrame.x2) ||
      (this.focuseObj.y + this.position.y <= this.triggerFrame.y1) ||
      (this.focuseObj.y + this.focuseObj.height + this.position.y >= this.triggerFrame.y2)
    ) {
    this.position.x -= this.focuseObj.movement.x;
    this.position.y -= this.focuseObj.movement.y;
    }
  }

  setModifiers(x, y) {
    this.modifiers.x =
      screen.orientation.type !== "portrait-primary"
        ? window.outerWidth / 2
        : window.outerHeight / 2;
        console.log("CAMERA >>>>>>>>>>>");
        console.log('window.outerHeight: ', window.outerHeight);
    this.modifiers.y =
      screen.orientation.type !== "portrait-primary"
        ? window.outerHeight / 2
        : window.outerWidth / 2;
        console.log('window.outerWidth: ', window.outerWidth);
  }

}
