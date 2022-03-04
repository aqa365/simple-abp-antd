

import { ProviderInfoDto } from '@/services/permission-management/dtos/ProviderInfoDto'


export interface PermissionGrantInfoDto  {
		
		name?:string
	
		
		displayName?:string
	
		
		parentName?:string
	
		
		isGranted?:boolean
	
		
		allowedProviders?:[string]
	
		
		grantedProviders?:[ProviderInfoDto]
	
		
}