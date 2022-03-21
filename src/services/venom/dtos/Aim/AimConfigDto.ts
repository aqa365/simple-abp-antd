import { AimModelDto } from '@/services/venom/dtos/Aim/AimModelDto';
export interface AimConfigDto {
  active: boolean;
  aimModels: AimModelDto[];
}
