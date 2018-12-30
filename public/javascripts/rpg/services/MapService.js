import axiosWrapper from '../axiosWrapper.js'

export default class MapService {
    constructor () {
        this.baseurl = '/maps/';
        this.ajax = new axiosWrapper(this.baseurl);
    }

    getMap(name) {
        return this.ajax.request(this.baseurl + name, 'GET');
    }
}