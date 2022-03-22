import { AimConfigDto } from '@/services/venom/dtos/Aim/AimConfigDto';
import { RcsConfigDto } from '@/services/venom/dtos/Rcs/RcsConfigDto';
import { RadarConfigDto } from '@/services/venom/dtos/Radar/RadarConfigDto';
import { TriggerConfigDto } from '@/services/venom/dtos/Trigger/TriggerConfigDto';

export interface ConfigDto {
  name: string;
  active: boolean;
  threadSleep: number;
  aimConfig: AimConfigDto;
  rcsConfig: RcsConfigDto;
  radarConfig: RadarConfigDto;
  triggerConfig: TriggerConfigDto;
}
