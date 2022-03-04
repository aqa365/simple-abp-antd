

import { BlogPostPublicDto } from '@/services/cms-kit/dtos/BlogPostPublicDto'


export interface BlogPostPublicPagedResultDto  {
		
		items?:[BlogPostPublicDto]
	
		
		totalCount?:number
	
		
}