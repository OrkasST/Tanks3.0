import { GameLevel } from "../scenes/presets/gameLevel/gameLevel.js";
import { Loading } from "../scenes/presets/loading.js";
import { Menu } from "../scenes/presets/MainMenu/Menu.js";

export class SceneChanger{
    constructor(loadingImages) {
        this.loadingImages = loadingImages;
    }

    prepareScene(sceneName, time, data) {
        this.nextScene = sceneName;
        console.groupEnd();
        return new Loading(
            data.scenesInfo[sceneName],
            sceneName,
            time,
            this.loadingImages[0],
            data
        );
    }

    finishScene(loadingScene, time, gameSettings, ...functions) {
        if (this.nextScene === "game_menu") {
            return new Menu(time, loadingScene.data.sceneImages, gameSettings, ...functions);
        } else if (this.nextScene.split("_")[0] === "level") {
            return new GameLevel(loadingScene.nextScene, time, loadingScene.data, gameSettings, ...functions)
        }
    }
}