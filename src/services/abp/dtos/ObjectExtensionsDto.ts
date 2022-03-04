

import { ModuleExtensionDto } from '@/services/abp/dtos/ModuleExtensionDto'

import { ExtensionEnumDto } from '@/services/abp/dtos/ExtensionEnumDto'


export interface ObjectExtensionsDto  {
		
		modules?:{[key:string]:ModuleExtensionDto}
	
		
		enums?:{[key:string]:ExtensionEnumDto}
	
		
}