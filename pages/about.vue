<template>
    <div>
        <h1>about</h1>
    </div>
</template>
<script>
import axios from "axios";
export default {
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