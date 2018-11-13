<template>
  <div>
    {{reportZone}}
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";

  export default {
    name: "ReportZone",
    beforeCreate() {
      let data = this.$store.state.reportZone.data;
      if (!data) {
        let vm = this;
        let reportReestr = funcUtils.getfromLocalStorage('reportReestr');
        let cid = reportReestr[this.$store.state.reportZone.bean].cid;

        (async () => {
          try {
            vm.$store.dispatch('reportZoneSetCid', cid);
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
      reportZone() {
        let res = [];
        let data = this.$store.state.reportZone.data;
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
