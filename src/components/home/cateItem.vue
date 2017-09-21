<template>
  <scroll ref="scroll" :data="jsonData" class="wrapper"
          :listenScroll="true"
          :savePostion="true"
          :options="{click:true,bounce:false,probeType:3}"
  >
    <div class="scrollContent" v-show="jsonData">
      <!--for bottom white space-->
      <div style="padding-bottom: .25rem">
        <div class="banner">
          <img :src="bannerUrl" alt="">
        </div>
        <subcategory v-for="(categoryItem,index) in categoryItemList"
                     :subcategoryitems="categoryItem"
                     :key="index"
        ></subcategory>
      </div>
    </div>
    <loading v-show="!jsonData" :h="60" :w="60"></loading>
  </scroll>
</template>
<script>
  import Scroll from 'components/base/scroll.vue'
  import Loading from 'components/base/loading.vue'
  import Subcategory from './subcategory.vue'
  import {getCateItem} from 'api/getData.js'

  export default {
    data() {
      return {
        jsonData: '',
        categoryid: null
      }
    },
    computed: {
      bannerUrl() {
        return this.jsonData ? this.jsonData.currentCategory.bannerUrl : ''
      },
      categoryItemList() {
        return this.jsonData ? this.jsonData.categoryItemList : ''
      }
    },
    created() {
//      console.log('created')
      this._getData(this.$route.params.cateItem);
    },
    watch: {
      //监听路由变化，重新获取数据
      //但是获取数据是异步的，快速点击时问题如何解决？
      $route: {
        handler(val) {
          this.jsonData = '';
//        console.log(this.$route)
//        console.log(this.$router)
          this._getData(this.$route.params.cateItem);
        },
        deep: true
      }
    },
    methods: {
      _getData(id) {
        //这里传递id进来是为了保存起来在_handledata时做判断
        getCateItem(id)
          .then(data => this._handledata(data, id))
      },
      _handledata(jsonData, id) {
        console.log('handle', id === this.$route.params.cateItem)
        if (this.$route.params.cateItem === id) {
          this.jsonData = jsonData.data
          console.log(jsonData.data)
//        window.scroller = this.$refs.scroll
        }
      }
    },
    components: {
      Scroll,
      Loading,
      Subcategory
    }
  }
</script>
<style scoped lang='less' type='text/less'>
  .wrapper {
    //注意设置scroll的wrapper高度或宽度固定
    height: 100%;
    .scrollContent {
      width: 100%;
      .banner {
        height: 4.2rem;
        margin-bottom: .2rem;
        img {
          height: 100%;
        }

      }
    }

  }
</style>
