<template>
    <div>
        <h1>home</h1>
        <h2>posts:{{post}}</h2>
        <h2>{{data}}</h2>
        <nuxt-link to="/about" >about</nuxt-link>
    </div>
</template>
<script>
import request from "@/plugins/request";
export default {
    async asyncData() {
        const {data} = await request('http://localhost:3000/data.json')
        console.log(data, 'request')
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