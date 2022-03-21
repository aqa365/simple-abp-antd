import { BaseConfigDto } from '@/services/venom/dtos/BaseConfigDto';
export interface PositionConfigDto extends BaseConfigDto {
  position: number[];
  distance: number;
  speed: number;
}
