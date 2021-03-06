<template>
  <div class="app-container">
    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button :loading="downloadLoading" style="margin: 0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Export Excel
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Tab">
        <template slot-scope="scope">
          {{ scope.row.tab }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <!-- <span>{{ scope.row.create_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ momentFormatTime(scope.row.create_at) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FilenameOption from './components/FilenameOption'
import AutoWidthOption from './components/AutoWidthOption'
import BookTypeOption from './components/BookTypeOption'

import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import moment from 'moment'

export default {
  name: 'ExportExcel',
  components: {
    FilenameOption,
    AutoWidthOption,
    BookTypeOption
  },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        // 使用的的免费测试接口，不是mock的
        this.list = response.data.data
        this.listLoading = false
      }).catch(err => console.log(err))
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel')
        .then(excel => {
          const tHeader = ['Id', 'Title', 'Tab', 'Date']
          const filterVal = ['id', 'title', 'tab', 'create_at']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      // map: 返回值，一个由原数组每个元素执行回调函数的结果组成的新数组
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    momentFormatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
