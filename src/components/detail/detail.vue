<template>
  <div class="page">
    <t-navbar></t-navbar>
    <router-view></router-view>
  </div>
</template>
<script>
  import TNavbar from 'components/base/t_navbar.vue'
  import Loading from 'components/base/loading.vue'

  export default {
    data() {
      return {
        jsonData: ''
      }
    },

    methods: {},
    components: {
      TNavbar,
      Loading
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  .page{
    position: relative;
    height: 100%;
    text-align: center;
  }
</style>
