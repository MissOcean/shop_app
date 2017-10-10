<template>
  <div ref="wrapper">
    <slot></slot>
    <!--注意bscoll只会把wrapper中第一个div作为滚动内容-->
    <div class="backTop" @click="backToTop"
         v-if="hasBackToTop" v-show="isShow">
      <i class="iconfont icon-up"></i>
    </div>
    <div class="scrollBar" v-if="hasScrollBar" ref="scrollBar">
      <div class="scrollBg"></div>
    </div>
  </div>
  <!--后期加上滚动条与回到顶部-->
</template>
<script>
  import BScroll from 'better-scroll'
  import {hasClass, addClass, removeClass} from 'api/utils.js'

  export default {
    props: {
      options: {Object},
      data: {
        type: [Array, Number, Object, String],
        default: ''
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      hasBackToTop: {
        type: Boolean,
        default: false
      },
      hasScrollBar: {
        type: Boolean,
        default: false
      },
      savePostion: {
        type: Boolean,
        default: false
      },
      scrollHandle: {
        type: [Function, String],
        default: ''
      }
    },
    data() {
      return {scroll: '', scrollPos: 0}
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
        //点击切换子路由时会先置data为''，此时无需refresh，等json数据请求回来后才refresh
        if (!this.data) return
        //console.log(this.data)
        let that = this;
        /* setTimeout(function () {
           that.refresh();
         }, 20)*/
        this.$nextTick(() => {
          this.refresh()
        })
        //设置20ms延时或$nextTick为了保证dom加载完毕后计算，否者新的scroll值不会改变
      }
    },
    created() {
      //window resize时reflesh
      window.addEventListener('resize', this.handleWinResize)
      //此处有个bug，从移动端切到pc端refresh无用，需刷新页面
    },
    destroyed() {
      window.removeEventListener('resize', this.handleWinResize)
    },
    mounted() {
      setTimeout(this._initScroll, 20)
    },

    methods: {
      log() {
        console.log(this.scroll.y)
      },
      backToTop() {
        /*回到顶部，时间定死为500ms*/
        this.scrollTo(0, 0, 500)
      },
      refresh() {
//        this._initScroll()
        this.scroll && this.scroll.refresh();
      },
      handleWinResize() {
        setTimeout(() => {
          this.refresh();
        }, 20)
      },
      stop() {
//        this._initScroll()
        this.scroll && this.scroll.stop();
      },
      scrollTo() {
        /*参数(x, y, time, easing)*/
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        /*参数(el, time, offsetX, offsetY, easing)*/
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      },
      _initScroll() {
//        console.log(this.$refs.wrapper, this.options)
        //此处刷新读取保存的scroll位置,暂未实现
        if (this.savePostion) {
        }
        window.scroll = this.scroll = new BScroll(this.$refs.wrapper, this.options);
        //console.log(this.listenScroll);
        if (this.listenScroll) {
          this.scroll.on('refresh', () => {
            //refresh后改变滚动条大小
            console.log('refreshed')
            let winH = document.documentElement.clientHeight;
            let h = parseInt(winH * winH / this.scroll.scrollerHeight)
            //设置scrollBar高度
            if (this.$refs.scrollBar) {
              //设置可滚动高度,scrollBar与scrollContent回到顶部
              this.$refs.scrollBar.style.height = h + 'px';
              this.scroll.scrollerDistance = winH - this.$refs.scrollBar.clientHeight
            }
            //this.$refs.scrollBar.style.top = '0px';  -->移到cateitem中了,只在那里才需要
//            console.log(winH, this.scroll.scrollerHeight, h,this.scroll.scrollerDistance)
          })
          this.scroll.on('scroll', (pos) => {
            //scroll频繁触发，此处可用节流模式优化
//              console.log('scroll')
            //保存scroll位置
            localStorage.setItem("pos", JSON.stringify(pos));
            //同步scrollBar位置
            let y = pos.y || 0, barTop;
            let d = this.scroll.scrollerDistance;
            barTop = d * y / this.scroll.maxScrollY
//              console.log(barTop);
            this.$refs.scrollBar ? this.$refs.scrollBar.style.top = barTop + 'px' : null;
          })
          //自定义scroll处理函数
          if (this.scrollHandle) {
            this.scroll.on('scroll', this.scrollHandle);
          }
          //滚动条显示隐藏
          this.scroll.on('scrollStart', (pos) => {
            //directionLocked：h水平 v竖直 n斜向
            //console.log('start',this.scroll.directionLocked);
            if (this.scroll.directionLocked == 'h') return;
            removeClass(this.$refs.scrollBar, 'hide');
            addClass(this.$refs.scrollBar, 'show');
          })
          this.scroll.on('scrollEnd', (pos) => {
            //console.log('end',this.scroll.directionLocked);
            if (this.scroll.directionLocked == 'h') return;
            removeClass(this.$refs.scrollBar, 'show');
            addClass(this.$refs.scrollBar, 'hide');
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 100%;
    border: 1px solid #ededed;
    .iconfont {
      font-size: .4rem;
      color: #aaa;
      font-weight: bold;
    }
  }

  .scrollBar {
    position: fixed;
    right: 0;
    top: 0px;
    height: 0;
    width: .05rem;
    padding: .15rem .05rem .15rem 0;
    border-radius: .02rem;
    z-index: 10;
    background-color: transparent;
    opacity: 0;
    .scrollBg {
      background-color: #ccc;
      height: 100%;
    }
  }

  .hide {
    animation: animate 1s
  }

  .show {
    opacity: 1;
  }

  @keyframes animate {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
