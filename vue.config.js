module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'vue$': 'vue/dist/vue.esm.js' 
            }
        }
    },
    devServer: {
        disableHostCheck: true
      }
}
