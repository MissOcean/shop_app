<template>
  <div class="recommendList">
    <div class="header">
      <div class="btn">
        <span class="title">{{title}}</span>
        <span class="viewAll">查看全部</span>
      </div>
      <div class="trigon"></div>
    </div>
    <scroll :options="{scrollX:true,scrollY:false,click:true}" :data="itemList">
      <ul class="list" :style="{width:scrollW}">
        <li v-for="item in itemList">
          <div class="picPanel">
            <div v-if="!item.productPlace&&item.colorNum" class="label">{{item.colorNum}}色可选</div>
            <div v-if="item.productPlace" class="label">{{item.productPlace}}</div>
            <img v-lazy="item.listPicUrl" alt="">
          </div>
          <div class="tag"></div>
          <p class="name">{{}}</p>
          <p class="desc">{{}}</p>
          <p class="price">￥ {{}}</p>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
  import Scroll from 'components/base/scroll.vue'

  export default {
    props: {
      title: {},
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
        return '700px'
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
      color: #8BA0B6;
      background-color: #f1f7fd;
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
          background: #D8E5F1;
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
      li {
        margin-left: .28rem;
        background: bisque;
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
      }
    }
  }
</style>
