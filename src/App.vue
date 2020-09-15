<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/tinymce">Tinymce</router-link> |
      <router-link to="/markdown">Markdown</router-link> |
      <router-link to="/svgicon">SvgIcon</router-link> |
      <router-link to="/clipboard">Clipboard</router-link> |
      <router-link to="/export-excel">ExportExcel</router-link> |
      <router-link to="/export-selected-excel">ExportSelectedExcel</router-link> |
      <router-link to="/export-merge-header">ExportMergeHeader</router-link> |
      <router-link to="/upload-excel">UploadExcel</router-link> |
      <router-link to="/pagination">Pagination</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
