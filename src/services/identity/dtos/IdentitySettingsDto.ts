

import { IdentityPasswordSettingsDto } from '@/services/identity/dtos/IdentityPasswordSettingsDto'

import { IdentityLockoutSettingsDto } from '@/services/identity/dtos/IdentityLockoutSettingsDto'

import { IdentitySignInSettingsDto } from '@/services/identity/dtos/IdentitySignInSettingsDto'

import { IdentityUserSettingsDto } from '@/services/identity/dtos/IdentityUserSettingsDto'


export interface IdentitySettingsDto  {
		
		password?:IdentityPasswordSettingsDto
	
		
		lockout?:IdentityLockoutSettingsDto
	
		
		signIn?:IdentitySignInSettingsDto
	
		
		user?:IdentityUserSettingsDto
	
		
}