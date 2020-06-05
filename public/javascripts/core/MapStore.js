import MapService from './services/MapService'

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
        this.maps.push(map);
    }

    get(id) {
        return new Promise((resolve, reject) => {
            let map = this.exists(id);
            if (!map) {
                map = MapService.getMap(id).then(m => {
                    this.add(m.data);
                    return resolve(m.data);
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