

import { ExtensionPropertyUiTableDto } from '@/services/abp/dtos/ExtensionPropertyUiTableDto'

import { ExtensionPropertyUiFormDto } from '@/services/abp/dtos/ExtensionPropertyUiFormDto'

import { ExtensionPropertyUiLookupDto } from '@/services/abp/dtos/ExtensionPropertyUiLookupDto'


export interface ExtensionPropertyUiDto  {
		
		onTable?:ExtensionPropertyUiTableDto
	
		
		onCreateForm?:ExtensionPropertyUiFormDto
	
		
		onEditForm?:ExtensionPropertyUiFormDto
	
		
		lookup?:ExtensionPropertyUiLookupDto
	
		
}