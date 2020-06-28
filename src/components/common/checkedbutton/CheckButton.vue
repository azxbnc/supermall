<template>
    <div class="check_button" :class="{checked: isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>
<script>
export default {
  name: "CheckButton",
  data () {
    return {

    }
  },
  props: {
      isChecked: {
          type: Boolean,
          defalut: false
      }
  }
}
</script>
<style scoped>
    .check_button {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #ccc;
    }
    .checked {
        border-color: #ff8198;
        background-color: #ff8198;
    }
</style>