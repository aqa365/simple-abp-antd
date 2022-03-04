

import { ClientSecretDto } from '@/services/identity-server/dtos/ClientSecretDto'

import { ClientClaimDto } from '@/services/identity-server/dtos/ClientClaimDto'

import { ClientPropertyDto } from '@/services/identity-server/dtos/ClientPropertyDto'


export interface UpdateClientDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		clientName?:string
	
		
		description?:string
	
		
		clientUri?:string
	
		
		logoUri?:string
	
		
		enabled?:boolean
	
		
		requireConsent?:boolean
	
		
		allowOfflineAccess?:boolean
	
		
		allowRememberConsent?:boolean
	
		
		requirePkce?:boolean
	
		
		requireClientSecret?:boolean
	
		
		accessTokenLifetime?:number
	
		
		consentLifetime?:number
	
		
		accessTokenType?:number
	
		
		enableLocalLogin?:boolean
	
		
		frontChannelLogoutUri?:string
	
		
		frontChannelLogoutSessionRequired?:boolean
	
		
		backChannelLogoutUri?:string
	
		
		backChannelLogoutSessionRequired?:boolean
	
		
		includeJwtId?:boolean
	
		
		alwaysSendClientClaims?:boolean
	
		
		pairWiseSubjectSalt?:string
	
		
		userSsoLifetime?:number
	
		
		userCodeType?:string
	
		
		deviceCodeLifetime?:number
	
		
		clientSecrets?:[ClientSecretDto]
	
		
		claims?:[ClientClaimDto]
	
		
		properties?:[ClientPropertyDto]
	
		
		allowedGrantTypes?:[string]
	
		
		identityProviderRestrictions?:[string]
	
		
		scopes?:[string]
	
		
		allowedCorsOrigins?:[string]
	
		
		redirectUris?:[string]
	
		
		postLogoutRedirectUris?:[string]
	
		
}