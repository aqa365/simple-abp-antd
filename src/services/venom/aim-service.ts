import { WeaponConfigDto } from '@/services/venom/dtos/Aim/WeaponConfigDto';
import appConfigService from '@/services/venom/application-configuration-service';

export default {
  get() {
    const config = appConfigService.getEnableConfig();
    return config?.aimConfig;
  },
  getWeaponConfigList() {
    const aimConfig = this.get();
    return aimConfig?.weaponConfigs || [];
  },
  enable(enable: boolean) {
    const config = appConfigService.getEnableConfig();
    if (!config) {
      return;
    }

    config.aimConfig.active = enable;
    appConfigService.updateConfig(config);
  },
  deleteWeaponConfig(weaponConfigName: string) {
    const config = appConfigService.getEnableConfig();
    if (!config) {
      return;
    }

    config.aimConfig.weaponConfigs = config.aimConfig.weaponConfigs.filter(
      (c) => c.name !== weaponConfigName,
    );
    appConfigService.updateConfig(config);
  },
  updateWeaponConfig(weaponConfig: WeaponConfigDto) {
    const config = appConfigService.getEnableConfig();
    if (!config) {
      return;
    }

    const delWeaponConfigIndex = config.aimConfig.weaponConfigs.findIndex(
      (c) => c.name === weaponConfig.name,
    );

    config.aimConfig.weaponConfigs.splice(delWeaponConfigIndex, 1, weaponConfig);
    appConfigService.updateConfig(config);
  },
  createWeaponConfig(weaponConfig: WeaponConfigDto) {
    const config = appConfigService.getEnableConfig();
    if (!config) {
      return;
    }

    if (!config.aimConfig) {
      config.aimConfig = {
        active: true,
        weaponConfigs: [],
      };
    }

    const existWeaponConfigIndex = config.aimConfig.weaponConfigs.findIndex(
      (c) => c.name === weaponConfig.name,
    );

    // exist name
    if (existWeaponConfigIndex >= 0) {
      throw `exist name : ${weaponConfig.name}`;
    }

    config.aimConfig.weaponConfigs.push(weaponConfig);
    appConfigService.updateConfig(config);
  },
};
