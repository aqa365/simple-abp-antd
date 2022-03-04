import { EntityChangeType } from '@/services/audit-logging/dtos/EntityChangeType';

import { EntityPropertyChangeDto } from '@/services/audit-logging/dtos/EntityPropertyChangeDto';

export interface EntityChangeDto {
  extraProperties?: { [key: string]: {} };

  id?: any;

  auditLogId?: string;

  tenantId?: string;

  changeTime?: string;

  changeType?: number;

  entityId?: string;

  entityTypeFullName?: string;

  propertyChanges?: [EntityPropertyChangeDto];
}
