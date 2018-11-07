<template>
    <Menu mode="horizontal" theme="primary" active-name="1" @on-select="selectMenu" width="auto">
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
    </Menu>
</template>


<script>
  export default {
    name: 'MainMenu',
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
        }
      },
    }
  }
</script>


<style scoped>

</style>
