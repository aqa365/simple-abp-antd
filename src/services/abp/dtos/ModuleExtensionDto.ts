

import { EntityExtensionDto } from '@/services/abp/dtos/EntityExtensionDto'


export interface ModuleExtensionDto  {
		
		entities?:{[key:string]:EntityExtensionDto}
	
		
		configuration?:{[key:string]:{}}
	
		
}