

import { BlogDto } from '@/services/cms-kit-admin/dtos/BlogDto'


export interface BlogPagedResultDto  {
		
		items?:[BlogDto]
	
		
		totalCount?:number
	
		
}