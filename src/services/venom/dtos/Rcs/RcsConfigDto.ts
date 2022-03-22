import { PositionConfigDto } from '@/services/venom/dtos/PositionConfigDto';
export interface RcsConfigDto extends PositionConfigDto {
  active: boolean;
  aimActive: boolean;
  scope: number;
}
