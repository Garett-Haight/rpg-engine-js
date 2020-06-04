import { Globals } from '../ConfigMgr'

export default class Events {
	constructor() {

	}
	addCustomEvent(name, fn) {
		this.eventList[name] = fn;
	}
}