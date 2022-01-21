import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pages from './en-US/pages';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Simple Abp Pro',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',

  'menu.Administration': 'Administration',
  'menu.Administration.Identity': 'Identity Management',
  'menu.Administration.Identity.OrganizationUnits': 'Organization Units',
  'menu.Administration.Identity.Roles': 'Roles',
  'menu.Administration.Identity.Users': 'Users',
  'menu.Administration.Identity.SecurityLogs': 'Security Logs',

  'menu.Administration.AuditLogs': 'Audit Logs',

  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
