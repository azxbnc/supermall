<template>
        <swiper>
            <swiper-item v-for="item in banner">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imgLoads">
                </a>
            </swiper-item>
        </swiper>
</template>

<script>

import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    name: "HomeSwiper",
    props: {
        banner: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            isEnd: false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        imgLoads() {
            if(!this.isEnd) {
                this.$emit('imgLoads');
                // console.log(1);
                
                this.isEnd = true;
            }
        }
    }
}
</script>

<style>

</style>