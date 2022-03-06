import axios, { AxiosInstance } from 'axios'

/**
  * @summary Axios wrapper utility 
  * @desc Provides an interface for the axios javascript library, so that updates to their API can be handled in one place
  * @return function
  * @param Object config -- configuration values for axios instance
  * @example:
  * import axiosWrapper from 'axiosWrapper.js'
  * var ajax = new axiosWrapper();
  * ajax.request('/api/endpoint', 'GET').then((response) => { // response logic }).catch((e) => { // error logic });
  * ----- OR -----
  * import axiosWrapper from 'axiosWrapper.js'
  * var ajax = new axiosWrapper({baseURL: '/api'}); // See https://github.com/axios/axios for config object details
  * ajax.request('/endpoint', 'GET').then((response) => { // response logic }).catch((e) => { // error logic });
*/
class AxiosWrapper {
	instance: AxiosInstance | null;
	
	constructor(config=null) {
		this.instance = null;
		this.initialize(config);
	}


	request (endpoint, method, data) {
		return this.instance({ 
			"method": method,
			"url": endpoint,
			"data": data
		});
	}

	// for a custom configured instance i.e. custom headers, static base url
	initialize (config) {
		if (this.instance == null) {
			this.instance = axios.create(config);
		}
	}
}

export default AxiosWrapper;