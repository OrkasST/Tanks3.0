export const SCENES_INFO = {
    game_menu: {
        sceneImages: [
            ["lable_image", "media/images/menu/tank.png"],
            ["levels", "media/images/menu/levels.jpg"]
        ],
    },
    level_1: {
        sceneImages: [
            ["player_tank_hull", "media/images/game/player/Hull.png", {
                frameListHeight: 512,
                frameListWidth: 512,
                frameWidth: 512,
                frameHeight: 512,
                duration: 0,
                frameX: -256,
                frameY: -256,
                offsetX: 0,
                offsetY: 0,
                startFrame: 0,
                isRotating: true,
                isInfinit: false,
            }],
            ["player_tank_tower", "media/images/game/player/Tower_States.png", {
                frameListHeight: 512,
                frameListWidth: 512,
                frameWidth: 512,
                frameHeight: 512,
                duration: 0,
                frameX: -256,
                frameY: -256,
                // frameX: 0,
                // frameY: 0,
                startFrame: 0,
                isRotating: true,
                isInfinit: false,
            }],
            ["player_tank_tower_reload", "media/images/game/player/Reload_Tiled.png", {
                frameListHeight: 7680,
                frameListWidth: 7680,
                frameWidth: 512,
                frameHeight: 512,
                duration: 0,
                totalFrames: 216,
                frameX: -256,
                frameY: -256,
                startFrame: 0,
                isRotating: true,
                isInfinit: false,
            }],
            ["player_tank_bullet", "media/images/game/player/Shot.png", {
                frameListHeight: 256,
                frameListWidth: 1920,
                frameWidth: 128,
                frameHeight: 128,
                duration: 104.16,
                totalFrames: 30,
                frameX: -64,
                frameY: -64,
                startFrame: 0,
                isRotating: true,
                isInfinit: true,
                // log: true,

            }],
            ["background", "media/images/game/level_01/pexels-johannes-plenio-1114900.jpg"],
            ["levelMap_01_info", "media/data/levels/Default_map.json"],
            ["tiles_for_map", "media/images/game/level_01/defaul_map_tiles.png"]
        ],
        dataList: [
            ["player", {}],
            ["levelMap", "Default_map"],
            ["camera"]
        ]
    }
}