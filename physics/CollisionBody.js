export class CollisionBody {
  constructor(x, y, ...bodies) {
    this.bodies = bodies;
    this.initialPoint = {
      x, y
    }
    /*
    body example:
      {
        type: 0, -- rectangular body
        x1: 10, y1: 10, -- first point coordinates
        x2: 20, y2: 20, -- second (diagonal) point coordinates
      }
      {
        type: 1, -- circular body
        x: 10, y:10, -- circle center
        r: 5, -- circle radius
      }
      {
        type: 2, -- multiple-dot figure
        dots: [
          {x: 5, y: 5},
          {x: 10, y: 10},
          {x: 15, y: 15},
        ],
        initialDots: [
          ...dots
        ]
      }
    */
  }

  move(x = 0, y = 0) {
    let offset = {
      x: x - this.initialPoint.x,
      y: y - this.initialPoint.y
    }

    this.initialPoint.x = x
    this.initialPoint.y = y

    for (let i = 0; i < this.bodies.length; i++) {
      if (this.bodies[i].type === 1) {
        this.bodies[i].x += offset.x;
        this.bodies[i].y += offset.y;
      } else if (this.bodies[i].type === 0) {
        this.bodies[i].x1 += offset.x;
        this.bodies[i].x2 += offset.x;
        this.bodies[i].y1 += offset.y;
        this.bodies[i].y2 += offset.y;
      } else {
        for (let j = 0; j < this.bodies[i].dots.length; j++) {
          this.bodies[i].dots[j].x += offset.x
          this.bodies[i].dots[j].y += offset.y
        }
      }
    }
  }

  rotate(angle) {
    let sin = Math.sin(angle), cos = Math.cos(angle)
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = 0; j < this.bodies[i].dots.length; j++) {
        this.bodies[i].dots[j].x = this.bodies[i].initialDots[j].x * cos - this.bodies[i].initialDots[j].y * sin
        this.bodies[i].dots[j].y = this.bodies[i].initialDots[j].x * sin - this.bodies[i].initialDots[j].y * cos
      }
    }
  }

  checkCollision(body) {
    // console.log("body: ", body);
    //body object must have the same structure as this.bodies
    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        if (body[i].type === 0 && this.bodies[j].type === 0) {
          if (this._checkType0_0(body[i], this.bodies[j])) {
            return true;
          } else continue; //bodies are rect type but no collision
        }

        if (body[i].type === 1 && this.bodies[j].type === 1) {
          if (this._checkType1_1(body[i], this.bodies[j])) {
            //debugger;
            return true;
          } else continue; //bodies are circle type but no collision
        }

        if (body[i].type === 0 && this.bodies[j].type === 1) {
          if (this._checkType1_0(this.bodies[j], body[i])) {
            //debugger;
            return true;
          } else continue; //colliding body is rect, this is circle no collision
        }

        if (body[i].type === 1 && this.bodies[j].type === 0) {
          if (this._checkType1_0(body[i], this.bodies[j])) {
            //debugger;
            return true;
          } else continue; //colliding body is circle, this is rect no collision
        }

        if (body[i].type === 2 && this.bodies[j].type === 0) {
          if (this._checkType2_0(body[i], this.bodies[j])) {
            return true
          } else continue;
        }
        if (body[i].type === 0 && this.bodies[j].type === 2) {
          if (this._checkType2_0(this.bodies[j], body[i])) {
            return true
          } else continue;
        }
      }
    }
    return false;
  }

  _checkType0_0(body1, body2) {
    if (
        body1.x1 <= body2.x2 &&
        body1.x2 >= body2.x1 &&
        body1.y1 <= body2.y2 &&
        body1.y2 >= body2.y1
      ) return true
    return false
  }
  _checkType1_1(body1, body2) {
    if (
      Math.sqrt(
        (body1.x - body2.x) * (body1.x - body2.x) +
        (body1.y - body2.y) * (body1.y - body2.y)
      ) <=
      body1.r + body2.r
    ) return true
    return false
  }
  _checkType1_0(body1, body2) {
    if (
      body1.x >= body2.x1 - body1.r &&
      body1.x <= body2.x2 + body1.r &&
      body1.y >= body2.y1 - body1.r &&
      body1.y <= body2.y2 + body1.r &&
      Math.sqrt(
        Math.pow(
          body1.x -
          (body2.x1 +
            (body2.x2 - body2.x1) / 2),
          2
        ) +
        Math.pow(
          body1.y -
          (body2.y1 +
            (body2.y2 - body2.y1) / 2),
          2
        )
      ) <=
      Math.sqrt(
        Math.pow((body2.x2 - body2.x1) / 2, 2) +
        Math.pow((body2.y2 - body2.y1) / 2, 2)
      ) +
      body1.r
    ) return true
    return false
  }

  _checkType2_0(body1, body2) {
    console.log('body1: ', body1);
    console.log('body2: ', body2);
    let collision = false
    for (let i = 0; i < body1.dots.length; i++) {
      console.log(i == body1.dots.length-1 ? 0 : i+1);
      if (this.checkLines(
        [body1.dots[i], body1.dots[(i == body1.dots.length-1 ? 0 : i+1)]],
        [{x:body2.x1, y:body2.y1}, {x:body2.x2, y:body2.y1}]
      )) collision = true
      console.log('collision: ', collision);
      if (!collision && this.checkLines(
        [body1.dots[i], body1.dots[i == body1.dots.length-1 ? 0 : i+1]],
        [{x:body2.x2, y:body2.y1}, {x:body2.x2, y:body2.y2}]
      )) collision = true
      console.log('collision: ', collision);
      if (!collision && this.checkLines(
        [body1.dots[i], body1.dots[i == body1.dots.length-1 ? 0 : i+1]],
        [{x:body2.x2, y:body2.y2}, {x:body2.x1, y:body2.y2}]
      )) collision = true
      console.log('collision: ', collision);
      if (!collision && this.checkLines(
        [body1.dots[i], body1.dots[i == body1.dots.length-1 ? 0 : i+1]],
        [{x:body2.x1, y:body2.y2}, {x:body2.x1, y:body2.y1}]
      )) collision = true
      console.log('collision: ', collision);
      if (collision) return true
    }
    return false
  }

  _lineFunction(x1,y1,x2,y2) {
    let lineOpposite = y2-y1, lineNear = Math.abs(x2-x1)
    if (lineNear == 0) return []
    let tanh = lineOpposite / lineNear
    console.log('tanh: ', tanh);
    let c = y1 - x1 * tanh 
    return [tanh, c, (x) => tanh * x + c]
    // return (x) => tanh * x + c
  }

  _max_min(n1, n2) {
    return n1 >= n2 ? [n1, n2] : [n2, n1]
  }

  _isInRange(checkY, y1, y2) {
    let range = this._max_min(y1, y2)
    if (checkY <= range[0] && checkY >= range[1]) return true
    return false
  }

  checkLines(line1 = [{x:0,y:0}, {x:0,y:0}], line2) {
    console.log('line1: ', line1);
    
    let data1 = this._lineFunction(line1[0].x, line1[0].y, line1[1].x, line1[1].y)
    let data2 = this._lineFunction(line2[0].x, line2[0].y, line2[1].x, line2[1].y)

    if (data1.length === 0 && data2.length > 0 && this._isInRange(data2[2](line1[0].x), line1[0].y, line1[1].y)) return true
    if (data2.length === 0 && data1.length > 0 && this._isInRange(data1[2](line2[0].x), line2[0].y, line2[1].y)) return true
    if (data1.length === 0 && data2.length === 0) {
      if (
        this._isInRange(line1[0].y, line2[0].y, line2[1].y) ||
        this._isInRange(line1[1].y, line2[0].y, line2[1].y) ||

        this._isInRange(line2[0].y, line1[0].y, line1[1].y) ||
        this._isInRange(line2[1].y, line1[0].y, line1[1].y) 
      ) return true
      return false
    }
    let x = (data2[1] - data1[1]) / (data1[0] - data2[0])
    if (x == Infinity) {
      if (data2[1] == data1[1]) return true
      return false
    }
    return true
  }

 /*
 tan1*x + c1 = tanh2*x + c2
 tan1*x + c1 - (tanh2*x + c2) = 0
 tan1*x + c1 - tanh2*x - c2 = 0
 x * (tanh1-tanh2) + c1-c2 = 0
 x * (tanh1-tanh2) = -(c1-c2)
 x * (tanh1-tanh2) = c2-c1
 x = (c2-c1)/(tanh1-tanh2)


 */

  extendedCollisionCheck(body) {
    //console.log("body: ", body);
    //body object must have the same structure as this.bodies
    let hasAnyCollision = false
    let collidingDirections = [0, 0, 0, 0]
    //[0]: 1 (left), 0 (none)
    //[1]: 1 (right), 0 (none)
    //[2]: 1 (up), 0 (none)
    //[3]: 1 (down), 0 (none)

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        if (body[i].type === 0 && this.bodies[j].type === 0) {
          //debugger;
          if (
            this.bodies[j].x1 <= body[i].x2 &&
            this.bodies[j].x2 > body[i].x2 &&
            this.bodies[j].y2 > body[i].y1 &&
            this.bodies[j].y1 < body[i].y2
          ) {
            //debugger;
            collidingDirections[0] = 1; //left
            hasAnyCollision = true
          } else if (
            this.bodies[j].x2 >= body[i].x1 &&
            this.bodies[j].x1 < body[i].x1 &&
            this.bodies[j].y2 > body[i].y1 &&
            this.bodies[j].y1 < body[i].y2
          ) {
            //debugger;
            collidingDirections[1] = 1; //right
            hasAnyCollision = true
          } else if (
            this.bodies[j].y1 <= body[i].y2 &&
            this.bodies[j].y2 > body[i].y2 &&
            this.bodies[j].x2 > body[i].x1 &&
            this.bodies[j].x1 < body[i].x2
          ) {
            //debugger;
            collidingDirections[2] = 1; //up
            hasAnyCollision = true
          } else if (
            this.bodies[j].y2 >= body[i].y1 &&
            this.bodies[j].y1 < body[i].y1 &&
            this.bodies[j].x2 > body[i].x1 &&
            this.bodies[j].x1 < body[i].x2
          ) {
            //debugger;
            collidingDirections[3] = 1; //down
            hasAnyCollision = true
          } else continue; //bodies are rect type but no collision
        } else if (body[i].type === 1 && this.bodies[j].type === 1) {
          //debugger;
          if (
            Math.sqrt(
              (body[i].x - this.bodies[j].x) * (body[i].x - this.bodies[j].x) +
              (body[i].y - this.bodies[j].y) * (body[i].y - this.bodies[j].y)
            ) <=
            body[i].r + this.bodies[j].r
          ) {
            //debugger;
            if (this.bodies[j].y < body[i].y) {
              collidingDirections[3] = 1; //down
              hasAnyCollision = true
            } else if (this.bodies[j].y > body[i].y) {
              collidingDirections[2] = 1; //up
              hasAnyCollision = true
            }
            if (this.bodies[j].x < body[i].x) {
              collidingDirections[1] = 1; //right
              hasAnyCollision = true
            } else if (this.bodies[j].x < body[i].x) {
              collidingDirections[0] = 1; //left
              hasAnyCollision = true
            }
          } else continue; //bodies are circle type but no collision
        } else if (body[i].type === 0 && this.bodies[j].type === 1) {
          //debugger;
          if (
            this.bodies[j].x >= body[i].x1 - this.bodies[j].r &&
            this.bodies[j].x <= body[i].x2 + this.bodies[j].r &&
            this.bodies[j].y >= body[i].y1 - this.bodies[j].r &&
            this.bodies[j].y <= body[i].y2 + this.bodies[j].r &&
            Math.sqrt(
              Math.pow(
                this.bodies[j].x - (body[i].x1 + (body[i].x2 - body[i].x1) / 2),
                2
              ) +
              Math.pow(
                this.bodies[j].y -
                (body[i].y1 + (body[i].y2 - body[i].y1) / 2),
                2
              )
            ) <=
            Math.sqrt(
              Math.pow((body[i].x2 - body[i].x1) / 2, 2) +
              Math.pow((body[i].y2 - body[i].y1) / 2, 2)
            ) +
            this.bodies[j].r
          ) {
            //debugger;
            if (
              this.bodies[j].x > body[i].x2 &&
              this.bodies[j].y + this.bodies[j].r > body[i].y1 &&
              this.bodies[j].y - this.bodies[j].r < body[i].y2
            ) {
              collidingDirections[0] = 1; //left
              hasAnyCollision = true
            } else if (
              this.bodies[j].x < body[i].x1 &&
              this.bodies[j].y + this.bodies[j].r > body[i].y1 &&
              this.bodies[j].y - this.bodies[j].r < body[i].y2
            ) {
              collidingDirections[1] = 1; //right
              hasAnyCollision = true
            } else if (
              this.bodies[j].y > body[i].y2 &&
              this.bodies[j].x + this.bodies[j].r > body[i].x1 &&
              this.bodies[j].x - this.bodies[j].r < body[i].x2
            ) {
              collidingDirections[2] = 1; //up
              hasAnyCollision = true
            } else if (
              this.bodies[j].y < body[i].y1 &&
              this.bodies[j].x + this.bodies[j].r > body[i].x1 &&
              this.bodies[j].x - this.bodies[j].r < body[i].x2
            ) {
              collidingDirections[3] = 1; //down
              hasAnyCollision = true
            }
          } else continue; //colliding body is rect, this is circle no collision
        } else if (body[i].type === 1 && this.bodies[j].type === 0) {
          //debugger;
          if (
            body[i].x >= this.bodies[j].x1 - body[i].r &&
            body[i].x <= this.bodies[j].x2 + body[i].r &&
            body[i].y >= this.bodies[j].y1 - body[i].r &&
            body[i].y <= this.bodies[j].y2 + body[i].r &&
            Math.sqrt(
              Math.pow(
                body[i].x -
                (this.bodies[j].x1 +
                  (this.bodies[j].x2 - this.bodies[j].x1) / 2),
                2
              ) +
              Math.pow(
                body[i].y -
                (this.bodies[j].y1 +
                  (this.bodies[j].y2 - this.bodies[j].y1) / 2),
                2
              )
            ) <=
            Math.sqrt(
              Math.pow((this.bodies[j].x2 - this.bodies[j].x1) / 2, 2) +
              Math.pow((this.bodies[j].y2 - this.bodies[j].y1) / 2, 2)
            ) +
            body[i].r
          ) {
            //debugger;
            if (
              body[i].x > this.bodies[j].x2 &&
              body[i].y + body[i].r > this.bodies[j].y1 &&
              body[i].y - body[i].r < this.bodies[j].y2
            ) {
              collidingDirections[0] = 1; //left
              hasAnyCollision = true
            } else if (
              body[i].x < this.bodies[j].x1 &&
              body[i].y + body[i].r > this.bodies[j].y1 &&
              body[i].y - body[i].r < this.bodies[j].y2
            ) {
              collidingDirections[1] = 1; //right
              hasAnyCollision = true
            } else if (
              body[i].y > this.bodies[j].y2 &&
              body[i].x + body[i].r > this.bodies[j].x1 &&
              body[i].x - body[i].r < this.bodies[j].x2
            ) {
              collidingDirections[2] = 1; //up
              hasAnyCollision = true
            } else if (
              body[i].y < this.bodies[j].y1 &&
              body[i].x + body[i].r > this.bodies[j].x1 &&
              body[i].x - body[i].r < this.bodies[j].x2
            ) {
              collidingDirections[3] = 1; //down
              hasAnyCollision = true
            } 
          } else continue; //colliding body is circle, this is rect no collision
        }
      }
    }
    return hasAnyCollision ? collidingDirections : false
  }
}
