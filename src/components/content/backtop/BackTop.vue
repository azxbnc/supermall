<template>
    <div class="backtop">
      <img src="~assets/img/common/top.png" alt="">
    </div>
</template>
<script>
export default {
  name: "BackTop",
  data () {
    return {
    };
  }
}
</script>
<style scoped>
  .backtop {
    position: fixed;
    bottom: 60px;
    right: 10px;
  }
  .backtop img {
    width: 40px;
    height: 40px;
  }
</style>