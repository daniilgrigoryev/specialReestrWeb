<template>
	<Layout class="height100-header">
		<div class="poptips_wrapper">
			<Poptip placement="left" width="300" class="block poptip">
				<Icon type="ios-cog" class="poptip__icon" />
				<div slot="content">
					<Form>
						<Col span="24">
							<FormItem class="mx0 my0 py0 px0">
								<Button size="large" style="width: 100%" @click="packageCardFromFile" type="primary">Создать пакет данных из файла</Button>
							</FormItem>
						</Col>
					</Form>
				</div>
			</Poptip>
			<Poptip placement="left" width="300" class="block poptip mt12">
				<Icon type="ios-create" class="poptip__icon" />
				<div slot="content">
					<Form>
						<Col span="24">
							<FormItem class="mx0 my0 py0 px0">
								<Button size="large" @click="packageCardNew" type="primary">Создать пакет данных в ручную</Button>
							</FormItem>
						</Col>
					</Form>
				</div>
			</Poptip>
		</div>


		<Sider width="350px" style="min-width: 350px" class="px18 py18 bg-white">
			<Form label-position="top">
				<h3 class="txt-h3 m12">Фильтр</h3>

				<FormItem label="Время создания записи" class="my6" :style="{width: '100%'}">
					<Row :gutter="8">
						<Col :xs="{span: 12}" :lg="{span: 12}" class="my0">
							<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value1" style="width: 100%" placeholder="Период от"></DatePicker>
						</Col>
						<Col :xs="{span: 12}" :lg="{span: 12}" class="my0">
							<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value2" style="width: 100%" placeholder="Период по"></DatePicker>
						</Col>
					</Row>
				</FormItem>
	


				<Row :gutter="8" class="my6">
					<Col :xs="{span: 12}" :lg="{span: 12}">
						<FormItem label="Тип пакета документа" class="my0">
							<Select :clearable="true" v-model="filter.formatType.value1">
								<Option style="white-space: pre-wrap" v-for="item in formatDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</FormItem>
					</Col>
					<Col :xs="{span: 12}" :lg="{span: 12}">
						<FormItem label="Статус обработки" class="my0">
							<Select :clearable="true" v-model="filter.status.value1">
								<Option style="white-space: pre-wrap" v-for="item in stateDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</FormItem>
					</Col>
				</Row>


				<FormItem label="Источник" class="my6">
					<Select :clearable="true" v-model="filter.sourceId.value1" style="max-width: 380px;">
						<Option style="white-space: pre-wrap" v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
	
				<FormItem label="Основание" class="my6">
					<Select :clearable="true" v-model="filter.reasonId.value1" style="max-width: 380px;">
						<Option style="white-space: pre-wrap" v-for="item in reasonDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</FormItem>
	
				<FormItem class="my6">
					<Row type="flex" justify="center" :gutter="8">
						<Col>
							<Button @click="filterRegisters" type="primary">Применить</Button>
						</Col>
						<Col>
							<Button>Отчистить</Button>
						</Col>
					</Row>
				</FormItem>
			</Form>
		</Sider>
	
	
		<Content>
			<Card :padding="8" dis-hover :bordered="false">
				<Row type="flex" class="my6">
					<Col>
						<h3 class="txt-h3">Список пакетов данных</h3>
					</Col>
				</Row>
				<Table border size="small" ref="selection" :columns="columnsOption" :data="packages" @on-sort-change="sortRegisters"></Table>
			</Card>
		</Content>
	</Layout>
	
	
	<!--<div>
			    <div>
			      <div style="display: flex;">
			        <div style="width: 30%; display: flex; flex-direction: column;">
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
			            <span>Статус обработки</span>
			            <Select :clearable="true" v-model="filter.status.value1">
			              <Option v-for="item in stateDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
			            </Select>
			          </div>
			          <div>
			            <span>Тип пакета документа</span>
			            <Select :clearable="true" v-model="filter.formatType.value1">
			              <Option v-for="item in formatDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
			            </Select>
			          </div>
			          <div>
			            <span>Время создания записи</span>
			            <div style="display: flex;">
			              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value1"
			                          placeholder="Select time1"></DatePicker>
			              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value2"
			                          placeholder="Select time2"></DatePicker>
			            </div>
			          </div>
			
			          <button type="button" @click="filterRegisters">Применить</button>
			
			          <button type="button" @click="packageCardFromFile">Создать пакет данных из файла</button>
			          <button type="button" @click="packageCardNew">Создать пакет данных в ручную</button>
			        </div>
			        <div style="width: 70%;">
			          <table style="width: 100%;">
			            <thead>
			            <tr>
			              <td style="cursor: pointer;" :style="isSorted('name')" @click="sortRegisters('name')">Имя</td>
			              <td style="cursor: pointer;" :style="isSorted('sourceId')" @click="sortRegisters('sourceId')">Источник
			              </td>
			              <td style="cursor: pointer;">Тип документа</td>
			              <td style="cursor: pointer;" :style="isSorted('reasonId')" @click="sortRegisters('reasonId')">Основание
			                включения
			              </td>
			              <td style="cursor: pointer;" :style="isSorted('status')" @click="sortRegisters('status')">Статус
			                обработки
			              </td>
			              <td style="cursor: pointer;" :style="isSorted('createdTime')" @click="sortRegisters('createdTime')">Время
			                загрузки
			              </td>
			              <td style="cursor: pointer;">ФИО исполнителя</td>
			              <td style="cursor: pointer;">Время формирования подписи</td>
			              <td style="cursor: pointer;">Подпись</td>
			              <td style="cursor: pointer;">Вложение</td>
			            </tr>
			            </thead>
			
			            <tbody>
			            <tr v-for="(packageItem, index) in packages" class="registersRow" @click="getPackageCard(packageItem)" :key="index">
			              <td>
			                {{packageItem.name}}
			              </td>
			              <td>
			                {{packageItem.sourceName}}
			              </td>
			              <td>
			                {{packageItem.formatName}}
			              </td>
			              <td>
			                {{packageItem.reasonName}}
			              </td>
			              <td>
			                {{packageItem.statusName}}
			              </td>
			              <td>
			                {{packageItem.createTime | formatDateTime('DD.MM.YYYY HH:mm')}}
			              </td>
			              <td>
			                {{packageItem.createIspName}}
			              </td>
			              <td>
			                {{packageItem.signingTime | formatDateTime('DD.MM.YYYY HH:mm')}}
			              </td>
			              <td>
			                <button @click="downloadSign(packageItem)" v-if="packageItem.formatType === 1 || packageItem.formatType === 2" type="button">Скачать
			                </button>
			                <span v-else>&#45;&#45;</span>
			              </td>
			              <td>
			                <button @click="downloadBody(packageItem)" v-if="packageItem.formatType === 2 || packageItem.formatType === 1" type="button">Скачать
			                </button>
			                <span v-else>&#45;&#45;</span>
			              </td>
			            </tr>
			            </tbody>
			          </table>
			        </div>
			      </div>
			    </div>
			  </div>-->
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";

