<script setup lang="ts">
import { reactive } from 'vue'

const formState = reactive({
  name: '',
  region: undefined,
  date1: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!', formState)
}
</script>

<template>
  <a-card title="基础表单">
    <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="活动名称">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="活动区域">
        <a-select v-model:value="formState.region" placeholder="请选择活动区域">
          <a-select-option value="shanghai">上海</a-select-option>
          <a-select-option value="beijing">北京</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="活动时间">
        <a-date-picker
          v-model:value="formState.date1"
          show-time
          type="date"
          placeholder="选择时间"
        />
      </a-form-item>
      <a-form-item label="即时配送">
        <a-switch v-model:checked="formState.delivery" />
      </a-form-item>
      <a-form-item label="活动性质">
        <a-checkbox-group v-model:value="formState.type">
          <a-checkbox value="1" name="type">美食/餐厅线上活动</a-checkbox>
          <a-checkbox value="2" name="type">地推活动</a-checkbox>
          <a-checkbox value="3" name="type">线下主题活动</a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="特殊资源">
        <a-radio-group v-model:value="formState.resource">
          <a-radio value="1">赞助</a-radio>
          <a-radio value="2">场地</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="活动形式">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">立即创建</a-button>
        <a-button style="margin-left: 10px">取消</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
