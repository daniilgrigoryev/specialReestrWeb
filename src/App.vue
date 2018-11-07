<template>
  <div id="app">
    <Indicator/>
    <Header :style="{background: '#2d8cf0'}" v-if="isHeaderRender()">
      <MainMenu></MainMenu>
    </Header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Indicator from './components/Shared/Indicator.vue';
  import MainMenu from './components/verstka/MainMenu.vue';

  export default {
    name: 'app',
    components: {
      Indicator,
      MainMenu
    },
    methods: {
      isHeaderRender() {
        return localStorage.getItem('auth');
      },
    }
  }
</script>

<style lang="scss">
</style>
