import { AimConfigDto } from '@/services/venom/dtos/AimConfigDto';
export interface ApplicationConfigDto {
  aim: AimConfigDto;
  keys: { [key: string]: number };
}
