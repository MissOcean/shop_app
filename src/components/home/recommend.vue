<template>
  <scroll ref="scroll" :data="data" class="wrapper"
          :listenScroll="true"
          :savePostion="true"
          :options="{click:true,bounce:false,probeType:3}">
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
      <!--好物推荐-->
      <recommendList :itemList="data.newItemList"
                     :headerInfos="{title:'周一周四 · 新品首发',
                     color:'#8BA0B6',bgColor:'#f1f7fd',btnBg:'#D8E5F1'}">
      </recommendList>
      <recommendList :itemList="data.popularItemList"
                     :headerInfos="{title:'人气推荐 · 好物精选'
                     ,color:'#B4A078',bgColor:'#fef7e3',btnBg:'#f4e9cb'}">
      </recommendList>
      <!--cate精选-->
      <div class="cateList">
        <div class="subList" v-for="subList in cateList">
          <p class="subListTitle">{{subList.name}}好物</p>
          <item v-for="itemInfo in subList.itemList" :itemInfo="itemInfo"></item>
          <div class="cover">
            <div class="more">
              <span>更多{{subList.name}}好物</span>
              <i class="iconfont icon-pullright"></i>
            </div>
          </div>
        </div>
      </div>
      <!--版权-->
      <div class="footer">
        <div class="appAndPc">
          <div>下载APP</div>
          <div>电脑版</div>
        </div>
        <div class="copyright">
          <span>网易公司版权所有 © 1997-2017</span>
          <span>食品经营许可证：JY13301080111719</span>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
  import Swiper from '../base/swiper.vue'
  import Scroll from 'components/base/scroll.vue'
  import RecommendList from './recommendList.vue'
  import Item from './item.vue'

  export default {
    props: {
      data: {
        type: [Object, String],
        default: ''
      }
    },
    components: {Swiper, Scroll, RecommendList, Item},
    computed: {
      focusList() {
        return this.data ? this.data.focusList : ''
      },
      tagList() {
        return this.data ? this.data.tagList.slice(0, 4) : ''
      },
      cateList() {
        return this.data ? this.data.cateList : ''
      }
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  .wrapper {
    height: 100%;
    position: relative;
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
                border: .5px solid #b4a078;
                position: absolute;
                color: #b4a078;
                font-size: .17rem;
                border-radius: .05rem;
                padding: .02rem .1rem;
                line-height: 1.1;
                transform: scale3d(0.8, 0.9, 0.8);
              }
            }
            img {
              height: 100%;
              width: 100%;
            }
          }
        }

      }
      .cateList {
        .subList {
          position: relative;
          text-align: left;
          background-color: #fff;
          margin-bottom: .17rem;
          .subListTitle {
            font-size: .27rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
          }
          .cover {
            position: absolute;
            width: 3.45rem;
            right: 0.2rem;
            bottom: .01rem;
            margin: 0 0 .2rem .2rem;
            height: 5.25rem;
            background-color: #fff;
            .more {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 4.15rem;
              width: 3.45rem;
              background-color: #f4f4f4;
              justify-content: center;
              span {
                font-size: .32rem;
                margin-bottom: .8rem;
              }
              i {
                font-size: .7rem;
                color: #999;
                font-weight: 100;
              }
            }

          }
        }
      }
      .footer {
        height: 2.5rem;
        background: #414141;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .24rem;
        .appAndPc {
          display: flex;
          height: .6rem;
          line-height: .6rem;

          color: #fff;
          margin: .4rem 0;
          div {
            border-radius: .05rem;
            width: 1.7rem;
            border: 1px solid #999;
            margin: 0 .25rem;
          }
        }
        .copyright {
          color: #999;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

</style>
