module.exports = {
    router:{
        //自定义路由表规则
        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children:[
                        {
                            name:'home',
                            path: '/',
                            component: resolve(__dirname, 'pages/home/'),
                        },
                        {
                            name:'about',
                            path: '/about',
                            component: resolve(__dirname, 'pages/about'),
                        }
                    ]
                }
            ])
          }
    }
}