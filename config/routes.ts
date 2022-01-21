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
    routes: [
      {
        name: 'Identity',
        path: '/identity',
        routes: [
          {
            path: '/identity/organization-units',
            name: 'OrganizationUnits',
            component: './identityManagement/OrganizationUnits',
            permission: 'AbpIdentity.OrganizationUnits',
            access: 'isGranted',
          },
          {
            path: '/identity/roles',
            name: 'Roles',
            component: './identityManagement/Roles',
            permission: 'AbpIdentity.Roles',
            access: 'isGranted',
          },
          {
            path: '/identity/users',
            name: 'Users',
            component: './identityManagement/Users',
            permission: 'AbpIdentity.Users',
            access: 'isGranted',
          },
          {
            path: '/identity/security-logs',
            name: 'SecurityLogs',
            component: './identityManagement/SecurityLogs',
            permission: 'AbpIdentity.SecurityLogs',
            access: 'isGranted',
          },
        ],
      },
      {
        name: 'AuditLogs',
        path: '/audit-logs',
        component: './AuditLogs',
      },
    ],
  },
  {
    component: './404',
  },
];
