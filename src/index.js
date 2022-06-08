import AppVersion from '../packages/appVersion/index.js';

// 放组件
const components = {
  AppVersion,
};

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.values(components).map((component) => {
    Vue.component(component.name, component);
  });
  // Object.values(directives).map(directive => {
  //   Vue.directive(directive.name, directive);
  // });
  // Object.values(vueInstanceFun).map(fun => {
  //   Vue.use(fun);
  // });
};

/** 支持使用标签方式引入 */
if (typeof window != 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install;
export { AppVersion };
