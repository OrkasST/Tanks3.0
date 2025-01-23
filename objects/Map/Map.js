import { GameObject } from "../GameObject.js";
// import { SpriteSheet } from "./SpriteSheet.js";

export class Map extends GameObject {
  constructor(name, src) {
    super({
      type: "map"
    })
    // console.log("CREATING MAP_____");
    this.type = "map";
    this.screen = document.createElement("canvas");
    // console.log('MAP>>>>>>\n\tscreen: ', this.screen);
    // this.screen.width = width;
    // this.screen.height = height;
    this.ctx = this.screen.getContext("2d");
    this.mapData = null;
    this.tiles = null;
    this.image = null;
    this.spawnPoints = null;
    this.hitboxes = null;
    this.name = name;
    this.z = 0;
  }

  // async imageLoaded() {
  //   // console.log("Creating Map....");
  //   const got = await fetch(`./levelMaps/${this.name}.json`);
  //   this.mapData = await got.json();
  //   this.createMap(1);
  //   // console.log("Map Created");
  //   return true;
  // }

  _isLast() {
    if (!this.lastAppending) this.lastAppending = true
    else this.createMap()
  }

  appendTexture(image) {
    this.tiles = image
    this._isLast()
  }

  appendInfo(info) {
    this.mapData = info;
    // console.log('info: ', info);
    this._isLast()
  }

  getSourceX(index) {
    let res = this.mapData.tilewidth * (index - 1)
    return res;
  }
  getSourceY(index) {
    return 0 //this.mapData.tileHeight * (index-1)
  }


  createMap() {
    this.screen.width = this.mapData.width * this.mapData.tilewidth;
    this.screen.height = this.mapData.height * this.mapData.tileheight;
    // document.body.appendChild(this.screen)
    // document.body.appendChild(this.tiles)
    this.width = this.screen.width
    this.height = this.screen.height

    // let tileset = new SpriteSheet({
    //   imageName: "tiles",
    //   imageWidth: 640,
    //   imageHeight: 640,
    // });
    const hitboxes = [];
    // const spawnPoints = [];
    let row, col;
    this.mapData.layers.forEach((layer) => {
      if (layer.type === "tilelayer") {
        row = 0;
        col = 0;
        layer.data.forEach((index) => {
          if (index > 0) {
            this.ctx.beginPath();
            // console.log('MAP>>>>>>\n\tthis.tiles: ', this.tiles);
            this.ctx.drawImage(
              this.tiles,
              this.getSourceX(index),
              this.getSourceY(index),
              this.mapData.tilewidth,
              this.mapData.tileheight,
              col * this.mapData.tilewidth,
              row * this.mapData.tileheight,
              this.mapData.tilewidth,
              this.mapData.tileheight
            );
            this.ctx.closePath();
          }
          col++;
          if (col > this.mapData.width - 1) {
            col = 0;
            row++;
          }
        });
      }
      if (layer.type === "objectgroup") {
        // if (layer.id !== 21)
        //   spawnPoints[layer.name] = [
        //     ...layer.objects.map((obj) => ({ x: obj.x, y: obj.y })),
        //   ];
        // else
        if (layer.name == "Walls") hitboxes.push(
          ...layer.objects.map((obj) => ({
            x1: obj.x,
            x2: obj.x + obj.width,
            y1: obj.y,
            y2: obj.y + obj.height,
            type: obj.type,
            id: obj.id,
          }))
        );
        else if (layer.name === "PlayerSpawnPoint") {
          this.playerSpawnPoints = this._decodeSpawnPoints(layer);
          this.currentPlayerSpawnPoint = this.playerSpawnPoints[0]
          console.log('this.currentPlayerSpawnPoint: ', this.currentPlayerSpawnPoint);
        } else if (layer.name === "EnemySpawners") {
          this.enemySpawners = this._decodeSpawnPoints(layer);
          console.log('this.enemySpawners: ', this.enemySpawners);
        } else if (layer.name === "EnemyPositions") {
          this.enemyDefaultPositions = this._decodeSpawnPoints(layer);
          console.log('this.enemyDefaultPositions: ', this.enemyDefaultPositions);
        }
      }
    });

    // images[name] = mapScreen;
    // return new TileMap({
    //     imageName: name,
    //     sourceX: 0,
    //     sourceY: 0,
    //     width: mapScreen.width,
    //     height: mapScreen.height,
    //     hitboxes: hitboxes
    // });

    // this.image = new GameObject({
    //   type: "map_image",
    //   position: {
    //     x: 0,
    //     y: 0,
    //   },
    //   color: "#000000",
    //   texture: {
    //     img: this.screen,
    //     sx: 0,
    //     sy: 0,
    //   },
    //   size: {
    //     width: this.screen.width * GS,
    //     height: this.screen.height * GS,
    //   },
    //   movement: {
    //     disabled: "all",
    //   },
    //   isDisplayed: true,
    // });
    // this.image.collisionBody = false;
    // this.spawnPoints = spawnPoints;
    this.hitboxes = hitboxes;
    this.image = this.screen;
    // console.log(this.spawnPoints);
  }

  _decodeSpawnPoints(data) {
    return data.objects.map((el, ind) => { return { x: el.x, y: el.y, id: ind } })
  }

}
