export const scenes_info = {
    game_menu: {
        sceneImages: [
            ["lable_image" ,"../../media/images/menu/tank.png"],
            ["levels", "../../media/images/menu/levels.jpg"]
        ],
    },
    level_1: {
        sceneImages: [
            ["player_tank_hull", "../../media/images/game/player/Hull.png"],
            ["player_tank_tower", "../../media/images/game/player/Tower_States.png"],
            ["player_tank_bullet", "../../media/images/game/player/Shot.png"],
            ["background", "../../media/images/game/level_01/pexels-johannes-plenio-1114900.jpg"],
            ["map_01_info", "../../media/data/levels/Default_map.json"],
            ["tiles_for_map", "../../media/images/game/level_01/defaul_map_tiles.png"]
        ],
        dataList: [
            ["player"],
            ["map", "Default_map"],
            ["camera"]
        ]
    }
}