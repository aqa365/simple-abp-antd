import { LanguageInfo } from '@/services/abp/dtos/LanguageInfo';

import { CurrentCultureDto } from '@/services/abp/dtos/CurrentCultureDto';

import { NameValue } from '@/services/abp/dtos/NameValue';

export interface ApplicationLocalizationConfigurationDto {
  values: { [key: string]: { [key: string]: string } };
  languages?: [LanguageInfo];
  currentCulture?: CurrentCultureDto;
  defaultResourceName?: string;
  languagesMap?: { [key: string]: [NameValue] };
  languageFilesMap?: { [key: string]: [NameValue] };
}
