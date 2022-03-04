

import { ApplicationLocalizationConfigurationDto } from '@/services/abp/dtos/ApplicationLocalizationConfigurationDto'

import { ApplicationAuthConfigurationDto } from '@/services/abp/dtos/ApplicationAuthConfigurationDto'

import { ApplicationSettingConfigurationDto } from '@/services/abp/dtos/ApplicationSettingConfigurationDto'

import { CurrentUserDto } from '@/services/abp/dtos/CurrentUserDto'

import { ApplicationFeatureConfigurationDto } from '@/services/abp/dtos/ApplicationFeatureConfigurationDto'

import { MultiTenancyInfoDto } from '@/services/abp/dtos/MultiTenancyInfoDto'

import { CurrentTenantDto } from '@/services/abp/dtos/CurrentTenantDto'

import { TimingDto } from '@/services/abp/dtos/TimingDto'

import { ClockDto } from '@/services/abp/dtos/ClockDto'

import { ObjectExtensionsDto } from '@/services/abp/dtos/ObjectExtensionsDto'


export interface ApplicationConfigurationDto  {
		
		localization?:ApplicationLocalizationConfigurationDto
	
		
		auth?:ApplicationAuthConfigurationDto
	
		
		setting?:ApplicationSettingConfigurationDto
	
		
		currentUser?:CurrentUserDto
	
		
		features?:ApplicationFeatureConfigurationDto
	
		
		multiTenancy?:MultiTenancyInfoDto
	
		
		currentTenant?:CurrentTenantDto
	
		
		timing?:TimingDto
	
		
		clock?:ClockDto
	
		
		objectExtensions?:ObjectExtensionsDto
	
		
}