<template>
	<div>
		<Row type="flex" justify="space-between">
			<Col :xs="{span: 24}" :md="{span: 12}">
				<h3 class="txt-h3">Типы территорий</h3>
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
		<Table border ref="selection" size="small" :columns="columnsOption" :data="dictArea"></Table>
	</div>

	
	
	<!--<div>
	    <table>
	      <thead>
	      <tr>
	        <td>Название</td>
	      </tr>
	      </thead>
	      <tbody>
	      <tr v-for="(value, key) in dictArea" :key="key" class="registersRow">
	        <td>{{value}}</td>
	      </tr>
	      </tbody>
	    </table>
	  </div>-->
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";

export default {
	name: "DictArea",
	beforeCreate() {
		let data = this.$store.state.dictArea.data;
		if (!data) {
			let vm = this;
			let dictReestr = funcUtils.getfromLocalStorage('dictReestr');
			let cid = dictReestr[this.$store.state.dictArea.bean].cid;

			(async () => {
				try {
					vm.$store.dispatch('dictAreaSetCid', cid);
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
				title: "Название",
				key: "area",
				align: 'center'
			}],
		}
	},
	computed: {
		dictArea() {
			let res = [];
			let data = this.$store.state.dictArea.data;
			if (data) {
				data.forEach((item) => {
					res.push({
						area: item
					});
				});
			}
			return res;
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
