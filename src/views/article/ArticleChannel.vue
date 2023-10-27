<script setup>
import { getArticleCate, delArticleCate } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelEdit from './components/channelEdit.vue'
import { ElMessage } from 'element-plus'
const channelList = ref([])
const loading = ref(false)
async function getCateList() {
  loading.value = true
  const res = await getArticleCate()
  channelList.value = res.data.data
  loading.value = false
}
getCateList()
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await delArticleCate(row.id)
  ElMessage.success('删除成功')
  getCateList()
}
const onAddChannel = () => {
  dialog.value.open({ cate_name: '', cate_alias: '' })
}
const dialog = ref(null)
const onSuccess = () => {
  getCateList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
