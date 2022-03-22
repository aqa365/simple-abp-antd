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
        component: './cms/Pages',
      },
      {
        name: 'Blogs',
        path: 'blogs',
        component: './cms/Blogs',
      },
      {
        name: 'BlogPosts',
        path: 'blog-posts',
        component: './cms/BlogPosts',
      },
      {
        name: 'Tags',
        path: 'tags',
        component: './cms/Tags',
      },
      {
        name: 'Comments',
        path: 'comments',
        component: './cms/Comments',
      },
      {
        name: 'Menus',
        path: 'menus',
        component: './cms/Menus',
      },
    ],
  },
  {
    name: 'Venom',
    icon: 'PaperClipOutlined',
    path: '/venom',
    routes: [
      { path: '/venom', redirect: 'config' },
      {
        name: 'Config',
        path: 'config',
        component: './venom/Config',
      },
      {
        name: 'Aim',
        path: 'aim',
        component: './venom/Aim',
      },
      {
        name: 'Rcs',
        path: 'rcs',
        component: './venom/Rcs',
      },
      {
        name: 'Radar',
        path: 'radar',
        component: './venom/Radar',
      },
      {
        name: 'Trigger',
        path: 'trigger',
        component: './venom/Trigger',
      },
      {
        name: 'Sonar',
        path: 'sonar',
        component: './venom/Sonar',
      },
    ],
  },
  {
    component: './404',
  },
];
