<template>
	<div>
		<Row type="flex">
			<Col>
				<table class='table table--fixed tableReport'>
					<thead>
						<tr class="txt-l">
							<th style="border-top: 1px solid">Всего ТС</th>
							<th style="border-top: 1px solid">Действующие разрешение</th>
							<th style="border-top: 1px solid">Истек срок разрешения</th>
							<th style="border-top: 1px solid">Аннулированно разрешений</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="txt-h2">{{ reportCategory.length }}</td>
							<td class="txt-h2">{{ countStat.active }}</td>
							<td class="txt-h2">{{ countStat.disable }}</td>
							<td class="txt-h2">{{ countStat.closed }}</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid" colspan="4" class="txt-h4 py18">По типам ТС</td>
						</tr>

						<tr v-for="(item, index) in reportCategory" :key="index" class="bg-blue-faint-on-hover transition">
							<td>{{ item.name }}</td>
							<td>{{ item.active }}</td>
							<td>{{ item.disable }}</td>
							<td>{{ item.closed }}</td>
						</tr>
					</tbody>
				</table>
			</Col>
		</Row>
	</div>
</template>

<style scoped>
	.tableReport,
	.tableReport td,
	.tableReport tr,
	.tableReport th{
		border: none;
		padding: 5px;
	}
</style>

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
          res = data.items;
        }
        return res;
      },
      countStat() {
        let res = {
          active: 0,
          disabled: 0,
          closed: 0,
        };
        let data = this.$store.state.reportCategory.data;
        if (data) {
          data.items.forEach((item) => {
            res.active += item.active;
            res.disabled += item.disabled;
            res.closed += item.closed;
          });
        }
        return res;
      }
    },
  }
</script>

