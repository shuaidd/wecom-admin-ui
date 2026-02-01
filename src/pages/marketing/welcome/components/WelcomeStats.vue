<script setup lang="ts">
import { Card, Row, Col, Statistic } from 'ant-design-vue'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'

// Placeholder for charts - in a real app would use ECharts or similar
</script>

<template>
  <div class="welcome-stats">
    <div class="filter-bar">
      <a-range-picker style="width: 260px" />
      <a-select placeholder="所有欢迎语" style="width: 200px; margin-left: 16px" />
      <a-button type="primary" style="margin-left: 16px">查询</a-button>
    </div>

    <Row :gutter="16" style="margin-top: 24px">
      <Col :span="6">
        <Card>
          <Statistic title="总发送数" :value="12580" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="成功发送数" :value="12500" />
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic
            title="平均回复率"
            :value="15.8"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix><ArrowUpOutlined /></template>
          </Statistic>
        </Card>
      </Col>
      <Col :span="6">
        <Card>
          <Statistic title="转化率" :value="2.3" suffix="%" :value-style="{ color: '#cf1322' }">
            <template #prefix><ArrowDownOutlined /></template>
          </Statistic>
        </Card>
      </Col>
    </Row>

    <Card title="效果趋势" style="margin-top: 24px">
      <div class="chart-placeholder">[趋势图表区域 - 发送量/回复量/转化量趋势]</div>
    </Card>

    <Card title="详细数据" style="margin-top: 24px">
      <a-table
        :dataSource="[]"
        :columns="[
          { title: '日期', dataIndex: 'date' },
          { title: '发送数', dataIndex: 'sent' },
          { title: '打开率', dataIndex: 'openRate' },
          { title: '点击率', dataIndex: 'clickRate' },
          { title: '回复率', dataIndex: 'replyRate' },
        ]"
      />
    </Card>
  </div>
</template>

<style scoped>
.welcome-stats {
  padding: 0;
}
.chart-placeholder {
  height: 300px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}
</style>
