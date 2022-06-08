import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import less from 'less';

const isProductionEnv = process.env.NODE_ENV === 'production';

const processLess = function (context, payload) {
  return new Promise((resolve, reject) => {
    less.render(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );

    less.render(context, {}).then(
      function (output) {
        // output.css = string of css
        // output.map = string of sourcemap
        // output.imports = array of string filenames of the imports referenced
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};

const babelOptions = {
  presets: ['@babel/preset-env'],
  exclude: 'node_modules/**', // 只转译我们的源代码
};

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'umd',
        file: 'dist/library-umd.js',
        name: 'myLib',
      },
      {
        format: 'es',
        file: 'dist/library-es.js',
      },
      {
        format: 'cjs',
        file: 'dist/library-cjs.js',
      },
    ],
    plugins: [
      vue({
        css: true, // Dynamically inject css as a <style> tag
        compileTemplate: true, // Explicitly convert template to render function
      }),
      peerDepsExternal(),
      commonjs({
        include: ['node_modules/**', 'node_modules/**/*'],
      }),
      postcss({
        extract: true,
        minimize: isProductionEnv,
        process: processLess,
      }),
      babel({
        presets: ['@babel/env'],
        plugins: [
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
        ],
        exclude: 'node_modules/**',
      }),
      isProductionEnv && terser(),
    ],
    external: [
      //外部库， 使用'umd'文件时需要先引入这个外部库
      'vue',
    ],
  },
];
