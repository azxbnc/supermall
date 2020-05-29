<template>
    <div class="recommend">
        <div v-for="item in recommend" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecommendView",
    props: {
        recommend: {
            type: Array,
            default() {
                return []
            }
        }
    },

}
</script>

<style>
    .recommend {
        display: flex;
        width: 100%;
    }
    .recommend-item {
        flex: 1;
        text-align: center;
        font-size: 12px;
        border-bottom: 5px solid #eee;
        padding: 2px 0 18px 0;

    }
    .recommend-item img {
        width: 63px;
        height: 63px;
        margin-bottom: 5px;
    }
</style>