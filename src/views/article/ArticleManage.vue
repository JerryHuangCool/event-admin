<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { getArticleList } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
const articleList = ref([])
const total = ref(0)
function onEditArticle(row) {
  articleEdit.value.open(row)
}
function onDelArticle(row) {
  console.log(row)
}
const select = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false)
async function getArtList(params) {
  loading.value = true
  const res = await getArticleList(params)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArtList(select.value)
function onSizeChange(size) {
  //console.log(size)
  select.value.pagesize = size
  select.value.pagenum = 1
  getArtList(select.value)
}
function onCurrentChange(page) {
  //console.log(page)
  select.value.pagenum = page
  getArtList(select.value)
}
function onSearch() {
  select.value.pagenum = 1
  getArtList(select.value)
}
function onResetting() {
  select.value.pagenum = 1
  select.value.cate_id = ''
  select.value.state = ''
  getArtList(select.value)
}
const articleEdit = ref(null)
function onAddArticle() {
  articleEdit.value.open({})
}
function onSuccess(type) {
  if (type === 'add') {
    select.value.pagenum = Math.ceil((total.value + 1) / select.value.pagesize)
  }
  getArtList(select.value)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类:">
        <channel-select v-model="select.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="select.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onResetting">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="select.pagenum"
      v-model:page-size="select.pagesize"
      :page-sizes="[2, 5, 7, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: end"
    />
    <ArticleEdit ref="articleEdit" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>

<style lang="scss" scoped></style>
