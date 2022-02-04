import ConfigMgr from '../core/ConfigMgr'
import ConfigFile from './Config'
import Game from "./Game"

document.addEventListener('DOMContentLoaded', (e) => {
	ConfigMgr.addConfigs(ConfigFile);
	const gameObj = new Game(ConfigMgr.getConfigs());
});