

import { ExtensionPropertyApiGetDto } from '@/services/abp/dtos/ExtensionPropertyApiGetDto'

import { ExtensionPropertyApiCreateDto } from '@/services/abp/dtos/ExtensionPropertyApiCreateDto'

import { ExtensionPropertyApiUpdateDto } from '@/services/abp/dtos/ExtensionPropertyApiUpdateDto'


export interface ExtensionPropertyApiDto  {
		
		onGet?:ExtensionPropertyApiGetDto
	
		
		onCreate?:ExtensionPropertyApiCreateDto
	
		
		onUpdate?:ExtensionPropertyApiUpdateDto
	
		
}