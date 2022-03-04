import { request } from 'umi';
import { GetAuditLogListDto } from '@/services/audit-logging/dtos/GetAuditLogListDto';
import { AuditLogPagedResultDto } from '@/services/audit-logging/dtos/AuditLogPagedResultDto';
import { AuditLogDto } from '@/services/audit-logging/dtos/AuditLogDto';
import { EntityChangeDto } from '@/services/audit-logging/dtos/EntityChangeDto';
import { GetErrorRateFilter } from '@/services/audit-logging/dtos/GetErrorRateFilter';
import { GetErrorRateOutput } from '@/services/audit-logging/dtos/GetErrorRateOutput';
import { GetAverageExecutionDurationPerDayInput } from '@/services/audit-logging/dtos/GetAverageExecutionDurationPerDayInput';
import { GetAverageExecutionDurationPerDayOutput } from '@/services/audit-logging/dtos/GetAverageExecutionDurationPerDayOutput';
import { GetEntityChangesDto } from '@/services/audit-logging/dtos/GetEntityChangesDto';
import { EntityChangePagedResultDto } from '@/services/audit-logging/dtos/EntityChangePagedResultDto';
import { EntityChangeFilter } from '@/services/audit-logging/dtos/EntityChangeFilter';
import { EntityChangeWithUsernameDto } from '@/services/audit-logging/dtos/EntityChangeWithUsernameDto';

export default {
  getList: async (input: GetAuditLogListDto, options?: { [key: string]: any }) => {
    return request<AuditLogPagedResultDto>(`api/audit-logging/audit-logs`, {
      method: 'GET',

      params: { ...input },

      ...(options || {}),
    });
  },

  get: async (id: string, options?: { [key: string]: any }) => {
    return request<AuditLogDto>(`api/audit-logging/audit-logs/${id}`, {
      method: 'GET',

      ...(options || {}),
    });
  },

  getErrorRate: async (filter: GetErrorRateFilter, options?: { [key: string]: any }) => {
    return request<GetErrorRateOutput>(`api/audit-logging/audit-logs/statistics/error-rate`, {
      method: 'GET',

      params: { ...filter },

      ...(options || {}),
    });
  },

  getAverageExecutionDurationPerDay: async (
    filter: GetAverageExecutionDurationPerDayInput,
    options?: { [key: string]: any },
  ) => {
    return request<GetAverageExecutionDurationPerDayOutput>(
      `api/audit-logging/audit-logs/statistics/average-execution-duration-per-day`,
      {
        method: 'GET',

        params: { ...filter },

        ...(options || {}),
      },
    );
  },

  getEntityChanges: async (input: GetEntityChangesDto, options?: { [key: string]: any }) => {
    return request<EntityChangePagedResultDto>(`api/audit-logging/audit-logs/entity-changes`, {
      method: 'GET',

      params: { ...input },

      ...(options || {}),
    });
  },

  getEntityChangesWithUsername: async (
    input: EntityChangeFilter,
    options?: { [key: string]: any },
  ) => {
    return request<[EntityChangeWithUsernameDto]>(
      `api/audit-logging/audit-logs/entity-changes-with-username`,
      {
        method: 'GET',

        params: { ...input },

        ...(options || {}),
      },
    );
  },

  getEntityChangeWithUsername: async (entityChangeId: string, options?: { [key: string]: any }) => {
    return request<EntityChangeWithUsernameDto>(
      `api/audit-logging/audit-logs/entity-change-with-username/${entityChangeId}`,
      {
        method: 'GET',

        ...(options || {}),
      },
    );
  },

  getEntityChange: async (entityChangeId: string, options?: { [key: string]: any }) => {
    return request<EntityChangeDto>(
      `api/audit-logging/audit-logs/entity-changes/${entityChangeId}`,
      {
        method: 'GET',

        ...(options || {}),
      },
    );
  },
};
