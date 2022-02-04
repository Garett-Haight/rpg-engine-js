class ConfigManager {
    private static instance: ConfigManager;
    public GLOBALS: {};
    public CONFIG: {};

    private constructor () {}

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }

        return ConfigManager.instance;
    }

    public getGlobal(name: string) {
        return this.GLOBALS[name] || null;
    }

    public getGlobals() {
        return this.GLOBALS || null;
    }

    public addGlobal(name: string, value: any) {
        this.GLOBALS[name] = value;
    }

    public addGlobals(globals: Object) {
        this.GLOBALS = { ...globals };
    }

    public getConfig(config: string) {
        return this.CONFIG[config] || null;
    }

    public getConfigs() {
        return this.CONFIG || null;
    }

    public addConfig(name: string, value: any) {
        this.CONFIG[name] = value;
    }

    public addConfigs(configs: Object) {
        this.CONFIG = { ...configs };
    }
};

export default ConfigManager.getInstance();