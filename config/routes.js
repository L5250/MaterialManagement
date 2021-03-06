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
            routes: [
              {
                path: '/',
                redirect: '/Home',
              },
              {
                path: '/Home',
                name: '首页',
                icon: 'home',
                component: './Home',
              },
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
                authority: ['admin'],
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
