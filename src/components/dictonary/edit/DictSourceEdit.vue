<template>
	<Layout class="height100-header">
		<div class="bg-gray flex-parent flex-parent--center-main flex-parent--center-cross height100-header">
			<Card v-if="dictSourceEdit" class="w-full" style="max-width: 1200px;">
				<b slot="title" class="txt-h4">Редактирование записи</b>
				<Form label-position="top">
					
					<FormItem>
						<Checkbox v-model="dictSourceEdit.flgActive"><b class="txt-m mx6">Активно</b></Checkbox>
						<!--<Checkbox v-model="single"><b class="txt-m mx6">Возможность аннулирования</b></Checkbox>-->
					</FormItem>

					<Row :gutter="16">
						<Col :xs="{span: 24}" :md="{span: 12}">
							<Row :gutter="16">
								<Col :xs="{span: 24}" :md="{span: 12}">
									<FormItem label="Код">
										<Input v-model="dictSourceEdit.code"></Input>
									</FormItem>
								</Col>
								<Col :xs="{span: 24}" :md="{span: 12}">
									<FormItem label="Название источника">
										<Input v-model="dictSourceEdit.name"></Input>
									</FormItem>
								</Col>
								<Col :xs="{span: 24}" :md="{span: 12}">
									<FormItem label="Название организации">
										<Input v-model="dictSourceEdit.orgName"></Input>
									</FormItem>	
								</Col>
								<Col :xs="{span: 24}" :md="{span: 12}">
									<FormItem label="Контактное лицо">
										<Input v-model="dictSourceEdit.contacts"></Input>
									</FormItem>
								</Col>
								<Col>
									<FormItem label="Вложение">
										<div>
											<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
											<p>Click or drag files here to upload</p>
										</div>	
										<input type="file" @change="onFileChange">
									</FormItem>
								</Col>
							</Row>
						</Col>
	
						<Col :xs="{span: 24}" :md="{span: 12}">
							<FormItem label="Описание">
								<Input type="textarea" v-model="dictSourceEdit.note" :autosize="{minRows: 5, maxRows: 5}" placeholder="Описание"></Input>
							</FormItem>
						</Col>
					</Row>



					<FormItem label="Список оснований">
						<Table border ref="selection" :columns="columnsOption" :data="reasonDict"></Table>
					</FormItem>


			
					<FormItem class="flex-parent flex-parent--center-main">
						<Button type="primary" size="large" @click="saveOrEdit">Сохранить</Button>
						<Button size="large" @click="getPrev">Отмена</Button>
					</FormItem>
				</Form>
			</Card>
		</div>
	</Layout>
</template>

<script>
import * as funcUtils from "../../../assets/js/utils/funcUtils";

export default {
	name: "DictSourceEdit",
	beforeCreate() {
		let vm = this;
		(async () => {
			try {
				let wid = sessionStorage.getItem('wid');
				let componentsRoute = funcUtils.getFromSessionStorage(wid);
				let currentComponent = await vm.$store.dispatch('getCurrentComponent', {
					componentArr: componentsRoute
				});
				let cid = currentComponent.cid;
				vm.$store.dispatch('dictSourceEditSetCid', cid);
				let prepareParams = {
					cid: cid
				};
				if (!funcUtils.isUndefined(vm.$route.params.id)) {
					prepareParams.method = 'getData';
					prepareParams.params = {
						'id': vm.$route.params.id
					};
				}

				let eventResponse = await vm.$store.dispatch('prepareData', prepareParams);
				vm.dictSourceEdit = JSON.parse(eventResponse.response).data;
				if (vm.dictSourceEdit.flgActive === 'T') {
					vm.dictSourceEdit.flgActive = true;
				} else if (vm.dictSourceEdit.flgActive === 'F') {
					vm.dictSourceEdit.flgActive = false;
				}

				eventResponse = await vm.$store.dispatch('prepareData', {
					method: 'getResonsDict',
					cid: cid
				});
				let reasonDict = JSON.parse(eventResponse.response).data;
				for (let prop in reasonDict) {
					if (reasonDict.hasOwnProperty(prop)) {
						vm.reasonDict.push({
							value: prop,
							label: reasonDict[prop],
							checkReason: vm.dictSourceEdit.reasons.includes(+prop),
							checkSpecReason: vm.dictSourceEdit.specReasons.includes(+prop),
						});
					}
				}
			} catch (e) {
				alert(e.message);
			}
		})();
	},
	data() {
		return {
			dictSourceEdit: null,
			file: null,
			single: false,
			reasonDict: [],
			columnsOption: [{
					title: "Выбрать",
					width: 100,
					align: "center",
					key: 'checkReason',
					render: (h, params) => {
						return h('Checkbox', {
							props: {
								value: params.row.checkReason,
								disabled: params.row.checkSpecReason
							},
							domProps: {
								value: params.row.checkReason
							},
							on: {
								input: (event) => {
									if (params.row.checkReason) {
										params.row.checkReason = false;
										let index = this.dictSourceEdit.reasons.indexOf(+params.row.value);
										if (index !== -1) {
											this.dictSourceEdit.reasons.splice(index, 1);
										}
									} else {
										params.row.checkReason = true;
										this.dictSourceEdit.reasons.push(+params.row.value);
									}
								}
							}
						});
					}
				},
				{
					title: "Специальное",
					width: 120,
					align: "center",
					key: 'checkSpecReason',
					render: (h, params) => {
						return h('Checkbox', {
							props: {
								value: params.row.checkSpecReason,
								disabled: !params.row.checkReason
							},
							domProps: {
								value: params.row.checkReason
							},
							on: {
								input: (event) => {
									if (params.row.checkSpecReason) {
										params.row.checkSpecReason = false;
										let index = this.dictSourceEdit.specReasons.indexOf(+params.row.value);
										if (index !== -1) {
											this.dictSourceEdit.specReasons.splice(index, 1);
										}
									} else {
										params.row.checkSpecReason = true;
										this.dictSourceEdit.specReasons.push(+params.row.value);
									}
								}
							}
						});
					}
				},
				{
					title: "Название основания",
					key: "label"
				},
			],
		}
	},
	methods: {
		onFileChange(e) {
			let vm = this;
			let files = e.target.files || e.dataTransfer.files;
			if (files.length === 0 || files.length > 1) {
				return;
			} else if (files[0].type !== 'application/pdf') {
				alert('Только PDF!!!');
				return;
			}
			let reader = new FileReader();
			reader.onload = (e) => {
				vm.file = e.currentTarget.result;

				(async () => {
					try {
						let body = vm.file.substr(vm.file.lastIndexOf(',') + 1);
						let eventResponse = await vm.$store.dispatch('prepareData', {
							params: {
								body: body
							},
							method: 'setFileBody'
						});
					} catch (e) {
						alert(e.message);
					}
				})();
			};
			reader.readAsDataURL(files[0]);
		},
		saveOrEdit() {
			let vm = this;

			if (this.dictSourceEdit.flgActive === true) {
				this.dictSourceEdit.flgActive = 'T';
			} else if (this.dictSourceEdit.flgActive === false) {
				this.dictSourceEdit.flgActive = 'F';
			}

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						params: {
							item: vm.dictSourceEdit
						},
						method: 'save'
					});
					vm.getPrev();
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
					if (currentPage.params.routeName === vm.$store.state.dictReestr.routeName) {
						vm.$root.getDictReestr();
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
	}
}
</script>

<style lang="scss">
.card {
	max-width: 1400px;
}
</style>
