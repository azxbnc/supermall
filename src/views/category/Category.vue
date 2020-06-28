<template>
  <div class="category">
    <!-- 标题 -->
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>

    <!-- 侧边栏 -->
    <slide-bar
      :categoryList="categoryList"
      @slideBarItemClick="slideBarItemClick"
    />

    <!-- 右边 -->
    <scroll class="scroll-height" ref="scroll">
      <subcategory :subcategoryList="subcategoryList" />

      <tab-control
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
        @btnClick="btnClick"
      />

      <goods-list :goods="goods" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import NavBar from 'components/common/navbar/NavBar'
import GoodsList from 'components/content/goodslist/GoodsList'
import TabControl from 'components/content/tabControl/TabControl'

import SlideBar from './childComps/SlideBar'
import Subcategory from './childComps/Subcategory'

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from '@/network/categroy'
import { itemMixes } from 'common/mixins'

export default {
  name: 'Categroy',
  created() {
    // 请求左边栏
    this.getCategory()
  },
  methods: {
    getCategory() {
      getCategory().then((req) => {
        this.categoryList = req.data.category.list

        // 默认调用一次，右上
        this.getSubcategory(this.categoryList[0].maitKey)

        // 请求分类下的商品
        this.getCategoryDetail(this.categoryList[0].miniWallkey, this.types[0])
      })
    },
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((req) => {
        this.subcategoryList = req.data.list
      })
    },
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then((req) => {
        this.goods = req
      })
    },

    slideBarItemClick(obj) {
      this.getSubcategory(obj.maitKey)
      this.temp = obj.miniWallkey
    },
    btnClick(index) {
      this.getCategoryDetail(this.temp, this.types[index])
    },
  },
  data() {
    return {
      // 侧边栏
      categoryList: [],
      // 右上
      subcategoryList: [],
      // 推荐上盘
      goods: [],
      // 分类
      types: ['pop', 'new', 'sell'],
      temp: '',
      saveY: 0,
    }
  },
  components: {
    Scroll,
    NavBar,
    TabControl,

    GoodsList,

    SlideBar,
    Subcategory,
  },
  mounted() {},
  mixins: [itemMixes],
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getHomeY();
  },
}
</script>

<style scoped>
.category-nav-bar {
  /* font-weight: 600; */
  font-size: 14px;
  color: white;
  background-color: var(--color-tint);
}

.scroll-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
</style>
