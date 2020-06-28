<template>
    <div class="check_bar">
        <div class="left">
            <check-button
            :is-checked="isAll"
            @click.native="clickAll"></check-button>
            <div>全选</div>
        </div>
        <div class="center">
            合计：￥ {{totalPay}}
        </div>
        <div class="right">
            去计算：{{totalCount}}
        </div>
    </div>

</template>
<script>
import CheckButton from 'components/common/checkedbutton/CheckButton'

export default {
  name: "checkBar",
  components: {
      CheckButton
  },
  data () {
    return {
       
    };
  },
  computed: {
      totalPay() {
          return this.$store.state.cartList.filter(item => item.checked).reduce((preValue,item) => {
              return preValue + item.realprice * item.count;
              }, 0)
      },
      totalCount() {
          return this.$store.state.cartList.filter(item => item.checked).length;
      },
      isAll() {
          if(this.$store.state.cartList.length === 0) return false

          return !this.$store.state.cartList.find(item => !item.checked);
      }
  },
  methods: {
      clickAll() {
          if(this.isAll) {
              this.$store.state.cartList.forEach(item => {
                  item.checked = false
              });
          } else {
              this.$store.state.cartList.forEach(item => {
                  item.checked = true
              });
          }
      }
  }
}
</script>
<style scoped>
    .check_bar {
        height: 40px;
        background-color: #eee;
        position: relative;        
        font-size: 14px;
    }
    .left {
        width: 60px;
        display: flex;
        /* padding: 5px; */
        /* margin: 5px; */
        margin-top: 10px;
        align-items: center;
        /* text-align: center; */
        justify-content: center;
    }
    .left div {
        margin-left: 5px;
    }
    .center {
        line-height: 40px;
        text-align: center;
        position: absolute;
        left: 105px;
    }
    .right {
        position: absolute;
        width: 85px;
        height: 40px;
        /* width: 60px; */
        right: 0;
        padding-left: 10px;
        line-height: 40px;
        background-color: rgb(148, 17, 35);
        color: #fff;
    }
    .checked {
    border-color: #ff8198;
    background-color: #ff8198;
    }
</style>