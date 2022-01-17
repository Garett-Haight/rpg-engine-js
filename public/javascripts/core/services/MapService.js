import axiosWrapper from '../AxiosWrapper'

class MapService {
    constructor () {
        this.baseurl = '/maps/';
        this.ajax = new axiosWrapper({ 
            "baseURL": this.baseurl 
        });
    }

    getMap(name) {
        return this.ajax.request( name + '.json', 'GET');
    }
}

const instance = new MapService();
Object.freeze(instance);
export default instance;