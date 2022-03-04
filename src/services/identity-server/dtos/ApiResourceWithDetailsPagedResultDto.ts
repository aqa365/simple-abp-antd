

import { ApiResourceWithDetailsDto } from '@/services/identity-server/dtos/ApiResourceWithDetailsDto'


export interface ApiResourceWithDetailsPagedResultDto  {
		
		items?:[ApiResourceWithDetailsDto]
	
		
		totalCount?:number
	
		
}