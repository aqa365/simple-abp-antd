import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';
import pages from './zh-CN/pages';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': 'Simple Abp Pro',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',

  'menu.Administration': '管理',
  'menu.Administration.Identity': '身份标识管理',
  'menu.Administration.Identity.OrganizationUnits': '组织机构',
  'menu.Administration.Identity.Roles': '角色',
  'menu.Administration.Identity.Users': '用户',
  'menu.Administration.Identity.SecurityLogs': '安全日志',

  'menu.Administration.AuditLogs': '审计日志',
  'menu.Administration.Settings': '设置',

  'menu.Cms': '内容管理',
  'menu.Cms.Pages': '页面',
  'menu.Cms.Blogs': '博客',
  'menu.Cms.BlogPosts': '博客文章',
  'menu.Cms.Tags': '标签',
  'menu.Cms.Comments': '评论',
  'menu.Cms.Menus': '菜单',

  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
