import ConfigMgr from '../ConfigMgr'

export default class Events {
	eventList: any;

	constructor() {

	}

	addCustomEvent(name, fn) {
		this.eventList[name] = fn;
	}
}