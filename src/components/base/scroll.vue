<template>
  <div ref="wrapper">
    <slot></slot>
    <!--注意bscoll只会把wrapper中第一个div作为滚动内容-->
  </div>
  <!--后期加上滚动条与回到顶部-->
</template>
<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      options: {Object},
      data: {Array, Number, Object, String}
    },
    watch: {
      //-->监听数据改变,数据发生改变重新计算scroll值,所以父组件需传递数据进来
      data() {
        let vm = this;
        /*setTimeout(function () {
          vm.refresh();
        }, 20)*/
        this.$nextTick(() => {
          this.refresh()
        })
        //设置20ms延时或$nextTick为了保证dom加载完毕后计算，否者新的scroll值不会改变
      }
    },
    created() {
      //window resize时reflesh
      let that = this;
      window.addEventListener('resize', function () {
        that.refresh();
      })
      //此处有个bug，从移动端切到pc端refresh无用，需刷新页面
    },
    mounted() {
      setTimeout(this._initScroll, 20)
    },
    methods: {
      refresh() {
        console.log('refresh')
        this.scroll && this.scroll.refresh();
      },
      _initScroll() {
//        console.log(this.$refs.wrapper, this.options)
        this.scroll = new BScroll(this.$refs.wrapper, this.options);
      }
    }
  }
</script>
<style scoped lang='less' type='text/less'>
</style>
