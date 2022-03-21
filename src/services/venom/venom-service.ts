import { AimModelDto } from '@/services/venom/dtos/AimModelDto';
import { AimConfigDto } from '@/services/venom/dtos/AimConfigDto';
import { ApplicationConfigDto } from '@/services/venom/dtos/ApplicationConfigDto';

import { FzGlobalObj } from '@/services/venom/FzGlobalObj';

export default {
  getFz() {
    const fzGlobal: FzGlobalObj = window['FzGlobal'];
    return fzGlobal;
  },
  getAppConfig() {
    let appConfig: ApplicationConfigDto | null = null;

    const fzGlobal = this.getFz();
    if (!fzGlobal) return appConfig;

    let jsonString = fzGlobal.get();
    appConfig = jsonString ? eval('(' + jsonString + ')') : undefined;
    return appConfig;
  },
  getKeys() {
    let appConfig = this.getAppConfig();
    let keys: any = [];
    for (let key in appConfig?.keys) {
      keys.push({
        label: key,
        value: appConfig?.keys[key],
      });
    }

    return keys;
  },
  getAimConfig() {
    var appConfig = this.getAppConfig();
    return appConfig?.aim;
  },
  updateAimConfig(aimConfig: AimConfigDto) {
    var jsonString = JSON.stringify(aimConfig);
    const fzGlobal = this.getFz();
    fzGlobal?.updateAim(jsonString);
  },
  createAim(aim: AimModelDto) {
    var aimConfig = this.getAimConfig();
    aimConfig?.aimModels.push(aim);
    if (aimConfig) this.updateAimConfig(aimConfig);
  },
  updateAim(aim: AimModelDto) {
    var aimConfig = this.getAimConfig();
    var delIndex = aimConfig?.aimModels.findIndex((c) => c.name == aim.name) || -1;
    if (delIndex >= 0) {
      aimConfig?.aimModels.splice(delIndex, 1);
      this.createAim(aim);
    }
  },
};
