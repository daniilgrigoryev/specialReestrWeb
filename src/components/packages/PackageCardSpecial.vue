<template>
	<Layout v-if="packageCardSpecial" class="height100-header flex-parent flex-parent--column bg-gray">
		<Header class="prose--dark bg-gray">
			<button type="button" @click="getPrev" class="txt-h2 my12">
				<Icon type="ios-arrow-back" size="45"/> 
				<span>Пакет: {{packageCardSpecial.head.name}}</span>
			</button>
		</Header>


		<Split v-model="pageSplit" mode="vertical" class="viewport-almost" @on-moving="changeTableHeight" min="400" max="200">
			<div slot="top" style="height: 100%;  overflow: auto">
				<Content style="height: 100%; min-height: 600px; min-width: 940px;" class="flex-parent flex-parent--center-main flex-parent--center-cross">
					<Row :gutter="8" justify="center" style="max-width: 740px">
						<div class="mx-auto wmax300 align-center prose color-gray-light">
							<Icon type="ios-lock-outline" size="150"/><br>
							<p class="txt-h5">Данный пакет был утвержден 05.10.2018 и более не может быть изменен</p>
						</div>
						<Col :xs="{span: 12}" :md="{span: 12}">
							<Card class="my12" :padding="0">
								<b slot="title" class="txt-h4">Основные сведения</b>
								<table class="table table--fixed border--0" style="max-width: 650px">
									<tbody>
										<tr class="txt-bold bg-green-light">
											<td class="border--0">Статус обработки</td>
											<td class="border--0 color-green-dark txt-h4">Завершено</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0">Источник</td>
											<td class="border--0">{{packageCardSpecial.head.sourceName}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0">Основание</td>
											<td class="border--0">{{packageCardSpecial.head.reasonName}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0">Дата создания</td>
											<td class="border--0">{{packageCardSpecial.head.createTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0">Дата загрузки</td>
											<td class="border--0">{{packageCardSpecial.head.signingTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0">Исполнитель</td>
											<td class="border--0">{{packageCardSpecial.head.createIspName}}</td>
										</tr>
									</tbody>
								</table>
							</Card>
						</Col>
						<Col :xs="{span: 12}" :md="{span: 12}">
							<Card class="my12">
								<b slot="title" class="txt-h4">Результаты обработки</b>
								<table class="table border--0">
									<tbody>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Число записей</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.items.length}}</td>
										</tr>
										<tr class="txt-bold color-green">
											<td class="border--0 px0 py0">Добавлено</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.added}}</td>
										</tr>
										<tr class="txt-bold color-green">
											<td class="border--0 px0 py0">Обновлено</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.updated}}</td>
										</tr>
										<tr class="txt-bold color-orange">
											<td class="border--0 px0 py0">Загружается</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.loading}}</td>
										</tr>
										<tr class="txt-bold color-red">
											<td class="border--0 px0 py0">Обрабатывается</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.prepared}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Отклонен</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.rejected}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Принят</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.accepted}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Ожидает согласования</td>
											<td class="border--0 px0 py0">{{packageCardSpecial.awaited}}</td>
										</tr>
									</tbody>
								</table>
							</Card>
						</Col>
					</Row>
				</Content>
			</div>
			<div slot="bottom" style="height: 100%; overflow: hidden">
				<Split :stopSplit="true" v-model="bottomSplit" mode="vertical">
					<div slot="top" id="js_split" class="bg-white" style="height: 100%; overflow: hidden">
						<div id="js_headingSplit" class="py12 px24">
							<h4 class="txt-h4 py0">Объекты реестра</h4>
							<small class="py0">Отметьте объекты реестра для утверждения, исключите лишнее</small>
						</div>
						<Row>
							<Col :xs="{span: 18}" :md="{span: 18}">
								<Tabs :animated="false" id="tab" size="small">
									<TabPane label="Все">
										<Table ref="selection" :columns="columnsOption" :data="packageCardSpecial.items" size="small" @on-row-click="selectItem" :height="tableHeight"></Table>
									</TabPane>
									<TabPane label="Отмеченные">标签二的内容</TabPane>
									<TabPane label="Не отмеченные">标签三的内容</TabPane>
								</Tabs>

							</Col>
							<Col v-if="selectedItem" :sm="{span: 6}" :md="{span: 6}" :xl="{span: 6}"  style="overflow: auto;" :style="{height: tableHeight + 'px'}">
								<Card dis-hover style="height: 100%;">
									<button type="button" @click="getCardAccounting" class="txt-bold txt-underline">
										<span>{{selectedItem.tcRegno}}</span>
										<Icon type="ios-share-alt" class="mx12 mb6" size="20" />
									</button>
									<table class="table border--0">
										<tbody>
											<tr class="txt-bold">
												<td v-if="selectedItem.operType === 1" colspan="2" class="border--0 px0 py0 color-blue txt-uppercase">Добавлено</td>
												<td v-if="selectedItem.operType === 2" colspan="2" class="border--0 px0 py0 color-blue txt-uppercase">Обновлено</td>
											</tr>
											<tr class="txt-bold">
												<td width="30%" class="border--0 px0 py0 color-gray">ГРЗ</td>
												<td width="70%" class="border--0 px0 py0">{{selectedItem.tcRegno}}</td>
											</tr>
											<tr class="txt-bold">
												<td width="30%" class="border--0 px0 py0 color-gray">Категория</td>
												<td width="70%" class="border--0 px0 py0">{{selectedItem.categoryName}}</td>
											</tr>
											<tr class="txt-bold">
												<td width="30%" class="border--0 px0 py0 color-gray">Марка</td>
												<td width="70%" class="border--0 px0 py0">{{selectedItem.brand}}</td>
											</tr>
											<tr class="txt-bold">
												<td width="30%" class="border--0 px0 py0 color-gray">Модель</td>
												<td width="70%" class="border--0 px0 py0">{{selectedItem.model}}</td>
											</tr>
										</tbody>
									</table>
								</Card>
							</Col>
							<Col v-else :sm="{span: 6}" :md="{span: 6}" :xl="{span: 6}" style="overflow: auto;" :style="{height: tableHeight + 'px'}">
								<div class="prose--dark bg-gray" style="display: table; width: 100%; height: 100%;">
									<div style="display: table-cell;text-align: center; vertical-align: middle;" class="txt-h3">Актуальное состояние карточки</div>
								</div>
							</Col>
						</Row>	
					</div>
					<div slot="bottom" style="height: 100%; overflow: hidden" class="bg-white">
						<div class="flex-parent flex-parent--center-main flex-parent--center-cross flex-parent--center-cross" style="height: 100%;">
							<Form>
								<p class="color-gray txt-m mb12">Выберете дату утверждения и нажмите кнопку "Утвердить"</p>
								<Row type="flex" justify="center">
									<DatePicker type="date" placeholder="Выберете дату" class="mr6"></DatePicker>
									<Button type="primary" class="ml6">Утвердить</Button>
								</Row>
							</Form> 				
						</div>
					</div>
				</Split>
			</div>
		</Split>
	</Layout>
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";

