import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/Users/balalaxiaoxiannan/Desktop/孟/Project/study/vue3-component-library/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("/Users/balalaxiaoxiannan/Desktop/孟/Project/study/vue3-component-library/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
