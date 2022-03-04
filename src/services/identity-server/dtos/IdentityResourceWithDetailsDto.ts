

import { IdentityResourceClaimDto } from '@/services/identity-server/dtos/IdentityResourceClaimDto'


export interface IdentityResourceWithDetailsDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		id?:any
	
		
		name?:string
	
		
		displayName?:string
	
		
		description?:string
	
		
		enabled?:boolean
	
		
		required?:boolean
	
		
		emphasize?:boolean
	
		
		showInDiscoveryDocument?:boolean
	
		
		userClaims?:[IdentityResourceClaimDto]
	
		
		properties?:{[key:string]:string}
	
		
}