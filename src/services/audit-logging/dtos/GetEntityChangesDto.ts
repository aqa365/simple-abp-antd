export interface GetEntityChangesDto {
  defaultMaxResultCount?: number;

  maxMaxResultCount?: number;

  maxResultCount?: number;

  skipCount?: number;

  sorting?: string;

  auditLogId?: string;

  changeType?: number;

  entityId?: string;

  entityTypeFullName?: string;

  startDate?: string;

  endDate?: string;
}
