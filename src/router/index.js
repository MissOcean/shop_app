import Vue from 'vue'
import Router from 'vue-router'
//home
import Home from 'components/home/home.vue'
import Recommend from 'components/home/recommend.vue'
import CateItem from 'components/home/cateItem.vue'

import Topic from 'components/topic/topic.vue'
import Category from 'components/category/category.vue'
import Cart from 'components/cart/cart.vue'
import User from 'components/user/user.vue'
import Search from 'components/search/search.vue'

import Detail from 'components/detail/detail.vue'
import Product from 'components/detail/product.vue'
import Comment from 'components/detail/comment.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Recommend
        },
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: ':cateItem',
          component: CateItem
        }
      ]
    },
    {
      path: '/topic',
      component: Topic
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/user',
      component: User,
      children: [
        {
          path: '',
          component: Recommend
        },
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: ':cateItem',
          component: CateItem
        }
      ]
    },
    {
      path: '/detail/:productId',
      component: Detail,
      children: [
        {
          path: '',
          component: Product
        },
        {
          path: 'product',
          component: Product
        },
        {
          path: 'comment',
          component: Comment
        }
      ]
    },
    {
      path:'/search',
      component: Search
    },
    {
      path: '*',
      redirect: '/home'
    },
  ],
})
