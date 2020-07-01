<template>
  <div class="app-conatiner">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">copy</el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directly">
        <el-input v-model="directiveInput" placeholder="Please input" style="width:400px;max-width:100%:" />
        <el-button v-clipboard:copy="directiveInput" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">复制</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'
import clipboard from '@/directive/clipboard/index.js'

export default {
  directives: {
    clipboard
  },
  data() {
    return {
      activeName: 'directly',
      inputData: 'https://www.baidu.com',
      directiveInput: '自定义指令'
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
