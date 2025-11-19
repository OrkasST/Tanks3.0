export class Vector{
    constructor({x, y, ang = null, zeroX = 0, zeroY = 0}) {
        this.h = Math.pow(x*x+y*y, 0.5)
        this.angle = Math.asin(x/this.h)

        this.x = zeroX + (ang === null ? x : Math.sin((y<0?1:-1)*ang+this.angle)*this.h)
        this.y = zeroY + (ang === null ? y : (y>0?1:-1)*Math.cos((y<0?1:-1)*ang+this.angle)*this.h)
    }
}