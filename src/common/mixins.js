import {debounce} from "./utils"
import BackTop from 'components/content/backtop/BackTop'


export const itemMixes = {
    data() {
        return {
            newRefresh: null,
            itemFresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemFresh = () => {
            this.newRefresh();
          }
        this.$bus.$on('itemImgLoad', this.itemFresh)    
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        backtop() {
            this.$refs.scroll.scrollTo(0, 0, 1000);
        },
        showBackTop(position) {
            this.isShow = - position.y > 500;
        }
    }
}