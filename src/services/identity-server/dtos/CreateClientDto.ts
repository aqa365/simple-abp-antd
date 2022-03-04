

import { ClientSecretDto } from '@/services/identity-server/dtos/ClientSecretDto'


export interface CreateClientDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		clientId?:string
	
		
		clientName?:string
	
		
		description?:string
	
		
		clientUri?:string
	
		
		logoUri?:string
	
		
		requireConsent?:boolean
	
		
		callbackUrl?:string
	
		
		logoutUrl?:string
	
		
		secrets?:[ClientSecretDto]
	
		
		scopes?:[string]
	
		
}