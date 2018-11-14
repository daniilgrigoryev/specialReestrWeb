<template>
	<div>
		<div class="heading my12">
			<h2 class="txt-h2">Содержание данных</h2>
			<small class="px3 color-gray">Выбор периода для отчета</small>
		</div>

		<Row type="flex">
			<Col span="24">
				<Form label-position="left">
					<FormItem label="За период">
						<Row type="flex" :gutter="8">
							<Col>
								<Select class="w180">
									<Option value="beijing">New York</Option>
									<Option value="shanghai">London</Option>
									<Option value="shenzhen">Sydney</Option>
								</Select>
							</Col>
							<Col>
								<DatePicker type="date" placeholder="Select date" class="w180"></DatePicker>
							</Col>
							<Col>
								<Button type="primary">Сформировать</Button>
							</Col>
						</Row>
					</FormItem>
				</Form>
			</Col>
		</Row>

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
							<td class="txt-h2" style="border-bottom: 1px solid">524</td>
							<td class="txt-h2" style="border-bottom: 1px solid">3247</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td>Мкад</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td>ТТк</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td>Садовое кольцо</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td>Бульварное кольцо</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td>4-е кольцо</td>
							<td>342</td>
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
	.tableReport,
	.tableReport td,
	.tableReport tr,
	.tableReport th{
		border: none;
		padding: 5px;
	}
</style>