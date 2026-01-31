<template>
  <div class="long-content">
    <a-card title="超长内容示例（测试滚动）">
      <div v-for="i in 50" :key="i" class="item">
        <h3>段落 {{ i }}</h3>
        <p>
          这是第 {{ i }} 段内容。Ant Design Vue 的布局非常强大，配合 Chrome
          风格的标签页，可以提供极佳的用户体验。
          这里通过循环生成大量内容，用以测试内容区域的滚动条效果。
        </p>
        <a-divider />
      </div>
      <a-back-top :target="getTarget" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
const getTarget = () => {
  const el = document.querySelector('.content-wrapper')
  return el as HTMLElement
}
</script>

<style scoped>
.item {
  padding: 10px 0;
}
</style>
