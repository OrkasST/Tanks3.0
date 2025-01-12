import { CollisionBody } from "../physics/CollisionBody.js";

export class GameObject {
  constructor({
    type = "block", //"entity" | "projectile" | "special"
    relation = "ignor", // "fear" | "agressive" | "neutral"

    x = 0,
    y = 0,
    width = 0,
    height = 0,
    rotation = -1,
    isSpheric = false,
    radius = 0,

    color = null,
    image = null,

    isStatic = true,
    isCollidable = false,
    isPlayer = false,
    isDestructive = false,

    shape = "rectangle", // "circle" , {type:0/1, x...}

    direction = "none",
    prevDirection = "none",
    speed = 5,
    status = "stop",
    steps = 0,

    time = 0,
    lifeTime = Infinity,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation < 0 ? -1 : (rotation * Math.PI / 180);
    this.radius = radius;
    this.type = type;
    this.shape = shape;

    this.isSpheric = isSpheric;
    this.isStatic = isStatic;
    this.isCollidable = isCollidable;
    this.isDestructive = isDestructive;
    this.isPlayer = isPlayer;

    this.activeTextures = [];
    this.textures = {};
    this.color = color;

    this.direction = direction;
    this.prevDirection = prevDirection;
    this.speed = speed;
    this.status = status;
    this.steps = steps;

    this.movement = {
      x: 0,
      y: 0
    }

    this.creationTime = time;
    this.lastUpdateTime = time;
    this.lifeTime = lifeTime;
    this.isToBeDestroyed = false;
  }

  // setImage(images, textures) {
  //   this.images = images;
  //   this.textures = textures;
  // }

  // setAnimation(animations) {
  //   this.animations = animations;
  // }

  rotate({rotation = null, deltaTime = null}) {
    if (rotation) this.rotation = rotation;
    this.image.frame({deltaTime, rotation: this.rotation })
  }

  appendTexture(name, image) {
    this.textures[name] = image;
  }

  setActiveTexture(imageNumber, texture) {
    this.activeTextures[imageNumber] = texture;
  }

  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }

  update(time) {
    if (!this.isStatic) {
      this.x += this.movement.x
      this.y += this.movement.y
    }

    if (!time) return;
    this.lastUpdateTime = time;
    if (this.lastUpdateTime - this.creationTime >= this.lifeTime) {
      this.isToBeDestroyed = true;
    }
  }

  isMoving(multiply = {x: 0, y: 0}) { // multiply = 1, 0, -1
    this.movement.x = this.speed * multiply.x
    this.movement.y = this.speed * multiply.y
  }

  // move() {
  //   if (this.movement.status === "moving") {
  //     switch (this.movement.direction) {
  //       case "up":
  //         this.y -= this.movement.speed;
  //         this.collider.move(0, -this.movement.speed);
  //         break;
  //       case "left":
  //         this.x -= this.movement.speed;
  //         this.collider.move(-this.movement.speed);
  //         break;
  //       case "down":
  //         this.y += this.movement.speed;
  //         this.collider.move(0, this.movement.speed);
  //         break;
  //       case "right":
  //         this.x += this.movement.speed;
  //         this.collider.move(this.movement.speed);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }
}
