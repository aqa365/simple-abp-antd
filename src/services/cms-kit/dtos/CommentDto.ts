

import { CmsUserDto } from '@/services/cms-kit/dtos/CmsUserDto'


export interface CommentDto  {
		
		id?:string
	
		
		entityType?:string
	
		
		entityId?:string
	
		
		text?:string
	
		
		repliedCommentId?:string
	
		
		creatorId?:string
	
		
		creationTime?:string
	
		
		author?:CmsUserDto
	
		
		concurrencyStamp?:string
	
		
}