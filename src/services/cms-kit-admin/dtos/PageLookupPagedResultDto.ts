

import { PageLookupDto } from '@/services/cms-kit-admin/dtos/PageLookupDto'


export interface PageLookupPagedResultDto  {
		
		items?:[PageLookupDto]
	
		
		totalCount?:number
	
		
}