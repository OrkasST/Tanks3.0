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
  }

  setFocus(obj) { this.focuseObj = obj }

  update() {
    // camera mechanics update started 09.01.2025 0.31
    this.position.x = -this.focuseObj.x + this.modifiers.x - this.focuseObj.width/2;
    this.position.y = -this.focuseObj.y + this.modifiers.y - this.focuseObj.height/2;
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
