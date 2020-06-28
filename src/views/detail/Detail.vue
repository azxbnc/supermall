<template>
      <!-- <h2>{{$store.state.product}}</h2> -->
    <div id="detail">
      <detail-item class="detail_nav" @barClick="barClick" ref="nav"></detail-item>
      <scroll class="content" ref="scroll" 
      :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" 
        @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="paraminfo"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="commentinfo"></detail-comment-info>
        <goods-list :goods="recommend" ref="recommend"></goods-list>
      </scroll>
      <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
      <back-top @click.native="backtop" v-show="isShow"></back-top>
      <!-- <toast :is-show="show" :message="message"/> -->
    </div>
    
</template>
<script>

import DetailItem from './childcomps/DetailItem'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo'
import DetailParamInfo from './childcomps/DetailParamInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import GoodsList from 'components/content/goodslist/GoodsList'
import DetailBottomBar from './childcomps/DetailBottomBar'
import {mapActions} from 'vuex'
import {debounce} from 'common/utils'
import {itemMixes, backTopMixin} from 'common/mixins'

// import toast from 'components/common/toast/toast'




import Scroll from 'components/common/scroll/Scroll'

// 导入数据请求组件
import {getDetailData, Goods, Shops, GoodsParam, getRecommend} from 'network/detail'
export default {
  name: "Detail",
  components: {
      DetailItem,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // toast
  },
  mixins: [itemMixes, backTopMixin],
  data () {
    return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        detailTopY: [],
        topyListener: {
          type: Function,
          default: () => {}
        },
        currentIndex: 0,
        // message: null,
        // show: null
    }
  },
  methods: {
    ...mapActions({
      add: 'addCart'
    }),
    detailImageLoad() {      
      this.newRefresh();
    //  console.log(this.$refs.goodsinfo.$el.offsetTop);
     
  // 给顶部按钮做
      this.topyListener()
    },
  
  // 监听顶部按钮跳转事件
    barClick(index) {
      this.$refs.scroll.scrollTo(0, - this.detailTopY[index], 5)    
    },
    contentScroll(position) {
      // console.log(position);
      var positionY = -position.y
      var length = this.detailTopY.length
      // console.log(this.positionY);
      for(let i = 0; i< length; i++) {
        if(this.currentIndex !== i && ((i < length - 1 &&  positionY > this.detailTopY[i] && positionY < this.detailTopY[i + 1] ) || (i === length - 1 && positionY > this.detailTopY[i]))) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
        // 混入方式
        this.showBackTop(position)
      } 
    },
    addCart() {
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.title = this.goods.title;
      product.realprice = this.goods.realPrice;
      // console.log(product);
      
      // 把赋值的product传入vuex
      this.add(product).then(res=>{
        // this.show = true;
        // this.message = res

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // }, 1500);
        this.$toast.show(res, 2000);
        
      });
    }
  },

  created() {
    //   保存传入的iid
    // console.log(this.$route);
    
      this.iid = this.$route.params.iid

    //   2.根据iid请求数据
      getDetailData(this.iid).then(res => {
        const data = res.result
        // console.log(data);
        // 获取轮播图数据
          this.topImages = data.itemInfo.topImages; 
          
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          this.shop = new Shops(data.shopInfo)

          this.detailInfo = data.detailInfo

          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          this.commentInfo = data.rate.cRate !== 0? data.rate.list[0] : {}

      })
      getRecommend().then(res => {
        // console.log(res);
        
        this.recommend = res.data.list
    
    // 给监听顶部跳转按钮的高度做防抖处理
      this.topyListener = debounce(() => {
        this.detailTopY = [];
        this.detailTopY.push(0);
        this.detailTopY.push(this.$refs.paraminfo.$el.offsetTop)
        this.detailTopY.push(this.$refs.commentinfo.$el.offsetTop)
        this.detailTopY.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.detailTopY);
        
      }, 800)
        
      })
  },
  activated() {
      this.$refs.scroll.refresh();    
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemFresh)
    }
}
</script>
<style scoped>

  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }
  .detail_nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>