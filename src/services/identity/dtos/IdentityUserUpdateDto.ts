


export interface IdentityUserUpdateDto  {
	
		extraProperties?:{[key:string]:{}}
	
		
		userName:string
	
		
		name?:string
	
		
		surname?:string
	
		
		email:string
	
		
		phoneNumber?:string
	
		
		twoFactorEnabled?:boolean
	
		
		lockoutEnabled?:boolean
	
		
		roleNames?:[string]
	
		
		organizationUnitIds?:[string]
	
		
		concurrencyStamp?:string
	
		
}