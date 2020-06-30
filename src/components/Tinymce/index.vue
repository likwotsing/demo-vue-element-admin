<template>
  <div :class="{fullscreen: fullscreen}" class="tinymce-container" :style="{width: containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <EditorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
import load from './dynamicLoadScript'
import plugins from './plugins'
import toolbar from './toolbar'
import EditorImage from './components/EditorImage'

// tinymce cdn
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

// 中文文档 http://tinymce.ax-z.cn/

export default {
  name: 'Tinymce',
  components: {
    EditorImage
  },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + '-' + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      retuired: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      // https://www.tiny.cloud/docs-4x/configure/localization/#language
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // mathes `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          window.tinymce.get(this.tinymceId.setContent(val || ''))
        })
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['en'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false, // 是否可使用鼠标缩放图片
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean', // 保留word粘贴样式
        code_dialog_height: 450, // 编辑HTML源代码框的高度
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square', // 无序列表样式
        advlist_number_styles: 'default', // 有序列表样式
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.id'], // 图片跨域
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // 是否可以使用tab
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        convert_urls: false // 是否自动转换url
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(c => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${c.url}" >`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
