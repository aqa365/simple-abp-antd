import { IdentitySecurityLogDto } from '@/services/identity/dtos/IdentitySecurityLogDto';

export interface IdentitySecurityLogPagedResultDto {
  items?: [IdentitySecurityLogDto];

  totalCount?: number;
}
