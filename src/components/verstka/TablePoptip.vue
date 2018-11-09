<template>



	<Poptip placement="left"  class="poptip" width="300">

		
		<Icon type="md-calendar" class="poptip__icon"/>



		<div slot="content">
			<Form label-position="top">

				<Row>
					<Col span="24">
						<p class="txt-bold">Дата окончания действия разрешения</p>
					</Col>
					<Col span="24">
						<FormItem class="mx0 my0 py0 px0">
							<DatePicker style="width: 100%" class="datePicker" size="small" type="date" format="yyyy-MM-dd" v-model="expDate" autosize placeholder="Дата окончания действия" transfer></DatePicker>
						</FormItem>
					</Col>
					<Col span="24">
						<FormItem class="mx0 my0 py0 px0">
							<Button style="width: 100%" type="error" @click="onClick" size="small">Применить к выбранным</Button>
						</FormItem>					
					</Col>
				</Row>


			</Form>
		</div>
	</Poptip>




</template>

<style scoped>
	.poptip{
		position: fixed;
		bottom: 50px;
		right: 50px;
	}
	.poptip__icon{
		background-color: red;
		font-size: 40px;
		color: #fff;
		border-radius: 100%;
		padding: 10px;
		cursor: pointer;
		
	}
</style>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";

export default {
	name: 'TablePoptip',
	props: {
		date: Object,
		clickFunction: Function
	},
	data() {
		return {
			expDate: this.date
		}
	},
	methods: {
		onClick() {
			if (funcUtils.isNull(this.expDate) || this.expDate === '') return;
			this.clickFunction();
		}
	}
}
</script>
