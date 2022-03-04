import { EntityChangeDto } from '@/services/audit-logging/dtos/EntityChangeDto';

import { AuditLogActionDto } from '@/services/audit-logging/dtos/AuditLogActionDto';

export interface AuditLogDto {
  extraProperties?: { [key: string]: {} };

  id?: any;

  userId?: string;

  userName?: string;

  tenantId?: string;

  impersonatorUserId?: string;

  impersonatorTenantId?: string;

  executionTime?: string;

  executionDuration?: number;

  clientIpAddress?: string;

  clientName?: string;

  browserInfo?: string;

  httpMethod?: string;

  url?: string;

  exceptions?: string;

  comments?: string;

  httpStatusCode: number;

  applicationName?: string;

  correlationId?: string;

  entityChanges?: [EntityChangeDto];

  actions: [AuditLogActionDto];
}
