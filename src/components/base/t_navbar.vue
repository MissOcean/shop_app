<template>
  <div class="t_navbar">
    <div class="tabs">
      <router-link to="/home" class="tab">
        <i class="iconfont icon-home"></i>
      </router-link>
      <router-link to="/search" class="tab">
        <i class="iconfont icon-search"></i>
      </router-link>
      <router-link to="/cart" class="tab">
        <i class="iconfont icon-cart"></i>
      </router-link>
    </div>
    <div class="logo">
      <a href="http://localhost:8090">网易严选</a>
    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    components: {}
  }
</script>
<style scoped lang='less' type='text/less'>
  .t_navbar {
    /*background-color: #fafafa;*/
    position: relative;
    height: .86rem;
    border-bottom:.01rem solid #d9d9d9 ;
    padding: 0 .24rem;
    div{}
    .logo {
      width: 2rem;
      height: .6rem;
      margin: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%,-50%,0);
      a{
        display: block;
        line-height:.6rem;
        font-size: .42rem;
        font-family: cursive;
        font-weight: bold;
        color: #444;
      }
    }
    .tabs{
      position: relative;
      height: 100%;
      .tab{
        position: absolute;
        height: .5rem;
        width: .5rem;
        top: 0;
        bottom: 0;
        margin: auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          font-size: .46rem;
        }
      }
      .tab:nth-of-type(2){
        right:.8rem
      }
      .tab:nth-of-type(3){
        right: 0;
      }
    }
  }
</style>
