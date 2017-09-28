<template>
  <ul v-if="star" class="stars" :style="{width:totalW}">
    <li v-for="index in maxStar"
        class="star"
        :class="index>star?'':'active'">
      <i class="iconfont icon-favorfill" :style="{fontSize:fSize}"></i>
    </li>
  </ul>
</template>
<script>
  export default {
    props: {
      star: {
        type: [Number, String],
        default: ''
      },
      maxStar: {
        type: [Number, String],
        default: 5
      },
      fSize: {
        type: [Number, String],
        default: '.28rem'
      }

    },
    computed: {
      totalW() {
        let w =this.maxStar * parseFloat(this.fSize) * 3 / 2
        return w.toFixed(2)+ 'rem'
      }
    },
    components: {}
  }
</script>
<style scoped lang='less' type='text/less'>
  .stars {
    font-size: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .star{
      color:#d6d6d6
    }
    .active{
      color: #ffb54a;
    }
  }

</style>
