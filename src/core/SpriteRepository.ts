import Sprite from "./Sprite";
import TilesetStore from "./TilesetStore";

class SpriteRepository {
    static instance: any;
    sprites: {[key: string]: Sprite};

    constructor() { 
        if (!SpriteRepository.instance) {
            SpriteRepository.instance = this;
            this.sprites = {};
        }

        return SpriteRepository.instance;
    }

    add(sprite: Sprite): Sprite {
        // if (Array.isArray(sprite)) {
        //     let sprites = [];
        //     sprite.forEach((s) => {
        //         if(!this.exists(s)) {
        //             this.sprites[s.getName()] = s;
        //             sprites.push(this.get(s));  
        //         }
        //         sprites.push(s);
        //     });
        //     return sprites;
        // }
        // else if(!this.exists(sprite)) {
        //     this.sprites[sprite.getName()] = sprite;
        //     return true;
        // }
        // return this.get(sprite);
        let name = sprite.getName();
        if (!this.sprites.hasOwnProperty(name)) {
            this.sprites[name] = sprite;
        }
        return this.sprites[name];
    }

    exists(sprite: string | Sprite) {
        if (typeof sprite === 'string') {
            return !!this.sprites.hasOwnProperty(sprite);
        }
        else if (sprite instanceof Sprite) {
            return !!this.sprites.hasOwnProperty(sprite.getName());
        }  
    }

    get(sprite: string | Sprite) {
        if (typeof sprite === 'string') {
            return this.sprites[sprite]
        }
        else if (sprite instanceof Sprite) {
            return this.sprites[sprite.getName()];
        } 
        return false;
    }
};

const instance = new SpriteRepository();
export default instance;