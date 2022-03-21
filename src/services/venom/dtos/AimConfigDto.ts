import { AimModelDto } from '@/services/venom/dtos/AimModelDto';
export interface AimConfigDto {
  active: boolean;
  aimModels: AimModelDto[];
}
