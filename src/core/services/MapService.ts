import fetchWrapper from '../FetchWrapper'

class MapService {
    baseurl: string;
    ajax: any;
    constructor () {
        this.baseurl = '/maps/';
        this.ajax = new fetchWrapper({ 
            "baseURL": this.baseurl 
        });
    }

    async getMap(name) {
        return await this.ajax.request( name + '.json', 'GET', null);
    }

    async fetchMap(name) {
        return await fetch(name + '.json');
    }
}


export default new MapService();