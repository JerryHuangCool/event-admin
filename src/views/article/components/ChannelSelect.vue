<script setup>
import { getArticleCate } from '@/api/article'
import { ref } from 'vue'
const cateList = ref([])
defineProps({
  value: {
    type: [String, Number]
  }
})
const emit = defineEmits(['input'])
async function getCate() {
  const res = await getArticleCate()
  cateList.value = res.data.data
}
getCate()
</script>

<template>
  <el-select :value="value" @change="emit('input')">
    <el-option
      v-for="item in cateList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
