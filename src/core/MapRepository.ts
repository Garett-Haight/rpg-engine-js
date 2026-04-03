import MapService from './services/MapService'
import GameMap from './GameMap/GameMap'

class MapRepository {
    static instance: any;
    maps: {};
    mapCount: number;
    constructor() { 
        if (!MapRepository.instance) {
            this.maps = {};
            this.mapCount = 0;
            MapRepository.instance = this;
        }
        console.log(MapRepository.instance);
        return MapRepository.instance;
    }

    add(map:GameMap) {
        this.mapCount++;
        this.maps[map.name] = map;
        return map.name;
    }

    async get(name) {
            var map;
            if (!this.exists(name)) {
                let m = await MapService.getMap(name)
                map = new GameMap(await m.json());
                this.add(map);
            }
            else {
                map = this.get(name);
            }
            
            return map;
    }

    exists(name) {
        return this.maps.hasOwnProperty(name);
    }

    replace(name, newMap) {
        this.maps[name] = newMap;
    }
};

const instance = new MapRepository();

export default instance;