

import { IanaTimeZone } from '@/services/abp/dtos/IanaTimeZone'

import { WindowsTimeZone } from '@/services/abp/dtos/WindowsTimeZone'


export interface TimeZone  {
		
		iana?:IanaTimeZone
	
		
		windows?:WindowsTimeZone
	
		
}