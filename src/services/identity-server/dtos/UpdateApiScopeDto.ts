

import { ApiScopeClaimDto } from '@/services/identity-server/dtos/ApiScopeClaimDto'


export interface UpdateApiScopeDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		name?:string
	
		
		displayName?:string
	
		
		description?:string
	
		
		enabled?:boolean
	
		
		emphasize?:boolean
	
		
		required?:boolean
	
		
		showInDiscoveryDocument?:boolean
	
		
		userClaims?:[ApiScopeClaimDto]
	
		
		properties?:{[key:string]:string}
	
		
}