﻿export default [
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
    exact: false,
    name: 'Articles',
    icon: 'ReadOutlined',
    path: '/articles',
    routes: [
      {
        name: 'Article',
        path: '/articles/article',
        component: './articles/Article',
        permission: 'Articles.Article',
        access: 'isGranted',
      },
      {
        name: 'Catalog',
        path: '/articles/catalog',
        component: './articles/Catalog',
        permission: 'Articles.Article',
        access: 'isGranted',
      },
      {
        name: 'Tag',
        path: '/articles/tag',
        component: './articles/Tag',
        permission: 'Articles.Article',
        access: 'isGranted',
      },
    ],
  },
  {
    component: './404',
  },
];
