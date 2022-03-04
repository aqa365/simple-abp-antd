

import { PermissionGrantInfoDto } from '@/services/permission-management/dtos/PermissionGrantInfoDto'


export interface PermissionGroupDto  {
		
		name?:string
	
		
		displayName?:string
	
		
		permissions?:[PermissionGrantInfoDto]
	
		
}