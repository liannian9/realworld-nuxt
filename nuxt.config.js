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
                            name:'profile',
                            path: '/profile/:username',
                            component: resolve(__dirname, 'pages/profile'),
                        },
                        {
                            name:'login',
                            path: '/login',
                            component: resolve(__dirname, 'pages/loginAndRegister'),
                        },
                        {
                            name:'register',
                            path: '/register',
                            component: resolve(__dirname, 'pages/loginAndRegister'),
                        },
                        {
                            name:'setting',
                            path: '/setting',
                            component: resolve(__dirname, 'pages/setting'),
                        },
                        {
                            name:'article',
                            path: '/article/:slug',
                            component: resolve(__dirname, 'pages/article'),
                        },
                        {
                            name:'editor',
                            path: '/editor/:slug?',
                            component: resolve(__dirname, 'pages/editor'),
                        }
                    ]
                }
            ])
        },
        linkActiveClass:'active',
        //todo发布pages配置
        // base:'/realworld-nuxt/'
    },
    //注册插件 ~代表从根路径出发
    plugins:[
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ],
    server:{
        host:'0.0.0.0',
        port:3000
    }
    // pages发布
    // generate:{
    //     dir:'docs',
    //     subFolders:false
    // }
}