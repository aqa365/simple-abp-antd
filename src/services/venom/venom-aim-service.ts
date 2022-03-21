import { AimModelDto } from '@/services/venom/dtos/Aim/AimModelDto';
import { AimConfigDto } from '@/services/venom/dtos/Aim/AimConfigDto';
import venomBaseService from './venom-base-service';

let defaultAimModels:AimModelDto[] = [];


export default {
  get() {
    const appConfig = venomBaseService.getAppConfig();
    return appConfig?.aim;
  },
  getList(){
    const aimConfig = this.get();
    return aimConfig?.aimModels || [...defaultAimModels];
  },
  update(aimConfig: AimConfigDto) {
    const jsonString = JSON.stringify(aimConfig);
    const fzGlobal = venomBaseService.getFz();
    fzGlobal?.updateAim(jsonString);
  },
  createAim(aim: AimModelDto) {
    const aimConfig = this.get();
    aimConfig?.aimModels.push(aim);

    if (aimConfig) this.update(aimConfig);
    else defaultAimModels.push(aim);
  },
  updateAim(aim: AimModelDto) {
    const aimConfig = this.get();
    const models =  aimConfig?.aimModels || defaultAimModels;

    const newModels = models.filter(c=>c.name!==aim.name);
    newModels.push(aim);
    
    defaultAimModels = newModels;

    if (aimConfig) {
      aimConfig.aimModels = newModels;
    }
  },
};
