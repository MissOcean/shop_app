<template>
  <div class="pageContent">
    <scroll ref="scroll" :data="jsonData" class="wrapper"
            v-show="loadOver"
            :listenScroll="true"
            :savePostion="true"
            :hasBackToTop="true"
            :hasScrollBar="true"
            :options="{click:true,bounce:false,probeType:3,swipeTime:2500}"
    >
      <div class="scrollContent">
        <div class="swiperWrapper"><img :src="swiperList" alt=""></div>
        <div class="characterList">
          <div class="characterItem" v-for="item in characterList">
            <div class="picPanel"><img :src="item.picUrl" alt=""></div>
            <div class="descPanel">
              <span v-for="desc in item.simpleDescList">{{desc}}</span>
            </div>
          </div>
        </div>
        <div class="baseInfo">商品基本信息</div>
        <div class="puchaseInfo">购买指引</div>
        <div class="comment">
          <router-link :to="commentRoute"
                       tag="div" class="comentHeader">
            <span>用户评价({{jsonData && jsonData.commentCount}})</span>
            <div class="goodRate">
              <span>{{goodCmtRate}}</span>
              <i class="icon-right iconfont"></i>
            </div>
          </router-link>
          <commentItem :comment="comment" v-for="(comment,idx) in commentList" :key="idx"></commentItem>
        </div>
        <div class="productParam">商品参数</div>
        <div class="productDetail">
          <p v-for="picSrc in detailPicList" class="detailPic">
            <img :src="picSrc" @load="loadOverHandle" @error="loadOverHandle" alt="">
          </p>
        </div>
        <div class="recommend">
          <mTitle title="大家都在看"></mTitle>
          <item v-for="(item,idx) in rcmdItems" :key="idx" :itemInfo="item"></item>
        </div>
      </div>
      <cart_nav></cart_nav>
    </scroll>
    <loading v-show="!loadOver" :h="60" :w="60"></loading>
  </div>
</template>
<script>
  import {getProductDetail, getRcmdByProduct, getProductGoodRate} from 'api/getData.js'
  import Scroll from 'components/base/scroll'
  import Loading from 'components/base/loading.vue'
  import CommentItem from './commentItem.vue'
  import MTitle from './mtitle.vue'
  import Cart_nav from './cart_nav.vue'
  import Item from '../home/item.vue'

  export default {
    data() {
      return {
        jsonData: '',
        loadOver: false,
        rcmdData: '',
        proGoodRate: ''
      }
    },
    props: {},
    components: {Scroll, Loading, CommentItem, Item, MTitle, Cart_nav},
    computed: {
      commentRoute() {
        return `${this.$route.fullPath}/comment`
      },
      detailPicList() {
        if (!this.jsonData) return ''
        let detailHtml = this.jsonData.item.itemDetail.detailHtml;
        //detailHtml格式：'src="https://xxx" _src="https://yyy" style=""'
        let reg = /http[^"]*(?="\s_src)/g
        return detailHtml.match(reg)
      },
      commentList() {
        return this.jsonData ? this.jsonData.item.comments:''
      },
      swiperList() {
        return this.jsonData ? this.jsonData.item.listPicUrl:''
      },
      characterList() {
        return this.jsonData ? this.jsonData.item.characteristicList:''
      },
      rcmdItems() {
        return this.rcmdData ? this.rcmdData.data.items:''
      },
      goodCmtRate() {
        return this.proGoodRate ? this.proGoodRate.data?this.proGoodRate.data.goodCmtRate:'':'';
      }
    },
    created() {
      console.log(`${this.$route.fullPath}`);
      let id = this.$route.params.productId
      getProductDetail(id).then(data => this.jsonData = data)
      getRcmdByProduct(id).then(data => this.rcmdData = data)
      getProductGoodRate(id).then(data => this.proGoodRate = data)
    },
    methods: {
      loadOverHandle() {
        //这里由于detail图片高度不能定死，所以在detail图片全部加载完之后refresh scroll
        this.picLoadNum = this.picLoadNum || 0;
        if (++this.picLoadNum >= this.detailPicList.length) {
          this.loadOver = true;
          //设置loadOver后，在nextTick刷新保证DOM已经刷新完
          this.$nextTick(() => {
            this.$refs.scroll.refresh()
          })
        }
      }
    },

  }
</script>
<style scoped lang='less' type='text/less'>
  .pageContent {
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: .87rem;
    bottom: 1.01rem;
    .wrapper {
      height: 100%;
      .scrollContent {
        img {
          display: block;
        }
        .swiperWrapper {
          background-color: #f9f9f9;
          height: 7.5rem;
          width: 7.5rem;
          margin: auto;
        }
        .characterList {
          display: flex;
          height: .8rem;
          padding: .24rem .3rem;
          background-color: #f9f9f9;
          .characterItem {
            display: flex;
            width: 0;
            flex-grow: 1;
            align-items: center;
            .picPanel {
              width: .7rem;
              height: .7rem;
              border-radius: 50%;
              overflow: hidden;
            }
            .descPanel {
              display: flex;
              flex-direction: column;
              font-size: .26rem;
              flex-grow: 1;
              justify-content: space-around;
              height: 100%;
            }
          }
        }
        .baseInfo {
          background-color: #fff;
          height: 2rem;
          padding: .4rem 0 .4rem .3rem;
          margin-bottom: .2rem;
        }
        .puchaseInfo {
          background-color: #fff;
          height: 3.2rem;
          margin-bottom: .2rem;
        }
        .comment {
          padding-left: .3rem;
          background-color: #fff;
          margin-bottom: .2rem;
          .comentHeader {
            border-bottom: 1px solid #d9d9d9;
            margin-right: .3rem;
            height: .9rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .goodRate {
              display: flex;
              align-items: center;
              .icon-right {
                color: #7b7b7b;
              }
            }
          }
        }
        .productParam {
          height: 5rem;
          background-color: #fff;
        }
        .productDetail {
          .detailPic {
            width: 100%;
            /*height: 2rem;*/
          }
        }
        .recommend {
          background-color: #fff;
          text-align: left;
          padding-bottom: .5rem;
        }
      }

    }
  }


</style>
