<template>
	<div>
		<Row type="flex">
			<Col>
				<table class='table table--fixed tableReport'>
					<thead>
						<tr class="txt-l">
							<th style="border-top: 1px solid">Территории действия пропусков</th>
							<th style="border-top: 1px solid">Количество пропусков на текущий момент</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="txt-h2" style="border-bottom: 1px solid">{{ countStat.all }}</td>
							<td class="txt-h2" style="border-bottom: 1px solid">{{ countStat.pass }}</td>
						</tr>
            <tr v-for="(item, key, index) in reportZone" :key="index" class="bg-blue-faint-on-hover transition">
              <td>{{ key }}</td>
              <td>{{ item }}</td>
            </tr>
					</tbody>
				</table>
			</Col>
		</Row>
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
        let res = {};
        let data = this.$store.state.reportZone.data;
        if (data) {
          res = data;
        }
        return res;
      },
      countStat() {
        let res = {
          all: 0,
          pass: 0
        };
        let data = this.$store.state.reportZone.data;
        if (data) {
          for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
              res.all++;
              res.pass += data[prop];
            }
          }
        }
        return res;
      }
    },
  }
</script>
<style scoped>
	.tableReport,
	.tableReport td,
	.tableReport tr,
	.tableReport th{
		border: none;
		padding: 5px;
	}
</style>
