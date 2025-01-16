export class Animation {
  constructor({
    framelist = null,
    frameListHeight = null,
    frameListWidth = null,
    frameWidth = null,
    frameHeight = null,
    totalFrames = 1,
    duration = 0,
    frameX = 0,
    frameY = 0,
    // offsetX = 0,
    // offsetY = 0,
    // imageX = 0,
    // imageY = 0,
    // imageWidth,
    // imageHeight,
    startFrame = 0,
    isRotating = false,
    isInfinit = false,
    log = false,
    startTime = 0
  }) {
    this.isAnimation = true
    this.framelist = framelist;

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.frameListWidth = frameListWidth;
    this.frameListHeight = frameListHeight;

    this.frameX = frameX;
    this.frameY = frameY;

    this.duration = duration;
    this.currentFrame = 0 + startFrame;
    this.totalFrames = totalFrames;
    this.step = this.duration / this.totalFrames;
    this.startTime = startTime;

    this.isPlaying = false;
    this.isInfinit = isInfinit;

    this.isRotating = isRotating;
    this.log = log;

    this.image = document.createElement("canvas");

    if (this.log){
    document.body.appendChild(this.image);
    this.image.style.position = "absolute";
    this.image.style.zIndex = "3";
    this.image.style.top = "17rem";
    this.image.style.left = "17rem";
    this.image.style.border = "2px solid #fff";
    console.log(this);
    }

    this.ctx = this.image.getContext("2d");
    this.image.width = this.frameWidth;
    this.image.height = this.frameHeight;
  }

  appendImage(image, time) {
    this.framelist = image;
    this.startTime = time;
  }

  update(time, rotation) {
    if (this.duration > time - this.startTime) {
      this.isPlaying = true;
      this.currentFrame = this._changeCurrentFrame(time)
    } else if (this.isPlaying) {
      if (this.isInfinit) {
        this.startTime = time;
        this._changeCurrentFrame(time)
      } else {
        this.isPlaying = false;
        // console.log("Animation ended");
      }
    }
    this._draw(rotation)
  }

  reset(time) {
    this.startTime = time;
  }

  setDuration(duration) {
    this.duration = duration;
    this.step = this.duration / this.totalFrames
  }

  _changeCurrentFrame(time = null, frame = null) {
    // if (this.log) debugger;
    this.currentFrame = frame || Math.ceil((time - this.startTime) / this.step)
    if (this.currentFrame >= this.totalFrames) this.currentFrame = 0
    if (this.log) console.log('this.currentFrame: ', this.currentFrame);
    return this.currentFrame;
  }

  _draw(rotation = -1) {
    if (!this.framelist) return;

    let line = Math.floor((this.currentFrame * this.frameWidth) / this.frameListWidth)
    let sx = this.currentFrame * this.frameWidth - line * this.frameListWidth
    let sy = line * this.frameHeight

    this.ctx.reset()
    if (rotation >= 0 && this.isRotating) {
      this.ctx.translate(this.frameWidth / 2, this.frameWidth / 2);
      this.ctx.rotate(rotation);
    }
    if (this.log) this._log();

    //ctx.drawImage(image, sx, sy, ORIGW, ORIGH, x, y, MAXW, MAXH);
    this.ctx.drawImage(
      this.framelist,
      sx,
      sy,
      this.imageX || this.frameWidth,
      this.imageY || this.frameHeight,
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight
    );
    if (rotation >= 0 && this.isRotating) this.ctx.restore();
  }

  setFrame(number) {
    this._changeCurrentFrame(0, number)
  }

  _log() {
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.strokeRect(
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight
    )
  }
}
