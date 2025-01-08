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

  setFocus(obj) {
    this.position.x = -obj.x + this.modifiers.x - obj.width/2;
    this.position.y = -obj.y + this.modifiers.y - obj.height/2;
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

  update() {
    console.log("MOVE IT MOVE IT MOVE IT");
    this.position.x += this.movement.x
    this.position.y += this.movement.y
  }

  isMoving(axis = "", speed) {
    this.movement[axis] = speed
  }

}
