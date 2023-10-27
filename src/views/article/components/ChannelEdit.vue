<script setup>
import { ref } from 'vue'
import { addArticleCate, updateArticleCate } from '@/api/article'
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = ref({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
})
const emit = defineEmits(['success'])
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
async function confirm() {
  if (formModel.value.id) {
    await updateArticleCate(formModel.value)
    ElMessage.success('更新成功')
    dialogVisible.value = false
  } else {
    await addArticleCate(formModel.value.cate_name, formModel.value.cate_alias)
    ElMessage.success('添加成功')
    dialogVisible.value = false
  }
  emit('success')
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      :model="formModel"
      label-width="100px"
      style="padding-right: 30px"
      :rules="rules"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          placeholder="请输入分类名称"
          v-model="formModel.cate_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          placeholder="请输入分类别名"
          v-model="formModel.cate_alias"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
