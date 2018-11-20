<template>
	<Layout class="height100-header">
		<div class="bg-gray flex-parent flex-parent--center-main flex-parent--center-cross height100-header">
			<Card class="w-full wmax600" v-if="dictReasonEdit">
				<b slot="title" class="txt-h4">Редактирование записи</b>
				<Form label-position="top">
					<Checkbox v-model="dictReasonEdit.flgActive">
						<b class="txt-m mx6">Активно</b>
					</Checkbox>
			
					<Row :gutter="16" class="my12">
						<Col :xs="{span: 24}" :md="{span: 8}">
							<FormItem label="Код">
								<Input size="large" v-model="dictReasonEdit.code"></Input>
							</FormItem>
						</Col>
						<Col :xs="{span: 24}" :md="{span: 16}">
							<FormItem label="Название категории">
								<Input size="large" v-model="dictReasonEdit.name"></Input>
							</FormItem>
						</Col>
					</Row>
			
					<FormItem label="Описание">
						<Input type="textarea" v-model="dictReasonEdit.note" :autosize="{minRows: 4,maxRows: 5}" placeholder="Описание" size="large"></Input>
					</FormItem>
			
					<FormItem label="Вложение">
						<Card :padding="0" class="relative">
							<input type="file" ref="file" @change="onFileChange" id="file" class="absolute w-full h-full opacity0 scroll-hidden z-neg1" />
							<label for="file" class="relative block cursor-pointer px12 py12">
								<Row type="flex" justify="space-between" align="middle">
									<figure class="block bg-white round px6 py6">
										<Icon v-if="!previewImage" type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
										<img id="previewImage" v-if="previewImage" :src="previewImage" style="width: 52px; height: 52px;" />
									</figure>
									<Col :xs="{span: 16}" :md="{span: 15}" :lg="{span: 17}" class="align-center">
										<div class="px6" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
											<b>{{fileName}}</b>
										</div>
									</Col>
									<Button @click.stop="clearFile" type="error" shape="circle" icon="md-close" style="font-size: 20px;"></Button>
								</Row>
							</label>
						</Card>
					</FormItem>
          </Col>
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
	name: "DictReasonEdit",
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
				vm.$store.dispatch('dictReasonEditSetCid', cid);
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
				vm.dictReasonEdit = JSON.parse(eventResponse.response).data;
				if (vm.dictReasonEdit.flgActive === 'T') {
					vm.dictReasonEdit.flgActive = true;
				} else if (vm.dictReasonEdit.flgActive === 'F') {
					vm.dictReasonEdit.flgActive = false;
				}
			} catch (e) {
				alert(e.message);
			}
		})();
	},
	data() {
		return {
			dictReasonEdit: null,
			file: null,
      fileName: 'Выберете или перетащите файл',
      previewImage: null
		}
	},
	methods: {
		onFileChange(e) {
			let vm = this;
			let files = e.target.files || e.dataTransfer.files;
      if (!files || files.length === 0) {
        return;
      }
      let file = files[0];
      let type = file.type;
      if (type !== 'application/pdf') {
        e.stopPropagation();
        alert('Только PDF!!!');
        return;
      }
      this.fileName = file.name;
			let reader = new FileReader();
			reader.onload = (e) => {
        vm.file = e.currentTarget.result;
        if (type.indexOf('image') > -1) {
          vm.previewImage = vm.file;
        }

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
    clearFile() {
      this.file = null;
      this.previewImage = null;
      this.fileName = 'Выберете или перетащите файл';
      let input = this.$refs.file;
      input.type = 'file';
    },
		saveOrEdit() {
			let vm = this;

			if (this.dictReasonEdit.flgActive === true) {
				this.dictReasonEdit.flgActive = 'T';
			} else if (this.dictReasonEdit.flgActive === false) {
				this.dictReasonEdit.flgActive = 'F';
			}

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						params: {
							item: vm.dictReasonEdit
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

<style scoped>

</style>
