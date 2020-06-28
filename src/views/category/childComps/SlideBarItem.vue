<template>
  <div class="slide-bar-item">
    <span>{{category.title}}</span>
  </div>
</template>

<script>
export default {
  name: "SlideBarItem",
  props: {
    category: {
      type: Object,
      default () {
        return {}
      }
    },
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    btnClick () {
      this.currentIndex = index
    }
  },
}
</script>

<style>
.slide-bar-item {
  font-size: 14px;
  line-height: 45px;
  width: 100px;
  height: 45px;
  user-select: none;
  text-align: center;
  color: #666666;
  border: 0;
  outline: none;
  background: none;
}
</style>