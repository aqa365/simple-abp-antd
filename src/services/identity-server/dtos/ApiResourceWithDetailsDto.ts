

import { ApiResourceClaimDto } from '@/services/identity-server/dtos/ApiResourceClaimDto'

import { ApiResourceScopeDto } from '@/services/identity-server/dtos/ApiResourceScopeDto'

import { ApiResourceSecretDto } from '@/services/identity-server/dtos/ApiResourceSecretDto'


export interface ApiResourceWithDetailsDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		id?:any
	
		
		name?:string
	
		
		displayName?:string
	
		
		description?:string
	
		
		enabled?:boolean
	
		
		showInDiscoveryDocument?:boolean
	
		
		allowedAccessTokenSigningAlgorithms?:string
	
		
		properties?:{[key:string]:string}
	
		
		userClaims?:[ApiResourceClaimDto]
	
		
		scopes?:[ApiResourceScopeDto]
	
		
		secrets?:[ApiResourceSecretDto]
	
		
}