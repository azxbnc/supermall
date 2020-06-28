<template>
    <div class="base_info" v-if="Object.keys(goods).length !== 0">
        <div class="info_title">{{goods.title}}</div>
        <div class="info_price">
            <span class="info_newprice">{{goods.newPrice}}</span>
            <span class="info_oldprice">{{goods.oldPrice}}</span>
            <span class="discount">{{goods.discount}}</span>
        </div>
        <div class="info_col">
            <span class="info_colchd">{{goods.columns[0]}}</span>
            <span class="info_colchd">{{goods.columns[1]}}</span>
            <span class="info_colchd">{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="info_services">
            <span class="info_services_item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
      goods: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  data () {
    return {
    };
  }
}
</script>
<style scoped>
    .base_info {
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .info_title {
        color: #222
    }
    .info_price {
        margin-top: 10px;
    }
    .info_newprice {
        color: var(--color-high-text);
        font-weight: 700;
        font-size: 20px;
    }
    .info_oldprice {
        font-size: 13px;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .discount {
        font-size: 12px;
        padding: 2px 5px;
        color: #fff;
        background-color: var(--color-high-text);
        border-radius: 8px;
        margin-left: 5px;

        /*让元素上浮一些: 使用相对定位即可*/
        position: relative;
        top: -8px;
    }
    .info_col {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(100,100,100,.1);
        line-height: 30px;
        font-size: 13px;
    }
    .info_services {
        display: flex;
        justify-content: space-between;
        line-height: 60px;
    }
    .info_services_item img {
        width: 14px;
        position: relative;
        top: -2px;
    }
    .info_services_item span {
        font-size: 13px;
        color: #222;
    }
</style>