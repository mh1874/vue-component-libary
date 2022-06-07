# Vue Component Library

**For Vue 2**

This project skeleton was created to help people get started with creating their own Vue component library using:

- [Vue](https://vuejs.org/) (V2)
- [Rollup](https://github.com/rollup/rollup)
<!-- - [TypeScript](https://www.typescriptlang.org/) -->

It features:

- [vuepress](https://vuepress.vuejs.org/) to help you create and show off your components
- [Karma or Jest ?](https://jestjs.io/) enabling testing of your Vue components

[Check out this CodeSandbox to see the component library in action ▸](?)

## Development

### Testing

```
npm run test
```

### Building

```
npm run build
```

### Docs

To run a live-reload Storybook server on your local machine:

```
npm run docs:dev
```

To export your Docs as static files:

```
npm run docs:build
./deploy.sh
```

## Publishing

### Hosting via NPM

First, make sure you have an NPM account and are [logged into NPM using the `npm login` command.](https://docs.npmjs.com/creating-a-new-npm-user-account)

Then update the `name` field in `package.json` to reflect your NPM package name in your private or public NPM registry. Then run:

```
npm publish
```

The `"prepublishOnly": "npm run build"` script in `package.json` will execute before publish occurs, ensuring the `build/` directory and the compiled component library exist.

## Usage

Let's say you created a public NPM package called `epoch-vue-component-library` with the `Component` component created in this repository.

First, install the component library:

```
npm i --save epoch-vue-component-library
```

Next, the component library's peerDependencies must be installed:

```
npm i --save vue@^3.2.21
```

Usage of the component will be:

```
<template>
  `InputText` is a cool component. Here's how to use it...

  <template>
      <input-text />
  </template>
</template>

<script>
import { InputText } from "epoch-vue-component-library";

export default {
  name: "App",
  components: {
    InputText: InputText,
  },
};
</script>
);

export default App;
```

[Check out this Code Sandbox for a live example.](?)

# todo list

`chore:` 先制定好项目结构参考 element 实现

`feat:` 将鉴权工具库放入组件库，并保证导出工具库 or 组件 皆可用

`docs:` 优化鉴权打包部分优化输出文档用

`test:` Karma or Jest 测试单文件组件

`CI:` 应用生产环境
