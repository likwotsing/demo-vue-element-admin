<template>
  <markdown-editor v-model="content" class="markdown" />
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      content: 'aaa'
    }
  }
}
</script>

<style lang="scss" scoped>
.markdown {
  text-align: left;
}
</style>
