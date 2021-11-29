import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 组员管理
  // {
  //   path: '/CrewTable',
  //   component: Layout,
  //   redirect: '/crew/CrewTable',
  //   name: 'Example',
  //   children: [
  //     {
  //       path: '/CrewTable',
  //       name: '组员管理',
  //       component: () => import('@/views/crew/CrewTable'),
  //       meta: { title: '组员管理', icon: 'table' }
  //     },
  //   ]
  // },
  // {
  //   path: '/crew',
  //   component: Layout,
  //   redirect: '/crew/CrewSave',
  //   name: 'Example',
  //   hidden:true,
  //   children: [
  //     {
  //       path: '/CrewSave',
  //       name: '公告管理',
  //       component: () => import('@/views/crew/CrewSave'),
  //       meta: { title: '编辑组员', icon: 'example' },
  //     },
  //           {
  //       path: 'CrewEdit/:id',
  //       name: 'CrewEdit',
  //       component: () => import('@/views/crew/CrewSave'),
  //       meta: { title: '编辑组员', icon: 'tree' },
  //       hidden:true
  //     }
  //   ]
  // },


  {
    path: '/crew',
    component: Layout,
    redirect: '/crew/CrewTable',
    name: 'Example',
    meta: { title: '组员管理', icon: 'CrewManagement' },
    children: [
      {
        path: 'CrewTable',
        name: '组员列表',
        component: () => import('@/views/crew/CrewTable'),
        meta: { title: '组员列表', icon: 'table' }
      },
      {
        path: 'CrewSave',
        name: '编辑组员',
        component: () => import('@/views/crew/CrewSave'),
        meta: { title: '编辑组员', icon: 'example' },
        hidden:true
      },
      {
        path: 'CrewEdit/:id',
        name: 'CrewEdit',
        component: () => import('@/views/crew/CrewSave'),
        meta: { title: '编辑组员', icon: 'tree' },
        hidden:true
      }
    ]
  },
// 活动管理
{
  path: '/activity',
  component: Layout,
  redirect: '/crew/campaign',
  name: 'Example',
  meta: { title: '活动管理', icon: 'activity' },
  children: [
    {
      path: 'campaign',
      name: '参加活动记录',
      component: () => import('@/views/activity/campaign'),
      meta: { title: '参加活动记录', icon: 'campaign' }
    },
    {
      path: 'allocation',
      name: '资源分配记录',
      component: () => import('@/views/activity/allocation'),
      meta: { title: '资源分配记录', icon: 'allocation' }
    },
    {
      path: 'match',
      name: '组内赛记录',
      component: () => import('@/views/activity/match'),
      meta: { title: '组内赛记录', icon: 'match' }
    },
  ]
},
// 公告管理
{
  path: '/notice',
  component: Layout,
  redirect: '/notice/notice',
  name: 'Example',
  children: [
    {
      path: 'notice',
      name: '公告管理',
      component: () => import('@/views/notice/notice'),
      meta: { title: '公告管理', icon: 'notice' }
    },
  ]
},
//角色管理
{
  path: '/user',
  component: Layout,
  redirect: '/user/user',
  name: 'Example',
  children: [
    {
      path: 'notice',
      name: '用户管理',
      component: () => import('@/views/user/user'),
      meta: { title: '用户管理', icon: 'useradmin' }
    },
  ]
},
//监控
{
  path: '/monitor',
  component: Layout,
  redirect: '/monitor/monitor',
  name: 'Example',
  children: [
    {
      path: 'monitor',
      name: '服务监控',
      component: () => import('@/views/monitor/monitor'),
      meta: { title: '服务监控', icon: 'monitor' },
    },
  ]
},
//操作日志
{
  path: '/operationLog',
  component: Layout,
  redirect: '/log/operationLog',
  name: 'Example',
  children: [
    {
      path: 'operationLog',
      name: '操作日志',
      component: () => import('@/views/log/operationLog'),
      meta: { title: '操作日志', icon: 'operationLog' },
    },
  ]
},


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '主页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
