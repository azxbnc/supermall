<template>
    <div class="toast" v-show="isShow">
        {{message}}
    </div>
</template>
<script>
export default {
  name: "Toast",
  data () {
    return {
            message: '',
            isShow: false
    }
  },
//   props: {
//       isShow: {
//           type: Boolean,
//           default: false
//       },
//       message: {
//           type: String,
//           default: '默认'
//       }
//   }

methods: {
    show(message, duration) {
        this.isShow = true;
        this.message = message;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration);
    }
}
}
</script>
<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 3px 8px;
        z-index: 999;

        background-color: rgba(0, 0, 0, .75);
        color: #fff;
    }
</style>