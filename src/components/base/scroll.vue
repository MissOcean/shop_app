<template>
  <div ref="wrapper">
    <slot></slot>
    <!--注意bscoll只会把wrapper中第一个div作为滚动内容-->
    <div class="backTop" @click="backToTop" v-show="isShow">
      <i class="iconfont icon-up"></i>
    </div>
  </div>
  <!--后期加上滚动条与回到顶部-->
</template>
<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      options: {Object},
      data: {Array, Number, Object, String},
      listenScroll: {
        type: Boolean,
        default: false
      },
      savePostion: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {scroll: ''}
    },
    computed: {
      isShow() {
        let fs = window.config.htmlfontSize;
        /*定死为13rem*/
        return this.scroll && this.scroll.y < -13 * fs;
      }
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
      log() {
        console.log(this.scroll.y)
      },
      backToTop() {
        /*回到顶部，定死为500ms*/
        this.scrollTo(0, 0, 500)
      },
      refresh() {
        console.log('refresh')
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        /*参数(x, y, time, easing)*/
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      _initScroll() {
//        console.log(this.$refs.wrapper, this.options)
        //此处刷新读取保存的scroll位置,暂未实现
        if (this.savePostion) {
        }
        window.scroll = this.scroll = new BScroll(this.$refs.wrapper, this.options);
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            //此处处理滚动条同步，以及保存scroll位置
            localStorage.setItem("pos", JSON.stringify(pos));
          })
        }
      }
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  .backTop {
    position: fixed;
    right: .2rem;
    bottom: 1.2rem;
    width: .8rem;
    height: .8rem;
    line-height: .8rem;
    background-color: #FFF;
    border-radius: 100%;
    border: 1px solid #ededed;
    .iconfont {
      font-size: .4rem;
      color: #aaa;
      font-weight: bold;
    }
  }


</style>
