<template>
  <div class="app-container">
    <el-input v-model="filename" placeholder="filename" style="width:350px;" prefix-icon="el-icon-document" />
    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
      Export Selected Items
    </el-button>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
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
import { fetchList } from '@/api/article'
import moment from 'moment'

export default {
  data() {
    return {
      filename: '',
      downloadLoading: false,
      list: null,
      listLoading: true,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['Id', 'Title', 'Tab', 'Date']
          const filterVal = ['id', 'title', 'tab', 'create_at']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item.',
          type: 'warning'
        })
      }
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
