<template>
	<Layout class="height100-header">
		<Sider width="350px" style="min-width: 250px; max-width: 350px;" class="bg-white">
			<Menu @on-select="onMenuClick" :active-name="activeReport" width="auto" theme="primary">
				<MenuGroup title="Типы отчетов">
					<MenuItem name="ReportCategory">Содержание данных</MenuItem>
					<MenuItem name="ReportSpecial">Особый порядок аннулирования разрешений</MenuItem>
					<MenuItem name="ReportZone">Действующие пропуска</MenuItem>
				</MenuGroup>
			</Menu>
		</Sider>
	
		<Content>
			<Card>
				<div class="heading my12">
					<h2 class="txt-h2">{{ title }}</h2>
					<small class="px3 color-gray">Выбор периода для отчета</small>
				</div>
	
				<Row type="flex">
					<Col span="24">
					<Form label-position="left">
						<FormItem label="За период">
							<Row type="flex" :gutter="8">
								<Col>
								<Select :clearable="true" class="w180" v-model="periodReport" @on-change="onChangePeriod">
	                      <Option value="week">Неделя</Option>
	                      <Option value="month">Месяц</Option>
	                      <Option value="year">Год</Option>
	                    </Select>
								</Col>
								<Col>
								<DatePicker type="datetime" format="dd-MM-yyyy HH:mm" v-model="dateReport" @on-change="onChangeDate" placeholder="Select date" class="w180"></DatePicker>
								</Col>
								<Col>
								<Button type="primary" :disabled="!activeReport || !disableCreateReport()" @click="createReport">Сформировать</Button>
								</Col>
							</Row>
						</FormItem>
					</Form>
					</Col>
				</Row>
	
				<report-category v-if="showReportCategory"></report-category>
				<report-special v-if="showReportSpecial"></report-special>
				<report-zone v-if="showReportZone"></report-zone>
			</Card>
		</Content>
	</Layout>
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import ReportCategory from "../reports/ReportCategory";
import ReportSpecial from "../reports/ReportSpecial";
import ReportZone from "../reports/ReportZone";
import TablePoptip from './../verstka/TablePoptip.vue';
import moment from 'moment';

