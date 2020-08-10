<template>
 <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email">
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

    </div>
  </div>
</div>  
</template>
<script>
import axios from "axios";
export default {
    name:'settingIndex',
      //路由匹配组件渲染前会先执行中间件处理
    middleware:'authenticated',
    async asyncData(cntext) {
        const {data} = await axios.get('http://localhost:3000/data.json')
        console.log(cntext, 'data about')
        return data
    },
    data(){
        return {
            data:'datas数据',
            data1:'sssssssssssss'
        }
    }
}
</script>

<style>

</style>