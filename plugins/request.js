import axios from 'axios';

export const request = axios.create({
    baseURL:'http://realworld.api.fed.lagounews.com', //拉钩
    // baseURL:'https://conduit.productionready.io',
})

//请求拦截
//任何请求都i要经过请求拦截器
//可以在这里做一些公共的业务处理，例如统一设置token
//此时我们要想拿到store中存储的token数据但是这种写法是拿不到的
// request.interceptors.request.use(function(config) {
//     config.headers.Authorization = `Token `
//     return config
// }, function (err) {
//     //请求失败 如果此时请求还未发出 会进入这里
//     return Promise.reject(err)
// })

//只有将其当作插件导出 才能拿到相应的上下文对象（ query，params，req，res， store ...）
//插件导出必须使用export default 
export default (context) => {
    const {store, app} = context;
    request.interceptors.request.use(function(config) {
        const {auth} = store.state;
        if (auth && auth.token) {
            config.headers.Authorization = `Token ${auth.token}`
        }
        return config
    }, function (err) {
        //请求失败 如果此时请求还未发出 会进入这里
        return Promise.reject(err)
    }),  
    request.interceptors.response.use(response => Promise.resolve(response), function (err) {
        console.log(err.response.status === 401, 'err');
        if (err && err.response && err.response.status === 401) {
            app.router.push('/login')
            return 
        }
        return Promise.reject(err)
    })  
}
//相应拦截

// export default request;