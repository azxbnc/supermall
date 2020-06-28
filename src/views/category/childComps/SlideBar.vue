<template>
  <div class="slide-bar">
    <scroll class="slide-bar-height">
      <slide-bar-item v-for="(item, index) in categoryList" :category="item" :key="index" @click.native="btnClick(index)" :class="{isActive: currenIndex === index}" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

import SlideBarItem from './SlideBarItem'

export default {
  name: "SlideBar",
  props: {
    categoryList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Scroll,

    SlideBarItem
  },
  data () {
    return {
      currenIndex: 0
    }
  },
  methods: {
    btnClick (index) {
      console.log(this.categoryList);
      
      this.currenIndex = index
      let maitKey = this.categoryList[index].maitKey
      let miniWallkey = this.categoryList[index].miniWallkey

      const obj = {
        maitKey,
        miniWallkey
      }
      this.$emit("slideBarItemClick", obj)
    }
  },
}
</script>

<style>
.slide-bar {
  width: 100%;
}

.slide-bar-height {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
  width: 100px;
  background-color: #f6f6f6;
}

.isActive {
  font-weight: 700;
  color: #ff5777;
  border-left: 3px solid #ff5777;
  background-color: #ffffff;
}
</style>