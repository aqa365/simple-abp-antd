

import { BlogPostListDto } from '@/services/cms-kit-admin/dtos/BlogPostListDto'


export interface BlogPostListPagedResultDto  {
		
		items?:[BlogPostListDto]
	
		
		totalCount?:number
	
		
}