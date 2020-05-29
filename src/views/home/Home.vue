<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
  </div>
</template>

<script>
// 导入导航栏的初始化组件
import NavBar from 'components/common/navbar/NavBar'

// 导入轮播图组件
import HomeSwiper from './childComps/HomeSwiper'

// 导入圆形展示栏组件
import RecommendView from './childComps/RecommendView'

// 导入主页请求数据的函数
import {getHomeMultiData} from "network/home.js";
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banner: [],
        recommend: []
      }
    },
    created() {
      // 通过axios拿到主页的数据
      getHomeMultiData().then(res => {
        // console.log(res); 
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
