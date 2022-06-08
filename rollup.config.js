import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import less from 'less';
import pkg from './package.json';

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

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: [
      {
        format: 'umd',
        file: pkg.browser,
        name: 'myLib',
      },
      {
        format: 'cjs',
        file: pkg.main,
      },
      {
        format: 'es',
        file: pkg.module,
      },
    ],
    plugins: [
      vue({
        css: true, // Dynamically inject css as a <style> tag
        compileTemplate: true, // Explicitly convert template to render function
      }),
      peerDepsExternal(),
      resolve(), // 这样 Rollup 能找到 `ms`
      commonjs({
        // 这样 Rollup 能转换 `ms` 为一个ES模块
        include: ['node_modules/**', 'node_modules/**/*'],
      }),
      postcss({
        extract: true,
        minimize: isProductionEnv,
        process: processLess,
      }),
      babel({
        presets: ['@babel/preset-env'],
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
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
];
