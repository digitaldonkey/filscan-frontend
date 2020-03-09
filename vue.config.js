module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: "4396"
  },
  css: {
    loaderOptions: {
      sass: {
        // Globally import some scss vars in all components.
        prependData: `@import "@/assets/style/_variables.scss"; @import "@/assets/style/_mixins.scss";`
      }
    }
  }

};
