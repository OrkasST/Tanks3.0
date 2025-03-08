export class RayCaster {
    constructor(x, y, distance, ammount, directionAngle, isVisble = false) {
        this.x = x;
        this.y = y;
        this.distance = distance;
        this.ammount = ammount;
        this.directionAngle = directionAngle;

        this.isVisble = isVisble
    }

    cast(x = null, y = null, distance = null, ammount = null, directionAngle = null, coverAngle = null) {
        let x = x || this.x
        let y = y || this.y
        let distance = distance || this.distance
        let ammount = ammount || this.ammount
        let directionAngle = directionAngle || this.directionAngle
    }

    createRayFunction(x, y, distance, angle) {
        return function (checkX) {

        }
    }
}