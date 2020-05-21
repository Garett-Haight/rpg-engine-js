import axiosWrapper from '../AxiosWrapper'

export default class TilesetService {
    constructor () {
        this.baseurl = '/tilesets/';
        this.ajax = new axiosWrapper(this.baseurl);
    }

    getTileset(name) {
        return this.ajax.request(this.baseurl + name + '.json', 'GET');
    }
}