<template>
  <div>
    <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
      <h2 class="txt-h2 my12">Типы территорий</h2>
      <Form>
        <Input placeholder="Enter something..." class="search"></Input>
      </Form>
    </div>
    <Table border ref="selection" :columns="columnsOption" :data="dictArea"></Table>
  </div>



  <!--<div>
    <table>
      <thead>
      <tr>
        <td>Название</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in dictArea" :key="key" class="registersRow">
        <td>{{value}}</td>
      </tr>
      </tbody>
    </table>
  </div>-->
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";

  export default {
    name: "DictArea",
    beforeCreate() {
      let data = this.$store.state.dictArea.data;
      if (!data) {
        let vm = this;
        let dictReestr = funcUtils.getfromLocalStorage('dictReestr');
        let cid = dictReestr[this.$store.state.dictArea.bean].cid;

        (async () => {
          try {
            vm.$store.dispatch('dictAreaSetCid', cid);
            let eventResponse = await vm.$store.dispatch('prepareData', {
              cid: cid
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            alert(e.message);
          }
        })();
      }
    },
    data() {
      return {

        columnsOption: [
          {
            title: "Название",
            key: "area",
            align: 'center'
          }
        ],
      }
    },
    computed: {
      dictArea() {
        let res = [];
        let data = this.$store.state.dictArea.data;
        if (data) {
          data.forEach((item) => {
            res.push({
              area: item
            });
          });
        }
        return res;
      }
    }
  }
</script>

<style lang="scss">
  .registersRow:hover {
    td {
      background: azure;
      cursor: pointer;
    }
  }
</style>
