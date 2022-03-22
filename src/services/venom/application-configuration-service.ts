import { ConfigDto } from '@/services/venom/dtos/ConfigDto';
import { ApplicationConfigurationDto } from '@/services/venom/dtos/ApplicationConfigurationDto';

const appConfigService: VenomApplicationConfigurationService =
  window['VenomApplicationConfigurationService'];

type VenomApplicationConfigurationService = {
  get: () => string;
  update: (json: string) => void;
};

type Weapon = {
  title: string;
  value: string;
  children: {
    title: string;
    value: number;
  }[];
};

export default {
  get() {
    return appConfigService?.get();
  },
  getAppConfig() {
    const appConfigJson = this.get();
    if (!appConfigJson) {
      return null;
    }

    const appConfig: ApplicationConfigurationDto = appConfigJson
      ? eval('(' + appConfigJson + ')')
      : undefined;
    return appConfig;
  },
  getKeys() {
    const keys: any = [];

    const appConfig = this.getAppConfig();
    if (!appConfig?.keys) {
      return keys;
    }

    for (let key in appConfig?.keys) {
      keys.push({
        label: key,
        value: appConfig?.keys[key],
      });
    }

    return keys;
  },
  getWeapons() {
    const weapons: Weapon[] = [];

    const appConfig = this.getAppConfig();
    if (!appConfig?.weapons) {
      return weapons;
    }

    for (let key in appConfig?.weapons) {
      const groupModel: Weapon = {
        title: key,
        value: key,
        children: [],
      };

      //groupModel['children'] = [];
      for (let weapon in appConfig?.weapons[key]) {
        groupModel.children.push({
          title: weapon,
          value: appConfig?.weapons[key][weapon],
        });
      }

      weapons.push(groupModel);
    }

    return weapons;
  },
  getConfig(configName: string) {
    const appConfig = this.getAppConfig();
    if (!appConfig) {
      return null;
    }

    const config = appConfig.configs?.find((c) => c.name === configName);
    return config;
  },
  getEnableConfig() {
    const appConfig = this.getAppConfig();
    if (!appConfig) {
      return;
    }

    const enableConfig = appConfig.configs.find((c) => c.active);
    return enableConfig;
  },
  getConfigList() {
    const appConfig = this.getAppConfig();
    if (!appConfig) {
      return [];
    }

    return appConfig.configs;
  },
  enableConfig(configName: string, enable: boolean) {
    const appConfig = this.getAppConfig();
    if (!appConfig) {
      return;
    }

    appConfig.configs.forEach((c) => {
      c.active = false;
      if (c.name === configName) {
        c.active = enable;
      }
    });

    this.update(appConfig);
  },
  createConfig(config: ConfigDto) {
    const appConfig = this.getAppConfig();
    if (!appConfig) {
      return;
    }

    const existConfigIndex = appConfig.configs.findIndex((c) => c.name === config.name);
    if (existConfigIndex >= 0) {
      throw `exist config name : ${config.name}`;
    }

    appConfig.configs.push(config);
    this.update(appConfig);
  },
  updateConfig(config: ConfigDto) {
    const appConfig = this.getAppConfig();
    if (!appConfig) {
      return;
    }

    const delConfigIndex = appConfig.configs.findIndex((c) => c.name === config.name);
    appConfig.configs.splice(delConfigIndex, 1, config);
    this.update(appConfig);
  },
  deleteConfig(configName: string) {
    const appConfig = this.getAppConfig();
    if (!appConfig) {
      return;
    }

    appConfig.configs = appConfig.configs.filter((c) => c.name !== configName);
    this.update(appConfig);
  },

  update(appConfig: ApplicationConfigurationDto) {
    const jsonString = JSON.stringify(appConfig);
    appConfigService?.update(jsonString);
  },
};
