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

    this.isTriggered = {
      x: false,
      y: false
    }
    this.drawDebug = true
  }

  setFocus(obj) {
    this.focuseObj = obj
    this.triggerFrame = {
      x1: this.modifiers.x * 0.7,
      x2: this.modifiers.x * 1.3,
      y1: this.modifiers.y * 0.7,
      y2: this.modifiers.y * 1.3,
    }
    this.position.x = -this.focuseObj.x + this.modifiers.x - this.focuseObj.width / 2;
    this.position.y = -this.focuseObj.y + this.modifiers.y - this.focuseObj.height / 2;
  }

  update() {
    // camera mechanics update started 09.01.2025 0.31
    this.checkTrigger("x")
    this.checkTrigger("y")
    this.moveToFocuse("x")
    this.moveToFocuse("y")

  }

  checkTrigger(axis) {
    if (
      (this.focuseObj[axis] + this.position[axis] <= this.triggerFrame[axis + '1']) ||
      (
        this.focuseObj[axis]
        + this.focuseObj[axis === "x" ? "width" : "height"]
        + this.position[axis] >= this.triggerFrame[axis + '2']
      )
    ) {
      this.isTriggered[axis] = true
      this.position[axis] -= this.focuseObj.movement[axis]
      if (this.focuseObj.movement[axis] === 0) this.isTriggered[axis] = false
    } else {
      this.isTriggered[axis] = false
    }
  }

  moveToFocuse(axis) {
    if (
      !this.isTriggered[axis] &&
      (this.focuseObj[axis] + this.focuseObj.width / 2 + this.position[axis] < this.modifiers[axis] - 2 ||
        this.focuseObj[axis] + this.focuseObj.width / 2 + this.position[axis] > this.modifiers[axis] + 2)
    ) {
      this.position[axis] += (
        this.modifiers[axis] - (
          this.focuseObj[axis]
          + this.focuseObj[axis === "x" ? "width" : "height"] / 2
          + this.position[axis]
        )
      ) / (this.modifiers[axis] / 20)
      return true;
    }
    return false;
  }

  setModifiers(x, y) {
    this.modifiers.x =
      screen.orientation.type !== "portrait-primary"
        ? window.outerWidth / 2
        : window.outerHeight / 2;
    this.modifiers.y =
      screen.orientation.type !== "portrait-primary"
        ? window.outerHeight / 2
        : window.outerWidth / 2;
  }

}
