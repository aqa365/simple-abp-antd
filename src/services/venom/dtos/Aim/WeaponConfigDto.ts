import { PositionConfigDto } from '@/services/venom/dtos/PositionConfigDto';
export interface WeaponConfigDto extends PositionConfigDto {
  name: string;
  activeWeapons: number[];
}
