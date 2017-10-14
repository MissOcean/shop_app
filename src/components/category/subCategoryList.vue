<template>
  <div class="page">
    <tNavbar></tNavbar>
    <div class="nav">
      <scroll :options="{scrollX:true,scrollY:false,click:true}"
              ref="scrollNav"
              :data="jsonData"
              v-show="jsonData"
      >
        <div class="scrollList" :style="{width:scrollWidth}" ref="scrollList">
          <router-link :to="`/category/${categoryId}/${item.id}`" tag="div"
                       v-for="(item,index) in subCategoryList"
                       :id="`nav${index+1}`"
                       class="listItem"
                       :ref="item.id"
                       :key="index"
          >{{item.name}}
          </router-link>
        </div>
      </scroll>
    </div>
    <scroll ref="scroll" :data="jsonData" class="wrapper"
            :listenScroll="true"
            :savePostion="true"
            :hasBackToTop="true"
            :hasScrollBar="true"
            :options="{click:true,bounce:false,probeType:3,swipeTime:2500}"
    >
      <div class="scrollContent">
        <div class="header">
          <p>{{subCategoryInfo.frontName}}</p>
        </div>
        <div class="itemList">
          <item v-for="(item,idx) in itemList" :itemInfo="item" :key="idx"></item>
        </div>
        <mTitle title="更多内容,敬请期待" lineWidth="3.6rem"
                :customContentStyle="{fontSize:'.22rem',width:'2.4rem',color:'#666',backgroundColor:'#f4f4f4'}"
                :customBoxStyle="{padding:'.5rem 0'}"></mTitle>
        <copy-right></copy-right>
      </div>
    </scroll>
    <loading v-show="!jsonData"></loading>
  </div>
</template>
<script>
  import {getCateItem} from 'api/getData.js'
  import TNavbar from 'components/base/t_navbar.vue'
  import Scroll from 'components/base/scroll.vue'
  import Loading from 'components/base/loading.vue'
  import Item from '../home/item.vue'
  import MTitle from '../detail/mtitle.vue'
  import CopyRight from '../base/copyright.vue'

  export default {
    data() {
      return {
        jsonData: ''
      }
    },
    props: {},
    components: {TNavbar, Scroll, Item, MTitle, CopyRight, Loading},
    computed: {
      subCategoryList() {
        return this.jsonData ? this.jsonData.categoryL2List : ''
      },
      categoryId() {
        return this.$route.params.categoryId
      },
      subCategoryId() {
        return this.$route.params.subCategoryId
      },
      subCategoryInfo() {
        return this.jsonData ? this.jsonData.categoryItems.category : ''
      },
      itemList() {
        return this.jsonData ? this.jsonData.categoryItems.itemList : ''
      },
      scrollWidth() {
        if (!this.subCategoryList) return '0px'
        let navs = this.subCategoryList.map(item => item.name.length);
        let w = navs.reduce((sum, length) => {
          return sum + length;
        }, 0)
        w = (.25 * w + .62 * navs.length).toFixed(2)
        console.log(w);
        return w * 50 + 'px'
      },

    },
    methods: {
      getData(id) {
        getCateItem(this.categoryId, this.subCategoryId)
          .then(res => {
            if(!id||id==this.subCategoryId) this.jsonData = res.data
          })
      }
    },
    watch: {
      $route: {
        handler(route) {
          //window.scrollNav = this.$refs.scrollNav;
          let ele = this.$refs[this.$route.params.subCategoryId][0].$el;
          this.$refs.scrollNav.scrollToElement(ele, 200, true);
          this.jsonData = '';
          this.$refs.scroll.stop();
          this.$refs.scroll.scrollTo(0, 0);
          this.$refs.scroll.$refs.scrollBar.style.top = '0px'
          this.getData()
        },
        deep: true
      }
    },
    mounted() {
      /*let navs = this.$refs.scrollList.children;
      console.log(navs.length)
      let w = 0;
      for (let i = 0; i < navs.length; i++) {
        console.log(navs[i].clientWidth);
        w+=navs[i].clientWidth
      }
      console.log(w);*/
    },
    created() {
      //这里用到的是home里的cateItem api
      this.getData()
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  .page {
    height: 100%;
    //position: relative;
    .nav {
      width: 100%;
      background-color: #fff;
      .scrollList {
        padding-right: .3rem;
        height: .6rem;
        div {
          height: .6rem;
          padding: 0 .16rem;
          line-height: .6rem;
          box-sizing: border-box;
          float: left;
        }
        div.router-link-exact-active {
          color: #b4282d;
          border-bottom: 2px solid;
        }
        .listItem {
          margin-left: .3rem;
          font-size: .25rem;
        }
      }
    }
    .wrapper {
      position: absolute;
      top: 1.47rem;
      width: 100%;
      bottom: 0;
      overflow: hidden;
      .scrollContent {
        .header {
          height: 1.1rem;
          margin-top: .2rem;
          line-height: 1.1rem;
          text-align: center;
          background-color: #fff;
          p {
            font-size: .26rem;
          }
        }
        .itemList {
          background-color: #fff;
        }
      }
    }

  }
</style>
