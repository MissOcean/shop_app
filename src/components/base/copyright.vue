<template>
  <div class="footer">
    <div class="appAndPc">
      <div>下载APP</div>
      <div>电脑版</div>
    </div>
    <div class="copyright">
      <span>网易公司版权所有 © 1997-2017</span>
      <span>食品经营许可证：JY13301080111719</span>
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
  .footer {
    height: 2.5rem;
    background: #414141;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: .24rem;
    .appAndPc {
      display: flex;
      height: .6rem;
      line-height: .6rem;

      color: #fff;
      margin: .4rem 0;
      div {
        border-radius: .05rem;
        width: 1.7rem;
        border: 1px solid #999;
        margin: 0 .25rem;
        text-align: center;
      }
    }
    .copyright {
      color: #999;
      display: flex;
      flex-direction: column;
    }
  }
</style>