export default {
	name: "PackageCardSpecial",
	beforeCreate: function() {
		let vm = this;
		(async () => {
			try {
				let wid = sessionStorage.getItem('wid');
				let componentsRoute = funcUtils.getFromSessionStorage(wid);
				let currentComponent = await vm.$store.dispatch('getCurrentComponent', {
					componentArr: componentsRoute
				});
				let cid = currentComponent.cid;
				vm.$store.dispatch('packageCardSpecialSetCid', cid);
				let prepareParams = {
					cid: cid
				};
				if (funcUtils.isNotEmpty(vm.$route.params.headId)) {
					prepareParams.method = 'getData';
					prepareParams.params = {
						'headId': vm.$route.params.headId
					};
				}

				let eventResponse = await vm.$store.dispatch('prepareData', prepareParams);
				vm.$store.dispatch('fillModule', { 'event': eventResponse });
			} catch (e) {
				alert(e.message);
			}
		})();

		this.$store.watch(this.$store.getters.packageCardSpecialGetCommand, () => {
			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {});
					vm.$store.dispatch('fillModule', { 'event': eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		});
	},
	destroyed() {
		this.$store.dispatch('packageCardSpecialSetCid', null);
		this.$store.dispatch('packageCardSpecialSetData', {
			data: null
		});
	},
	data() {
		return {
			pageSplit: 0.6,
			bottomSplit: 0.7,
			columnsOption: [{
					title: ' ',
					key: 'selected',
					width: 80,
          render: (h, params) => {
            return h('Checkbox', {
              props: {
                value: params.row.selected
              }
            });
          }
				},
				{
					title: 'ГРЗ',
					key: 'tcRegno',
					minWidth: 120,
				},
				{
					title: 'Состояние',
					key: 'statusName',
					minWidth: 100,
				},
				{
					title: 'Категория спецтранспорта',
					key: 'categoryName',
					minWidth: 100,
				},
				{
					title: 'Наименование организации',
					key: 'ownerName',
					minWidth: 120,
				}
			],
			statistic: {
				added: 0,
				updated: 0,
				loading: 0,
				prepared: 0,
				rejected: 0,
				accepted: 0,
				awaited: 0,
			},
			selectedItem: null,
			tableHeight: 280,
		}
	},
	computed: {
    packageCardSpecial: function() {
			let res;
			let data = this.$store.state.packageCardSpecial.data;
			if (data) {
				data.items.forEach((item) => {
				  this.$set(item, 'selected', false);
					switch (item.operType) {
						case 1:
							{
								this.statistic.added++;
								break;
							}
						case 2:
							{
								this.statistic.updated++;
								break;
							}
					}
					switch (item.statusId) {
						case 1:
							{
								this.statistic.loading++;
								break;
							}
						case 2:
							{
								this.statistic.prepared++;
								break;
							}
						case 3:
							{
								this.statistic.rejected++;
								break;
							}
						case 4:
							{
								this.statistic.accepted++;
								break;
							}
						case 5:
							{
								this.statistic.awaited++;
								break;
							}
					}
				});
				res = data;
			}
			return res;
		}
	},
	methods: {
		changeTableHeight(){
			this.tableHeight = (document.getElementById('js_split').offsetHeight - document.getElementById('js_headingSplit').offsetHeight);

			let tab = document.getElementById('tab');
			if (tab) {
				let tabsBar = tab.getElementsByClassName('ivu-tabs-bar')[0];
				this.tableHeight = this.tableHeight - tabsBar.offsetHeight;
			}
		},
		selectItem(row) {
			this.selectedItem = row;
		},
		getPrev() {
			let vm = this;
			let path = funcUtils.getFromSessionStorage('path');
			(async () => {
				try {
					let currentPage = await vm.$store.dispatch('getCurrentPage', path);
					await vm.$store.dispatch('getPrevComponent');
					if (currentPage.params.routeName === vm.$store.state.packageReestr.routeName) {
						vm.$root.getPackageReestr();
					} else {
						vm.$store.dispatch('getPrevPage', {
							'vm': vm,
							'pageName': currentPage.params.routeName
						});
					}
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getCardAccounting() {
			let params = {
				'routeName': this.$store.state.packageCardSpecial.routeName,
				'id': this.selectedItem.reestrId,
				'sourceId': this.packageCardSpecial.head.sourceId
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch('getNextComponent', {
						'beanName': vm.$store.state.registerCardAccounting.bean
					});
					vm.$store.dispatch('getNextPage', {
						'vm': vm,
						'pageName': vm.$store.state.registerCardAccounting.routeName,
						'params': params
					});
				} catch (e) {
					alert(e.message);
				}
			})();
		},
	}
}
</script>

<style lang="scss">
.footer {
	min-height: 300px;
}

.content {
	max-width: 780px;
}
#tab .ivu-tabs-bar{
	margin-bottom: 0;
}
</style>
