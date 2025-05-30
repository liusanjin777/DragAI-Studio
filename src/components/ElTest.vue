<template>
  <div>
    组件示例:
    <el-table :data="tableData">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-pagination background :total="1000" />
  </div>
  <div>
    <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
      :disabled-date="() => {}"
    />
  </div>
  <div>
    <a-input v-model:value="value" placeholder="Basic usage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const value1 = ref('')
const tableData = [
  {
    date: '2016-05-03'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
