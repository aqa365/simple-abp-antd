

import { CommentWithAuthorDto } from '@/services/cms-kit-admin/dtos/CommentWithAuthorDto'


export interface CommentWithAuthorPagedResultDto  {
		
		items?:[CommentWithAuthorDto]
	
		
		totalCount?:number
	
		
}