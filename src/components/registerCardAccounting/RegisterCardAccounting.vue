<template>
	<Layout v-if="cardAccounting" class="height100-header flex-parent flex-parent--column bg-gray">
		<table-poptip :expDate="expDate" :clickFunction="createExpireCard"></table-poptip>
		<Header class="prose--dark bg-gray">
			<button type="button" @click="getPrev" class="txt-h2 my12">
				<Icon type="ios-arrow-back" size="45"/> 
				<span>ГРЗ: {{cardAccounting.item.tcRegno}}</span> 
			</button>
		</Header>
		<Split v-model="pageSplit" mode="vertical" class="viewport-almost" @on-moving="changeTableHeight">
			<div slot="top" style="height: 100%;">
				<Content style="height: 100%; min-height: 600px; min-width: 940px; overflow: auto; padding: 10px;" >
					<Row :gutter="5">
						<Col :xs="{span: 12}" :md="{span: 12}">
							<Row type="flex" :gutter="5">
								<Col :xs="{span: 24}" :md="{span: 24}" :lg="{span: 12}">
									<Card :padding="5" dis-hover bordered class="hmin300">
										<h4 slot="title" class="txt-h4">Разрешение</h4>
										<table class='table border--0'>
											<tbody>
												<tr class="bg-green-light color-green-dark">
													<td>Статус</td>
													<td class="txt-bold">Действующее</td>
												</tr>
												<tr class="color-red-dark bg-red-light">
													<td>Дата окончания</td>
													<td class="txt-bold">{{cardAccounting.item.permitEndDate}}</td>
												</tr>
												<tr>
													<td>Срок действия</td>
													<td class="txt-bold">{{cardAccounting.item.permitStartDate + ' - ' + cardAccounting.item.permitEndDate}}</td>
												</tr>
												<tr>
													<td>Дата создания</td>
													<td class="txt-bold">{{cardAccounting.item.createdTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
												</tr>
											</tbody>
										</table>
									</Card>
									<Card :padding="5" dis-hover bordered class="my12">
										<h4 slot="title" class="txt-h4">Системные сведения</h4>
										<div class="px12 my12">
											<div class='txt-h5'>Источник</div>
											<p class="txt-bold">{{cardAccounting.item.sourceName}}</p>
										</div>
										<div class="px12 my12">
											<div class='txt-h5'>Основание</div>
											<p class="txt-bold">{{cardAccounting.item.reasonName}}</p>
										</div>
										<div class="px12 my12">
											<div class='txt-h5'>Описание</div>
											<p class="txt-bold">{{cardAccounting.item.descr}}</p>
										</div>
									</Card>
								</Col>
								<Col :xs="{span: 24}" :md="{span: 24}" :lg="{span: 12}" >
									<Card :padding="5" dis-hover bordered class="wmax600 hmin300">
										<h4 slot="title" class="txt-h4">Транспортное средство</h4>
										<table class="table border--0 table--fixed">
											<tbody>
												<tr class="txt-bold">
													<td class="border--0 px0 py0 color-gray">ГРЗ</td>
													<td class="border--0 px0 py0">{{cardAccounting.item.tcRegno}}</td>
												</tr>
												<tr class="txt-bold">
													<td class="border--0 px0 py0 color-gray">Марка ТС</td>
													<td class="border--0 px0 py0">{{cardAccounting.item.brand}}</td>
												</tr>
												<tr class="txt-bold">
													<td class="border--0 px0 py0 color-gray">Модель</td>
													<td class="border--0 px0 py0">{{cardAccounting.item.model}}</td>
												</tr>
												<tr class="txt-bold">
													<td class="border--0 px0 py0 color-gray">Тип ТС</td>
													<td class="border--0 px0 py0">{{cardAccounting.item.categoryName}}</td>
												</tr>
											</tbody>
										</table>
									</Card>
									<Card :padding="5" dis-hover bordered class="wmax600 my12">
										<h4 slot="title" class="txt-h4">Владелец</h4>
										<table class="table border--0 table--fixed">
											<tbody>
												<tr class="txt-bold">
													<td class="border--0 px0 py0 color-gray">Фамилия(организация)</td>
													<td class="border--0 px0 py0">{{cardAccounting.item.ownerName}}</td>
												</tr>
												<tr class="txt-bold">
													<td class="border--0 px0 py0 color-gray">Адрес</td>
													<td class="border--0 px0 py0">{{cardAccounting.item.ownerAddress}}</td>
												</tr>
												<tr class="txt-bold">
													<td class="border--0 px0 py0 color-gray">Телефон</td>
													<td class="border--0 px0 py0">{{cardAccounting.item.ownerPhone}}</td>
												</tr>
											</tbody>
										</table>
									</Card>
								</Col>
							</Row>
						</Col>
						<Col :xs="{span: 12}" :md="{ span: 12}">
							<Card :padding="5" dis-hover bordered>
								<h3 slot="title" class="txt-h3">Данные ФИС</h3>
								<table v-if="cardAccounting.fisItem" class="table border--0">
									<tbody>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Фамилия(организация)</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.avFirst !== cardAccounting.fisItem.avFirst ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.avFirst}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.avFirst !== cardAccounting.fisItem.avFirst ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.avFirst}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">ГРЗ</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.regno !== cardAccounting.fisItem.regno ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.regno}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.regno !== cardAccounting.fisItem.regno ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.regno}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Марка ТС</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.marka !== cardAccounting.fisItem.marka ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.marka}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.marka !== cardAccounting.fisItem.marka ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.marka}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Модель</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.model !== cardAccounting.fisItem.model ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.model}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.model !== cardAccounting.fisItem.model ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.model}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Тип ТС</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.typeTcName !== cardAccounting.fisItem.typeTcName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.typeTcName}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.typeTcName !== cardAccounting.fisItem.typeTcName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.typeTcName}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Год выпуска ТС</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.yearAvto !== cardAccounting.fisItem.yearAvto ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.yearAvto}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.yearAvto !== cardAccounting.fisItem.yearAvto ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.yearAvto}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Цвет</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.color !== cardAccounting.fisItem.color ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.color}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.color !== cardAccounting.fisItem.color ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.color}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">VIN</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.vin !== cardAccounting.fisItem.vin ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.vin}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.vin !== cardAccounting.fisItem.vin ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.vin}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Номер кузова</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.nkuzov !== cardAccounting.fisItem.nkuzov ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.nkuzov}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.nkuzov !== cardAccounting.fisItem.nkuzov ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.nkuzov}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Номер шасси</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.nshasi !== cardAccounting.fisItem.nshasi ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.nshasi}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.nshasi !== cardAccounting.fisItem.nshasi ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.nshasi}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Тип кузова</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.typeKuzovName !== cardAccounting.fisItem.typeKuzovName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.typeKuzovName}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.typeKuzovName !== cardAccounting.fisItem.typeKuzovName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.typeKuzovName}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Мощность л/c</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.powerLs !== cardAccounting.fisItem.powerLs ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.powerLs}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.powerLs !== cardAccounting.fisItem.powerLs ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.powerLs}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Мощность кВт</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.powerKwt !== cardAccounting.fisItem.powerKwt ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.powerKwt}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.powerKwt !== cardAccounting.fisItem.powerKwt ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.powerKwt}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Максимальная масса</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.massaDop !== cardAccounting.fisItem.massaDop ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.massaDop}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.massaDop !== cardAccounting.fisItem.massaDop ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.massaDop}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Масса полная</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.massaTotal !== cardAccounting.fisItem.massaTotal ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.massaTotal}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.massaTotal !== cardAccounting.fisItem.massaTotal ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.massaTotal}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Объем двигателя</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.vmotorCm3 !== cardAccounting.fisItem.vmotorCm3 ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.vmotorCm3 + ' см'}}<sup>3</sup></td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.vmotorCm3 !== cardAccounting.fisItem.vmotorCm3 ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.vmotorCm3 + ' см'}}<sup>3</sup></td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Тип двигателя</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.typeMotor !== cardAccounting.fisItem.typeMotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.typeMotor}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.typeMotor !== cardAccounting.fisItem.typeMotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.typeMotor}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Номер двигателя</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.nmotor !== cardAccounting.fisItem.nmotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.nmotor}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.nmotor !== cardAccounting.fisItem.nmotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.nmotor}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Количество мест</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.posadMest !== cardAccounting.fisItem.posadMest ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.posadMest}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.posadMest !== cardAccounting.fisItem.posadMest ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.posadMest}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Экологический класс</td>
											<td :style="{color: null !== fisLoadData && fisLoadData.ecologClass !== cardAccounting.fisItem.ecologClass ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.ecologClass}}</td>
											<td v-if="fisLoadData" :style="{color: fisLoadData.ecologClass !== cardAccounting.fisItem.ecologClass ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.ecologClass}}</td>
										</tr>
									</tbody>
								</table>
							</Card>
						</Col>
					</Row>
				</Content>
			</div>
			<div slot="bottom" id="js_split" style="height: 100%; overflow: hidden" class="bg-white">
				<div style="height: 100%; overflow: auto">
					<div id="js_headingSplit" class="py12 px24">
						<h4 class="txt-h4 py0">Связанные пакеты</h4>
					</div>
					<Row v-if="cardAccounting.loadItems">
						<Col :sm="{span: 12}" :md="{span: 12}" :xl="{span: 18}">
							<Table ref="selection" :columns="columnsOption" :data="cardAccounting.loadItems" size="small" :show-header="false" @on-row-click="selectPackage" :height="tableHeight">
							</Table>	
						</Col>
						<Col v-if="package" :sm="{span: 12}" :md="{span: 12}" :xl="{span: 6}" style="overflow: auto;" :style="{height: tableHeight + 'px'}">
							<Card dis-hover style="height: 100%;">
								<Row>
									<Col :xs="{span: 12}" :md="{span: 12}">
										<b class="txt-bold">{{package.createTime | formatDateTime('DD.MM.YYYY HH:mm')}}</b>
										<table class="table border--0">
											<tbody>
												<tr class="txt-bold">
													<td width="30%" class="border--0 px0 py0 color-gray-light">Основание</td>
													<td width="70%" class="border--0 px0 py0">{{package.reasonName}}</td>
												</tr>
												<tr class="txt-bold">
													<td width="30%" class="border--0 px0 py0 color-gray-light">Источник</td>
													<td width="70%" class="border--0 px0 py0">{{package.sourceName}}</td>
												</tr>
												<tr class="txt-bold">
													<td width="30%" class="border--0 px0 py0 color-gray-light">Исполнитель</td>
													<td width="70%" class="border--0 px0 py0">{{package.createIspName}}</td>
												</tr>
											</tbody>
										</table>
									</Col>
									<Col :xs="{span: 12}" :md="{span: 12}">
										<button type="button" @click="getPackageCard" class="flex-parent flex-parent--row flex-parent--center-cross">
											<Icon type="ios-link" :size="30" class="mx12"/>
											<b class="text-b txt-underline">{{package.name}}</b>
										</button>
									</Col>
								</Row>
							</Card>
						</Col>
						<Col v-else :sm="{span: 12}" :md="{span: 12}" :xl="{span: 6}" style="overflow: auto;" :style="{height: tableHeight + 'px'}">
							<div class="prose--dark bg-gray" style="display: table; width: 100%; height: 100%;">
  								<div style="display: table-cell;text-align: center; vertical-align: middle;" class="txt-h3">Актуальное состояние карточки</div>
							</div>
						</Col>

					</Row>
				</div>
			</div>
		</Split>
	</Layout>
