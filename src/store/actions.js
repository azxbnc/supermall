export default {
    addCart({state, commit}, payload) {
        return new Promise((resolve, reject) => {
                    // console.log(payload);
        let oldProduct = state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct) {
            commit('addCount', oldProduct)
            resolve('商品数量+1')
        } else {
            payload.count = 1;
            commit('addCart', payload)
            resolve('添加商品成功！')
        }
        })
    }
}