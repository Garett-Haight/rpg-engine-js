class SpriteStore {
    constructor() { 
        if (!SpriteStore.instance) {
            this.sprites = [];
            SpriteStore.instance = this;
        }

        return SpriteStore.instance;
        
    }

    add(sprite) {
        this.sprites.push(map);
    }

    exists(sprite) {
        return this.sprites.find((s) => {
            return sprite.id == s.id;
        });
    }
};

const instance = new SpriteStore();
Object.freeze(instance);

export default instance;