<template>
  <div>
    {{reportCategory}}
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";

  export default {
    name: "ReportCategory",
    beforeCreate() {
      let data = this.$store.state.reportCategory.data;
      if (!data) {
        let vm = this;
        let reportReestr = funcUtils.getfromLocalStorage('reportReestr');
        let cid = reportReestr[this.$store.state.reportCategory.bean].cid;

        (async () => {
          try {
            vm.$store.dispatch('reportCategorySetCid', cid);
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
    computed: {
      reportCategory() {
        let res = [];
        let data = this.$store.state.reportCategory.data;
        if (data) {
          res = data;
        }
        return res;
      }
    },
  }
</script>

<style scoped>

</style>
