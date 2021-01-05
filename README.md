
Language: EN | [中文简体](README-CN.md)

This is one cli that supports Vue, React, and Flutter at the same time.

You may have questions 🤔️: Does `flutter` also count as front-end?

To tell you the truth, flutter is the official front-end team of Google. Unfortunately, the front-end er is in constant toss.

So `burnish-cli` is here.

>Note: Before using `burnish-cli` to create a `flutter` project, please make sure you have installed the `flutter` development environment locally.
### feature
  💪 Quickly generate project templates   

  🌈  Support `react + ts + hooks` project

  🌈  Support `Vue 2.x` project      

  🌈  Support `Vue 3.x` project (`vite + typescript`)        

  🌈  Support `flutter` project        

  🌟 Error message       
 
  🔗 Command Association     

### install

 ```js
  yarn global add burnish-cli  ||  npm isntall -g burnish-cli
 ```

### Options and  Commands

```
Usage: burnish-cli <command> [options]

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  create <app-name>    Create a project with template from burnish react template
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