<template>
  <pagination
    :total="total"
    page.sync="listQuery.page"
    :limit.sync="listQuery.limit"
    :page-sizes="pageSizes"
    :hidden="hidden"
    @pagination="getList"
  />
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'ViewPagination',
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 2
      },
      pageSizes: [2, 5, 10],
      list: [],
      hidden: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(payload) {
      console.log(payload)
      let page = this.listQuery.page
      let pagesize = 20
      if (payload) {
        page = payload.page
        pagesize = 20
      }
      this.$axios({
        method: 'get',
        url: 'http://v.juhe.cn/joke/content/list.php',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          key: this.$baseConf.xiaohua_Key,
          page,
          pagesize,
          time: (Date.now() + '').substring(0, 10),
          sort: 'desc'
        }
      }).then((res) => {
        const data = res.data
        if (data.result) {
          this.list = data.result.data
          this.total = this.list.length
        }
      })
    }
  }
}
</script>

<style>

</style>
