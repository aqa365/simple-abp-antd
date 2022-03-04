

import { IdentityClaimValueType } from '@/services/identity/dtos/IdentityClaimValueType'


export interface ClaimTypeDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		id?:any
	
		
		name?:string
	
		
		required?:boolean
	
		
		isStatic?:boolean
	
		
		regex?:string
	
		
		regexDescription?:string
	
		
		description?:string
	
		
		valueType?:IdentityClaimValueType
	
		
		valueTypeAsString?:string
	
		
}