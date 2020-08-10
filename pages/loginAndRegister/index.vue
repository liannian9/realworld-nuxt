<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">
            {{isLogin ? 'Sign in' : 'Sign up'}}
        </h1>
        <p class="text-xs-center">
          <!-- <a href="">Have an account?</a> -->
          <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>
        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li  v-for="(message, index) in messages" :key="field + index">
                {{field}} {{message}}
            </li>
          </template>
        </ul>
        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input class="form-control form-control-lg" required type="text" placeholder="Your Name" v-model="user.username">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" required type="email" placeholder="Email" v-model="user.email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" required type="password" minlength="8" placeholder="Password" v-model="user.password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin ? 'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {login, register} from "@/api/user";
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name:'loginAndRegister',
//路由匹配组件渲染前会先执行中间件处理
  middleware:'noauthenticated',
  data() {
    return {
      user:{
          username:'',
          email:'',
          password:''
      },
      errors:{}
    };
  },
  computed:{
      isLogin() {
          return this.$route.name === 'login'
      }
  },
  methods:{
     async onSubmit() {
         try {
             
             let fn = this.isLogin ? login : register; 
             const {data} = await fn({user:this.user})
   
             console.log(this, data.user, 'data')
             //todo 保存用户信息
            this.$store.commit('setAuth', data.user) // mutating to store for client rendering
            //把登录状态存储到cookie 放置页面刷新丢失数据
            //cookie信息客户端服务端都能使用
            //本地存储的信息不会带到服务端
            Cookie.set('auth', data.user);
             //跳转首页
            this.$router.push('/')
         } catch (error) {
             console.log(error, 'error')
             this.errors = error.response.data.errors
         }
      }
  }
};
</script>

<style>
</style>