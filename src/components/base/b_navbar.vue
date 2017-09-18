<template>
  <div class="b_navbar">
    <router-link to="/home" class="tab">
      <i class="iconfont icon-home"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/topic" class="tab">
      <i class="iconfont icon-hot"></i>
      <span>专题</span>
    </router-link>
    <router-link to="/category" class="tab">
      <i class="iconfont icon-list"></i>
      <span>分类</span>
    </router-link>
    <router-link to="/cart" class="tab">
      <i class="iconfont icon-cart"></i>
      <span>购物车</span>
    </router-link>
    <router-link to="/user" class="tab">
      <i class="iconfont icon-people"></i>
      <span>个人</span>
    </router-link>

  </div>
</template>
<script>
  export default {}
</script>
<style scoped type="text/less" lang="less">
  .b_navbar {
    position: fixed;
    border-top: 1px solid #d9d9d9;
    bottom: 0;
    width: 100%;
    height: .98rem;

    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;

    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: .8rem;
      i {
       font-size: .38rem;
      }
      span {
        padding-top: 2px;
        color: #666;
        font-size: .24rem;
      }
    }
    .router-link-active span {
      color: #b4282d;
    }
    .router-link-active i {
      color: #b4282d;
    }
  }

</style>
