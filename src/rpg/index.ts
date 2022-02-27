
import ConfigMgr from '../core/ConfigMgr'
import ConfigFile from './Config'
import Game from "./Game"

if (typeof document !== 'undefined') {
	document.addEventListener('DOMContentLoaded', (e) => {
		ConfigMgr.addConfigs(ConfigFile);
		const gameObj = new Game(ConfigMgr.getConfigs());
	});
} else {
	ConfigMgr.addConfigs(ConfigFile);
	const gameObj = new Game(ConfigMgr.getConfigs());
}