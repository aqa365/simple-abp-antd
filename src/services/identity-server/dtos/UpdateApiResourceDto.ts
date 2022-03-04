

import { ApiResourceClaimDto } from '@/services/identity-server/dtos/ApiResourceClaimDto'

import { ApiResourceScopeDto } from '@/services/identity-server/dtos/ApiResourceScopeDto'

import { ApiResourceSecretDto } from '@/services/identity-server/dtos/ApiResourceSecretDto'


export interface UpdateApiResourceDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		displayName?:string
	
		
		description?:string
	
		
		enabled?:boolean
	
		
		showInDiscoveryDocument?:boolean
	
		
		properties?:{[key:string]:string}
	
		
		userClaims?:[ApiResourceClaimDto]
	
		
		scopes?:[ApiResourceScopeDto]
	
		
		secrets?:[ApiResourceSecretDto]
	
		
}