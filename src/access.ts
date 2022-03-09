import { ApplicationConfigurationDto } from '@/services/abp/dtos/ApplicationConfigurationDto';
import simpleAbp from './utils/simple-abp';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
  appInfo?: ApplicationConfigurationDto | undefined;
}) {
  var simpleAbpUtils: Utils.ISimpleAbpUtils | undefined = undefined;
  if (initialState.appInfo) {
    simpleAbpUtils = new simpleAbp.SimpleAbpUtils(initialState.appInfo);
  }

  return {
    isGranted: (route: any) => {
      return simpleAbpUtils?.auth.isGranted(route.permission);
    },
  };
}
