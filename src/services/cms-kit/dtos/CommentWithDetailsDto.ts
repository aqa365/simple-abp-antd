

import { CommentDto } from '@/services/cms-kit/dtos/CommentDto'

import { CmsUserDto } from '@/services/cms-kit/dtos/CmsUserDto'


export interface CommentWithDetailsDto  {
		
		id?:string
	
		
		entityType?:string
	
		
		entityId?:string
	
		
		text?:string
	
		
		creatorId?:string
	
		
		creationTime?:string
	
		
		replies?:[CommentDto]
	
		
		author?:CmsUserDto
	
		
		concurrencyStamp?:string
	
		
}