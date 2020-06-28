<template>
  <div id="cart">
    <nav-bar class="nav_bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <check-bar></check-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
import cartList from './childcomps/cartList'
import checkBar from './childcomps/checkBar'

  export default {
    name: "Cart",
    components: {
      NavBar,
      cartList,
      checkBar
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .nav_bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>