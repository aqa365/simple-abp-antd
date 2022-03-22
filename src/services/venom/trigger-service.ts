import { TriggerConfigDto } from '@/services/venom/dtos/Trigger/TriggerConfigDto';
import appConfigService from '@/services/venom/application-configuration-service';

export default {
  get() {
    const config = appConfigService.getEnableConfig();
    return config?.triggerConfig;
  },
  update(triggerConfig: TriggerConfigDto) {
    const config = appConfigService.getEnableConfig();
    if (!config) {
      return;
    }

    config.triggerConfig = triggerConfig;
    appConfigService.updateConfig(config);
  },
};
