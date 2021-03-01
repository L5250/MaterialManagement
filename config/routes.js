export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },

              //
              {
                name: '材料管理',
                path: '/Materia',
                icon: 'table',
                routes: [
                  {
                    name: '材料管理',
                    path: '/Materia/MaterialManager',
                    component: './Material/MaterialManager',
                  },
                  {
                    name: '材料检索',
                    path: '/Materia/MaterialSearch',
                    component: './Material/MaterialSearch',
                  },
                  {
                    component: './404',
                  },
                ],
              },
              {
                name: '系统管理',
                icon: 'SettingOutlined',
                path: '/System',
                routes: [
                  {
                    name: '文献管理',
                    path: '/System/Document',
                    component: './System/Document',
                  },
                  {
                    name: '人员管理',
                    path: '/System/Personnel',
                    component: './System/Personnel',
                    authority: ['admin', 'user'],
                  },
                  {
                    name: '字典设置',
                    path: '/System/Dictionaries',
                    component: './System/Dictionaries',
                  },
                  {
                    component: './404',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
