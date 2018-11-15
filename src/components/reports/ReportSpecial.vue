<template>
	<div>
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
              <td class="txt-h2">{{ reportSpecial.length }}</td>
              <td class="txt-h2">{{ countStat.active }}</td>
              <td class="txt-h2">{{ countStat.disable }}</td>
              <td class="txt-h2">{{ countStat.closed }}</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid" colspan="4" class="txt-h4 py18">По типам ТС</td>
						</tr>
            <tr v-for="(item, index) in reportSpecial" :key="index" class="bg-blue-faint-on-hover transition">
              <td>{{ item.name }}</td>
              <td>{{ item.active }}</td>
              <td>{{ item.disable }}</td>
              <td>{{ item.closed }}</td>
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
        let data = this.$store.state.reportSpecial.data;
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

<style scoped>
	.tableReport,
	.tableReport td,
	.tableReport tr,
	.tableReport th{
		border: none;
		padding: 5px;
	}
</style>
