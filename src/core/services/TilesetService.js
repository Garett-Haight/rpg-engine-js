import axiosWrapper from '../AxiosWrapper'

export default class TilesetService {
    constructor () {
        this.baseurl = '/tilesets/';
        this.ajax = new axiosWrapper({ 
            "baseURL": this.baseurl 
        });
    }

    getTileset(name) {
        return this.ajax.request(name + '.json', 'GET');
    }
}