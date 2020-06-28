<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  
  <tab-control
      :titles="['新款','流行','精选']" @tabClick="tabClick" 
      ref="tabcontrol2" class="tab-control" v-show="isFixed"></tab-control>
    
    <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll"
    :pull-up-load="true" @pullingUp="loadMore">
      
      <home-swiper 
      :banner="banner" @imgLoads="imgLoads"></home-swiper>
      
      <recommend-view :recommend="recommend"></recommend-view>
      
      <feature-view></feature-view>
      
      <tab-control
      :titles="['新款','流行','精选']" @tabClick="tabClick" 
      ref="tabcontrol1"></tab-control>
      
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    
    <back-top @click.native="backtop" v-show="isShow"></back-top>
  </div>
</template>

<script>

// 头层组件汇总

// 导入轮播图组件
import HomeSwiper from './childComps/HomeSwiper'

// 导入圆形展示栏组件
import RecommendView from './childComps/RecommendView'

// 导入图片组件
import FeatureView from './childComps/FeatureView'

// 导入滑动组件
import Scroll from 'components/common/scroll/Scroll'

// 导入商品组件
import GoodsList from 'components/content/goodslist/GoodsList'

// 导入回顶部按钮组件
import BackTop from 'components/content/backtop/BackTop'

// 子组件汇总

// 导入导航栏的初始化组件
import NavBar from 'components/common/navbar/NavBar'
// 导入tab组件
import TabControl from 'components/content/tabControl/TabControl'
// 导入混入组件 
import {itemMixes, backTopMixin} from 'common/mixins'

// import {debounce} from "common/utils"



// 方法组件汇总


// 导入主页请求数据的函数
import { getHomeMultiData, getHomeGoodsData } from "network/home.js";
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        taboffsetTop: 0,
        isFixed: false,
        saveY: 0
      }
    },
    mixins: [itemMixes, backTopMixin],
    created() {
      // 1.请求多个数据
      this.getHomeMulti();
      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      // console.log(this.goods);
      
    },
    mounted() {
      // 接收goodslistitem传过来的图片加载事件
      // const refresh = this.debounce(this.$refs.scroll.refresh, 100)
      // this.$bus.$on('itemImgLoad', () => {
      //   // this.$refs.scroll.refresh()
      //   refresh();
      //   console.log('--');
        
      // })
    },
    activated() {

      this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
      
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getHomeY();

      this.$bus.$off('itemImgLoad', this.itemFresh)
      
    },
    methods: {
      /*
      **事件监听的函数
      */
     tabClick(index) {
       switch(index) {
         case 0:
           this.currentType = 'pop'
           break;
          case 1:
          this.currentType = 'new'
          break;
          case 2:
            this.currentType = 'sell'
            break;
       }
       this.$refs.tabcontrol1.currentIndex = index;
       this.$refs.tabcontrol2.currentIndex = index;
      //  console.log(this.$refs);
       

     },
  
    //  下拉显示与隐藏backtop、实现tabcontrol栏的吸顶效果
     contentScroll(position) {
      //  1.监听显示与隐藏backtop 混入方式
       this.showBackTop(position)

      //  2.监听tabcontrol栏吸顶效果
       this.isFixed = (- position.y) > this.taboffsetTop

    
     },
     loadMore() {
       this.getHomeGoods(this.currentType)
     },
     imgLoads() {
        this.taboffsetTop = this.$refs.tabcontrol1.$el.offsetTop
      },     

      /*
      **请求数据的函数
      */

      getHomeMulti() {
      // 通过axios拿到主页的数据
        getHomeMultiData().then(res => {
          // console.log(res); 
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoodsData(type, page).then(res => {
          // console.log(res.data.list);
          // 接口失效了！！！
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px;  */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    /* height: calc(100% - 45px); */
    /* margin-top: 44px; */


    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
</style>


