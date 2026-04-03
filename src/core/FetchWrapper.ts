// TODO: Replace with fetch API

/**
  * @summary Fetch API wrapper utility 
  * @desc 
  * @return function
  * @param Object config -- configuration 
*/
class FetchWrapper {
	baseUrl: string;
	constructor(config=null) {
		this.initialize(config);
	}

/**
 *
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {JSON} data
 * @return {Promise<Response>} 
 * @memberof FetchWrapper
 */
async request (endpoint, method, data) {
		const response = await fetch(this.baseUrl + endpoint, {
			method
		} );
		return response;
	}

	// for a custom configured instance i.e. custom headers, static base url
	initialize (config) {
		if (config.baseURL) {
			this.baseUrl = config.baseURL;
		}
	}
}

export default FetchWrapper;