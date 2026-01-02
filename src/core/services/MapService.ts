import axiosWrapper from '../AxiosWrapper'

class MapService {
    baseurl: string;
    ajax: any;
    constructor () {
        this.baseurl = '/maps/';
        this.ajax = new axiosWrapper({ 
            "baseURL": this.baseurl 
        });
    }

    getMap(name) {
        return this.ajax.request( name + '.json', 'GET');
    }

    fetchMap(name) {
        return fetch(name + '.json');
    }
}


export default new MapService();