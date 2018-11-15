<template>
	<Layout class="height100-header">
		<Sider width="350px" style="min-width: 250px; max-width: 350px;" class="bg-white">
			<Menu @on-select="onMenuClick" :active-name="activeDict" width="auto" theme="primary">
				<MenuGroup title="Типы справочников">
					<MenuItem name="DictAreaView">Типы территорий</MenuItem>
					<MenuItem name="DictSourceView">Источники данных</MenuItem>
					<MenuItem name="DictCategoryView">Категории ТС</MenuItem>
					<MenuItem name="DictReasonView">Основания включения</MenuItem>
				</MenuGroup>
			</Menu>
		</Sider>
	
		<Content>
			<Card :padding="8" dis-hover :bordered="false">
				<dict-area v-if="showDictArea"></dict-area>
				<dict-category v-if="showDictCategory"></dict-category>
				<dict-reason v-if="showDictReason"></dict-reason>
				<dict-source v-if="showDictSource"></dict-source>
			</Card>
		</Content>
	</Layout>
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import DictArea from "../dictonary/DictArea";
import DictCategory from "../dictonary/DictCategory";
import DictSource from "../dictonary/DictSource";
import DictReason from "../dictonary/DictReason";
import TablePoptip from './../verstka/TablePoptip.vue';

export default {
	name: "DictReestr",
	components: {
		DictArea,
		DictCategory,
		DictSource,
		DictReason,
		TablePoptip
	},
	mounted() {
		let vm = this;
		let dictReestr = funcUtils.getfromLocalStorage('dictReestr');

		let dictArea = this.$store.state.dictArea.bean;
		let dictSource = this.$store.state.dictSource.bean;
		let dictCategory = this.$store.state.dictCategory.bean;
		let dictReason = this.$store.state.dictReason.bean;

		(async () => {
			try {
				let eventResponse;
				if (funcUtils.isNull(dictReestr)) {
					dictReestr = {};
					dictReestr[dictArea] = {
						cid: null,
						moduleName: vm.$store.state.dictArea.moduleName
					};
					dictReestr[dictSource] = {
						cid: null,
						moduleName: vm.$store.state.dictSource.moduleName
					};
					dictReestr[dictCategory] = {
						cid: null,
						moduleName: vm.$store.state.dictCategory.moduleName
					};
					dictReestr[dictReason] = {
						cid: null,
						moduleName: vm.$store.state.dictReason.moduleName
					};

					eventResponse = await vm.$store.dispatch('prepareData', {
						beanName: dictCategory,
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
								if (dataJson.method === 'addCID') {
									dictReestr[dictCategory].cid = respData.cid;
									funcUtils.addToLocalStorage('dictReestr', dictReestr);
									vm.$store.dispatch('dictCategorySetCid', respData.cid);
									eventResponse = await vm.$store.dispatch('prepareData', {
										method: 'getData',
										cid: respData.cid
									});
									await vm.$store.dispatch('fillModule', { 'event': eventResponse });
									vm.activeDict = dictCategory;
								}
							} else {
								if (!funcUtils.isNull(respError)) {
									alert(respError.errorMsg);
								}
							}
						}
					}
				} else {
					for (let prop in dictReestr) {
						if (dictReestr.hasOwnProperty(prop)) {
							if (funcUtils.isNotEmpty(dictReestr[prop].cid)) {
								vm.activeDict = prop;
							}
						}
					}
				}
			} catch (e) {
				alert(e.message);
			}
		})();
	},
	destroyed() {
		this.$store.dispatch('dictCategorySetCid', null);
		this.$store.dispatch('dictCategorySetData', {
			data: null
		});

		this.$store.dispatch('dictSourceSetCid', null);
		this.$store.dispatch('dictSourceSetData', {
			data: null
		});

		this.$store.dispatch('dictReasonSetCid', null);
		this.$store.dispatch('dictReasonSetData', {
			data: null
		});

		this.$store.dispatch('dictAreaSetCid', null);
		this.$store.dispatch('dictAreaSetData', {
			data: null
		});
	},
	data() {
		return {
			activeDict: ''
		}
	},
	computed: {
		showDictCategory() {
			return this.$store.state.dictCategory.bean === this.activeDict;
		},
		showDictReason() {
			return this.$store.state.dictReason.bean === this.activeDict;
		},
		showDictSource() {
			return this.$store.state.dictSource.bean === this.activeDict;
		},
		showDictArea() {
			return this.$store.state.dictArea.bean === this.activeDict;
		},
	},
	methods: {
		onMenuClick(dictName) {
			let vm = this;
			let dictReestr = funcUtils.getfromLocalStorage('dictReestr');
			let cid = dictReestr[this.activeDict].cid;
			let moduleName = dictReestr[this.activeDict].moduleName;

			(async () => {
				try {
					vm.$store.dispatch('removeComponent', {
						cid: cid
					});

					vm.$store.dispatch(moduleName + 'SetCid', null);
					vm.$store.dispatch(moduleName + 'SetData', {
						data: null
					});
					dictReestr[vm.activeDict].cid = null;
					moduleName = dictReestr[dictName].moduleName;

					let eventResponse = await vm.$store.dispatch('prepareData', {
						beanName: dictName,
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
								if (dataJson.method === 'addCID') {
									dictReestr[dictName].cid = respData.cid;
									funcUtils.addToLocalStorage('dictReestr', dictReestr);
									vm.$store.dispatch(moduleName + 'SetCid', respData.cid);
									eventResponse = await vm.$store.dispatch('prepareData', {
										method: 'getData',
										cid: respData.cid
									});
									await vm.$store.dispatch('fillModule', { 'event': eventResponse });
									vm.activeDict = dictName;
								}
							} else {
								if (!funcUtils.isNull(respError)) {
									alert(respError.errorMsg);
								}
							}
						}
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
