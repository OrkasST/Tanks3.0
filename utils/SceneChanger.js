import { scenes_info } from "../scenes/info.js";
import { Menu } from "../scenes/presets/Menu.js";
import { Loading } from "../scenes/presets/loading.js";

export class SceneChanger{
    constructor(loadingImages) {
        this.list = scenes_info;
        this.loadingImages = loadingImages;
    }

    prepareScene(sceneName, time) {
        this.nextScene = sceneName;
        let sceneImages = this.list[sceneName].sceneImages;
        console.log('sceneImages: ', sceneImages);
        let data = this.list[sceneName].dataList;
        return new Loading(this.list[sceneName], sceneName, time, this.loadingImages[0]);
    }

    finishScene(loadingScene, time) {
        if (this.nextScene = "game_menu") {
            return new Menu(time, loadingScene.data.sceneImages);
        }
    }
}