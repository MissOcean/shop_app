<template>
  <div class="page">
    <div class="header">
      <router-link to="/search" tag="div" class="searchBtn">输入商品名搜索</router-link>
    </div>
    <div class="pageContent">
      <div class="sideBar">
        <scroll ref="scroll" :data="jsonData" class="wrapper">
          <!-- :listenScroll="true"
           :savePostion="true"
           :hasBackToTop="true"
           :hasScrollBar="true"
           :options="{click:true,bounce:false,probeType:3}">-->
          <div class="categoryList">
            <router-link class="categoryItem" v-for="(item,idx) in categoryList"
                         :key="idx" :to="`/category/${item.id}`"
            >{{item.name}}
            </router-link>
          </div>
        </scroll>
      </div>
      <div class="content">
        <!--<pageSwiper></pageSwiper>-->
        <!--<div class="subCateList"></div>-->
        <router-view></router-view>
      </div>
    </div>
    <loading v-show="!jsonData" bgColor="#fff"></loading>
    <bNavbar></bNavbar>
  </div>
</template>
<script>
  import BNavbar from 'components/base/b_navbar.vue'
  import Scroll from 'components/base/scroll.vue'
  import Loading from 'components/base/loading.vue'
  import {getCateList} from 'api/getData.js'

  export default {
    data() {
      return {
        jsonData: '',
      }
    },
    components: {BNavbar, Scroll, Loading},
    created() {
      //console.log(this.$router);
      getCateList().then(res => {
//        console.log(res)
        this.jsonData = res.data
      });
    },
    methods: {},
    computed: {
      categoryList() {
        return this.jsonData ? this.jsonData.categoryL1List : ''
      },
      currentCategoryId() {
        return this.jsonData ? this.jsonData.currentCategory.id : ''
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .page {
    position: relative;
    height: 100%;
    text-align: center;
    .header {
      height: .88rem;
      background-color: #fff;
      border-bottom: .01rem solid #d9d9d9;
      display: flex;
      align-items: center;
      padding: 0 .4rem;
      .searchBtn {
        text-align: center;
        flex-grow: 1;
        background-color: #ededed;
        color: #666;
        line-height: .56rem;
        height: .56rem;
        border-radius: .1rem;
      }
    }
    .pageContent {
      position: absolute;
      top: .89rem;
      bottom: 1rem;
      width: 100%;
      display: flex;
      background-color: #fff;
      color: #333;
      .sideBar {
        width: 1.5rem;
        overflow: hidden;
        border-right: .01rem solid #d9d9d9;
        flex-shrink: 0;
        .wrapper {
          height: 100%;
          .categoryList {
            display: flex;
            flex-direction: column;
            .categoryItem {
              font-size: .25rem;
              height: .5rem;
              line-height: .5rem;
              margin-top: .4rem;
            }
            .categoryItem.router-link-active {
              color: #ab2b2b;
              font-size: .32rem;
              border-left: .05rem solid;
            }
          }

        }
      }
      .content {
        flex-grow: 1;
        overflow: hidden;
      }
    }
  }

</style>
