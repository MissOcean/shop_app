<template>
  <li class="commentItem">
    <div class="userInfo">
      <div class="userAvatar" v-if="!comment.frontUserAvatar">
        <i class="iconfont icon-people"></i>
      </div>
      <img class="userAvatar" :src="comment.frontUserAvatar" alt="" v-if="comment.frontUserAvatar">
      <div class="userName">{{comment.frontUserName}}</div>
      <span class="memberLevel">V{{comment.memberLevel}}</span>
      <star :star="comment.star"></star>
    </div>
    <div class="extraInfo">
      <span class="createAt">{{time}}</span>
      <span v-for="info in comment.skuInfo" class="skuInfo">{{info}}</span>
    </div>
    <div class="content">{{comment.content}}</div>
    <div class="commentPic">
      <ul class="picPanel">
        <li class="pic" v-for="picSrc in comment.picList">
          <img :src="picSrc" alt="">
        </li>
      </ul>
    </div>
  </li>
</template>
<script>
  import {fomateDate} from 'api/utils.js'
  import Star from './star.vue'


  export default {
    props: {
      comment: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      time() {
        return fomateDate(this.comment.createTime)
      }
    },
    components: {Star}
  }
</script>
<style scoped lang='less' type='text/less'>
  .commentItem {
    margin-right: .3rem;
    padding-bottom: .3rem;
    .userInfo {
      height: .6rem;
      padding: .3rem 0 .2rem;
      display: flex;
      .userAvatar {
        height: .6rem;
        width: .6rem;
        border-radius: 50%;
        background-color: #ededed;
        line-height: .6rem;
        text-align: center;
        i{
          font-size: .32rem;
        }
      }
      .memberLevel{
        line-height:.6rem;
        font-style: italic;
        margin-right: .1rem;
      }
      .userName{
        line-height: .6rem;
        margin: 0 .15rem;
      }
    }
    .extraInfo {
      span {
        color: #7f7f7f;
      }
      .skuInfo {
        margin-left: .16rem;
      }
    }
    .content {
      font-size: .28rem;
      text-align: left;
      line-height: .36rem;
      margin: .15rem 0 .25rem 0;
    }
    .commentPic {
      .picPanel {
        display: flex;
        .pic {
          border: 1px solid #d9d9d9;
          margin-right: .29rem;
          border-radius: .05rem;
          display: inline-block;
          overflow: hidden;
          img {
            width: 1.4rem;
            height: 1.4rem;
            display: block;
          }
        }
      }
    }
  }
</style>
