

import { ClientSecretDto } from '@/services/identity-server/dtos/ClientSecretDto'

import { ClientScopeDto } from '@/services/identity-server/dtos/ClientScopeDto'

import { ClientClaimDto } from '@/services/identity-server/dtos/ClientClaimDto'

import { ClientGrantTypeDto } from '@/services/identity-server/dtos/ClientGrantTypeDto'

import { ClientIdentityProviderRestrictionDto } from '@/services/identity-server/dtos/ClientIdentityProviderRestrictionDto'

import { ClientPropertyDto } from '@/services/identity-server/dtos/ClientPropertyDto'

import { ClientCorsOriginDto } from '@/services/identity-server/dtos/ClientCorsOriginDto'

import { ClientRedirectUriDto } from '@/services/identity-server/dtos/ClientRedirectUriDto'

import { ClientPostLogoutRedirectUriDto } from '@/services/identity-server/dtos/ClientPostLogoutRedirectUriDto'


export interface ClientWithDetailsDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		id?:any
	
		
		clientId?:string
	
		
		clientName?:string
	
		
		description?:string
	
		
		clientUri?:string
	
		
		logoUri?:string
	
		
		enabled?:boolean
	
		
		protocolType?:string
	
		
		requireClientSecret?:boolean
	
		
		requireConsent?:boolean
	
		
		allowRememberConsent?:boolean
	
		
		alwaysIncludeUserClaimsInIdToken?:boolean
	
		
		requirePkce?:boolean
	
		
		allowPlainTextPkce?:boolean
	
		
		allowAccessTokensViaBrowser?:boolean
	
		
		frontChannelLogoutUri?:string
	
		
		frontChannelLogoutSessionRequired?:boolean
	
		
		backChannelLogoutUri?:string
	
		
		backChannelLogoutSessionRequired?:boolean
	
		
		allowOfflineAccess?:boolean
	
		
		identityTokenLifetime?:number
	
		
		accessTokenLifetime?:number
	
		
		authorizationCodeLifetime?:number
	
		
		consentLifetime?:number
	
		
		absoluteRefreshTokenLifetime?:number
	
		
		slidingRefreshTokenLifetime?:number
	
		
		refreshTokenUsage?:number
	
		
		updateAccessTokenClaimsOnRefresh?:boolean
	
		
		refreshTokenExpiration?:number
	
		
		accessTokenType?:number
	
		
		enableLocalLogin?:boolean
	
		
		includeJwtId?:boolean
	
		
		alwaysSendClientClaims?:boolean
	
		
		clientClaimsPrefix?:string
	
		
		pairWiseSubjectSalt?:string
	
		
		userSsoLifetime?:number
	
		
		userCodeType?:string
	
		
		deviceCodeLifetime?:number
	
		
		clientSecrets?:[ClientSecretDto]
	
		
		allowedScopes?:[ClientScopeDto]
	
		
		claims?:[ClientClaimDto]
	
		
		allowedGrantTypes?:[ClientGrantTypeDto]
	
		
		identityProviderRestrictions?:[ClientIdentityProviderRestrictionDto]
	
		
		properties?:[ClientPropertyDto]
	
		
		allowedCorsOrigins?:[ClientCorsOriginDto]
	
		
		redirectUris?:[ClientRedirectUriDto]
	
		
		postLogoutRedirectUris?:[ClientPostLogoutRedirectUriDto]
	
		
}