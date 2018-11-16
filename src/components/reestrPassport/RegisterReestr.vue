<template>
	<Layout class="height100-header">
		<table-poptip :expDate="expDate" :clickFunction="createExpireReestr"></table-poptip>
		<Sider width="350px" style="min-width: 350px" class="px18 py18 bg-white">
			<Form label-position="top">
				<h3 class="txt-h3 m12">Фильтр объектов</h3>
				<FormItem label="Признак активности" class="my0">
					<RadioGroup v-model="filter.flgActive.value1" size="small">
						<Radio label="null">Все</Radio>
						<Radio label="T">Активные</Radio>
						<Radio label="F">Неактивные</Radio>
					</RadioGroup>
				</FormItem>
				<Row :gutter="8" class="my6">
					<Col :xs="{span: 12}" :lg="{span: 12}">
					<FormItem label="ГРЗ" class="my0">
						<Input v-model="filter.tcRegno.value1"></Input>
					</FormItem>
					</Col>
					<Col :xs="{span: 12}" :lg="{span: 12}">
					<FormItem label="Источник" class="my0">
						<Select :clearable="true" v-model="filter.sourceId.value1">
							<Option style="white-space: pre-wrap" v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<FormItem label="Основание" class="my6">
					<Select :clearable="true" v-model="filter.reasonId.value1" style="max-width: 380px;">
						<Option style="white-space: pre-wrap;" v-for="item in reasonDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="Категория" class="my6">
					<Select :clearable="true" v-model="filter.categoryId.value1" style="max-width: 380px;">
						<Option style="white-space: pre-wrap" v-for="item in categoryDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
				<FormItem label="Владелец (Название или ФИО)" class="my6">
					<Input v-model="filter.ownerName.value1"></Input>
				</FormItem>
				<FormItem label="Время создания записи" :style="{width: '100%'}" class="my6">
					<Row :gutter="8">
						<Col :xs="{span: 12}" :lg="{span: 12}">
							<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value1" style="width: 100%"></DatePicker>
						</Col>
						<Col :xs="{span: 12}" :lg="{span: 12}">
							<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value2" style="width: 100%"></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="Дата начала действия разрешения" class="my6">
					<Row :gutter="8">
						<Col :xs="{span: 12}" :lg="{span: 12}">
							<DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value1" style="width: 100%"></DatePicker>
						</Col>
						<Col :xs="{span: 12}" :lg="{span: 12}">
							<DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value2" style="width: 100%"></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="Дата окончания действия разрешения" class="my6">
					<Row :gutter="8">
						<Col :xs="{span: 12}" :lg="{span: 12}">
							<DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value1" style="width: 100%"></DatePicker>
						</Col>
						<Col :xs="{span: 12}" :lg="{span: 12}">
							<DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value2" style="width: 100%"></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem class="my6">
					<Row type="flex" justify="center">
						<Col>
							<Button @click="filterRegisters" type="primary">Применить</Button>
						</Col>
						<Col>
							<Button class="mx6">Отчистить</Button>
						</Col>
					</Row>
				</FormItem>
			</Form>
		</Sider>
		<Content>
			<Card :padding="8" dis-hover :bordered="false">
				<Row type="flex" justify="space-between" class="my6">
					<Col :xs="{span: 24}" :md="{span: 12}">
						<h3 class="txt-h3">Регистр учета объектов ({{countRegister}})</h3>
					</Col>
					<Col :xs="{span: 24}" :md="{span: 12}">
					<Row type="flex" justify="center">
						<Page :total="countRegister" :current="currentPage" :page-size="limit" @on-change="changePage" />
					</Row>
					</Col>
				</Row>
				<Table border ref="selection" size="small" :columns="columnsOption" @on-select="selectRegister" :data="registers" @on-sort-change="sortRegisters"></Table>
			</Card>
		</Content>
	</Layout>
	
	
	
	<!--<div>
	                <div style="display: flex;">
	                  <div style="width: 30%; display: flex; flex-direction: column;">
	                    <div>
	                      <RadioGroup v-model="filter.flgActive.value1">
	                        <Radio label="null">Все</Radio>
	                        <Radio label="T">Активные</Radio>
	                        <Radio label="F">Неактивные</Radio>
	                      </RadioGroup>
	                    </div>
	                    <div>
	                      <span>ГРЗ</span>
	                      <input v-model="filter.tcRegno.value1" />
	                    </div>
	                    <div>
	                      <span>Источник</span>
	                      <Select :clearable="true" v-model="filter.sourceId.value1">
	                        <Option v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
	                      </Select>
	                    </div>
	                    <div>
	                      <span>Основание</span>
	                      <Select :clearable="true" v-model="filter.reasonId.value1">
	                        <Option v-for="item in reasonDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
	                      </Select>
	                    </div>
	                    <div>
	                      <span>Категория</span>
	                      <Select :clearable="true" v-model="filter.categoryId.value1">
	                        <Option v-for="item in categoryDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
	                      </Select>
	                    </div>
	                    <div>
	                      <span>Владелец (Название или ФИО)</span>
	                      <input v-model="filter.ownerName.value1" />
	                    </div>
	                    <div>
	                      <span>Время создания записи</span>
	                      <div style="display: flex;">
	                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value1" placeholder="Select time1"></DatePicker>
	                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value2" placeholder="Select time2"></DatePicker>
	                      </div>
	                    </div>
	                    <div>
	                      <span>Дата начала действия разрешения</span>
	                      <div style="display: flex;">
	                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value1" placeholder="Select time1"></DatePicker>
	                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value2" placeholder="Select time2"></DatePicker>
	                      </div>
	                    </div>
	                    <div>
	                      <span>Дата окончания действия разрешения</span>
	                      <div style="display: flex;">
	                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value1" placeholder="Select time1"></DatePicker>
	                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value2" placeholder="Select time2"></DatePicker>
	                      </div>
	                    </div>
	            
	                    <button type="button" @click="filterRegisters">Применить</button>
	            
	                    <div>
	                      <span>
	                        Задать дату окончания действия
	                      </span>
	                      <DatePicker type="date" format="yyyy-MM-dd" v-model="expDate" placeholder="Select expDate"></DatePicker>
	                      <button @click="createExpireReestr">Применить к выбранным</button>
	                    </div>
	                  </div>
	                  <div style="width: 70%;">
	                    <Page :total="countRegister" :current="currentPage" :page-size="limit" @on-change="changePage" />
	                    <table style="width: 100%;">
	                      <thead>
	                      <tr>
	                        <td>
	                          <input type="checkbox" v-model="allChecked" />
	                        </td>
	                        <td style="cursor: pointer;" :style="isSorted('tcRegno')" @click="sortRegisters('tcRegno')">ГРЗ</td>
	                        <td style="cursor: pointer;" :style="isSorted('createdTime')" @click="sortRegisters('createdTime')">Дата создания</td>
	                        <td style="cursor: pointer;" :style="isSorted('sourceId')" @click="sortRegisters('sourceId')">Источник</td>
	                        <td style="cursor: pointer;" :style="isSorted('reasonId')" @click="sortRegisters('reasonId')">Основание включения</td>
	                        <td style="cursor: pointer;" :style="isSorted('permitStartDate')" @click="sortRegisters('permitStartDate')">Начало действия разрешения</td>
	                        <td style="cursor: pointer;" :style="isSorted('permitEndDate')" @click="sortRegisters('permitEndDate')">Окончание действия разрешения</td>
	                        <td style="cursor: pointer;" :style="isSorted('brand,model')" @click="sortRegisters('brand,model')">Марка/Модель</td>
	                        <td style="cursor: pointer;" :style="isSorted('categoryId')" @click="sortRegisters('categoryId')">Категория спецтранспорта</td>
	                        <td style="cursor: pointer;" :style="isSorted('ownerName')" @click="sortRegisters('ownerName')">Название владельца</td>
	                        <td style="cursor: pointer;" :style="isSorted('descr')" @click="sortRegisters('descr')">Описание к записи</td>
	                      </tr>
	                      </thead>
	            
	                      <tbody>
	                      <tr v-for="(register, index) in registers" class="registersRow" @click="getCardAccounting(register)" :key="index">
	                        <td>
	                          <input @click.stop="selectRegister(register)" :disabled="register.tcId === null" type="checkbox" v-model="register.selected" />
	                        </td>
	                        <td>
	                          {{register.tcRegno}}
	                        </td>
	                        <td>
	                          {{register.createdTime | formatDateTime('DD.MM.YYYY HH:mm')}}
	                        </td>
	                        <td>
	                          {{register.sourceName}}
	                        </td>
	                        <td>
	                          {{register.reasonName}}
	                        </td>
	                        <td>
	                          {{register.permitStartDate | formatDateTime('DD.MM.YYYY')}}
	                        </td>
	                        <td>
	                          {{register.permitEndDate | formatDateTime('DD.MM.YYYY')}}
	                        </td>
	                        <td>
	                          {{register.brand + ' / ' + register.model}}
	                        </td>
	                        <td>
	                          {{register.categoryName}}
	                        </td>
	                        <td>
	                          {{register.ownerName}}
	                        </td>
	                        <td>
	                          {{register.descr}}
	                        </td>
	                      </tr>
	                      </tbody>
	                    </table>
	                  </div>
	                </div>
	              </div>-->
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import TableRegister from "./../verstka/TableRegister.vue";
import FilterObjects from "./../verstka/FilterObjects.vue";
import TablePoptip from "./../verstka/TablePoptip.vue";

