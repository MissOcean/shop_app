<template>
  <swiper :options="options" class="swiper">
    <swiper-slide v-for="(pic,index) in picList" :key="index" :style="slideStyle" class="swiper-item">
      <img :src="pic" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  export default {
    data() {
      return {
        options: {
          //设置父级的盒子的大小
          setWrapperSize: true,
          //监控父级大小变化
          observeParents: true,
          autoplay: 2500,
          loop: true,
        }
      }
    },
    props: {
      picList: {
        type: Array,
        default() {
          return []
        }
      },
      slideStyle: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {}
  }
</script>
<style scoped lang='less' type='text/less'>
  .swiper {
    position: relative;
    /*height: 4rem;*/
    div {
    }
    .swiper-item {
      float: left;
      img {
        width: 100%;
        /*height: 4rem;*/
        display: block;
      }
    }
  }

</style>
