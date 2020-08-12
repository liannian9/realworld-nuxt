<template>
 <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="onSubmit">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" v-model="user.image" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="user.bio" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="user.email" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
    </div>
  </div>
</div>  
</template>
<script>
import { updateUser, getUser } from "@/api/user";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    name:'settingIndex',
      //路由匹配组件渲染前会先执行中间件处理
    middleware:'authenticated',
    async asyncData(cntext) {
        const {data} = await getUser()
        return {
          user:data.user
        }
    },
    methods:{
      async onSubmit () {
        this.user.updatedAt = new Date().toISOString();
        const {data} = await updateUser({user:this.user});
        this.$router.push('/')
      }, 
      logout() {
         this.$store.commit('setAuth', null) // mutating to store for client rendering
        //把登录状态存储到cookie 放置页面刷新丢失数据
        //cookie信息客户端服务端都能使用
        //本地存储的信息不会带到服务端
        Cookie.remove('auth');  

          //跳转首页
        this.$router.push('/')
      }
    }
    
}
</script>

<style>

</style>