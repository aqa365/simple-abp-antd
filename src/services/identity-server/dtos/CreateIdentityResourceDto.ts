

import { IdentityResourceClaimDto } from '@/services/identity-server/dtos/IdentityResourceClaimDto'


export interface CreateIdentityResourceDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		name?:string
	
		
		displayName?:string
	
		
		description?:string
	
		
		enabled?:boolean
	
		
		required?:boolean
	
		
		emphasize?:boolean
	
		
		showInDiscoveryDocument?:boolean
	
		
		userClaims?:[IdentityResourceClaimDto]
	
		
}