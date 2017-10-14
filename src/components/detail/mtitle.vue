<template>
  <div class="title" :style="customBoxStyle">
    <div class="bgLine" :style="{width:lineWidth}"></div>
    <span :style="customContentStyle" >{{title}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      customBoxStyle:{
        type: Object,
        default(){
          return {}
        }
      },
      customContentStyle:{
        type: Object,
        default(){
          return {}
        }
      },
      lineWidth:{
        type: String,
        default: ''
      }
    },
    components: {}
  }
</script>
<style scoped lang='less' type='text/less'>
  .title {
    position: relative;
    padding: .7rem 0;
    width: 100%;
    text-align: center;
    .bgLine {
      border-bottom: 1px solid #ccc;
      margin: auto;
      width: 3rem;
      z-index: 1;
    }
    span {
      position: absolute;
      font-size: .32rem;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 2rem;
      height: .5rem;
      line-height: .5rem;
      background-color: #fff;
    }
  }
</style>
