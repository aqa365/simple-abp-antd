

import { ClientWithDetailsDto } from '@/services/identity-server/dtos/ClientWithDetailsDto'


export interface ClientWithDetailsPagedResultDto  {
		
		items?:[ClientWithDetailsDto]
	
		
		totalCount?:number
	
		
}