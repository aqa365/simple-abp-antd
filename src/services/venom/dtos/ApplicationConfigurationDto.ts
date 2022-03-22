import { ConfigDto } from '@/services/venom/dtos/ConfigDto';
export interface ApplicationConfigurationDto {
  weapons: { [key: string]: { [key: string]: number } };
  keys: { [key: string]: number };
  configs: ConfigDto[];
}
