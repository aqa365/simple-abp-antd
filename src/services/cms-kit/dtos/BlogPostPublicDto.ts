

import { CmsUserDto } from '@/services/cms-kit/dtos/CmsUserDto'


export interface BlogPostPublicDto  {
		
		creationTime?:string
	
		
		creatorId?:string
	
		
		lastModificationTime?:string
	
		
		lastModifierId?:string
	
		
		blogId?:string
	
		
		title?:string
	
		
		slug?:string
	
		
		shortDescription?:string
	
		
		content?:string
	
		
		coverImageMediaId?:string
	
		
		author?:CmsUserDto
	
		
}