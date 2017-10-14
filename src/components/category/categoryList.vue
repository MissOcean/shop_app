<template>
  <scroll class="content" ref="scroll" :data="categoryL2List">
    <div v-show="subCategory" class="scrollContent">
      <div class="banner">
        <img :src="subCategory.wapBannerUrl" alt="">
      </div>
      <mTitle :title="subCategory.name+'分类'"
              lineWidth="2.2rem"
              :customContentStyle="{fontSize:'.22rem',width:'1.5rem'}"
              :customBoxStyle="{padding:'.5rem 0'}"
      ></mTitle>
      <ul class="subCategoryList">
        <router-link v-for="(item,idx) in categoryL2List"
                     tag='li' :key="idx" class="subItem"
                     :to="`/category/${route}/${item.id}`">
          <div class="wrapper">
            <img :src="item.wapBannerUrl" alt="">
          </div>
          <span class="name">{{item.name}}</span>
        </router-link>
      </ul>
    </div>
    <!--<loading v-show="!subCategory" bgColor="#fff"></loading>-->
  </scroll>
</template>
<script>
  import {getCateList} from 'api/getData.js'
  import MTitle from '../detail/mtitle.vue'
  import Loading from 'components/base/loading.vue'
  import Scroll from 'components/base/scroll.vue'



  export default {
    data() {
      return {
        subCategory: '',
        categoryL2List: []
      }
    },
    props: {},
    components: {MTitle, Loading,Scroll},
    created() {
      this.getData()
    },
    computed: {
      route(){
        return this.$route.params.categoryId
      }
    },
    methods: {
      getData(id) {
        getCateList(id || this.route).then(res => {
          //console.log(this.$route.params.categoryId,id)
          if (!id || this.route == id) {
            //console.log(res.data)
            this.subCategory = res.data.currentCategory;
            this.categoryL2List = res.data.categoryL2List;
          }
        })
      }
    },
    watch: {
      //监听路由变化，重新获取数据
      $route: {
        handler(val) {
          this.subCategory = ''
          //console.log('new route',val.params.categoryId)
          this.getData(val.params.categoryId);
        },
        deep: true
      }
    },
  }
</script>
<style scoped lang='less' type='text/less'>
  .content {
    height: 100%;
    box-sizing: border-box;
    .scrollContent{
      min-height: 12rem;
    }
    .banner {
      border-radius: 3px;
      overflow: hidden;
      padding: .3rem .3rem 0 .3rem;
      height: 2rem;
    }
    .subCategoryList {
      margin: 0 .3rem;
      display: flex;
      flex-wrap: wrap;
      .subItem{
        width: 33.3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .wrapper{
          width: 1.5rem;
          height:1.5rem;;
        }
        .name{
          height: .6rem;
        }
      }
    }
  }
</style>
