
Language: EN | [中文简体](https://github.com/xieyezi/monia-cli)


<code>![visitors](https://visitor-badge.glitch.me/badge?page_id=xieyezi.monia-cli)</code>
<code>![npm-version](https://img.shields.io/npm/v/monia-cli)</code>


What is monia? The name of monia is inspired by the goddess of Greek mythology: [Harmonia](https://zh.wikipedia.org/wiki/%E5%93%88%E8%80%B3%E6%91%A9%E5%B0%BC%E4%BA%9E_(%E5%B8%8C%E8%87%98%E7%A5%9E%E8%A9%B1)). 

It means "love that connects everyone". So as to achieve a state of harmonious coexistence.

So, this is one cli that supports Vue, React, and Flutter at the same time.


>Note: Before using ` monia-cli` to create a `flutter` project, please make sure you have installed the `flutter` development environment locally.
### feature
  💡 quickly generate project templates   

  ⚡️  support `react + typescript + hooks` project

  🌈  support `Vue 2.x` project      

  🛠️  support `Vue 3.x` project (`vite + typescript`)        

  🔩 support `flutter`+ `getx` project(`null-safety`)        

  🌟 error message       
 
  🔗 command Association    



### template repo


<code>[flutter-getx-with-null-safety-template](https://github.com/xieyezi/flutter-getx-template)</code>

<code>[flutter-without-null-safety-template](https://github.com/xieyezi/flutter-template)</code>

<code>[vue3-vite-typescript-template](https://github.com/xieyezi/vue-vite-template)</code>

<code>[vue2-template](https://github.com/xieyezi/vue-template)</code>

<code>[react-vite-typescript-template](https://github.com/xieyezi/react-template)</code>


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

### Command Example

- init new `vue3` project：

```shell
monia create vue3-demo
```

```
? Which framework do you want to create Vue
? Which vue version do you want to create Vue3
? Please input your project description description
? Please input your author name author
? Please input project version 1.0.0
? Which package manager do you want to use Yarn


✨  Creating project in /Users/xieyezi/Desktop/vue3-demo.

🗃  Initializing git repository....

📦  Installing additional dependencies...

yarn install v1.22.10
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
✨  Done in 6.84s.

🎉  Successfully created project vue3-demo.
👉  Get started with the following commands:

$ cd vue3-demo
$ yarn start


                        _                  _ _ 
  _ __ ___   ___  _ __ (_) __ _        ___| (_)
 | '_ ` _ \ / _ \| '_ \| |/ _` |_____ / __| | |
 | | | | | | (_) | | | | | (_| |_____| (__| | |
 |_| |_| |_|\___/|_| |_|_|\__,_|      \___|_|_|
                                               

```

- generate `flutter getx` new page：

```shell
monia init detail
```

```
✨  Generate page in /Users/xieyezi/Desktop/flutter_demo/lib/pages/detail.
⠋ Generating, it's will not be wait long...
generate detail lib success.
generate /Users/xieyezi/Desktop/flutter_demo/lib/pages/detail/detail_view.dart success.
generate /Users/xieyezi/Desktop/flutter_demo/lib/pages/detail/detail_controller.dart success.
generate /Users/xieyezi/Desktop/flutter_demo/lib/pages/detail/detail_binding.dart success.

🎉  Successfully generate page detail.
```
> Note: When you want to create a new `flutter` new page, you will use the unique method of `underscore` (although you enter `big hump` or `small hump`, `monia` can also be processed correctly, but we do not recommend you to do this).



### Template directory

#### flutter + getx

```
.
├── README.md
├── android
├── ios
├── lib
│   ├── common
│   ├── components
│   ├── config.dart
│   ├── env.dart
│   ├── global.dart
│   ├── main.dart
│   ├── pages
│   ├── router
│   ├── services
│   └── utils
├── pubspec.lock
├── pubspec.yaml
├── test
├── web
└── xsds.iml

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