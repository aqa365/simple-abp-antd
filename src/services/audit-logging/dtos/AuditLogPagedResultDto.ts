

import { AuditLogDto } from '@/services/audit-logging/dtos/AuditLogDto'


export interface AuditLogPagedResultDto  {
		
		items?:[AuditLogDto]
	
		
		totalCount?:number
	
		
}