<template>
  <div class="itemFloor">
    <div class="header">
      <p>{{name}}</p>
      <p>{{des}}</p>
    </div>
    <item v-for="(itemInfo,index) in list"
          :itemInfo="itemInfo"
          :key="index"
    ></item>
  </div>
</template>
<script>
  import Item from './item.vue'

  export default {
    props: {
      subcategoryitems: {
        type: [Array, Object],
        default() {
          return {}
        }
      }
    },
    computed: {
      name() {
        return this.subcategoryitems.category.name
      },
      list() {
        return this.subcategoryitems.itemList
      },
      des() {
        return this.subcategoryitems.category.frontName
      }
    },
    components: {
      Item
    }

  }
</script>
<style scoped lang='less' type='text/less'>
  .itemFloor {
    display: flex;
    flex-wrap: wrap;
    width: 7.5rem;
    margin: auto;
    background: #fff;
    .header {
      width: 100%;
      height: 1.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p:nth-child(1) {
        font-size: .32rem;
        margin-bottom: .1rem;
      }
      p:nth-child(2) {
        font-size: .24rem;
        color: #999;
      }
    }

  }
</style>
