
Language: 中文简体 | [EN](https://github.com/xieyezi/burnish-cli)

这是一款同时支持 Vue、React、Flutter 的脚手架。

你可能会有疑问🤔️ :  `flutter` 也算前端吗?

实话告诉你吧，flutter 就是 谷歌官方前端团队搞出来的.很不幸，前端er 就是处于不断的折腾中.

所以 `burnish-cli` 他来了.

> 注：使用 `burnish-cli` 创建 `flutter`项目之前，请确保你的本地已经安装了`flutter`的开发环境.
### 特性
  💡 快速生成项目模板   

  ⚡️  支持 `react + ts + hooks` 项目  

  🌈 支持`Vue 2.x` 项目      

  🛠️ 支持 `Vue 3.x` 项目(`vite + typescript`)         

  🔩 支持 `flutter` 项目        

  🌟 错误提示       
 
  🔗 命令联想☁         

### 安装

 ```js
  yarn global add burnish-cli  ||  npm install -g burnish-cli
 ```

### 参数和命令 

```
Usage: burnish-cli <command> [options]

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  create <app-name>    Create a project with template from burnish react template
```

### 模版目录

#### flutter 

```
.
├── README.md
├── android
├── build
├── ios
├── lib
│   ├── common
│   │   ├── apis
│   │   ├── components
│   │   ├── models
│   │   ├── styles
│   │   ├── utils
│   │   └── values
│   ├── config
│   ├── env.dart
│   ├── global.dart
│   ├── main.dart
│   └── pages
├── pubspec.lock
├── pubspec.yaml
├── test

```
#### React
```
.
├── README.md
├── apiTemplate.ts
├── package-lock.json
├── package.json
├── pont-config.json
├── public
├── setupProxy.js
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── assets
│   ├── components
│   ├── config
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── models
│   ├── pages
│   ├── react-app-env.d.ts
│   ├── router-menu-mapping
│   ├── routes
│   ├── serviceWorker.ts
│   ├── setupTests.ts
│   ├── style
│   └── utils
├── tsconfig.json
├── tsconfig.paths.json
├── tsconfig.prod.json
├── tslint.json
└── yarn.lock
```

#### Vue 

```
.
├── README.md
├── babel.config.js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── main.js
│   ├── router
│   ├── store
│   └── views
└── yarn.lock


```