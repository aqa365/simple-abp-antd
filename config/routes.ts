export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'login',
            path: '/user/login-callback',
            component: './user/LoginCallback',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'Administration',
    icon: 'setting',
    path: '/administration',
    routes: [
      { path: '/administration', redirect: 'audit-logs' },
      {
        name: 'Identity',
        path: '/administration/identity',
        routes: [
          { path: '/administration/identity', redirect: 'users' },
          {
            path: 'organization-units',
            name: 'OrganizationUnits',
            component: './identityManagement/OrganizationUnits',
            permission: 'AbpIdentity.OrganizationUnits',
            access: 'isGranted',
          },
          {
            path: 'roles',
            name: 'Roles',
            component: './identityManagement/Roles',
            permission: 'AbpIdentity.Roles',
            access: 'isGranted',
          },
          {
            path: 'users',
            name: 'Users',
            component: './identityManagement/Users',
            permission: 'AbpIdentity.Users',
            access: 'isGranted',
          },
          {
            path: 'security-logs',
            name: 'SecurityLogs',
            component: './identityManagement/SecurityLogs',
            permission: 'AbpIdentity.SecurityLogs',
            access: 'isGranted',
          },
        ],
      },
      {
        name: 'AuditLogs',
        path: 'audit-logs',
        component: './AuditLogs',
      },
      {
        name: 'Settings',
        path: 'settings',
        component: './Settings',
      },
    ],
  },
  {
    name: 'Cms',
    icon: 'PaperClipOutlined',
    path: '/cms',
    routes: [
      { path: '/cms', redirect: 'pages' },
      {
        name: 'Pages',
        path: 'pages',
        permission: 'CmsKit.Pages',
        access: 'isGranted',
        component: './cms/Pages',
      },
      {
        name: 'Blogs',
        path: 'blogs',
        permission: 'CmsKit.Blogs',
        access: 'isGranted',
        component: './cms/Blogs',
      },
      {
        name: 'BlogPosts',
        path: 'blog-posts',
        permission: 'CmsKit.BlogPosts',
        access: 'isGranted',
        component: './cms/BlogPosts',
      },
      {
        name: 'Tags',
        path: 'tags',
        permission: 'CmsKit.Tags',
        access: 'isGranted',
        component: './cms/Tags',
      },
      {
        name: 'Comments',
        path: 'comments',
        permission: 'CmsKit.Comments',
        access: 'isGranted',
        component: './cms/Comments',
      },
      {
        name: 'Menus',
        path: 'menus',
        permission: 'CmsKit.Menus',
        access: 'isGranted',
        component: './cms/Menus',
      },
    ],
  },
  {
    name: 'Venom',
    icon: 'PaperClipOutlined',
    path: '/venom',
    permission: 'Venom.Configs',
    access: 'isGranted',
    routes: [
      { path: '/venom', redirect: 'config' },
      {
        name: 'Config',
        path: 'config',
        permission: 'Venom.Configs',
        access: 'isGranted',
        component: './venom/Config',
      },
      {
        name: 'Aim',
        path: 'aim',
        permission: 'Venom.Aim',
        access: 'isGranted',
        component: './venom/Aim',
      },
      {
        name: 'Rcs',
        path: 'rcs',
        permission: 'Venom.Rcs',
        access: 'isGranted',
        component: './venom/Rcs',
      },
      {
        name: 'Radar',
        path: 'radar',
        permission: 'Venom.Radar',
        access: 'isGranted',
        component: './venom/Radar',
      },
      {
        name: 'Trigger',
        path: 'trigger',
        permission: 'Venom.Trigger',
        access: 'isGranted',
        component: './venom/Trigger',
      },
      {
        name: 'Sonar',
        path: 'sonar',
        permission: 'Venom.Sonar',
        access: 'isGranted',
        component: './venom/Sonar',
      },
    ],
  },
  {
    component: './404',
  },
];
