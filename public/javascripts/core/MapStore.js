import MapService from './services/MapService'
import GameMap from './GameMap/GameMap'

class MapStore {
    constructor() { 
        if (!MapStore.instance) {
            this.maps = [];
            MapStore.instance = this;
        }
        console.log(MapStore.instance);
        return MapStore.instance;
    }

    add(map) {
        map.id = this.maps.length + 1;
        this.maps.push(map);
        return map.id;
    }

    get(fn) {
        return new Promise((resolve, reject) => {
            let map = this.exists(fn);
            if (!map) {
                map = MapService.getMap(fn).then(m => {
                    m.data.id = this.maps.length + 1;
                    let newMap = new GameMap(m.data);
                    this.add(newMap);
                    return resolve(newMap);
                });
            }
            else {
                return resolve(map);
            }
        });   
    }

    exists(id) {
        return this.maps.find((m) => {
            return id == m.id;
        });
    }

    replace(id, newMap) {
        return this.maps.find((map, idx, arr) => {
            if (map.id === id) {
                arr[idx] = newMap;
                return true;
            }
        });
    }
};

const instance = new MapStore();
Object.freeze(instance);

export default instance;