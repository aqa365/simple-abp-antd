

import { PermissionGroupDto } from '@/services/permission-management/dtos/PermissionGroupDto'


export interface GetPermissionListResultDto  {
		
		entityDisplayName?:string
	
		
		groups?:[PermissionGroupDto]
	
		
}