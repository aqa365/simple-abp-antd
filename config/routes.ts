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
        path: '/cms/pages',
        component: './cms/Pages',
      },
      {
        name: 'Blogs',
        path: '/cms/blogs',
        component: './cms/Blogs',
      },
      {
        name: 'BlogPosts',
        path: '/cms/blog-posts',
        component: './cms/BlogPosts',
      },
      {
        name: 'Tags',
        path: '/cms/tags',
        component: './cms/Tags',
      },
      {
        name: 'Comments',
        path: '/cms/comments',
        component: './cms/Comments',
      },
      {
        name: 'Menus',
        path: '/cms/menus',
        component: './cms/Menus',
      },
    ],
  },
  {
    component: './404',
  },
];
