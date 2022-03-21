import { PositionConfigDto } from '@/services/venom/dtos/Aim/PositionConfigDto';
export interface AimModelDto extends PositionConfigDto {
  name: string;
  weapons: number[];
  shootsFiredScope: number[];
}
