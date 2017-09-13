<template>
  <div class="page">
    <div class="topNav">
      <div class="topBar">
        <router-link to="/home" tag="div" class="logo">网易严选</router-link>
        <router-link to="/search" tag="div" class="searchBtn">输入商品名搜索</router-link>
      </div>
      <!--scroll横向滚动导航-->
      <scroll :options="{scrollX:true,scrollY:false,click:true}"
              class="wrapper"
              ref="scroll"
              :data="itemList"
              v-show="itemList.length"
      >
        <div class="scrollList" :style="{width:scrollListW}">
          <router-link to="/home" tag="div">推荐</router-link>
          <router-link :to="`/home/${item.id}`" tag="div"
                       v-for="(item,index) in itemList"
                       class="listItem"
                       ref="item"
                       :key="index"
          >{{item.title}}
          </router-link>
        </div>
      </scroll>

    </div>
    <div class="pageContent">
      <router-view :data="jsonData"></router-view>
      <loading v-show="!itemList.length" :h="60" :w="60"></loading>
    </div>
  </div>
</template>
<script>
  import Scroll from 'components/base/scroll.vue'
  import Loading from 'components/base/loading.vue'
  import {getRecommendData} from 'api/getData.js'


  export default {
    data() {
      return {
        jsonData: {},
        itemList: [],
        htmlfontSize: 0
      }
    },
    created() {
      //getData
      getRecommendData().then(data => this._handleData(data))
      //window resize改变htmlfontSize
      let that = this;
      this.htmlfontSize = window.config.htmlfontSize;
      window.addEventListener('resize', function () {
        that.htmlfontSize = window.config.htmlfontSize
      })
    },
    computed: {
      scrollListW() {
        //使用rem无效，动态计算成px
        let remSize = (this.itemList.length) * 1.38 + .9;
        //这里由于样式中itemlist的宽度写死了,最好改为自适应
//        console.log(remSize)
        return `${remSize * this.htmlfontSize}px`
      },
      focusList() {
        return this.jsonData ? this.jsonData.focusList : ''
      }
    },
    components: {
      Scroll,
      Loading,
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
//        this.itemList = lists;

        //模拟数据延迟一秒显示加载中组件
        setTimeout(() => {
          this.itemList = lists;
        }, 600)
        window.scroller = this.$refs.scroll
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
      .wrapper:after {
        content: '';
        width: 100%;
        height: 1px;
        left: 0;
        position: absolute;
        background-color: #d9d9d9;
      }
    }
    .pageContent {
      overflow: hidden;
      position: absolute;
      margin: 1.5rem 0 1rem;
      /*用绝对布局加padding会遮盖住其他元素*/
      top: 0;
      bottom: 0;
      width: 100%;
      /*此处也可用fixed*/
    }
  }

</style>

