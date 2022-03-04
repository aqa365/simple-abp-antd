

import { ApiResourceClaimDto } from '@/services/identity-server/dtos/ApiResourceClaimDto'


export interface CreateApiResourceDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		name?:string
	
		
		displayName?:string
	
		
		description?:string
	
		
		showInDiscoveryDocument?:boolean
	
		
		userClaims?:[ApiResourceClaimDto]
	
		
}