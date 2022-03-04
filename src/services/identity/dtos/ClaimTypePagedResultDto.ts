

import { ClaimTypeDto } from '@/services/identity/dtos/ClaimTypeDto'


export interface ClaimTypePagedResultDto  {
		
		items?:[ClaimTypeDto]
	
		
		totalCount?:number
	
		
}