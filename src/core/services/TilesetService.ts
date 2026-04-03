import FetchWrapper from '../FetchWrapper';
import Tileset from '../Tileset';

class TilesetService {
    baseurl: string;
    ajax: FetchWrapper;
    constructor () {
        this.baseurl = '/tilesets/';
        this.ajax = new FetchWrapper({ 
            "baseURL": this.baseurl 
        });
    }

    async getTileset(name: string) {
        return await this.ajax.request(name + '.json', 'GET', null);
    }
}

export default new TilesetService();