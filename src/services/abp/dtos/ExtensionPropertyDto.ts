

import { LocalizableStringDto } from '@/services/abp/dtos/LocalizableStringDto'

import { ExtensionPropertyApiDto } from '@/services/abp/dtos/ExtensionPropertyApiDto'

import { ExtensionPropertyUiDto } from '@/services/abp/dtos/ExtensionPropertyUiDto'

import { ExtensionPropertyAttributeDto } from '@/services/abp/dtos/ExtensionPropertyAttributeDto'


export interface ExtensionPropertyDto  {
		
		type?:string
	
		
		typeSimple?:string
	
		
		displayName?:LocalizableStringDto
	
		
		api?:ExtensionPropertyApiDto
	
		
		ui?:ExtensionPropertyUiDto
	
		
		attributes?:[ExtensionPropertyAttributeDto]
	
		
		configuration?:{[key:string]:{}}
	
		
		defaultValue?:{}
	
		
}