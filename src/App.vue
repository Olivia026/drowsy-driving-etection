<template>
  <div id="app" ref="app">
    <router-view></router-view>
    <BackTop />
  </div>
</template>

<script>
import Home from "@/views/Home";
export default {
  name: "App",
  components: {},
  watch: {
    $route() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
@import url("./assets/css/icon.css");
body {
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
