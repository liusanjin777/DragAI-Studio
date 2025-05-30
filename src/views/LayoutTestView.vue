<script setup lang="ts">
interface DataItem {
  title: string
}

const data: DataItem[] = [
  {
    title: 'Title 1'
  },
  {
    title: 'Title 2'
  },
  {
    title: 'Title 3'
  },
  {
    title: 'Title 4'
  },
  {
    title: 'Title 1'
  },
  {
    title: 'Title 1'
  },
  {
    title: 'Title 1'
  },
  {
    title: 'Title 1'
  }
]
</script>

<template>
  <a-list
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.title">
          <div class="h-56 text-md">很长很长的很长很长的很长很长的content</div>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
  <a-button type="primary">Primary Button</a-button>
  <a-button type="default" class="mx-4">Default Button</a-button>
  <a-date-picker />
</template>
