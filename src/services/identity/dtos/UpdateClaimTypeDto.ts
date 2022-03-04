

import { IdentityClaimValueType } from '@/services/identity/dtos/IdentityClaimValueType'


export interface UpdateClaimTypeDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		name?:string
	
		
		required?:boolean
	
		
		regex?:string
	
		
		regexDescription?:string
	
		
		description?:string
	
		
		valueType?:IdentityClaimValueType
	
		
}