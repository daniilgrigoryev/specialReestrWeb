<template>
	<div>
		<Row type="flex" justify="space-between">
			<Col :xs="{span: 24}" :md="{span: 12}">
				<h3 class="txt-h3">Основания включения</h3>
			</Col>
			<Col :xs="{span: 24}" :md="{span: 12}">
				<Row type="flex" justify="center" class="my12">
					<Form style="width: 100%; max-width: 400px;">
						<FormItem class="mb0">
							<Input placeholder="Enter something...">
								<Icon type="ios-search" slot="prepend"></Icon>
							</Input>
						</FormItem>
					</Form>	
				</Row>
			</Col>
		</Row>
		<Table border ref="selection" size="small" :columns="columnsOption" :data="dictReason"></Table>
	</div>




	
	<!--<div>
	    <button type="button" @click="getNewOrEditReason(null)">Новое основание</button>
	    <table>
	      <thead>
	      <tr>
	        <td>ID</td>
	        <td>Название категории</td>
	        <td>Активно</td>
	        <td>Дата внесения</td>
	        <td>Описание</td>
	        <td>Вложение</td>
	        <td>Операции</td>
	      </tr>
	      </thead>
	      <tbody>
	      <tr v-for="(value, key) in dictReason" :key="key" class="registersRow">
	        <td>{{value.code}}</td>
	        <td>{{value.name}}</td>
	        <td>
	          <input type="checkbox" v-model="value.flgActive" />
	        </td>
	        <td>{{value.addTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
	        <td>{{value.note}}</td>
	        <td>
	          <button v-if="value.hasBody" type="button" @click="download(value.id)">Скачать</button>
	          <span v-else>&#45;&#45;</span>
	        </td>
	        <td>
	          <button type="button" @click="getNewOrEditReason(value.id)">Редактировать</button>
	          <button type="button">Удалить</button>
	        </td>
	      </tr>
	      </tbody>
	    </table>
	  </div>-->
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";

export default {
	name: "DictReason",
	beforeCreate() {
		let data = this.$store.state.dictReason.data;
		if (!data) {
			let vm = this;
			let dictReestr = funcUtils.getfromLocalStorage('dictReestr');
			let cid = dictReestr[this.$store.state.dictReason.bean].cid;

			(async () => {
				try {
					vm.$store.dispatch('dictReasonSetCid', cid);
					let eventResponse = await vm.$store.dispatch('prepareData', {
						cid: cid
					});
					await vm.$store.dispatch('fillModule', { 'event': eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		}
	},
	data() {
		return {
			columnsOption: [{
					title: "Код",
					key: "code",
					width: 100,
				},
				{
					title: "Название категории",
					key: "name",
					minWidth: 200
				},
				{
					title: "Активно",
					width: 100,
					align: "center",
					key: 'flgActive',
					render: (h, params) => {
						return h('Checkbox', {
							props: {
								value: params.row.flgActive,
								disabled: true
							}
						});
					}
				},
				{
					title: "Дата внесения",
					key: "addTime",
					width: 200,
				},
				{
					title: "Описание",
					key: "note",
					minWidth: 300,
				},
				{
					title: "Вложение",
					width: 100,
					align: 'center',
					render: (h, params) => {
						if(params.row.hasBody){
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
										this.download(params.row.id)
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
									this.getNewOrEditReason(params.row.id)
								}
							}
						});
					},
				}
			],
		}
	},
	computed: {
		dictReason() {
			let res = [];
			let data = this.$store.state.dictReason.data;
			if (data) {
				data.forEach((item) => {
					if (item.flgActive === 'T') {
						this.$set(item, 'flgActive', true);
					} else if (item.flgActive === 'F') {
						this.$set(item, 'flgActive', false);
					}
				});
				res = data;
			}
			return res;
		}
	},
	methods: {
		download(id) {
			let vm = this;
			let cid = this.$store.state.dictReason.cid;

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						method: 'getBody',
						params: {
							id: id
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

					let blob = new Blob([bytes.buffer], { type: 'data:application/octet-stream' });

					let blobUrl = URL.createObjectURL(blob);

					let element = document.createElement('a');
					element.setAttribute('href', blobUrl);
					element.setAttribute('download', 'Вложение ' + id + '.pdf');

					element.style.display = 'none';
					document.body.appendChild(element);

					element.click();

					document.body.removeChild(element);
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getNewOrEditReason(id) {
			let params = {
				'routeName': this.$store.state.dictReestr.routeName,
				'id': id
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch('getNextComponent', {
						'beanName': vm.$store.state.dictReasonEdit.bean
					});
					vm.$store.dispatch('getNextPage', {
						'vm': vm,
						'pageName': vm.$store.state.dictReasonEdit.routeName,
						'params': params
					});
				} catch (e) {
					alert(e.message);
				}
			})();
		}
	}
}
</script>

<style lang="scss">
.registersRow:hover {
	td {
		background: azure;
		cursor: pointer;
	}
}
</style>