export default {
	name: "ReportReestr",
	components: {
		ReportCategory,
		ReportSpecial,
		ReportZone,
		TablePoptip
	},
	mounted() {
		let vm = this;
		let reportReestr = funcUtils.getfromLocalStorage('reportReestr');

		let reportCategory = this.$store.state.reportCategory.bean;
		let reportSpecial = this.$store.state.reportSpecial.bean;
		let reportZone = this.$store.state.reportZone.bean;

		(async () => {
			try {
				if (funcUtils.isNull(reportReestr)) {
					reportReestr = {};
					reportReestr[reportCategory] = {
						cid: null,
						moduleName: vm.$store.state.reportCategory.moduleName
					};
					reportReestr[reportSpecial] = {
						cid: null,
						moduleName: vm.$store.state.reportSpecial.moduleName
					};
					reportReestr[reportZone] = {
						cid: null,
						moduleName: vm.$store.state.reportZone.moduleName
					};
					funcUtils.addToLocalStorage('reportReestr', reportReestr);

				} else {
					for (let prop in reportReestr) {
						if (reportReestr.hasOwnProperty(prop)) {
							if (funcUtils.isNotEmpty(reportReestr[prop].cid)) {
								vm.activeReport = prop;
								switch (prop) {
									case 'ReportCategory':
										{
											vm.title = 'Содержание данных';
											break;
										}
									case 'ReportSpecial':
										{
											vm.title = 'Особый порядок аннулирования разрешений';
											break;
										}
									case 'ReportZone':
										{
											vm.title = 'Действующие пропуска';
											break;
										}
								}
							}
						}
					}
				}
			} catch (e) {
				alert(e.message);
			}
		})();
	},
	destroyed() {
		this.$store.dispatch('reportCategorySetCid', null);
		this.$store.dispatch('reportCategorySetData', {
			data: null
		});

		this.$store.dispatch('reportSpecialSetCid', null);
		this.$store.dispatch('reportSpecialSetData', {
			data: null
		});

		this.$store.dispatch('reportZoneSetCid', null);
		this.$store.dispatch('reportZoneSetData', {
			data: null
		});
	},
	data() {
		return {
			activeReport: null,
			periodReport: null,
			dateReport: null,
			title: null
		}
	},
	computed: {
		showReportCategory() {
			return this.$store.state.reportCategory.bean === this.activeReport;
		},
		showReportSpecial() {
			return this.$store.state.reportSpecial.bean === this.activeReport;
		},
		showReportZone() {
			return this.$store.state.reportZone.bean === this.activeReport;
		}
	},
	methods: {
		createReport() {
			if (this.disableCreateReport()) {
				let vm = this;
				let reportReestr = funcUtils.getfromLocalStorage('reportReestr');

				let date = this.dateReport;
				if (funcUtils.isNotEmpty(this.periodReport)) {
					switch (this.periodReport) {
						case 'week':
							{
								date = moment().subtract(7, 'days');
								break;
							}
						case 'month':
							{
								date = moment().subtract(1, 'month');
								break;
							}
						case 'year':
							{
								date = moment().subtract(1, 'year');
								break;
							}
					}
				}

				(async () => {
					try {
						let cid = reportReestr[vm.activeReport].cid;
						let eventResponse = await vm.$store.dispatch('prepareData', {
							method: 'getData',
							params: {
								fromDate: date,
							},
							cid: cid
						});
						await vm.$store.dispatch('fillModule', { 'event': eventResponse });
					} catch (e) {
						alert(e.message);
					}
				})();
			}
		},
		disableCreateReport() {
			if (typeof this.dateReport === 'string') {
				return funcUtils.isNotEmpty(this.periodReport) || (funcUtils.isNotEmpty(this.dateReport) && this.dateReport.trim().length > 0);
			} else {
				return funcUtils.isNotEmpty(this.periodReport) || (funcUtils.isNotEmpty(this.dateReport));
			}
		},
		onMenuClick(reportName) {
			let vm = this;
			let reportReestr = funcUtils.getfromLocalStorage('reportReestr');
			let cid;
			let moduleName;

			switch (reportName) {
				case 'ReportCategory':
					{
						vm.title = 'Содержание данных';
						break;
					}
				case 'ReportSpecial':
					{
						vm.title = 'Особый порядок аннулирования разрешений';
						break;
					}
				case 'ReportZone':
					{
						vm.title = 'Действующие пропуска';
						break;
					}
			}

			this.dateReport = null;
			this.periodReport = null;

			(async () => {
				try {
					if (!funcUtils.isNull(vm.activeReport)) {
						moduleName = reportReestr[vm.activeReport].moduleName;
						cid = reportReestr[vm.activeReport].cid;
						vm.$store.dispatch('removeComponent', {
							cid: cid
						});

						vm.$store.dispatch(moduleName + 'SetCid', null);
						vm.$store.dispatch(moduleName + 'SetData', {
							data: null
						});
						reportReestr[vm.activeReport].cid = null;
					}
					moduleName = reportReestr[reportName].moduleName;

					let eventResponse = await vm.$store.dispatch('prepareData', {
						beanName: reportName,
						method: null,
						params: null,
						cid: null
					});
					if (eventResponse.status === 200) {
						let data = eventResponse.response;
						if (data.length > 0) {
							let dataJson = JSON.parse(data);
							let respData = dataJson.data;
							let respError = dataJson.error;
							if (!funcUtils.isNull(respData)) {
								if (dataJson.method === 'addCID') {
									reportReestr[reportName].cid = respData.cid;
									funcUtils.addToLocalStorage('reportReestr', reportReestr);
									vm.$store.dispatch(moduleName + 'SetCid', respData.cid);
									vm.activeReport = reportName;
								}
							} else {
								if (!funcUtils.isNull(respError)) {
									alert(respError.errorMsg);
								}
							}
						}
					}
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		onChangePeriod() {
			if (funcUtils.isNotEmpty(this.periodReport) && funcUtils.isNotEmpty(this.dateReport)) {
				this.dateReport = null;
			}
		},
		onChangeDate() {
			this.periodReport = null;
		},
	}
}
</script>

<style scoped>

</style>
