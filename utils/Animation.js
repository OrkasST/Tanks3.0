export class Animation {
    constructor({
      framelist,
      frameListHeight,
      frameListWidth,
      frameWidth,
      frameHeight,
      totalFrames = 1,
      duration,
      frameX = 0,
      frameY = 0,
      offsetX = 0,
      offsetY = 0,
      imageX = 0,
      imageY = 0,
      imageWidth = 128,
      imageHeight = 128,
      startFrame = 0,
      isRotating = false,
      isInfinit = true,
      log = false,
    }) {
      this.framelist = framelist;
      this.frameListHeight = frameListHeight;
      this.frameListWidth = frameListWidth;
      this.frameWidth = frameWidth || frameListWidth;
      this.frameHeight = frameHeight || frameListHeight;
      this.totalFrames = totalFrames;
      this.duration = duration;
      this.step = duration / totalFrames;
      this.startFrame = startFrame;
      this.frameX = frameX;
      this.frameY = frameY;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.imageX = imageX;
      this.imageY = imageY;
      this.isInfinit = isInfinit;
      this.isRotating = isRotating;
      this.startFrame = startFrame;
      this.currentFrame = 0 + startFrame;
      this.line = -1;
      this.column = -1;
      this.log = log;
      this.isAnimationEnded = false;

      this.image = document.createElement("canvas");
      this.ctx = this.image.getContext("2d");
      this.image.width = imageWidth;
      this.image.height = imageHeight;
    }

    setToStartFrame() {

    }
  
    frame({deltaTime, rotation=-1, number}) {
      if (this.totalFrames - 1 < this.currentFrame && this.duration > 0) return;
      // if (this.log) debugger;
      if (this.currentFrame > 0 && this.duration > 0) {
        this.currentFrame += Math.floor(deltaTime / this.step) - 1;
        if (this.currentFrame >= this.totalFrames)
          this.currentFrame = this.totalFrames - 1;
      }
      let sx =
        (this.column >= 0
          ? this.column
          : number >= 0
          ? number
          : this.currentFrame) * this.frameWidth;
      let line =
        this.line >= 0
          ? this.line
          : Math.floor(
              ((number || this.currentFrame) * this.frameWidth) /
                this.frameListWidth
            );
      if (sx >= this.frameListWidth) sx -= this.frameListWidth * line;
      sx += this.offsetX;
      let sy = line * this.frameHeight + this.offsetY;
      // this.ctx.clearRect(
      //   -this.image.width,
      //   -this.image.height,
      //   this.image.width * 2,
      //   this.image.height * 2
      // );
      this.ctx.reset()
      if (rotation >= 0 && this.isRotating) {
        // this.ctx.save();
        this.ctx.translate(this.frameWidth / 2, this.frameWidth / 2);
        this.ctx.rotate(rotation);
      }
      if (this.log) {
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.strokeRect(
          this.frameX,
          this.frameY,
          this.frameWidth,
          this.frameHeight
        );
      }
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
      if (!number && this.totalFrames - 1 > this.currentFrame)
        this.currentFrame++;
      if (this.totalFrames - 1 <= this.currentFrame && this.isInfinit)
        this.currentFrame = 0;
      if (
        this.duration > 0 &&
        this.totalFrames - 1 <= this.currentFrame &&
        !this.isAnimationEnded
      ) {
        this.isAnimationEnded = true;
        console.log("this.isAnimationEnded: ", this.isAnimationEnded);
      }
      // if (this.log) {
      //   console.log("this.currentFrame: ", this.currentFrame);
      //   console.log("sx: ", sx);
      //   console.log("sy: ", sy);
      //   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      // }
    }
  
    setLine(line) {
      this.line = line;
    }
    setColumn(column) {
      this.column = column;
    }
    setImageDimensions(dimension, value) {
      this.image[dimension] = value
    }
  
    reset() {
      this.currentFrame = 0 + this.startFrame;
      console.log("this.currentFrame: ", this.currentFrame);
      this.isAnimationEnded = false;
    }
  }
  