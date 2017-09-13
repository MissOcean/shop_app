<template>
  <div id="app">
    <router-view></router-view>
    <b-navbar></b-navbar>
  </div>
</template>

<script>
  import BNavbar from 'components/home/b_navbar.vue'

  export default {
    name: 'app',
    components: {
      BNavbar,
    }
  }
</script>
<style scoped lang="less" type="text/less">
  #app{
    height: 100%;
  }
</style>

