const cookieparser = process.server ? require('cookieparser') : undefined
//服务端渲染期间运行的是同一个实例
//为了防止数据冲突，务必把state定义为一个函数，返回数据对象
export const state = () => {
    return {
        auth:null
    }
}
export const mutations = {
    setAuth(state, auth) {
        state.auth = auth
    }
}

export const actions = {
    //初始化容器以及需要传递给客户端的数据
    //该方法只会在服务端渲染期间自动调用
    nuxtServerInit({commit}, {req}){
        let auth = null;
        if(req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.auth) 
            } catch (error) {
                //
            }
        }
        commit('setAuth', auth)
    }
}