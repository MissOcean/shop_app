<template>
  <div class="pageContent">
    <scroll ref="scroll" :data="allComments" class="wrapper"
            v-show="allComments.length"
            :listenScroll="true"
            :savePostion="true"
            :hasBackToTop="true"
            :hasScrollBar="true"
            :scrollHandle="scrollHandle"
            :options="{click:true,bounce:false,probeType:3,swipeTime:2500}"
    >
      <div class="scrollContent" id="test">
        <div class="goodRate">
          <span class="text">评分</span>
          <star class="stars" :star="star" fSize=".36rem"></star>
          <span class="rate">{{goodRate}}</span>
        </div>
        <div class="tagPanel">
          <ul class="tags" :style="hideTags?{height: '1.54rem',overflow: 'hidden'}:{}"
              v-show="allComments.length">
            <li class="tag" v-for="tag in tags"
                :style="curTag==tag.name?{color: '#b4282d',borderColor: '#b4282d'}:{}"
                @click="changeComments(tag.name)">
              {{`${tag.name}(${tag.strCount})`}}
            </li>
          </ul>
          <div class="toggleTags" @click="toggleTags">
            <span class="toggleInfo">{{hideTags ? '更多' : '收起'}}</span>
          </div>
        </div>
        <div class="commentPanel">
          <commentItem v-for="(comment,index) in allComments"
                       class="comment" :key="index"
                       :comment="comment">
          </commentItem>
          <div class="commentLoading" v-show="isLoading">正在加载 ...</div>
          <div class="commentOver" v-if="curPage==totalPage">已经到底啦</div>
        </div>
      </div>
    </scroll>
    <loading v-show="!allComments.length" :h="60" :w="60"></loading>
  </div>
</template>
<script>
  import {getProductGoodRate, getCommentTags, getCommentByTag} from 'api/getData.js'
  import Scroll from 'components/base/scroll.vue'
  import Loading from 'components/base/loading.vue'
  import Star from './star.vue'
  import CommentItem from './commentItem.vue'

  export default {
    data() {
      return {
        productGoodRate: '',
        commentTags: '',
        curTag: '全部',
        curPageComments: '',
        allComments: [],
        isLoading: false,
        hideTags: true,
      }
    },
    props: {},
    computed: {
      curPage() {
        return this.curPageComments ? this.curPageComments.data.pagination.page : 0;
      },
      totalPage() {
        return this.curPageComments ? this.curPageComments.data.pagination.totalPage : -1;
      },
      tags() {
        return this.commentTags ? this.commentTags.data : ''
      },
      goodRate() {
        return this.productGoodRate ? this.productGoodRate.data.goodCmtRate : ''
      },
      star() {
        return this.productGoodRate ? this.productGoodRate.data.star : ''
      }
    },
    components: {Scroll, Loading, Star, CommentItem},
    created() {
      getProductGoodRate(this.$route.params.productId)
        .then(data => this.productGoodRate = data);
      getCommentTags(this.$route.params.productId)
        .then(data => this.commentTags = data);
      this.getComments(this.curTag, 1, () => {
        this.allComments = this.allComments.concat(this.curPageComments.data.result)
      });
    },
    watch: {
      //toggle和loading时要refresh
      hideTags(){
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      },
      isLoading(){
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    },
    methods: {
      toggleTags() {
        this.hideTags = !this.hideTags;
      },
      getComments(tagname, page, callback) {
        //传递tagname是为了快速点击时只改变最后一次，但这里还是会发送请求，优化可以使用axios的取消请求方法
        getCommentByTag(tagname, this.$route.params.productId, page)
          .then(data => {
            if (tagname == this.curTag) {
              this.curPageComments = data;
              typeof callback === 'function' && callback()
            }
          });
      },
      changeComments(tagname) {
        this.curTag = tagname;
//        this.allComments = [];
        this.getComments(tagname, 1, () => {
          this.allComments = this.curPageComments.data.result;
        })
      },
      scrollHandle(pos) {
        if (pos) {
          let d = pos.y - this.$refs.scroll.scroll.maxScrollY;
          if (d < 60 && !this.isLoading && this.curPage < this.totalPage) {
            this.$refs.scroll.stop()
            //this.$refs.scroll.scroll.disable()
            this.isLoading = true;
            this.getComments(this.curTag, this.curPage + 1, () => {
              this.allComments = this.allComments.concat(this.curPageComments.data.result)
              //this.$refs.scroll.scroll.enable()
              this.isLoading = false
            })
            //console.log(this.$refs.scroll.scroll.scrollerHeight)
          }
          ;
        }
      }
    }

  }
</script>
<style scoped lang='less' type='text/less'>
  .pageContent {
    overflow: hidden;
    position: absolute;
    width: 100%;
    top: .87rem;
    bottom: 0;
    background-color: #fff;
    .wrapper {
      height: 100%;
      .scrollContent {
        .goodRate {
          display: flex;
          font-size: .26rem;
          align-items: center;
          padding: .2rem .2rem 0;
          .text {
            padding: .1rem;
          }
          .stars {
            transform: translate3d(0, -.03rem, 0);
          }
          .rate {
            color: #7f7f7f;
            padding: .1rem;
          }
        }
        .tagPanel {
          padding: 0 .34rem;
          border-bottom: 1px solid #d9d9d9;
          .tags {
            display: flex;
            flex-wrap: wrap;
            .tag {
              height: .4rem;
              font-size: 12px;
              border: .01rem solid #7f7f7f;
              margin: .25rem .25rem 0 0;
              padding: .05rem .1rem;
              font-size: .24rem;
              color: #333;
              border-radius: .05rem;
            }
          }
          .toggleTags {
            width: 6rem;
            margin: .1rem auto 0;
            height: .7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .toggleInfo {
              font-size: .24rem;
              color: #7f7f7f
            }
          }
        }
        .commentPanel {
          text-align: left;
          padding-left: .3rem;
          .comment {
            border-bottom: 1px solid #d9d9d9;
          }
          .commentLoading, .commentOver {
            font-size: .24rem;
            color: #7f7f7f;
            text-align: center;
            height: .6rem;
            line-height: .6rem;
          }
        }

      }
    }
  }
</style>
