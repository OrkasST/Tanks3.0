import { Drawer } from "../utils/Drawer.js";

export class Renderer {
    constructor(screen) {
        this.SCREEN = screen
        this.drawer = new Drawer(screen)
    }

    draw(currentScene) {
        this.drawer.clear();
        if (!currentScene) return;
        if (typeof currentScene.background === 'string')
            this.drawer.rect({
                x: 0, y: 0, width: this.SCREEN.width, height: this.SCREEN.height, color: currentScene.background
            });

        else {
            this.drawer.image({
                x: 0, y: 0,
                width: this.SCREEN.width, height: this.SCREEN.height,
                color: currentScene.background
            });
        }
        // let layers = []
        // let others = []
        // console.log('currentScene.objects: ', currentScene.objects);
        // debugger;
        // currentScene.objects.forEach(obj => {
        //     // if (currentScene) console.log('obj: ', obj);
        //     if (obj.hasOwnProperty("z")) {
        //         if (!layers[obj.z] || !Array.isArray(layers[obj.z])) layers[obj.z] = []
        //         layers[obj.z].push(obj)
        //     } else if (Array.isArray(obj.image)) {
        //         obj.image.forEach(im => {
        //             if (im.z) {
        //                 if (!layers[im.z]) layers[im.z] = []
        //                 else layers[im.z].push(im)
        //             } else {
        //                 others.push(im)
        //             }
        //         })
        //     } else {
        //         others.push(obj)
        //     }
        // })

        // // console.log('currentScene.objects: ', currentScene.objects);
        // // if (layers.length>0) debugger;
        // for (let i = 0; i < layers.length; i++) this._drawObjects(layers[i], currentScene.name, currentScene?.camera?.position)  
        // this._drawObjects(others, currentScene.name, currentScene?.camera?.position)  

        // layers = null
        // others = null
        // debugger;

        this._drawObjects(currentScene.objects, currentScene.name, currentScene?.camera?.position)
    }

    _drawObjects (objects, SceneName, cameraPosition) {
        // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        objects.forEach(element => {
            // console.log('element: ', element);

            if (SceneName.split("_")[0] === "level" &&
                (element.type !== "UI" && element.type !== "window" && element.type !== "button")
            ) {
                // console.log(element.y + cameraPosition.y);

                if (element.image && Array.isArray(element.image)) {
                    // console.log('RENDER>>>>>>>\n\telement: ', element, '\n\telement.image: ', element.image);

                    element.image.forEach((img, ind) => {
                        // if (img.log) debugger;

                        img.image ? this.drawer.image({
                            ...element,
                            image: img.image.image,
                            x: element.x + cameraPosition.x,
                            y: element.y + cameraPosition.y,
                        }) : this.drawer.rect({
                            ...img,
                            x: img.x + cameraPosition.x,
                            y: img.y + cameraPosition.y
                        })
                        // this.drawer.rect({
                        //     x: element.x + cameraPosition.x + ind * 3,
                        //     y: element.y + cameraPosition.y + ind * 3,
                        //     width: element.width - ind * 6,
                        //     height: element.height - ind * 6,
                        //     color: "#ffffff",
                        //     filled: false
                        // })
                    })
                } else if (element.image) {
                    // console.log('element.image: ', element.image);
                    // if (element.image.isAnimation) debugger;
                    this.drawer.image({
                        ...element,
                        image: element.image.isAnimation ? element.image.image : element.image,
                        x: element.x + cameraPosition.x,
                        y: element.y + cameraPosition.y,
                    });
                } else if (element.drawDebug) {
                    if (element.triggerFrame) {
                        this.drawer.rect({
                            x: element.triggerFrame.x1,
                            y: element.triggerFrame.y1,
                            width: element.triggerFrame.x2 - element.triggerFrame.x1,
                            height: element.triggerFrame.y2 - element.triggerFrame.y1,
                            color: "#acf233",
                            filled: false,
                        })
                    }
                    if (element.startTriggerFrame) {
                        this.drawer.rect({
                            x: element.startTriggerFrame.x1,
                            y: element.startTriggerFrame.y1,
                            width: element.startTriggerFrame.x2 - element.startTriggerFrame.x1,
                            height: element.startTriggerFrame.y2 - element.startTriggerFrame.y1,
                            color: "#38cf68",
                            filled: false,
                        })
                    }
                }
                else this.drawer.rect({
                    ...element,
                    x: element.x + cameraPosition.x,
                    y: element.y + cameraPosition.y
                });
            }
            else if (Array.isArray(element.image)) {
                element.image.forEach(part => {
                    if (part.isCircle) this.drawer.circle(part)
                    else {
                // debugger;
                this.drawer.image({...element, image: part});
                    }
                })
            } 
            else if (element.type === "text") this.drawer.text(element);
            else if (element.type === "button" || element.type === "window") {
                // if (element.name === "AIM") debugger;
                this.drawer.button(element);
                // console.log('element: ', element);
            }
            else if (element.color && typeof element.color === 'string') {
                this.drawer.rect(element);
            } else {
                // console.log("JJYJYJJCHVJC");
                this.drawer.image(element);
            }
        });
    }

}