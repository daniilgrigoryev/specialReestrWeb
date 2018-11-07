<template>
    <Menu mode="horizontal" theme="primary" active-name="1" @on-select="selectMenu">
        <div class="layout-logo fl">
            <b class="txt-bold">Спецтранспорт</b>
        </div>
        <div class="layout-nav mx-auto flex-parent flex-parent--center-main">
            <MenuItem name="1">
                <Icon type="ios-paper" />
                Регистр
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-bookmark" />
                Справочники
            </MenuItem>
            <MenuItem name="3">
                <Icon type="md-folder-open" />
                Пакеты данных
            </MenuItem>
        </div>
        <div class="fr">
          <Button size="large" @click="logout" type="primary">Выйти</Button>
        </div>
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
      logout() {
        this.$root.logout();
      },
    }
  }
</script>


<style scoped>

</style>
