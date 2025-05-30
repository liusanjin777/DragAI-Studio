<script setup lang="ts">
const dataSource = [
  {
    key: '1',
    name: '名称',
    des: '很长的描述',
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: null,
    des: '很长的很长的很长的很长的很长的很长的很长的很长的很长的很长的很长的很长的描述',
    address:
      '西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号西湖区湖底公园1号'
  }
]
const columns = [
  {
    title: '标题1',
    dataIndex: 'name',
    key: 'name',
    width: 80
  },
  {
    title: '标题2',
    dataIndex: 'des',
    key: 'des',
    ellipsis: true
  },
  {
    title: '标题3',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true
  }
]
</script>

<template>
  <a-table :dataSource="dataSource" :columns="columns" />
</template>
