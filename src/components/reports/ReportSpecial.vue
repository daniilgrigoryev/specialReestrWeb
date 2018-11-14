<template>
	<div>
		<div class="heading my12">
			<h2 class="txt-h2">Особый порядок аннулирования разрешений</h2>
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
				<table class='table tableReport'>
					<thead>
						<tr class="txt-l">
							<th style="border-top: 1px solid;" width="30%">Всего ТС c особыми разрешениями*</th>
							<th style="border-top: 1px solid">Ожидает рассмотрения</th>
							<th style="border-top: 1px solid">Принято решение об анулировании</th>
							<th style="border-top: 1px solid">Аннулированно разрешений</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="txt-h2">524</td>
							<td class="txt-h2">3247</td>
							<td class="txt-h2">2752</td>
							<td class="txt-h2">1379</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid" colspan="4" class="txt-h4 py18">По типам ТС</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td style="border-bottom: 1px solid; ">Транспортные средства, используемые для осуществления перевозок маломобильных пассажиров индивидуальными колллективным заявкам.</td>
							<td class="txt-h2" style="border-bottom: 1px solid; vertical-align: middle;">342</td>
							<td class="txt-h2" style="border-bottom: 1px solid; vertical-align: middle;">342</td>
							<td class="txt-h2" style="border-bottom: 1px solid; vertical-align: middle;">342</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td style="border-bottom: 1px solid">Транспортные средства, используемые в сфере, ЖКХ ДЖКХ и подведомственных ему учреждений</td>
							<td class="txt-h2" style="border-bottom: 1px solid; vertical-align: middle;">342</td>
							<td class="txt-h2" style="border-bottom: 1px solid; vertical-align: middle;">342</td>
							<td class="txt-h2" style="border-bottom: 1px solid; vertical-align: middle;">342</td>
						</tr>
						<tr class="bg-blue-faint-on-hover transition">
							<td>Транспорт средства с двухэтажным типом кузова, одобрением типа ТС которых предусмотрена наличие легко демонтируемых (съемных) стеклопакетов на втором этаже, а также наличие с движной крыши (тента) второго этажа или открытого (полуоткрытого верха второго этажа.)</td>
							<td class="txt-h2" style="vertical-align: middle;">342</td>
							<td class="txt-h2" style="vertical-align: middle;">342</td>
							<td class="txt-h2" style="vertical-align: middle;">342</td>
						</tr>
						<tr>
							<td class="prose color-gray">
								<small>* Транспортные средства, которые используются для перевозки пассажиров имеют за исключением места водителя, более восьми места для сиденья, технически допустимая максимальная масса которых превышает 5 тонн и которым разрешено движение по полосе для маршрутных транспортных средств ДТиРДТИ</small>
							</td>
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
	.tableReport,
	.tableReport td,
	.tableReport tr,
	.tableReport th{
		border: none;
		padding: 5px;
	}
</style>
