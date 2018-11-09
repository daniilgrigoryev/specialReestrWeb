<template>
<Layout class="height100-header">
	<div class="bg-gray flex-parent flex-parent--center-main flex-parent--center-cross height100-header">
		<Card v-if="dictCategoryEdit" class="w-full wmax600">
			<b slot="title" class="txt-h4">
				Редактирование записи
			</b>
			<Form label-position="top">
				
				<Checkbox v-model="dictCategoryEdit.flgActive">
					<b class="txt-m mx6">Активно</b>
				</Checkbox>
		
				<Row :gutter="16" class="my12">
					<Col :xs="{span: 24}" :md="{span: 8}">
						<FormItem label="Код">
							<Input v-model="dictCategoryEdit.code" size="large"></Input>
						</FormItem>
					</Col>
					<Col :xs="{span: 24}" :md="{span: 16}">
						<FormItem label="Название категории">
							<Input v-model="dictCategoryEdit.name" size="large"></Input>
						</FormItem>
					</Col>
				</Row>
		
				<FormItem label="Описание">
					<Input type="textarea" v-model="dictCategoryEdit.note" :autosize="{minRows: 4,maxRows: 5}" placeholder="Описание" size="large"></Input>
				</FormItem>
		
				<FormItem class="flex-parent flex-parent--center-main">
					<Button type="primary mx12" @click="saveOrEdit" size="large">Сохранить</Button>
					<Button size="large mx12" @click="getPrev">Отмена</Button>
				</FormItem>
			</Form>
		</Card>
	</div>
</Layout>





</template>

<script>
import * as funcUtils from "../../../assets/js/utils/funcUtils";

export default {
	name: "DictCategoryEdit",
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
				vm.$store.dispatch('dictCategoryEditSetCid', cid);
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
				vm.dictCategoryEdit = JSON.parse(eventResponse.response).data;
				if (vm.dictCategoryEdit.flgActive === 'T') {
					vm.dictCategoryEdit.flgActive = true;
				} else if (item.flgActive === 'F') {
					vm.dictCategoryEdit.flgActive = false;
				}
			} catch (e) {
				alert(e.message);
			}
		})();
	},
	data() {
		return {
			dictCategoryEdit: null
		}
	},
	methods: {
		saveOrEdit() {
			let vm = this;

			if (this.dictCategoryEdit.flgActive === true) {
				this.dictCategoryEdit.flgActive = 'T';
			} else if (this.dictCategoryEdit.flgActive === false) {
				this.dictCategoryEdit.flgActive = 'F';
			}

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						params: {
							item: vm.dictCategoryEdit
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
