import { BaseConfigDto } from '@/services/venom/dtos/BaseConfigDto';
export interface TriggerConfigDto extends BaseConfigDto {
  pause: number;
}
