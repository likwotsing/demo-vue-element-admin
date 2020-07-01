# demo-vue-element-admin

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



## markdown

[tui-editor](https://github.com/nhn/tui.editor)

- [预览只有50px](https://github.com/nhn/tui.editor/issues/923#issuecomment-635948516)

## svgicon

[参考](https://juejin.im/post/59bb864b5188257e7a427c09)

1. 创建组件 `src/components/SvgIcon/index.vue`

2. 图标处理 src/icons/

   - src/icons/svg/ 存放下载的.svg
   - src/icons/index.js 全局注册组件，并使用`require.context`把`.svg`文件批量变成模块Module
   - 使用`svg-sprite-loader`，将多个svg打包成`svg-sprite`，在`vue.config.js`里配置

3. `main.js`里导入

   ```js
   // 因为src/icons/index.js已经把所有svg文件变成了模块module，所以在这里import此文件就是把所有的svg文件模块导入了
   import src/icons
   ```

4. 使用 `src/views/icons/`

   ```js
   <svg-icon icon-class="editor" />
   ```

5. svgo的使用

   - 在`src/icons/svgo.yml`添加配置信息

   - 添加脚本

     ```js
     "svgo": "svgo -f src/icons/svg --config=src/icons/svgo.yml"
     ```

   > `npm run svgo`，就会根据配置文件对src/icons/svg/目录下的所有.svg文件进行处理



