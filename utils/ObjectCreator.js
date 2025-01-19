import { Bullet } from "../objects/Bullet/Bullet.js";
import { Enemy } from "../objects/Enemy/Enemy.js";
import { Spawner } from "../objects/Enemy/Spawner.js";
import { GameObject } from "../objects/GameObject.js";
import { Map } from "../objects/Map/Map.js";
import { Player } from "../objects/Player/Player.js";
import { Cursor } from "../objects/special/Cursor.js";
import { CollisionBody } from "../physics/CollisionBody.js";
import { Animation } from "./Animation.js";
import { Camera } from "./Camera.js";

export class ObjectCreator {
  create(
    objectType,
    objectData,
    time,
    // {
    //   //objectData = {},
    //   textures = [],
    //   colisionBodyShape = 0,
    //   imagesSize = [],
    //   imagesCount,
    //   animationData = [
    //     {
    //       framelist: "",
    //       frameListHeight,
    //       frameListWidth,
    //       frameWidth,
    //       frameHeight,
    //       duration,
    //       frameX,
    //       frameY,
    //       startFrame: 0,
    //       isRotating: false,
    //       isInfinit: true,
    //     },
    //     //{},
    //     //{}, ...
    //   ],
    // },
    // loaded_textures
  ) {
    // if (objectData.type === "bullet") debugger;
    let object = null;
    switch (objectType) {
      case "player": object = new Player({ ...objectData, time }); break;
      case "levelMap": object = new Map({ ...objectData, time }); break;
      case "camera": object = new Camera({ ...objectData, time }); break;
      case "spawner": object = new Spawner({ ...objectData, time }); break;
      case "bullet": object = new Bullet({ ...objectData, time }); break;
      case "enemy": object = new Enemy({ ...objectData, time }); break;
      case "cursor": object = new Cursor(); break;
      default: object = { ...objectData }; break;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // if (objectData.type === "bullet") debugger;
    ////////////////////////////////////////////////////////////////////////////////
    /*
    if (object.isCollidable)
      object.collider = new CollisionBody(
        colisionBodyShape || {
          type: 0,
          x1: object.x,
          y1: object.y,
          x2: object.x + object.width,
          y2: object.y + object.height,
        }
      );
    */

    return object;
  }

  appendImages(images, objects) {
    let img;
    let i;
    for (img in images) {
      // console.log('img: ', img);
      let objName = img.split("_")[0];
      // console.log('objName: ', objName);
      if (objects[objName]) {
        // console.log('objects['+objName+']: ', typeof objects[objName]);
        if (objName !== "levelMap") objects[objName].appendTexture(img, images[img]);
        else objects[objName].appendInfo(images[img].mapData);
      } else if (objName === "tiles") {
        objects.levelMap.appendTexture(images[img]);
      }
    }
  }

  deleteDeadObjects(objects) {
    let objectsForDestruction = []
    objects.forEach((obj, ind) => {
      // if (obj.update) obj.update(time);
      if (obj.isToBeDestroyed) objectsForDestruction.push(ind)
    })
    if (objectsForDestruction.length === 0 ) return false;
    
    
    objectsForDestruction.forEach(ind => {
      if (Array.isArray(objects[ind].image)) {
        objects[ind].image.forEach(el => {
          if (el.isAnimation) el.image.image = null
          el.image = null          
        })
      } else {
        if (objects[ind].image.isAnimation) objects[ind].image.image = null
        objects[ind].image = null
      }
      for (let i in objects[ind]) {
        if (Array.isArray(objects[ind][i]) && i !== "image") {
          this.deleteDeadObjects(objects[ind][i])
        }
        objects[ind][i] = null;
        objects[ind][i] = null;
      }
      objects[ind] = null;
    })
    this.objects = objects.filter(el => { if (el) return el })
    // console.log('objects: ', objects);

    return true;
  }

  getUpdatedObjectList() {
    return this.objects
  }

  destroy(object) {
    for (let i = 0; i < object.images.length; i++)
      object.images[i].image.remove();
  }
}
