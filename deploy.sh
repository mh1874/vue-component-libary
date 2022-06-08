#!/usr/bin/env sh
###
 # @Author: mh1874
 # @Date: 2022-06-07 08:43:47
 # @LastEditTime: 2022-06-07 10:13:36
 # @LastEditors: mh1874
 # @Description: 
### 

set -e

npm run docs:build
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@gitee.com:beijing_epoch/version-module-frontend.git master:gh-pages

cd -
