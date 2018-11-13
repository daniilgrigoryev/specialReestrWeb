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
				<table class='table table--fixed'>
					<thead>
						<tr>
							<th>Всего ТС</th>
							<th>Действующие разрешение</th>
							<th>Истек срок разрешения</th>
							<th>Аннулированно разрешений</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>524</td>
							<td>3247</td>
							<td>2752</td>
							<td>1379</td>
						</tr>
						<tr>
							<td colspan="4">
								По типам ТС
							</td>
						</tr>
						<tr>
							<td>Такси</td>
						</tr>
						<tr>
							<td>Маршрутный транспорт</td>
						</tr>
						<tr>
							<td>Транспорт обслуживаюший УДС</td>
						</tr>
						<tr>
							<td>Транспорт аварийных служб</td>
						</tr>
						<tr>
							<td>Транспорт экстренных служб</td>
						</tr>
						<tr>
							<td>Транспорт оперативных служб</td>
						</tr>
						<tr>
							<td>Транспорт службы ЖКХ</td>
						</tr>
						<tr>
							<td>Транспорт министерства, федеральной службы</td>
						</tr>
						<tr>
							<td>Транспорт международной организации</td>
						</tr>
						<tr>
							<td>Иной транспорт(категория ограниченного доступа)</td>
						</tr>
						<tr>
							<td>Грузовой транспорт</td>
						</tr>
						<tr>
							<td>Транспорт федеральной почтовой связи</td>
						</tr>
						<tr>
							<td>Инкасаторы</td>
						</tr>
						<tr>
							<td>Эвакуаторы</td>
						</tr>
						<tr>
							<td>Такси, имеющие лицензии</td>
						</tr>
						<tr>
							<td>Желтое такси</td>
						</tr>
						<tr>
							<td>Социальное такси</td>
						</tr>
						<tr>
							<td>Школьный автобус</td>
						</tr>
						<tr>
							<td>Такси, имеющие лицензии МО</td>
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
