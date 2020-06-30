<template>
  <div>
    aaa
    <Tinymce v-model="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      content: 'aaa'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
