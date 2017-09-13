<template>
  <router-link class="item" tag="div"
               :to="`/detail/${itemInfo.id}`">
    <div class="picPanel">
      <div v-if="!proPlace&&colorNum" class="label">{{colorNum}}色可选</div>
      <div v-if="proPlace" class="label">{{proPlace}}</div>
      <img :src="itemInfo.listPicUrl">
    </div>
    <p class="desc">{{desc}}</p>
    <p class="name">{{itemInfo.name}}</p>
    <p class="price">￥ {{itemInfo.retailPrice}}</p>
    <div></div>
  </router-link>
</template>
<script>
  export default {
    props: {
      itemInfo: {
        type: [Array, Object],
        default() {
          return {}
        }
      }
    },
    mounted() {
      console.log(this.colorNum, this.itemInfo.productPlace)
    },
    computed: {
      desc() {
        return this.itemInfo.simpleDesc
      },
      colorNum() {
        return this.itemInfo.colorNum
      },
      proPlace() {
        return this.itemInfo.productPlace
      }
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  .item {
    display: inline-block;
    width: 3.45rem;
    margin: 0 0 .2rem .2rem;
    box-sizing: border-box;
    text-align: left;
    .picPanel {
      background: #f4f4f4;
      position: relative;
      border-radius: .03rem;
      .label {
        text-align: center;
        color: #b4a078;
        position: absolute;
        left: .15rem;
        top: .15rem;
        width: .3rem;
        padding: .12rem 0;
        border: .5px solid #b4a078;
        border-radius: .05rem;
        font-size: .17rem;
        line-height: 1.1;
        font-family: PingFangSC-Light, helvetica, 'Heiti SC';
      }
      img {
        height: 3.45rem;
        width: 3.45rem;
        display: block;
        //底部有留白，设置为block
      }

    }
    .desc {
      height: .7rem;
      padding: .2rem;
      box-sizing: border-box;
      color: #b4a078;
      background: #F1ECE2;
      font-size: .24rem;
    }
    .name {
      padding: .2rem;
    }
    .price {
      padding: 0 .2rem;
      color: #b4282d;
      font-size: .28rem;
    }
  }
</style>
