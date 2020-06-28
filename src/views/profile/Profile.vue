<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的</div>
    </nav-bar>

    <scroll class="scroll-height">
      <login />
      <money />
      <div class="line"></div>
      <profile-list />
    </scroll>

  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from 'components/common/navbar/NavBar'

import Login from './childComps/Login'
import Money from './childComps/Money'
import profileList from './childComps/profileList'

export default {
  name: "Profile",
  components: {
    Scroll,
    NavBar,

    Login,
    Money,
    profileList
  }
}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}

.nav-bar {
  color: white;
  background-color: #ff8198;
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
</style>