export class MapLoader {
    constructor() {
        this.mapData = null;
        this.file = null;
    }

    async load(path) {
        this.file = await fetch(path);
        this.mapData = await this.file.json();
        this.onmapinfoloaded();
    }

    onmapinfoloaded() { }
}