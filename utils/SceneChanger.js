import { scenes_info } from "../scenes/info.js";
import { Menu } from "../scenes/presets/Menu.js";
import { GameLevel } from "../scenes/presets/gameLevel.js";
import { Loading } from "../scenes/presets/loading.js";

export class SceneChanger{
    constructor(loadingImages) {
        this.list = scenes_info;
        this.loadingImages = loadingImages;
        console.log('loadingImages: ', loadingImages);
    }

    prepareScene(sceneName, time) {
        this.nextScene = sceneName;
        let sceneImages = this.list[sceneName].sceneImages;
        console.log('sceneChanger.preparescene >>>>\n\tsceneImages: ', sceneImages);
        let data = this.list[sceneName].dataList;
        console.log('sceneChanger.preparescene >>>>\n\tdata: ', data);
        return new Loading(this.list[sceneName], sceneName, time, this.loadingImages[0]);
    }

    finishScene(loadingScene, time) {
        if (this.nextScene === "game_menu") {
            return new Menu(time, loadingScene.data.sceneImages);
        } else if (this.nextScene.split("_")[0] === "level") {
            return new GameLevel(loadingScene.nextScene, time, loadingScene.data)
        }
    }
}