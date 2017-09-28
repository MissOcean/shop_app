<template>
  <div>
    pro
    <router-link :to="commentRoute">评价</router-link>
  </div>
</template>
<script>
  import {getProductDetail} from 'api/getData.js'

  export default {
    data() {
      return {
        jsonData: ''
      }
    },
    props: {},
    components: {},
    computed:{
      commentRoute(){
        return `${this.$route.fullPath}/comment`
      }
    },
    created() {
      console.log(`${this.$route.fullPath}/comment`);
      getProductDetail(this.$route.params.productId)
        .then(data => this.jsonData = data)
    },
  }
</script>
<style scoped lang='less' type='text/less'>
</style>
