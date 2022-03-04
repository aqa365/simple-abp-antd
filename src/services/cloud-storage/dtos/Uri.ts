

import { UriHostNameType } from '@/services/cloud-storage/dtos/UriHostNameType'


export interface Uri  {
		
		absolutePath?:string
	
		
		absoluteUri?:string
	
		
		localPath?:string
	
		
		authority?:string
	
		
		hostNameType?:UriHostNameType
	
		
		isDefaultPort?:boolean
	
		
		isFile?:boolean
	
		
		isLoopback?:boolean
	
		
		pathAndQuery?:string
	
		
		segments?:[string]
	
		
		isUnc?:boolean
	
		
		host?:string
	
		
		port?:number
	
		
		query?:string
	
		
		fragment?:string
	
		
		scheme?:string
	
		
		originalString?:string
	
		
		dnsSafeHost?:string
	
		
		idnHost?:string
	
		
		isAbsoluteUri?:boolean
	
		
		userEscaped?:boolean
	
		
		userInfo?:string
	
		
}