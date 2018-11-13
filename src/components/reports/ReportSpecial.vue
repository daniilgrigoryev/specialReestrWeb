<template>
  <div>
    {{reportSpecial}}
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";

  export default {
    name: "ReportSpecial",
    beforeCreate() {
      let data = this.$store.state.reportSpecial.data;
      if (!data) {
        let vm = this;
        let reportReestr = funcUtils.getfromLocalStorage('reportReestr');
        let cid = reportReestr[this.$store.state.reportSpecial.bean].cid;

        (async () => {
          try {
            vm.$store.dispatch('reportSpecialSetCid', cid);
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
      reportSpecial() {
        let res = [];
        let data = this.$store.state.reportSpecial.data;
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
