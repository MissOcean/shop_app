<template>
  <div class="recommendList">
    <div class="header"
         :style="{color:headerInfos.color,backgroundColor:headerInfos.bgColor}">
      <div class="btn">
        <span class="title">{{headerInfos.title}}</span>
        <span class="viewAll" :style="{backgroundColor:headerInfos.btnBg}">查看全部</span>
      </div>
      <div class="trigon"></div>
    </div>
    <scroll :options="{scrollX:true,scrollY:false,click:true}" :data="itemList">
      <ul class="list" :style="{width:scrollW}">
        <li v-for="item in itemList" class="item">
          <div class="picPanel">
            <div v-if="!item.productPlace&&item.colorNum" class="label">{{item.colorNum}}色可选</div>
            <div v-if="item.productPlace" class="label">{{item.productPlace}}</div>
            <img v-lazy="item.listPicUrl" alt="">
          </div>
          <div class="tag"></div>
          <p class="name">{{item.name}}</p>
          <p class="desc">{{item.simpleDesc}}</p>
          <p class="price">￥ {{item.retailPrice}}</p>
        </li>
        <li class="showAll">查看全部</li>
      </ul>
    </scroll>
  </div>
</template>
<script>
  import Scroll from 'components/base/scroll.vue'

  export default {
    props: {
      headerInfos: {
        type: [Object, String],
        default() {
          return {}
        }
      },
      itemList: {
        type: [Array, String],
        default() {
          return []
        }
      }
    },
    created() {
      console.log(this.itemList)
    },
    computed: {
      scrollW() {
        //使用rem无效，动态计算成px
        let remSize = (this.itemList.length + 1) * 3.08 + .28;
        return `${remSize * window.config.htmlfontSize}px`
      },
    },
    components: {Scroll}
  }
</script>
<style scoped lang='less' type='text/less'>
  .recommendList {
    background: #fff;
    margin-bottom: .17rem;
    .header {
      /*background-color: #f1f7fd;*/
      height: 2.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: .28rem;
      .btn {
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: .34rem;
        }
        .viewAll {
          font-size: .26rem;
          height: .56rem;
          line-height: .56rem;
          margin: 0 .4rem;
          /*background: #D8E5F1;*/
          border-radius: 1px;
        }
      }
      .trigon {
        position: absolute;
        bottom: 0;
        width: 0;
        height: 0;
        border-left: .18rem solid transparent;
        border-right: .18rem solid transparent;
        border-bottom: .18rem solid #fff;
      }
    }
    .list {
      display: flex;
      flex-wrap: nowrap;
      .item {
        width: 2.8rem;
        margin-left: .28rem;
        .picPanel {
          position: relative;
          width: 2.8rem;
          height: 2.8rem;
          background: #f4f4f4;
          .label {
            text-align: center;
            color: #b4a078;
            position: absolute;
            transform: scale(0.8);
            margin: .03rem 0 0 .15rem;
            /*left: .15rem;
            top: .15rem;*/
            width: .3rem;
            padding: .12rem 0;
            border: .5px solid #b4a078;
            border-radius: .05rem;
            font-size: .17rem;
            line-height: 1.1;
            font-family: PingFangSC-Light, helvetica, 'Heiti SC';
          }
        }
        p {
          /*文字超出一行缩略*/
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
          margin: .12rem;
        }
        .name {
          font-size: .25rem;
        }
        .desc {
          font-size: .21rem;
          color: #7f7f7f
        }
        .price {
          color: #b4282d;
        }
      }
      .showAll {
        color: #666;
        font-size: .25rem;
        border: .08rem solid #f4f4f4;
        line-height: 2.8rem;
        width: 2.8rem;
        height: 2.8rem;
        margin-left: .28rem;
        box-sizing: border-box;
      }
    }
  }
</style>
