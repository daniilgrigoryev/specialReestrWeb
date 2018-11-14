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
							<th style="border-top: 1px solid">Всего ТС</th>
							<th style="border-top: 1px solid">Действующие разрешение</th>
							<th style="border-top: 1px solid">Истек срок разрешения</th>
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
						<tr class="bg-blue-on-hover transition">
							<td>Такси</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Маршрутный транспорт</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Транспорт обслуживаюший УДС</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Транспорт аварийных служб</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Транспорт экстренных служб</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Транспорт оперативных служб</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition"> 
							<td>Транспорт службы ЖКХ</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Транспорт министерства, федеральной службы</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Транспорт международной организации</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Иной транспорт(категория ограниченного доступа)</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Грузовой транспорт</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Транспорт федеральной почтовой связи</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Инкасаторы</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Эвакуаторы</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Такси, имеющие лицензии</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Желтое такси</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Социальное такси</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-red-on-hover transition">
							<td>Школьный автобус</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
						</tr>
						<tr class="bg-blue-on-hover transition">
							<td>Такси, имеющие лицензии МО</td>
							<td>342</td>
							<td>342</td>
							<td>342</td>
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
          res = data;
        }
        return res;
      }
    },
  }
</script>