</template>


<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import TablePoptip from './../verstka/TablePoptip.vue';

export default {
	name: "RegisterCardAccounting",
	components: {
		TablePoptip
	},
	data() {
		return {
			package: null,
			fisLoadData: null,
			expDate: null,
			pageSplit: 0.7,
			bottomSplit: 0.8,
			tableHeight: 314,
			columnsOption: [{
					title: 'Иконка',
					key: 'icon',
					type: 'html',
					// width: '10px'
				},
				{
					title: 'Дата',
					key: 'reestrTime',
					// width: 'auto'
				},
				{
					title: 'ФИО',
					key: 'operName',
					// width: '23%'
				},
				{
					title: 'Время начала действия разрешения',
					key: 'permitStartDate',
					// width: '23%'
				},
				{
					title: 'Время окончания действия разрешения',
					key: 'permitEndDate',
					// width: '23%'
				},
			],
		};
	},
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
				vm.$store.dispatch('registerCardAccountingSetCid', cid);
				let prepareParams = {
					cid: cid
				};
				if (funcUtils.isNotEmpty(vm.$route.params.id) && funcUtils.isNotEmpty(vm.$route.params.sourceId)) {
					prepareParams.method = 'getData';
					prepareParams.params = {
						'id': vm.$route.params.id,
						'sourceId': vm.$route.params.sourceId
					};
				}

				let eventResponse = await vm.$store.dispatch('prepareData', prepareParams);
				vm.$store.dispatch('fillModule', { 'event': eventResponse });
			} catch (e) {
				alert(e.message);
			}
		})();

		this.$store.watch(this.$store.getters.registerCardAccountingGetCommand, () => {
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
		this.$store.dispatch('registerCardAccountingSetCid', null);
		this.$store.dispatch('registerCardAccountingSetData', {
			data: null
		});
	},
	computed: {
		cardAccounting() {
			let res;
			let data = this.$store.state.registerCardAccounting.data;
			if (data) {
				data.loadItems.sort((a, b) => {
					return b.reestrTime - a.reestrTime;
				});

				data.loadItems.forEach((item) => {
					item.icon = '<i class="ivu-icon ivu-icon-ios-eye" style="font-size: 30px;"></i>';
					item.operName = funcUtils.lookupValue('operTipes', item.operType).label;
					item.reestrTime = funcUtils.parseDateTime(item.reestrTime, 'DD.MM.YYYY HH:mm');
					item.permitStartDate = funcUtils.parseDateTime(item.permitStartDate, 'DD.MM.YYYY HH:mm');
					item.permitEndDate = funcUtils.parseDateTime(item.permitEndDate, 'DD.MM.YYYY HH:mm');
				});
				res = data;
			}
			return res;
		}
	},
	methods: {
		createExpireCard() {
			if (funcUtils.isNull(this.expDate)) return;

			let vm = this;

			(async () => {
				try {
					await vm.$store.dispatch('prepareData', {
						method: 'createExpireReestr',
						params: {
							expDate: this.expDate
						}
					});

					let eventResponse = await vm.$store.dispatch('prepareData', {});

					vm.$store.dispatch('fillModule', { 'event': eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		changeTableHeight() {
			this.tableHeight = (document.getElementById('js_split').offsetHeight - document.getElementById('js_headingSplit').offsetHeight);
		},
		selectPackage(row) {
			this.getLoadHead(row);
			this.getFisLoadData(row);
		},
		getLoadHead(row) {
			let vm = this;

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						method: 'getLoadHead',
						params: {
							headId: row.headId
						}
					});
					let dataJson = JSON.parse(eventResponse.response);
					vm.package = dataJson.data;
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getFisLoadData(row) {
			let vm = this;

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						method: 'getFisLoadData',
						params: {
							tsId: row.tcId
						}
					});
					let dataJson = JSON.parse(eventResponse.response);
					vm.fisLoadData = dataJson.data;
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getPrev: function() {
			let vm = this;
			let path = funcUtils.getFromSessionStorage('path');
			(async () => {
				try {
					let currentPage = await vm.$store.dispatch('getCurrentPage', path);
					if (currentPage.params.routeName === vm.$store.state.registerReestr.routeName) {
						vm.$root.getRegisterReestr();
					} else {
						await vm.$store.dispatch('getPrevComponent');
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
		getPackageCard() {
			let params = {
				'routeName': this.$store.state.registerCardAccounting.routeName,
				'headId': this.package.id
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch('getNextComponent', {
						'beanName': vm.$store.state.packageCard.bean
					});
					vm.$store.dispatch('getNextPage', {
						'vm': vm,
						'pageName': vm.$store.state.packageCard.routeName,
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
.layout {
	min-height: 100vh;
}

.footer {
	min-height: 300px;
}
</style>
