export default {
    addCount(state, payload) {
        payload.count += 1
    },
    addCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}