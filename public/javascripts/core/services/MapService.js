import axiosWrapper from '../AxiosWrapper'

class MapService {
    constructor () {
        this.baseurl = '/maps/';
        this.ajax = new axiosWrapper(this.baseurl);
    }

    getMap(name) {
        return this.ajax.request(this.baseurl + name + '.json', 'GET');
    }
}

const instance = new MapService();
Object.freeze(instance);
export default instance;