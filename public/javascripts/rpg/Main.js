import { ConfigMgr, Globals, Config } from '../core/ConfigMgr'
import ConfigFile from './Config'
import Game from "./Game"

document.addEventListener('DOMContentLoaded', (e) => {
	ConfigMgr.addConfigs(ConfigFile);
	var gameObj = new Game(ConfigMgr.CONFIG);
	console.log(gameObj);
});