

import { ApiScopeDto } from '@/services/identity-server/dtos/ApiScopeDto'


export interface ApiScopePagedResultDto  {
		
		items?:[ApiScopeDto]
	
		
		totalCount?:number
	
		
}