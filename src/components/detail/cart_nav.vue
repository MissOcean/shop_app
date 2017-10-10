<template>
  <div class="puchaseNav">
    <span class="service">客服</span>
    <span class="puchaseNow">立即购买</span>
    <span class="addToCart">加入购物车</span>
  </div>
</template>
<script>
    export default {
        props: {},
        components: {}
    }
</script>
<style scoped lang='less' type='text/less'>
  .puchaseNav {
    position: fixed;
    bottom: 0;
    height: 1rem;
    display: flex;
    width: 100%;
    background-color: #fff;
    border-top: .01rem solid #ededed;
    span {
      line-height: 1rem;
      width: 0;
      font-size: .26rem;
    }
    .service {
      flex-grow: 1;
      border-right: .01rem solid #eee;
    }
    .puchaseNow {
      flex-grow: 2;
    }
    .addToCart {
      flex-grow: 2;
      background-color: #b4282d;
      color: #fff;
    }
  }
</style>
