import axiosWrapper from '../AxiosWrapper'
import Tileset from '../Tileset';

class TilesetService {
    baseurl: string;
    ajax: axiosWrapper;
    constructor () {
        this.baseurl = '/tilesets/';
        this.ajax = new axiosWrapper({ 
            "baseURL": this.baseurl 
        });
    }

    getTileset(name) {
        return this.ajax.request(name + '.json', 'GET', null);
    }
}

export default new TilesetService();