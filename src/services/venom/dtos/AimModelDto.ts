import { PositionConfigDto } from '@/services/venom/dtos/PositionConfigDto';
export interface AimModelDto extends PositionConfigDto {
  name: string;
  weaponType: number[];
  shootsFiredScope: number[];
}
