class MapStore {
    constructor() { 
        if (!MapStore.instance) {
            this.maps = [];
            MapStore.instance = this;
        }

        return MapStore.instance;
        
    }

    add(map) {
        this.maps.push(map);
    }

    exists(map) {
        return this.maps.find((m) => {
            return map.id == m.id;
        });
    }
};

const instance = new MapStore();
Object.freeze(instance);

export default instance;