const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
// module.exports = {
//     devServer: {
//         proxy: 'http://172.31.17.161:8000',
//     }
// }