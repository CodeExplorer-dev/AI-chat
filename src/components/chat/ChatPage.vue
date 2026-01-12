<template>
  <div class="main">
    <AsideBar />
    <ChatContainer />
  </div>
</template>

<script setup>
import AsideBar from './AsideBar.vue'
import ChatContainer from './ChatContainer.vue'
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
}
</style>