import Sprite from "./Sprite";

class SpriteStore {
    static instance: any;
    sprites: Sprite[];

    constructor() { 
        if (!SpriteStore.instance) {
            SpriteStore.instance = this;
        }

        return SpriteStore.instance;
    }

    add(sprite) {
        if (Array.isArray(sprite)) {
            let sprites = [];
            sprite.forEach((s) => {
                if(!this.exists(s)) {
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
        if (typeof sprite === 'string') {
            return !!this.sprites.find(s => s.getName() === sprite);
        }
        else if (sprite instanceof Sprite) {
            return !!this.sprites.find((s) => {
                return sprite.getName() == s.getName();
            });
        }
        
    }

    get(sprite) {
        if (typeof sprite === 'string') {
            return this.sprites.find(s => s.getName() === sprite);
        }
        else if (sprite instanceof Sprite) {
            return this.sprites.find((s) => {
                return sprite.getName() == s.getName();
            });
        } 
        return false;
    }
};

const instance = new SpriteStore();
Object.freeze(instance);

export default instance;