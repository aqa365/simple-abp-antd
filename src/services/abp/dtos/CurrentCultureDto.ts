

import { DateTimeFormatDto } from '@/services/abp/dtos/DateTimeFormatDto'


export interface CurrentCultureDto  {
		
		displayName?:string
	
		
		englishName?:string
	
		
		threeLetterIsoLanguageName?:string
	
		
		twoLetterIsoLanguageName?:string
	
		
		isRightToLeft?:boolean
	
		
		cultureName?:string
	
		
		name?:string
	
		
		nativeName?:string
	
		
		dateTimeFormat?:DateTimeFormatDto
	
		
}