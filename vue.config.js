module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://stp-hotel.herokuapp.com/',
        changeOrigin: true
      }
    }
  }
}
