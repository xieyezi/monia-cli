
Language: EN | [中文简体](README-CN.md)

What is monia? The name of monia is inspired by the goddess of Greek mythology: [Harmonia](https://zh.wikipedia.org/wiki/%E5%93%88%E8%80%B3%E6%91%A9%E5%B0%BC%E4%BA%9E_(%E5%B8%8C%E8%87%98%E7%A5%9E%E8%A9%B1)). 

It means "love that connects everyone". So as to achieve a state of harmonious coexistence.

So, this is one cli that supports Vue, React, and Flutter at the same time.

You may have questions 🤔️: Does `flutter` also count as front-end?

To tell you the truth, flutter is the official front-end team of Google.

So ` monia-cli` is here.

>Note: Before using ` monia-cli` to create a `flutter` project, please make sure you have installed the `flutter` development environment locally.
### feature
  💡 quickly generate project templates   

  ⚡️  support `react + typescript + hooks` project

  🌈  support `Vue 2.x` project      

  🛠️  support `Vue 3.x` project (`vite + typescript`)        

  🔩 support `flutter` project        

  🌟 error message       
 
  🔗 command Association     

### install

 ```js
  yarn global add  monia-cli  ||  npm install -g  monia-cli
 ```

### Options and  Commands

```
Usage:  monia <command> [options]

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  create <app-name>    Create a project with template from  monia template
```

### Template directory

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