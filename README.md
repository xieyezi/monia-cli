
Language: 中文简体 | [English](README-EN.md)

什么是 monia ? monia 取名灵感来自于希腊神话掌握和谐的女神：[哈耳摩尼亚](https://zh.wikipedia.org/wiki/%E5%93%88%E8%80%B3%E6%91%A9%E5%B0%BC%E4%BA%9E_(%E5%B8%8C%E8%87%98%E7%A5%9E%E8%A9%B1))。

寓意着 "联系所有人的爱"。从而达到和谐共存的状态。

所以这是一款同时支持 Vue、React、Flutter 的脚手架。

> 注：使用 ` monia-cli` 创建 `flutter`项目之前，请确保你的本地已经安装了`flutter`的开发环境.
### 特性
  💡 快速生成项目模板   

  ⚡️  支持 `react + typescript + hooks` 项目  

  🌈 支持`Vue 2.x` 项目      

  🛠️ 支持 `Vue 3.x` 项目(`vite + typescript`)         

  🔩 支持 `flutter` + `getx` 项目(现已更新空安全)        

  🌟 错误提示       
 
  🔗 命令联想☁         


> flutter 现有更新至空安全，主要架构为`flutter v2.x + getx4.x`

### 安装

 ```js
  yarn global add  monia-cli  ||  npm install -g  monia-cli
 ```

### 参数和命令 

```
Usage:  monia <command> [options]

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  create <app-name>    Create a project with template from  monia template
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
├── commitlint.config.js
├── index.html
├── package.json
├── public
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── config
│   ├── directive
│   ├── hooks
│   ├── main.ts
│   ├── router
│   ├── store
│   ├── views
│   └── vue-shim.d.ts
├── tsconfig.json
├── vite.config.ts
├── yarn-error.log
└── yarn.lock

```