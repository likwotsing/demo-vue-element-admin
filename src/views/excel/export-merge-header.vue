<template>
  <div>
    <el-button :loading="downloadLoading" style="margin-bottom: 20px;" type="primary" icon="el-icon-document" @click="handleDownload">Export</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      hightlight-current-row
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Main Information" align="center">
        <el-table-column label="Title" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Tab" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.tab }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="Date" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ momentFormatTime(scope.row.create_at) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
import { fetchList } from '@/api/article'

export default {
  data() {
    return {
      downloadLoading: false,
      listLoading: false,
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList()
        .then(response => {
          this.list = response.data.data
          this.listLoading = false
        })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel')
        .then(excel => {
          const multiHeader = [['Id', 'Main Information', '', 'Date']]
          const header = ['', 'Title', 'Tab', '']
          const filterVal = ['id', 'title', 'tab', 'create_at']
          const list = this.list
          const data = this.formatJson(filterVal, list)
          const merges = ['A1:A2', 'B1:C1', 'D1:D2']
          excel.export_json_to_excel({
            multiHeader,
            header,
            merges,
            data
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(c => filterVal.map(c2 => c[c2]))
    },
    momentFormatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
