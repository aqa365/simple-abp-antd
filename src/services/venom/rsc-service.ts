import { RcsConfigDto } from '@/services/venom/dtos/Rcs/RcsConfigDto';
import appConfigService from '@/services/venom/application-configuration-service';

export default {
  get() {
    const config = appConfigService.getEnableConfig();
    return config?.rcsConfig;
  },
  update(rcsConfig: RcsConfigDto) {
    const config = appConfigService.getEnableConfig();
    if (!config) {
      return;
    }

    config.rcsConfig = rcsConfig;
    appConfigService.updateConfig(config);
  },
};
