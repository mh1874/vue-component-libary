'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mavonEditor = require('mavon-editor');
require('mavon-editor/dist/css/index.css');

//
var script = {
  name: 'AppVersion',
  props: {
    // 版本信息
    versionList: {
      default: [],
    },
  },
  components: {
    mavonEditor: mavonEditor.mavonEditor,
  },
  data() {
    return {
      detailShow: false,
      version: 0,
    };
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "app-version" },
    [
      _c(
        "span",
        {
          on: {
            click: function ($event) {
              _vm.detailShow = true;
            },
          },
        },
        [
          _vm._v(
            _vm._s(_vm.$t("header.current_version")) +
              _vm._s(_vm.versionList[0].version)
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: { visible: _vm.detailShow, "append-to-body": "" },
          on: {
            "update:visible": function ($event) {
              _vm.detailShow = $event;
            },
          },
        },
        [
          _c(
            "div",
            { staticClass: "app-version-dialog" },
            [
              _c(
                "el-form",
                {
                  attrs: { "label-width": "110px", "label-position": "right" },
                },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: _vm.$t("header.version_log") } },
                    [
                      _c(
                        "el-select",
                        {
                          model: {
                            value: _vm.version,
                            callback: function ($$v) {
                              _vm.version = $$v;
                            },
                            expression: "version",
                          },
                        },
                        _vm._l(_vm.versionList, function (ref, index) {
                          var version = ref.version;
                          return _c("el-option", {
                            key: index,
                            attrs: { label: version, value: index },
                          })
                        }),
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("mavonEditor", {
                attrs: {
                  value: _vm.versionList[_vm.version].description,
                  boxShadow: false,
                  subfield: false,
                  defaultOpen: "preview",
                  editable: false,
                  toolbarsFlag: false,
                },
              }),
            ],
            1
          ),
        ]
      ),
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-17af2ac2_0", { source: ".app-version > span[data-v-17af2ac2] {\n  display: block;\n  width: calc(100% + 30px);\n  text-align: center;\n  position: relative;\n  left: -15px;\n}\n", map: {"version":3,"sources":["main.vue"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,wBAAwB;EACxB,kBAAkB;EAClB,kBAAkB;EAClB,WAAW;AACb","file":"main.vue","sourcesContent":[".app-version > span {\n  display: block;\n  width: calc(100% + 30px);\n  text-align: center;\n  position: relative;\n  left: -15px;\n}\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-17af2ac2";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__.install = function (Vue) {
  return Vue.component(__vue_component__.name, __vue_component__);
};

var components = {
  AppVersion: __vue_component__
};

var install = function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.values(components).map(function (component) {
    Vue.component(component.name, component);
  }); // Object.values(directives).map(directive => {
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

exports.AppVersion = __vue_component__;
exports["default"] = install;
