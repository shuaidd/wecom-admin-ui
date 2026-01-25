<script lang="ts">
import { defineComponent } from 'vue'
 
export default defineComponent({
  name: 'CustomerTable',
})
</script>

<script setup lang="ts">
import { h } from 'vue'
import { Tag, Space } from 'ant-design-vue'
import type { TableProps } from 'ant-design-vue'
import type { Customer } from '@/types/customer'

const props = defineProps<{
  loading: boolean
  customers: Customer[]
  total: number
  current: number
  pageSize: number
  selectedRowKeys: number[]
}>()

const emit = defineEmits<{
  (e: 'table-change', pagination: Record<string, unknown>): void
  (e: 'row-select-change', keys: number[], rows: Customer[]): void
  (e: 'delete', record: Customer): void
}>()

const statusMap = {
  potential: { text: '潜在客户', color: 'blue' },
  intention: { text: '意向客户', color: 'green' },
  deal: { text: '已成交', color: 'purple' },
  lost: { text: '已流失', color: 'red' },
}

const customerLevelMap = {
  S: { text: 'S级', color: 'red' },
  A: { text: 'A级', color: 'orange' },
  B: { text: 'B级', color: 'gold' },
  C: { text: 'C级', color: 'lime' },
}

const columns = [
  {
    title: '客户信息',
    key: 'customerInfo',
    width: 250,
    customRender: ({ record }: { record: Customer }) => {
      return h('div', { class: 'customer-info' }, [
        h('img', {
          src: record.avatar,
          alt: record.name,
          class: 'customer-avatar',
        }),
        h('div', { class: 'customer-details' }, [
          h('div', { class: 'customer-name' }, record.name),
          h('div', { class: 'customer-corp' }, record.corpName),
        ]),
      ])
    },
  },
  {
    title: '联系方式',
    key: 'contact',
    width: 180,
    customRender: ({ record }: { record: Customer }) => {
      return h('div', [h('div', `手机: ${record.mobile}`), h('div', `邮箱: ${record.email}`)])
    },
  },
  {
    title: '跟进人',
    dataIndex: 'followUserName',
    key: 'followUser',
    width: 100,
  },
  {
    title: '所属部门',
    dataIndex: 'followDeptName',
    key: 'followDept',
    width: 120,
  },
  {
    title: '客户状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    customRender: ({ record }: { record: Customer }) => {
      const status = statusMap[record.status as keyof typeof statusMap]
      return h(Tag, { color: status?.color || 'default' }, { default: () => status?.text || record.status })
    },
  },
  {
    title: '客户等级',
    dataIndex: 'customerLevel',
    key: 'customerLevel',
    width: 100,
    customRender: ({ record }: { record: Customer }) => {
      const level = customerLevelMap[record.customerLevel as keyof typeof customerLevelMap]
      return h(Tag, { color: level?.color || 'default' }, { default: () => level?.text || record.customerLevel })
    },
  },
  {
    title: '标签',
    key: 'tags',
    width: 200,
    customRender: ({ record }: { record: Customer }) => {
      return h('div', { class: 'customer-tags' }, [
        ...record.tags.map((tag) =>
          h(Tag, { color: tag.color || 'default', key: tag.id }, { default: () => tag.tagName }),
        ),
      ])
    },
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right',
    customRender: ({ record }: { record: Customer }) => {
      return h(Space, {}, {
        default: () => [
          h(
            'a',
            {
              onClick: () => console.log('查看详情', record.id),
            },
            '详情',
          ),
          h(
            'a',
            {
              onClick: () => console.log('编辑', record.id),
            },
            '编辑',
          ),
          h(
            'a',
            {
              onClick: () => emit('delete', record),
            },
            '删除',
          ),
        ]
      })
    },
  },
  
  {
    title: '客户等级',
    dataIndex: 'customerLevel',
    key: 'customerLevel',
    width: 100,
    customRender: ({ record }: { record: Customer }) => {
      const level = customerLevelMap[record.customerLevel as keyof typeof customerLevelMap]
      return h(Tag, { color: level?.color || 'default' }, () => level?.text || record.customerLevel)
    },
  },
  {
    title: '标签',
    key: 'tags',
    width: 200,
    customRender: ({ record }: { record: Customer }) => {
      return h('div', { class: 'customer-tags' }, [
        ...record.tags.map((tag) =>
          h(Tag, { color: tag.color || 'default', key: tag.id }, () => tag.tagName),
        ),
      ])
    },
  },
  {
    title: '添加时间',
    dataIndex: 'addTime',
    key: 'addTime',
    width: 160,
    sorter: true,
  },
  {
    title: '最后活跃',
    dataIndex: 'lastActiveTime',
    key: 'lastActiveTime',
    width: 160,
    sorter: true,
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    fixed: 'right',
    customRender: ({ record }: { record: Customer }) => {
      return h(Space, {}, () => [
        h(
          'a',
          {
            onClick: () => console.log('查看详情', record.id),
          },
          '详情',
        ),
        h(
          'a',
          {
            onClick: () => console.log('编辑', record.id),
          },
          '编辑',
        ),
        h(
          'a',
          {
            onClick: () => emit('delete', record),
          },
          '删除',
        ),
      ])
    },
  },
]

const rowSelection: TableProps['rowSelection'] = {
  selectedRowKeys: props.selectedRowKeys,
  onChange: (keys: (string | number)[], rows: Customer[]) => {
    emit('row-select-change', keys as number[], rows)
  },
}
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="customers"
    :loading="loading"
    :row-selection="rowSelection"
    :pagination="{
      total,
      current,
      pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条`,
    }"
    :scroll="{ x: 1800 }"
    row-key="id"
    @change="(pagination: Record<string, unknown>) => emit('table-change', pagination)"
  />
</template>

<style scoped>
.customer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.customer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.customer-details {
  flex: 1;
}

.customer-name {
  font-weight: 500;
  margin-bottom: 4px;
}

.customer-corp {
  font-size: 12px;
  color: #999;
}

.customer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
