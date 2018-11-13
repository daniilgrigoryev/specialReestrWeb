<template>
    <Menu mode="horizontal" theme="primary" :active-name="activeName" @on-select="selectMenu" width="auto">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            <span>Регистр</span>
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            <span>Справочники</span>
        </MenuItem>
        <MenuItem name="3">
            <Icon type="md-folder-open" />
            <span>Пакеты данных</span>
        </MenuItem>
      <MenuItem name="4">
        <Icon type="md-folder-open" />
        <span>Отчеты</span>
      </MenuItem>
    </Menu>
</template>


<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";

  export default {
    name: 'MainMenu',
    mounted() {
      let activeName = funcUtils.getFromSessionStorage('mainMenuActiveName');
      if (funcUtils.isNotEmpty(activeName)) {
        this.activeName = activeName;
      }
    },
    data() {
      return {
        activeName: '1'
      }
    },
    methods: {
      selectMenu(activeName) {
        switch (+activeName) {
          case 1: {
            this.$root.getRegisterReestr();
            break;
          }
          case 2: {
            this.$root.getDictReestr();
            break;
          }
          case 3: {
            this.$root.getPackageReestr();
            break;
          }
          case 4: {
            this.$root.getReportReestr();
            break;
          }
        }
        funcUtils.addToSessionStorage('mainMenuActiveName', activeName);
      },
    }
  }
</script>


<style scoped>
</style>
