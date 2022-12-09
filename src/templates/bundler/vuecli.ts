export default `const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.APP_PUBLIC_PATH,
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
  }
})
`
