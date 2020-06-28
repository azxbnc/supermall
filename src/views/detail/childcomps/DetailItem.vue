<template>
    <nav-bar>
        <div slot="left" @click="backItem" class="img"><img src="~assets/img/common/back.svg" alt=""></div>
        <div slot="center" class="nav">
            <span v-for="(item,index) in titles" 
            class="nav-item" :class="{active: currentIndex == index}" @click="itemClick(index)">{{item}}</span>
        </div>        
    </nav-bar>
</template>
<script>

import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "DetailItem",
  components: {
      NavBar
  },
  data () {
    return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
    };
  },
  methods: {
      backItem() {
          this.$router.back()
      },
      itemClick(index) {
          this.currentIndex = index;
          this.$emit('barClick', index)   
      }
  }
}
</script>
<style scoped>
    .img {
        margin-top: 5px;
        width: 70%;
        height: 70%;
    }
    .nav {
        display: flex;
        font-size: 13px;
    }
    .nav-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text)
    }
</style>