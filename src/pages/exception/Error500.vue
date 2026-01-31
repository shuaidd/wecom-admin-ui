<template>
  <a-result status="500" title="500" sub-title="对不起，服务器出错了。">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
    </template>
  </a-result>
</template>
