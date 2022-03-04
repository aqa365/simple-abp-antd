

import { ReactionDto } from '@/services/cms-kit/dtos/ReactionDto'


export interface ReactionWithSelectionDto  {
		
		reaction?:ReactionDto
	
		
		count?:number
	
		
		isSelectedByCurrentUser?:boolean
	
		
}