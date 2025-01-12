import { GameLevel } from "../scenes/presets/gameLevel/gameLevel.js";
import { Loading } from "../scenes/presets/loading.js";
import { Menu } from "../scenes/presets/MainMenu/Menu.js";

export class SceneChanger{
    constructor(loadingImages) {
        this.loadingImages = loadingImages;
        // console.log('loadingImages: ', loadingImages);
    }

    prepareScene(sceneName, time, data) {
        console.group(">>>>> Preparing Scene");
        console.log('\t___sceneName: ', sceneName)
        console.log("\t___data", data);
        this.nextScene = sceneName;
        console.log('\t___sceneName: ', sceneName);
        console.log('\t___data.scenesInfo[sceneName]: ', data.scenesInfo[sceneName]);
        // console.log('sceneChanger.preparescene >>>>\n\tsceneName: ', sceneName);
        // let sceneImages = this.list[sceneName].sceneImages;
        // console.log('sceneChanger.preparescene >>>>\n\tthis.list: ', this.list);
        // console.log('sceneChanger.preparescene >>>>\n\tsceneImages: ', sceneImages);
        // let data = this.list[sceneName].dataList;
        // console.log('sceneChanger.preparescene >>>>\n\tdata: ', data);
        console.groupEnd();
        return new Loading(data.scenesInfo[sceneName], sceneName, time, this.loadingImages[0], data);
    }

    finishScene(loadingScene, time, gameSettings) {
        console.log("<<<<< Finishing Scene");
        // console.log('SceneChanger.finishScene >>>>>\n\tloadingScene: ', loadingScene);
        if (this.nextScene === "game_menu") {
            return new Menu(time, loadingScene.data.sceneImages, gameSettings);
        } else if (this.nextScene.split("_")[0] === "level") {
            return new GameLevel(loadingScene.nextScene, time, loadingScene.data, gameSettings)
        }
    }
}