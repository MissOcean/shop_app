<template>
  <div class="page">
    <div class="topNav">
      <div class="topBar">
        <!--<router-link to="/home" tag="div" class="logo">网易严选</router-link>-->
        <a class="logo" href="http://localhost:8090">网易严选</a>
        <router-link to="/search" tag="div" class="searchBtn">输入商品名搜索</router-link>
      </div>
      <!--scroll横向滚动导航-->
      <scroll :options="{scrollX:true,scrollY:false,click:true}"
              class="wrapper"
              ref="scrollNav"
              :data="itemList"
              v-show="itemList.length"
      >
        <div class="scrollList" :style="{width:scrollListW}">
          <router-link to="/home" tag="div" ref="navHome">推荐</router-link>
          <router-link :to="`/home/${item.id}`" tag="div"
                       v-for="(item,index) in itemList"
                       :id="`nav${index+1}`"
                       class="listItem"
                       :ref="item.id"
                       :key="index"
          >{{item.title}}
          </router-link>
        </div>
      </scroll>
    </div>
    <div class="pageContent">
      <router-view :data="jsonData" v-show="jsonData"></router-view>
      <loading v-show="!jsonData" :h="60" :w="60"></loading>
    </div>
    <b-navbar></b-navbar>
  </div>
</template>
<script>
  import BNavbar from 'components/base/b_navbar.vue'
  import Scroll from 'components/base/scroll.vue'
  import Loading from 'components/base/loading.vue'
  import {getRecommendData} from 'api/getData.js'

  export default {
    data() {
      return {
        jsonData: '',
        itemList: [],
        htmlfontSize: 0
      }
    },
    created() {
      //getData
      window.home = this;
      getRecommendData().then(data => {
        //设置定时器模拟延时600ms
        this._handleData(data)

//        setTimeout(() => {
//        }, 300)
      })
      //window resize改变htmlfontSize
      let that = this;
      this.htmlfontSize = window.config.htmlfontSize;
      window.addEventListener('resize', function () {
        that.htmlfontSize = window.config.htmlfontSize
      })
    },
    watch: {
      $route: {
        handler(route) {
//          window.scrollNav = this.$refs.scrollNav;
          if (route.fullPath === '/home' || route.fullPath === '/home/recommend') {
            this.$refs.scrollNav.scrollToElement(this.$refs.navhome, 200, true)
            //路由再次切到主页的时候，之前是不会重新获取数据的，所以不会触发refresh
            //事件，所以滚动条不会有高度，所以这里监听切到主页的时候重新再获取数据
            //非常low，暂时想不到更好的办法了
            this.jsonData = ''
            getRecommendData().then(data => {
              //设置定时器模拟延时600ms
              setTimeout(() => {
                this._handleData(data)
              }, 600)
            })
          } else {
            let ele = this.$refs[this.$route.params.cateItem][0].$el;
            this.$refs.scrollNav.scrollToElement(ele, 200, true)
          }
        },
        deep: true
      }
    },
    computed: {
      scrollListW() {
        //使用rem无效，动态计算成px
        let remSize = (this.itemList.length) * 1.38 + .9;
        //这里由于样式中itemlist的宽度写死了可直接乘,后期最好改为自适应
//        console.log(remSize)
        return `${remSize * this.htmlfontSize}px`
      },
    },
    components: {
      Scroll,
      Loading,
      BNavbar
    },

    methods: {
      _updatehtmlfontSize() {
      },
      _handleData(jsonData) {
        this.jsonData = jsonData.data;
        let itemList = jsonData.data.cateList;
        let lists = []
        itemList.forEach((item, index) => {
          lists.push({
            id: item.id,
            title: item.name
          })
        })
        this.itemList = lists;
//        window.scroller = this.$refs.scroll
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .page {
    position: relative;
    height: 100%;
    font-size: .25rem;
    color: #333;
    text-align: center;
    .topNav {
      height: 1.52rem;
      .topBar {
        padding: .16rem .3rem;
        display: flex;
        align-items: center;
        height: .9rem;
        box-sizing: border-box;
        .logo {
          font-size: .4rem;
          font-family: cursive;
          margin-right: .3rem;
        }
        .searchBtn {
          flex-grow: 1;
          background-color: #ededed;
          color: #666;
          line-height: .48rem;
          border-radius: .1rem;
        }
      }
      .scrollList {
        padding: 0 .3rem;
        height: .6rem;
        div {
          height: .6rem;
          padding: 0 .16rem;
          line-height: .6rem;
          width: .9rem;
          box-sizing: border-box;
          float: left;
        }
        div.router-link-exact-active {
          color: #b4282d;
          border-bottom: 2px solid;
        }
        .listItem {
          margin: 0 .24rem;
        }
      }
      .wrapper {
        /*height: .6rem;*/
        border-bottom: 1px solid #d9d9d9;
      }
    }
    .pageContent {
      overflow: hidden;
      position: absolute;
      width: 100%;
      top: 1.52rem;
      bottom: 1rem;
    }
  }

</style>

