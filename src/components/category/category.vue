<template>
  <div class="page">
    <div class="header">
      <router-link to="/search" tag="div" class="searchBtn">输入商品名搜索</router-link>
    </div>
    <div class="pageContent">
      <div class="sideBar"></div>
      <div class="content"></div>
    </div>
    <bNavbar></bNavbar>
  </div>
</template>
<script>
  import BNavbar from 'components/base/b_navbar.vue'
  import Scroll from 'components/base/scroll.vue'
  import Loading from 'components/base/loading.vue'
  import {getCateList} from 'api/getData.js'

  export default {
    data() {
      return {
        jsonData: ''
      }
    },
    components: {BNavbar, Scroll, Loading},
    created() {
      getCateList().then(res => this.jsonData = res.data);
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .page {
    position: relative;
    height: 100%;
    text-align: center;
    .header {
      height: .88rem;
      background-color: #fff;
      border-bottom: .01rem solid #d9d9d9;
      display: flex;
      align-items: center;
      padding: 0 .4rem;
      .searchBtn {
        text-align: center;
        flex-grow: 1;
        background-color: #ededed;
        color: #666;
        line-height: .56rem;
        height: .56rem;
        border-radius: .1rem;
      }
    }
    .pageContent {
      position: absolute;
      top: .89rem;
      bottom: 1rem;
      width: 100%;
      display: flex;
      .sideBar{
        width: 1.5rem;
      }
      .content{
        flex-grow: 1;
      }
    }
  }

</style>
