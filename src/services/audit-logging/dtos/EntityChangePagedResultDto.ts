

import { EntityChangeDto } from '@/services/audit-logging/dtos/EntityChangeDto'


export interface EntityChangePagedResultDto  {
		
		items?:[EntityChangeDto]
	
		
		totalCount?:number
	
		
}