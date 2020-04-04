class SpriteStore {
    constructor() { 
        if (!SpriteStore.instance) {
            this.sprites = [];
            SpriteStore.instance = this;
        }

        return SpriteStore.instance;
    }

    add(sprite) {
        if(!this.exists(sprite)) {
            this.sprites.push(map);
            return true;
        }
        return this.get(sprite);
    }

    exists(sprite) {
        return this.sprites.find((s) => {
            return sprite.id == s.id;
        });
    }

    get(sprite) {
        return this.sprites.find((s) => {
            return sprite.id == s.id;
        });
    }
};

const instance = new SpriteStore();
Object.freeze(instance);

export default instance;