<template>
	<!-- <div v-if="packageCard">
			    <button type="button" @click="getPrev">Назад</button>
			    <button type="button" v-if="packageCard.head.formatType === 1 || packageCard.head.formatType === 2" @click="downloadBody">Вложение</button>
			    <button type="button" v-if="packageCard.head.formatType === 1 || packageCard.head.formatType === 2" @click="downloadSign">Сертификат</button>
			    {{packageCard}}
			  </div> -->
	
	
	
	
	<Layout v-if="packageCard" class="height100-header flex-parent flex-parent--column bg-gray">
		<Header class="prose--dark bg-gray">
			<button type="button" @click="getPrev" class="txt-h2 my12">
					<Icon type="ios-arrow-back" size="45"/> 
					<span>Пакет: {{packageCard.head.name}}</span> 
				</button>
		</Header>
	
	
		<Split v-model="pageSplit" mode="vertical" class="viewport-almost" @on-move-end="changeTableHeight" min="520" max="300">
			<div slot="top" style="height: 100%;  overflow: auto">
				<Content class="flex-parent flex-parent--center-main flex-parent--center-cross" style="height: 100%; min-height: 600px; min-width: 940px;">
					<Row :gutter="8" justify="center">
						<Col :xs="{span: 12}" :md="{span: 10}">
						<Card class="my12" :padding="0">
							<b slot="title" class="txt-h4">Основные сведения</b>
							<div class="flex-parent flex-parent--column align-center my24">
								<Icon type="ios-document" size="150" />
								<span>{{packageCard.head.name + '.' + packageCard.head.formatName.toLowerCase()}}</span>
							</div>
							<table class="table table--fixed border--0" style="max-width: 650px">
								<tbody>
									<tr class="txt-bold bg-green-light">
										<td class="border--0">Статус обработки</td>
										<td class="border--0 color-green-dark txt-h4">Завершено</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px5 py3 color-gray">Способ загрузки</td>
										<td class="border--0 px5 py3">{{packageCard.head.formatName.toLowerCase()}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px5 py3 color-gray">Дата создания</td>
										<td class="border--0 px5 py3">{{packageCard.head.createTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px5 py3 color-gray">Дата загрузки</td>
										<td class="border--0 px5 py3">{{packageCard.head.signingTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px5 py3 color-gray">Исполнитель</td>
										<td class="border--0 px5 py3">{{packageCard.head.createIspName}}</td>
									</tr>
								</tbody>
							</table>
						</Card>
						</Col>
						<Col :xs="{span: 12}" :md="{span: 10}">
							<Card class="my12">
								<b slot="title" class="txt-h4">Результаты обработки</b>
								<table class="table border--0">
									<tbody>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Число записей</td>
											<td class="border--0 px0 py0">{{packageCard.items.length}}</td>
										</tr>
										<tr class="txt-bold color-green">
											<td class="border--0 px0 py0">Добавлено</td>
											<td class="border--0 px0 py0">{{statistic.added}}</td>
										</tr>
										<tr class="txt-bold color-green">
											<td class="border--0 px0 py0">Обновлено</td>
											<td class="border--0 px0 py0">{{statistic.updated}}</td>
										</tr>
										<tr class="txt-bold color-orange">
											<td class="border--0 px0 py0">Загружается</td>
											<td class="border--0 px0 py0">{{statistic.loading}}</td>
										</tr>
										<tr class="txt-bold color-red">
											<td class="border--0 px0 py0">Обрабатывается</td>
											<td class="border--0 px0 py0">{{statistic.prepared}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Отклонен</td>
											<td class="border--0 px0 py0">{{statistic.rejected}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Принят</td>
											<td class="border--0 px0 py0">{{statistic.accepted}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0">Ожидает согласования</td>
											<td class="border--0 px0 py0">{{statistic.awaited}}</td>
										</tr>
									</tbody>
								</table>
							</Card>
							<Card class="my12">
								<b slot="title" class="txt-h4">Связанные файлы</b>
								<Row>
									<Col :xs="{span: 24}" :md="{span: 12}">
										<div @click="downloadBody" class="flex-parent flex-parent--column align-center cursor-pointer color-blue-on-hover transition">
											<Icon type="ios-attach" size="60" />
											<span>Вложение</span>
										</div>
									</Col>
									<Col :xs="{span: 24}" :md="{span: 12}">
										<div @click="downloadSign" class="flex-parent flex-parent--column align-center cursor-pointer color-blue-on-hover transition">
											<Icon type="ios-cog" size="60" />
											<span>Сертификат</span>
										</div>
									</Col>
								</Row>
							</Card>
						</Col>
					</Row>
				</Content>
			</div>
			<div slot="bottom" id="js_split" style="height: 100%; overflow: hidden" class="bg-white">
				<div style="height: 100%; overflow: hidden">
					<div id="js_headingSplit" class="py12 px24">
						<h4 class="txt-h4 py0">Связанные объекты реестра</h4>
					</div>
					<Row>
						<Col :xs="{span: 18}" :md="{span: 18}">
						<Table ref="selection" :columns="columnsOption" :data="packageCard.items" size="small" @on-row-click="selectItem" :height="tableHeight">
						</Table>
						</Col>
						<Col v-if="selectedItem" :xs="{span: 6}" :md="{span: 6}" style="overflow: auto;" :style="{height: tableHeight + 'px'}">
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
					</Row>
				</div>
			</div>
		</Split>
	</Layout>
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";

export default {
	name: "PackageCard",
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
				vm.$store.dispatch('packageCardSetCid', cid);
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

		this.$store.watch(this.$store.getters.packageCardGetCommand, () => {
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
		this.$store.dispatch('packageCardSetCid', null);
		this.$store.dispatch('packageCardSetData', {
			data: null
		});
	},
	data() {
		return {
			pageSplit: 0.6,
			bottomSplit: 0.8,
			columnsOption: [{
					title: ' ',
					key: 'icon',
					width: 80,
					render: (h, params) => {
						return h('Icon', {
							props: {
								size: 30,
								type: 'ios-eye'
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
			tableHeight: 435,
		}
	},
	computed: {
		packageCard: function() {
			let res;
			let data = this.$store.state.packageCard.data;
			if (data) {
				data.items.forEach((item) => {
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
		changeTableHeight() {
			this.tableHeight = (document.getElementById('js_split').offsetHeight - document.getElementById('js_headingSplit').offsetHeight);
		},
		doSomeWithSplit(e) {
			e.stopPropagation();
			e.preventDefault();
		},
		selectItem(row) {
			this.selectedItem = row;
		},
		downloadBody() {
			let vm = this;

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						method: 'getBody'
					});
					let dataJson = JSON.parse(eventResponse.response);

					let binary_string = window.atob(dataJson.data);
					let len = binary_string.length;
					let bytes = new Uint8Array(len);
					for (let i = 0; i < len; i++) {
						bytes[i] = binary_string.charCodeAt(i);
					}

					let blob = new Blob([bytes.buffer], { type: 'data:application/octet-stream' });

					let blobUrl = URL.createObjectURL(blob);

					let element = document.createElement('a');
					element.setAttribute('href', blobUrl);
					element.setAttribute('download', vm.packageCard.head.name + '.' + vm.packageCard.head.formatName.toLowerCase());

					element.style.display = 'none';
					document.body.appendChild(element);

					element.click();

					document.body.removeChild(element);
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		downloadSign() {
			let vm = this;

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						method: 'getSign'
					});
					let dataJson = JSON.parse(eventResponse.response);
					let href = 'data:application/octet-stream;charset=utf-8;text/plain,' + dataJson.data;

					let element = document.createElement('a');
					element.setAttribute('href', href);
					element.setAttribute('download', vm.packageCard.head.name + '.txt');

					element.style.display = 'none';
					document.body.appendChild(element);

					element.click();

					document.body.removeChild(element);
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
				'routeName': this.$store.state.packageCard.routeName,
				'id': this.selectedItem.reestrId,
				'sourceId': this.packageCard.head.sourceId
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
</style>
