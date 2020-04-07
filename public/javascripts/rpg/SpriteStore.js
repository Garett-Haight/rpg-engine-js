class SpriteStore {
    constructor() { 
        if (!SpriteStore.instance) {
            this.sprites = [];
            SpriteStore.instance = this;
        }

        return SpriteStore.instance;
    }

    add(sprite) {
        if (Array.isArray(sprite)) {
            let sprites = [];
            sprite.forEach((s) => {
                if(!this.sprites.exists(s)) {
                    this.sprites.push(s);   
                    sprites.push(this.get(s));  
                }
                sprites.push(s);
            });
            return sprites;
        }
        else if(!this.exists(sprite)) {
            this.sprites.push(sprite);
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