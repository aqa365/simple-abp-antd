

import { IdentityRoleDto } from '@/services/identity/dtos/IdentityRoleDto'


export interface OrganizationUnitWithDetailsDto  {
		
		extraProperties?:{[key:string]:{}}
	
		
		id?:any
	
		
		creationTime?:string
	
		
		creatorId?:string
	
		
		lastModificationTime?:string
	
		
		lastModifierId?:string
	
		
		isDeleted?:boolean
	
		
		deleterId?:string
	
		
		deletionTime?:string
	
		
		parentId?:string
	
		
		code?:string
	
		
		displayName?:string
	
		
		roles?:[IdentityRoleDto]
	
		
}