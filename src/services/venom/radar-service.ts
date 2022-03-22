import { RadarConfigDto } from '@/services/venom/dtos/Radar/RadarConfigDto';
import appConfigService from '@/services/venom/application-configuration-service';

export default {
  get() {
    const config = appConfigService.getEnableConfig();
    return config?.radarConfig;
  },
  update(radarConfig: RadarConfigDto) {
    const config = appConfigService.getEnableConfig();
    if (!config) {
      return;
    }

    config.radarConfig = radarConfig;
    appConfigService.updateConfig(config);
  },
};
