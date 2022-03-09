import simpleAbp from './simple-abp';
import type { MenuDataItem } from '@umijs/route-utils';
import { SettingOutlined } from '@ant-design/icons';

const IconMap = {
  setting: <SettingOutlined />,
};

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, routes, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    routes: routes && loopMenuItem(routes),
  }));

class MenuContributor {
  _simpleAbpUtils: Utils.ISimpleAbpUtils;
  _g: (...policyNames: string[]) => boolean;

  constructor(appInfo?: any) {
    this._simpleAbpUtils = new simpleAbp.SimpleAbpUtils(appInfo);
    this._g = this._simpleAbpUtils.auth.isGranted;
  }

  isExistShowRoute(routes: MenuDataItem[]) {
    if (routes.length <= 0) {
      return false;
    }
    return routes.filter((c) => !c.hideInMenu).length > 0;
  }

  configureMenu() {
    const l = this._simpleAbpUtils.localization.getResource('AbpUiNavigation');
    const administration: MenuDataItem = {
      name: l('Menu:Administration'),
      hideInMenu: true,
      icon: 'setting',
      routes: [this.configuraIdentityManagementMenu()],
    };

    administration.hideInMenu = !this.isExistShowRoute(administration.routes || []);
    return loopMenuItem([administration]);
  }

  configuraIdentityManagementMenu() {
    const l = this._simpleAbpUtils.localization.getResource('AbpIdentity');
    const identityManagement: MenuDataItem = {
      name: l('Menu:IdentityManagement'),
      hideInMenu: true,
      routes: [
        {
          path: '/identity/organization-units',
          name: l('OrganizationUnits'),
          hideInMenu: !this._g('AbpIdentity.OrganizationUnits'),
        },
        {
          path: '/identity/roles',
          name: l('Roles'),
          hideInMenu: !this._g('AbpIdentity.Roles'),
        },
        {
          path: '/identity/users',
          name: l('Users'),
          hideInMenu: !this._g('AbpIdentity.Users'),
        },
        {
          path: '/identity/claim-types',
          name: l('ClaimTypes'),
          hideInMenu: !this._g('AbpIdentity.ClaimTypes'),
        },
        {
          path: '/identity/security-logs',
          name: l('SecurityLogs'),
          hideInMenu: !this._g('AbpIdentity.SecurityLogs'),
        },
      ],
    };

    identityManagement.hideInMenu = !this.isExistShowRoute(identityManagement.routes || []);
    return identityManagement;
  }
}

export default MenuContributor;
