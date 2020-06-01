class ConfigManager {
    constructor() {
        this.GLOBALS = {};
        this.CONFIG = {};
    }

    addGlobal(name, value) {
        this.GLOBALS[name] = value;
    }

    addGlobals(globals) {
        if (typeof globals == 'object') {
            for (let global in globals) {
                this.GLOBALS[global] = globals[global];
            }
        }
        else {
            throw 'TypeError addGlobals requires type object';
        }
    }

    addConfig(name, value) {
        this.CONFIG[name] = value;
    }

    addConfigs(configs) {
        if (typeof configs == 'object') {
            for (let config in configs) {
                this.CONFIG[config] = configs[config];
            }
        }
        else {
            throw 'TypeError addConfigs requires type object';
        }
    }
}

const ConfigMgr = new ConfigManager();
Object.freeze(ConfigMgr);
const Config = ConfigMgr.CONFIG;
const Globals = ConfigMgr.GLOBALS;

export { Config, Globals, ConfigMgr };