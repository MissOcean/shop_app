<template>
  <scroll ref="scroll" :data="data" class="wrapper"
          :options="{click:true,bounce:false}">
    <div class="scrollContent">
      <!--焦点图-->
      <div class="focusList">
        <swiper :items="data.focusList"></swiper>
        <ul class="log">
          <li><i class="iconfont icon-roundcheck"></i><span>网易自营品牌</span></li>
          <li><i class="iconfont icon-roundcheck"></i><span>30天无忧退换</span></li>
          <li><i class="iconfont icon-roundcheck"></i><span>48小时快速退款</span></li>
        </ul>
      </div>
      <!--品牌制造商-->
      <div class="manufactureList">
        <div class="header">
          <span>品牌制造商直供</span><i class="iconfont icon-roundright"></i>
        </div>
        <ul class="list">
          <li class="manufactureItem" v-for="item in tagList">
            <div class="label">
              <p>{{item.name}}</p>
              <p>{{item.floorPrice}}起</p>
              <p v-if="item.newOnShelf" class="newOnShelf">上新</p>
            </div>
            <img :src="item.picUrl" alt="">
          </li>
        </ul>
      </div>
      <recommendList :itemList="data.newItemList" title="周一周四 · 新品首发"></recommendList>
      <div class="end"></div>
    </div>
  </scroll>
</template>
<script>
  import Swiper from '../base/swiper.vue'
  import Scroll from 'components/base/scroll.vue'
  import RecommendList from './recommendList.vue'

  export default {
    props: {
      data: {
        type: [Object, String],
        default: ''
      }
    },
    components: {Swiper, Scroll, RecommendList},
    computed: {
      focusList() {
        return this.data ? this.data.focusList : ''
      },
      tagList() {
        return this.data ? this.data.tagList.slice(0, 4) : ''
      }
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  .wrapper {
    height: 100%;
    .scrollContent {
      display: flex;
      flex-direction: column;
      .focusList {
        margin-bottom: .17rem;
        .log {
          width: 100%;
          background: #fff;
          display: flex;
          li {
            height: .70rem;
            line-height: .70rem;
            flex-grow: 1;
            font-size: .21rem;
            display: flex;
            justify-content: center;
            i {
              color: #b4282d;
              margin-right: .1rem;
            }
          }
        }
      }
      .manufactureList {
        background: #ffffff;
        margin-bottom: .17rem;
        .header {
          height: 1.1rem;
          display: flex;
          /*align-items: center;*/
          justify-content: center;
          line-height: 1.1rem;
          span {
            font-size: .32rem;
            color: #333;
          }
          i {
            margin-left: .1rem;
            font-size: .38rem;
          }
        }
        .list {
          margin: 0 .20rem 0 .10rem;
          display: flex;
          flex-wrap: wrap;
          .manufactureItem {
            position: relative;
            background-color: #f4f4f4;
            height: 50px;
            width: 3.5rem;
            margin: 0 0 .1rem .1rem;
            height: 2.3rem;
            .label {
              position: absolute;
              left: .16rem;
              top: .16rem;
              text-align: left;
              p {
                margin-bottom: .08rem;
              }
              .newOnShelf {
              }
            }
            img {
              height: 100%;
              width: 100%;
            }
          }
        }

      }
    }
  }

  .end {
    height: 50px;
    background: #000;
  }
</style>
