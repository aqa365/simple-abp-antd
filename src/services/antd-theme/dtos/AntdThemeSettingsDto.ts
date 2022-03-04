

import { EnumAntdThemeStyle } from '@/services/antd-theme/dtos/EnumAntdThemeStyle'

import { EnumAntdThemeColor } from '@/services/antd-theme/dtos/EnumAntdThemeColor'

import { EnumAntdThemeMenuStyle } from '@/services/antd-theme/dtos/EnumAntdThemeMenuStyle'

import { EnumAntdThemeWidthStyle } from '@/services/antd-theme/dtos/EnumAntdThemeWidthStyle'


export interface AntdThemeSettingsDto  {
		
		style?:EnumAntdThemeStyle
	
		
		color?:EnumAntdThemeColor
	
		
		menuStyle?:EnumAntdThemeMenuStyle
	
		
		widthStyle?:EnumAntdThemeWidthStyle
	
		
		fixedHeader?:boolean
	
		
		fixedLeftMenu?:boolean
	
		
		autoCutMenu?:boolean
	
		
		content?:boolean
	
		
		top?:boolean
	
		
		footer?:boolean
	
		
		menu?:boolean
	
		
		menuHeader?:boolean
	
		
		colorWeakMode?:boolean
	
		
}