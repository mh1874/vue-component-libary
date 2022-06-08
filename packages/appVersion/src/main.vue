<template>
  <div class="app-version">
    <span @click="detailShow = true"
      >{{ $t('header.current_version') }}{{ versionList[0].version }}</span
    >
    <el-dialog :visible.sync="detailShow" append-to-body>
      <div class="app-version-dialog">
        <el-form label-width="110px" label-position="right">
          <el-form-item :label="$t('header.version_log')">
            <el-select v-model="version">
              <el-option
                v-for="({ version }, index) in versionList"
                :label="version"
                :value="index"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <mavonEditor
          :value="versionList[version].description"
          :boxShadow="false"
          :subfield="false"
          defaultOpen="preview"
          :editable="false"
          :toolbarsFlag="false"
        ></mavonEditor>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 'mavon-editor' 文档地址： https://github.com/hinesboy/mavonEditor
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
  name: 'AppVersion',
  props: {
    // 版本信息
    versionList: {
      default: [],
    },
  },
  components: {
    mavonEditor,
  },
  data() {
    return {
      detailShow: false,
      version: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.app-version {
  & > span {
    display: block;
    width: calc(100% + 30px);
    text-align: center;
    position: relative;
    left: -15px;
  }
}
</style>
