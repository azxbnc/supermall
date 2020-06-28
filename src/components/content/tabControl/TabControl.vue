<template>
    <div class="tabcontrol">
        <div v-for="(item, index) in titles" 
        class="tabcontrol-item" :class="{active: index === currentIndex}" @click="divClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        divClick(index) {
            this.currentIndex = index;
            this.$emit('tabClick', index)
            
        }
    }
}
</script>

<style>
    .tabcontrol {
        display: flex;
        text-align: center;
        background-color: #fff;
    }
    .tabcontrol-item {
        flex: 1;
        line-height: 40px;
        font-size: 14px;
    }
    .active {
        color: var(--color-high-text);

    }
    .tabcontrol-item span {
        padding-bottom: 5px;
    }
    .active span {
        border-bottom: 2px solid var(--color-tint);
    }
</style>