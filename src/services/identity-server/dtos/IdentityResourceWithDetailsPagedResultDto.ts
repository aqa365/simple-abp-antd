

import { IdentityResourceWithDetailsDto } from '@/services/identity-server/dtos/IdentityResourceWithDetailsDto'


export interface IdentityResourceWithDetailsPagedResultDto  {
		
		items?:[IdentityResourceWithDetailsDto]
	
		
		totalCount?:number
	
		
}