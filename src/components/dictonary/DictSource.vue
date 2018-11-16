<template>
	<div>
		<Row type="flex" justify="space-between">
			<Col :xs="{span: 24}" :md="{span: 12}">
				<h3 class="txt-h3">Источники данных</h3>
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
		<Table border ref="selection" size="small" :columns="columnsOption" :data="dictSource"></Table>
	</div>
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";

export default {
	name: "DictSource",
	beforeCreate() {
		let data = this.$store.state.dictSource.data;
		if (!data) {
			let vm = this;
			let dictReestr = funcUtils.getfromLocalStorage('dictReestr');
			let cid = dictReestr[this.$store.state.dictSource.bean].cid;

			(async () => {
				try {
					vm.$store.dispatch('dictSourceSetCid', cid);
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
                    align: "center",
				},
				{
					title: "Название источника",
					key: "name",
					minWidth: 150,
					maxWidth: 300
				},
				{
					title: "Название организации",
					key: "orgName",
					minWidth: 200,
					maxWidth: 300
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
				/*{
				  title: "Возможность аннулирования",
				  width: 100,
				  align: "center",
				  key: 'flgActive',
				  render: (h, params) => {
				    return h('Checkbox', {
				      props: {
				        value: params.row.flgActive
				      }
				    });
				  }
				},*/
				{
					title: "Дата внесения",
					key: "addTime",
					width: 200,
				},
				{
					title: "Контактное лицо",
					key: "contacts",
					minWidth: 200,
					maxWidth: 300
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
									this.getNewOrEditSource(params.row.id)
								}
							}
						});
					},
				}
			],
		}
	},
	computed: {
		dictSource() {
			let res = [];
			let data = this.$store.state.dictSource.data;
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
			let cid = this.$store.state.dictSource.cid;

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
		getNewOrEditSource(id) {
			let params = {
				'routeName': this.$store.state.dictReestr.routeName,
				'id': id
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch('getNextComponent', {
						'beanName': vm.$store.state.dictSourceEdit.bean
					});
					vm.$store.dispatch('getNextPage', {
						'vm': vm,
						'pageName': vm.$store.state.dictSourceEdit.routeName,
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

<style scoped>

</style>