export default {
	name: "RegisterReestr",
	components: {
		TableRegister,
		FilterObjects,
		TablePoptip
	},
	beforeCreate() {
		let vm = this;
		let cid = funcUtils.getfromLocalStorage("registerReestr");

		(async () => {
			try {
				let eventResponse;
				if (funcUtils.isNull(cid)) {
					eventResponse = await vm.$store.dispatch("prepareData", {
						beanName: vm.$store.state.registerReestr.bean,
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
								if (dataJson.method === "addCID") {
									cid = respData.cid;
									funcUtils.addToLocalStorage("registerReestr", cid);
									eventResponse = await vm.$store.dispatch("prepareData", {
										method: "getData",
										params: {
											filter: null,
											sort: null,
											from: vm.from,
											limit: vm.limit
										},
										cid: cid
									});
								}
							} else {
								if (!funcUtils.isNull(respError)) {
									alert(respError.errorMsg);
								}
							}
						}
					}
				} else {
					eventResponse = await vm.$store.dispatch("prepareData", {
						params: null,
						cid: cid
					});
					let filter = JSON.parse(eventResponse.response).data.filter;
					if (
						funcUtils.isNotEmpty(filter) &&
						funcUtils.isNotEmpty(filter.filter)
					) {
						filter.filter.forEach(item => {
							vm.filter[item.field].value1 = item.value1;
							vm.filter[item.field].value2 = item.value2;
						});
					}

					let sort = JSON.parse(eventResponse.response).data.sort;
					if (funcUtils.isNotEmpty(sort) && funcUtils.isNotEmpty(sort.sort)) {
						sort.sort.forEach(item => {
							vm.sort[item.field] = item.desc;
							vm.columnsOption.forEach(col => {
								if (
									funcUtils.isNotEmpty(col) &&
									funcUtils.isNotEmpty(col.referenceName)
								) {
									let colNames = col.referenceName.split(",");
									colNames.forEach(colName => {
										if (colName === item.field) {
											vm.$set(col, "sortType", item.desc ? "desc" : "asc");
										}
									});
								}
							});
						});
					}
				}
				vm.$store.dispatch("registerReestrSetCid", cid);
				await vm.$store.dispatch("fillModule", { event: eventResponse });

				eventResponse = await vm.$store.dispatch("prepareData", {
					method: "getSourceDict",
					cid: cid
				});
				let sourceDict = JSON.parse(eventResponse.response).data;
				for (let prop in sourceDict) {
					if (sourceDict.hasOwnProperty(prop)) {
						vm.sourceDict.push({
							value: prop,
							label: sourceDict[prop]
						});
					}
				}

				eventResponse = await vm.$store.dispatch("prepareData", {
					method: "getReasonDict",
					cid: cid
				});
				let reasonDict = JSON.parse(eventResponse.response).data;
				for (let prop in reasonDict) {
					if (reasonDict.hasOwnProperty(prop)) {
						vm.reasonDict.push({
							value: prop,
							label: reasonDict[prop]
						});
					}
				}

				eventResponse = await vm.$store.dispatch("prepareData", {
					method: "getCategoryDict",
					cid: cid
				});
				let categoryDict = JSON.parse(eventResponse.response).data;
				for (let prop in categoryDict) {
					if (categoryDict.hasOwnProperty(prop)) {
						vm.categoryDict.push({
							value: prop,
							label: categoryDict[prop]
						});
					}
				}
			} catch (e) {
				alert(e.message);
			}
		})();

		this.$store.watch(this.$store.getters.registerReestrGetCommand, () => {
			(async () => {
				try {
					let eventResponse = vm.$store.dispatch("prepareData", {
						cid: cid
					});
					vm.$store.dispatch("fillModule", { event: eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		});
	},
	destroyed() {
		this.$store.dispatch("registerReestrSetCid", null);
		this.$store.dispatch("registerReestrSetData", {
			data: null
		});
	},
	data() {
		return {
			columnsOption: [{
					type: "selection",
					width: 50,
					align: "center",
					key: "selected",
					fixed: "left",
				},
				{
					title: "№",
					width: 80,
					align: "center",
					key: "num"
				},
				{
					title: "ГРЗ",
					key: "tcRegno",
					sortable: true,
					referenceName: "tcRegno",
					align: "center",
					minWidth: 120,
					ellipsis: true,
					tooltip: true,
				},
				{
					title: "Дата экспирации",
					key: "createdTime",
					sortable: true,
					referenceName: "statusId",
					align: "center",
					minWidth: 160,
					ellipsis: true,
					tooltip: true,
				},
				{
					title: "Источник",
					key: "sourceName",
					sortable: true,
					referenceName: "sourceId",
					align: "center",
					minWidth: 100,
					ellipsis: true,
					tooltip: true,
				},
				{
					title: "Основание включения",
					key: "reasonName",
					sortable: true,
					referenceName: "reasonId",
					ellipsis: true,
					tooltip: true,
					align: "center",
					minWidth: 120,
					maxWidth: 240,
					renderHeader: (h, params) => {
						return h('Tooltip', {
							props: {
								placement: 'bottom',
								content: params.column.title,
								transfer: true,
							}

						}, [
							h('span', params.column.title)
						])
					}
				},
				{
					title: "Начало действия разрешения",
					key: "permitStartDate",
					sortable: true,
					referenceName: "permitStartDate",
					minWidth: 100,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('Tooltip', {
							props: {
								placement: 'bottom',
								content: params.column.title,
								transfer: true,
							}

						}, [
							h('span', params.column.title)
						])
					}
				},
				{
					title: "Окончание действия разрешения",
					key: "permitEndDate",
					sortable: true,
					referenceName: "permitEndDate",
					minWidth: 100,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('Tooltip', {
							props: {
								placement: 'bottom',
								content: params.column.title,
								transfer: true,
							}

						}, [
							h('span', params.column.title)
						])
					}
				},
				{
					title: "Марка/Модель",
					key: "brand,model",
					sortable: true,
					referenceName: "brand,model",
					minWidth: 200,
				},
				{
					title: "Категория спецтранспорта",
					key: "categoryName",
					sortable: true,
					referenceName: "categoryId",
					minWidth: 190,
					ellipsis: true,
					tooltip: true,
					renderHeader: (h, params) => {
						return h('Tooltip', {
							props: {
								placement: 'bottom',
								content: params.column.title,
								transfer: true,
							}

						}, [
							h('span', params.column.title)
						])
					}
				},
				{
					title: "Название владельца",
					key: "ownerName",
					sortable: true,
					referenceName: "ownerName",
					ellipsis: true,
					tooltip: true,
					minWidth: 200,
				},
				{
					title: "Описание к записи",
					key: "descr",
					sortable: true,
					referenceName: "descr",
					minWidth: 300,
				},
				{
					title: "Действия",
					width: 60,
					align: "center",
					fixed: "right",
					renderHeader: (h, params) => {
						return h('Tooltip', {
							props: {
								placement: 'left',
								content: params.column.title,
								transfer: true,
							}

						}, [
							h('span', params.column.title)
						])
					},
					render: (h, params) => {
						return h("Icon", {
							props: {
								type: "ios-create",
								size: 20,
							},
							style: {
								cursor: "pointer",
								color: "rgb(45, 140, 240)"
							},
							on: {
								click: () => {
									this.getCardAccounting(params.row);
								}
							}
						});
					},
				}
			],
			allChecked: false,
			from: 0,
			limit: 12,
			countRegister: 0,
			currentPage: 1,
			sourceDict: [],
			reasonDict: [],
			categoryDict: [],
			filter: {
				flgActive: {
					value1: null,
					value2: null
				},
				tcRegno: {
					value1: null,
					value2: null
				},
				sourceId: {
					value1: null,
					value2: null
				},
				reasonId: {
					value1: null,
					value2: null
				},
				categoryId: {
					value1: null,
					value2: null
				},
				ownerName: {
					value1: null,
					value2: null
				},
				createdTime: {
					value1: null,
					value2: null
				},
				permitStartDate: {
					value1: null,
					value2: null
				},
				permitEndDate: {
					value1: null,
					value2: null
				}
			},
			sort: {
				tcRegno: null,
				createdTime: null,
				sourceId: null,
				reasonId: null,
				permitStartDate: null,
				permitEndDate: null,
				brand: null,
				model: null,
				categoryId: null,
				ownerName: null,
				descr: null
			},
			selectedRegisters: [],
			expDate: null
		};
	},
	methods: {
		getCardAccounting(register) {
			let params = {
				routeName: this.$store.state.registerReestr.routeName,
				id: register.id,
				sourceId: register.sourceId
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch("getNextComponent", {
						beanName: vm.$store.state.registerCardAccounting.bean
					});
					vm.$store.dispatch("getNextPage", {
						vm: vm,
						pageName: vm.$store.state.registerCardAccounting.routeName,
						params: params
					});
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		isSorted(name) {
			let res;
			let nameArr = name.split(",");
			nameArr.forEach(item => {
				if (funcUtils.isNull(this.sort[item])) {
					res = "background: transparent";
				} else if (this.sort[item]) {
					res = "background: red";
				} else if (!this.sort[item]) {
					res = "background: green";
				}
			});
			return res;
		},
		changePage(nextPage) {
			let data = this.$store.state.registerReestr.data;
			this.from = data.limit * nextPage - data.limit;
			let vm = this;
			let cid = funcUtils.getfromLocalStorage("registerReestr");

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch("prepareData", {
						method: "read",
						params: {
							from: vm.from,
							limit: vm.limit
						},
						cid: cid,
						withSpinner: false
					});
					let dataJson = JSON.parse(eventResponse.response);
					data.data = dataJson.data.data;
					data.count = dataJson.data.count;
					data.from = dataJson.data.from;
					data.limit = dataJson.data.limit;
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		selectRegister(registers) {
			let register = registers[0];
			register.selected = !register.selected;
			this.selectedRegisters.push(register.id);
		},
		createExpireReestr() {
			if (this.selectedRegisters.length === 0) return;

			let vm = this;
			let cid = funcUtils.getfromLocalStorage("registerReestr");

			(async () => {
				try {
					await vm.$store.dispatch("prepareData", {
						method: "createExpireReestr",
						params: {
							expDate: this.expDate,
							ids: this.selectedRegisters
						},
						cid: cid
					});

					this.selectedRegisters = [];

					let eventResponse = await vm.$store.dispatch("prepareData", {
						cid: cid
					});

					vm.$store.dispatch("fillModule", { event: eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getFilterFields() {
			let filterObj = {
				filter: []
			};
			let filter = this.filter;
			for (let prop in filter) {
				if (filter.hasOwnProperty(prop)) {
					let propObj = filter[prop];
					propObj.field = prop;
					if (
						funcUtils.isNotEmpty(propObj.value1) &&
						(propObj.value1 === "null" || propObj.value1.length === 0)
					) {
						propObj.value1 = null;
					}
					if (
						funcUtils.isNotEmpty(propObj.value2) &&
						(propObj.value2 === "null" || propObj.value2.length === 0)
					) {
						propObj.value2 = null;
					}
					filterObj.filter.push(propObj);
				}
			}

			return filterObj;
		},
		filterRegisters() {
			this.from = 0;
			let vm = this;
			let cid = funcUtils.getfromLocalStorage("registerReestr");
			let filterFields = this.getFilterFields();
			let sortedFields = this.getSortedFields();

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch("prepareData", {
						method: "getData",
						params: {
							filter: filterFields,
							sort: sortedFields,
							from: vm.from,
							limit: vm.limit
						},
						cid: cid
					});
					vm.$store.dispatch("fillModule", { event: eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getSortedFields() {
			let sortObj = {
				sort: []
			};

			let fields = this.sort;
			for (let prop in fields) {
				if (fields.hasOwnProperty(prop)) {
					let propObj = fields[prop];
					if (!funcUtils.isNull(propObj)) {
						sortObj.sort.push({
							field: prop,
							desc: propObj
						});
					}
				}
			}

			return sortObj;
		},
		sortRegisters(name) {
			this.from = 0;
			let vm = this;
			let cid = funcUtils.getfromLocalStorage("registerReestr");

			let fields = this.sort;

			let nameArr = name.column.referenceName.split(",");
			nameArr.forEach(item => {
				switch (name.order) {
					case "asc":
						{
							fields[item] = false;
							break;
						}
					case "desc":
						{
							fields[item] = true;
							break;
						}
					case "normal":
						{
							fields[item] = null;
							break;
						}
				}
			});

			let sortedFields = this.getSortedFields();
			let filterFields = this.getFilterFields();

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch("prepareData", {
						method: "getData",
						params: {
							filter: filterFields,
							sort: sortedFields,
							from: vm.from,
							limit: vm.limit
						},
						cid: cid
					});

					vm.$store.dispatch("fillModule", { event: eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		}
	},
	computed: {
		registers: function() {
			let res = [];
			let data = this.$store.state.registerReestr.data;
			if (data) {
				this.countRegister = data.count;
				this.currentPage = (data.from + data.limit) / data.limit;
				let registers = data.data;
				registers.forEach((register, index) => {
					this.$set(register, "selected", false);
					this.$set(
						register,
						"_disabled",
						register.tcId === null || register.flgActive === "F"
					);
					register.num = data.from + index + 1;
					register.createdTime = funcUtils.parseDateTime(
						register.createdTime,
						"DD.MM.YYYY HH:mm"
					);
					register["brand,model"] = register.brand + " / " + register.model;
				});
				res = registers;
			}
			return res;
		}
	}
};
</script>

<style lang="scss">
.registersRow:hover {
	td {
		background: azure;
		cursor: pointer;
	}
}

table th .ivu-table-cell {
	white-space: nowrap;
	display: block
}

table th .ivu-table-cell .ivu-tooltip {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline;
}

table th .ivu-table-cell .ivu-tooltip .ivu-tooltip-rel {
	width: 100%;
}
</style>
