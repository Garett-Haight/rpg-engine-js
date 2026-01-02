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

    add(map) {
        this.mapCount++;
        map.id = this.mapCount;
        this.maps[map.name] = map;
        return map.id;
    }

    get(name) {
        return new Promise((resolve, reject) => {
            let map;
            if (!this.exists(name)) {
                MapService.getMap(name).then(m => {
                    map = new GameMap(m.data);
                    this.add(map);
                    return resolve(map);
                });
            }
            else {
                map = this.get(name);
                return resolve(map);
            }
        });   
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