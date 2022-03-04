

import { ExtensionPropertyDto } from '@/services/abp/dtos/ExtensionPropertyDto'


export interface EntityExtensionDto  {
		
		properties?:{[key:string]:ExtensionPropertyDto}
	
		
		configuration?:{[key:string]:{}}
	
		
}