import { CollisionBody } from "../physics/CollisionBody.js";

export class GameObject {
  constructor({
    tag = "block", //"entity" | "projectile" | "special"
    relation = "ignor", // "fear" | "agressive" | "neutral"

    x = 0,
    y = 0,
    width = 0,
    height = 0,
    rotation = -1,
    isSpheric = false,
    radius = 0,

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
    this.rotation = rotation;
    this.radius = radius;
    this.tag = tag;
    this.shape = shape;

    this.isSpheric = isSpheric;
    this.isStatic = isStatic;
    this.isCollidable = isCollidable;
    this.isDestructive = isDestructive;
    this.isPlayer = isPlayer;

    this.activeTextures = [];

    this.direction = direction;
    this.prevDirection = prevDirection;
    this.speed = speed;
    this.status = status;
    this.steps = steps;

    this.time = time;
    this.lifeTime = lifeTime;
  }

  setImage(images, textures) {
    this.images = images;
    this.textures = textures;
  }

  setAnimation(animations) {
    this.animations = animations;
  }

  setActiveTexture(imageNumber, texture) {
    this.activeTextures[imageNumber] = texture;
  }

  move() {
    if (this.movement.status === "moving") {
      switch (this.movement.direction) {
        case "up":
          this.y -= this.movement.speed;
          this.collider.move(0, -this.movement.speed);
          break;
        case "left":
          this.x -= this.movement.speed;
          this.collider.move(-this.movement.speed);
          break;
        case "down":
          this.y += this.movement.speed;
          this.collider.move(0, this.movement.speed);
          break;
        case "right":
          this.x += this.movement.speed;
          this.collider.move(this.movement.speed);
          break;
        default:
          break;
      }
    }
  }
}
