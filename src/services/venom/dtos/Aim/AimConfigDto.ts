import { WeaponConfigDto } from '@/services/venom/dtos/Aim/WeaponConfigDto';
export interface AimConfigDto {
  active: boolean;
  weaponConfigs: WeaponConfigDto[];
}
