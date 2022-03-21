import { AimConfigDto } from '@/services/venom/dtos/Aim/AimConfigDto';
export interface ApplicationConfigDto {
  aim: AimConfigDto;
  weapons:{ [key: string]:  { [key: number]: string } }
  keys: { [key: string]: number };
  
}