export default {
	name: "PackageReestr",
	beforeCreate() {
		let vm = this;
		let cid = funcUtils.getfromLocalStorage("packageReestr");

		(async () => {
			try {
				let eventResponse;
				if (funcUtils.isNull(cid)) {
					eventResponse = await vm.$store.dispatch("prepareData", {
						beanName: vm.$store.state.packageReestr.bean,
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
									funcUtils.addToLocalStorage("packageReestr", cid);
									eventResponse = await vm.$store.dispatch("prepareData", {
										method: "getData",
										params: {
											filter: null,
											sort: null
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
				vm.$store.dispatch("packageReestrSetCid", cid);
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
					method: "getStateDict",
					cid: cid
				});
				let stateDict = JSON.parse(eventResponse.response).data;
				for (let prop in stateDict) {
					if (stateDict.hasOwnProperty(prop)) {
						vm.stateDict.push({
							value: prop,
							label: stateDict[prop]
						});
					}
				}

				eventResponse = await vm.$store.dispatch("prepareData", {
					method: "getFormatDict",
					cid: cid
				});
				let formatDict = JSON.parse(eventResponse.response).data;
				for (let prop in formatDict) {
					if (formatDict.hasOwnProperty(prop)) {
						vm.formatDict.push({
							value: prop,
							label: formatDict[prop]
						});
					}
				}
			} catch (e) {
				alert(e.message);
			}
		})();

		this.$store.watch(this.$store.getters.packageReestrGetCommand, () => {
			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch("prepareData", {
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
		this.$store.dispatch("packageReestrSetCid", null);
		this.$store.dispatch("packageReestrSetData", {
			data: null
		});
	},
	data() {
		return {
			columnsOption: [{
					title: "Имя",
					key: "name",
					sortable: true,
					referenceName: "name",
					minWidth: 100,
				},
				{
					title: "Источник",
					key: "sourceName",
					sortable: true,
					referenceName: "sourceId",
					minWidth: 120,
				},
				{
					title: "Основание",
					key: "reasonName",
					sortable: true,
					referenceName: "reasonId",
					minWidth: 300,
				},
				{
					title: "Тип документа",
					key: "formatName",
					minWidth: 130,
					maxWidth: 150
				},
				{
					title: "Статус обработки",
					key: "statusName",
					sortable: true,
					referenceName: "statusId",
					minWidth: 180,
				},
				{
					title: "Время загрузки",
					key: "createTime",
					sortable: true,
					referenceName: "createTime",
					minWidth: 150,
				},
				{
					title: "ФИО исполнителя",
					key: "createIspName",
					minWidth: 150,
				},
				{
					title: "Время формирования подписи",
					key: "signingTime",
					minWidth: 200
				},
				{

					title: "Подпись",
					width: 95,
					align: "center",
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
					},
					render: (h, params) => {
						if(params.row.formatType === 1 || params.row.formatType === 2){
							return h("Icon", {
								props: {
									type: "ios-cloud-download",
									size: 20,
								},
								style: {
									cursor: "pointer",
									color: "rgb(45, 140, 240)"
								},
								on: {
									click: () => {
										this.downloadSign(params.row);
									}
								}
							});
						} else {
							return h("p", "--");
						}
					},
				},
				{
					title: "Вложение",
					width: 100,
					align: "center",
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
					},
					render: (h, params) => {
						if(params.row.formatType === 1 || params.row.formatType === 2){
							return h("Icon", {
								props: {
									type: "ios-cloud-download",
									size: 20,
								},
								style: {
									cursor: "pointer",
									color: "rgb(45, 140, 240)"
								},
								on: {
									click: () => {
										this.downloadBody(params.row);
									}
								}
							});
						} else {
							return h("p", "--");
						}
					},
				},
				{
					title: "Действия",
					width: 95,
					align: "center",
					fixed: "right",
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
								  if (params.row.status === 5) {
                    this.getPackageCardSpecial(params.row);
                  } else {
                    this.getPackageCard(params.row);
                  }
								}
							}
						});
					},
				}
			],
			filter: {
				name: {
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
				formatType: {
					value1: null,
					value2: null
				},
				status: {
					value1: null,
					value2: null
				},
				createdTime: {
					value1: null,
					value2: null
				}
			},
			sort: {
				name: null,
				sourceId: null,
				reasonId: null,
				status: null,
				createdTime: null
			},
			sourceDict: [],
			reasonDict: [],
			stateDict: [],
			formatDict: []
		};
	},
	methods: {
		getPackageCard(packageItem) {
			let params = {
				routeName: this.$store.state.packageReestr.routeName,
				headId: packageItem.id
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch("getNextComponent", {
						beanName: vm.$store.state.packageCard.bean
					});
					vm.$store.dispatch("getNextPage", {
						vm: vm,
						pageName: vm.$store.state.packageCard.routeName,
						params: params
					});
				} catch (e) {
					alert(e.message);
				}
			})();
		},
    getPackageCardSpecial(packageItem) {
      let params = {
        routeName: this.$store.state.packageReestr.routeName,
        headId: packageItem.id
      };

      let vm = this;
      (async () => {
        try {
          await vm.$store.dispatch("getNextComponent", {
            beanName: vm.$store.state.packageCardSpecial.bean
          });
          vm.$store.dispatch("getNextPage", {
            vm: vm,
            pageName: vm.$store.state.packageCardSpecial.routeName,
            params: params
          });
        } catch (e) {
          alert(e.message);
        }
      })();
    },
		packageCardFromFile() {
			let params = {
				routeName: this.$store.state.packageReestr.routeName
			};

			this.$store.dispatch("getNextPage", {
				vm: this,
				pageName: this.$store.state.packageCardFromFile.routeName,
				params: params
			});
		},
		packageCardNew() {
			let params = {
				routeName: this.$store.state.packageReestr.routeName
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch("getNextComponent", {
						beanName: vm.$store.state.packageCardNew.bean
					});
					vm.$store.dispatch("getNextPage", {
						vm: vm,
						pageName: vm.$store.state.packageCardNew.routeName,
						params: params
					});
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		downloadBody(packageItem) {
			let vm = this;
			let cid = funcUtils.getfromLocalStorage("packageReestr");

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch("prepareData", {
						method: "getBody",
						params: {
							id: packageItem.id
						},
						cid: cid
					});
					let dataJson = JSON.parse(eventResponse.response);

					let binary_string = window.atob(dataJson.data);
					let len = binary_string.length;
					let bytes = new Uint8Array(len);
					for (let i = 0; i < len; i++) {
						bytes[i] = binary_string.charCodeAt(i);
					}

					let blob = new Blob([bytes.buffer], {
						type: "data:application/octet-stream"
					});

					let blobUrl = URL.createObjectURL(blob);

					let element = document.createElement("a");
					element.setAttribute("href", blobUrl);
					element.setAttribute(
						"download",
						packageItem.name + "." + packageItem.formatName.toLowerCase()
					);

					element.style.display = "none";
					document.body.appendChild(element);

					element.click();

					document.body.removeChild(element);
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		downloadSign(packageItem) {
			let vm = this;
			let cid = funcUtils.getfromLocalStorage("packageReestr");

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch("prepareData", {
						method: "getSign",
						params: {
							id: packageItem.id
						},
						cid: cid
					});
					let dataJson = JSON.parse(eventResponse.response);
					let href =
						"data:application/octet-stream;charset=utf-8;text/plain," +
						dataJson.data;

					let element = document.createElement("a");
					element.setAttribute("href", href);
					element.setAttribute("download", packageItem.name + ".txt");

					element.style.display = "none";
					document.body.appendChild(element);

					element.click();

					document.body.removeChild(element);
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
			let cid = funcUtils.getfromLocalStorage("packageReestr");
			let filterFields = this.getFilterFields();
			let sortedFields = this.getSortedFields();

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch("prepareData", {
						method: "getData",
						params: {
							filter: filterFields,
							sort: sortedFields
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
			let cid = funcUtils.getfromLocalStorage("packageReestr");

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
							sort: sortedFields
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
		packages: function() {
			let res = [];
			let data = this.$store.state.packageReestr.data;
			if (data) {
				data.data.forEach(item => {
					item.createTime = funcUtils.parseDateTime(
						item.createTime,
						"DD.MM.YYYY HH:mm"
					);
					item.signingTime = funcUtils.parseDateTime(
						item.signingTime,
						"DD.MM.YYYY HH:mm"
					);
				});
				res = data.data;
			}
			return res;
		}
	}
};
</script>

<style scoped>
.poptips_wrapper{
	position: fixed;
	bottom: 50px;
	right: 50px;
	z-index: 8;
}

.poptip__icon{
	background-color: green;
	font-size: 40px;
	color: #fff;
	border-radius: 100%;
	padding: 10px;
	cursor: pointer;
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
