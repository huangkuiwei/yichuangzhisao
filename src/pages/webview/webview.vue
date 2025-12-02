<template>
  <web-view :src="src"></web-view>
</template>

<script>
export default {
  name: 'webview',

  data() {
    return {
      src: '',
    };
  },

  onLoad(options) {
    this.src = options.src && decodeURIComponent(options.src);
  },
};
</script>

<style lang="scss"></style>
