<script setup>
import { ref } from 'vue'
import { getArticleDetail, publishArticle, updateArticle } from '@/api/article'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import { baseURL } from '@/utils/request'
import axios from 'axios'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const emit = defineEmits(['success'])
const visibleDraw = ref(false)
const editorRef = ref()
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
const open = async (row) => {
  visibleDraw.value = true
  if (row.id) {
    const res = await getArticleDetail(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    formModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    formModel.value = {
      title: '',
      cate_id: '',
      content: '',
      cover_img: '',
      state: ''
    }
    imgUrl.value = ''
    if (editorRef.value) {
      editorRef.value.setHTML('')
    }
  }
}
const formModel = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
const imgUrl = ref('')
function onSelectFile(file) {
  imgUrl.value = URL.createObjectURL(file.raw)
  formModel.value.cover_img = file.raw
}
const rules = ref({
  cate_id: [{ required: true, message: '分类不能为空', trigger: 'blur' }],
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      pattern: /^\S{1,25}$/,
      message: '标题必须是1-15位非空字符',
      trigger: 'blur'
    }
  ],
  cover_img: [{ required: true, message: '请选择图片', trigger: 'blur' }]
})
async function onPublish(state) {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    console.log('编辑')
    await updateArticle(fd)
    ElMessage.success('更新成功')
    visibleDraw.value = false
    emit('success', 'edit')
  } else {
    await publishArticle(fd)
    ElMessage.success('发布成功')
    visibleDraw.value = false
    emit('success', 'add')
  }
}
defineExpose({
  open
})
</script>
<template>
  <el-drawer
    v-model="visibleDraw"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    size="50%"
  >
    <el-form
      :model="formModel"
      ref="formRef"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
          class="avatar-uploader"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            theme="snow"
            content-type="html"
            v-model:content="formModel.content"
            ref="editorRef"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
