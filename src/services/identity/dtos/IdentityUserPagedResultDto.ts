

import { IdentityUserDto } from '@/services/account/dtos/IdentityUserDto'


export interface IdentityUserPagedResultDto  {
		
		items?:[IdentityUserDto]
	
		
		totalCount?:number
	
		
}