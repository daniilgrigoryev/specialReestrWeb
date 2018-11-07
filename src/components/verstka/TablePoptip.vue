<template>
	<Poptip placement="left" class="poptip absolute" style="z-index: 1;">
		<Avatar icon="ios-calendar" size="large" style="background-color: red" />
		<div slot="content" class="px0">
			<Form label-position="top">
				<FormItem label="Дата окончания действия разрешения" class="mx0 my0 py0 px0">
					<DatePicker class="datePicker" size="small" type="date" format="yyyy-MM-dd" v-model="expDate" autosize placeholder="Дата окончания действия" transfer></DatePicker>
				</FormItem>
				<FormItem class="mx0 my0 py0 px0">
					<Button type="error" @click="onClick" size="small" long>Применить к выбранным</Button>
				</FormItem>
			</Form>
		</div>
	</Poptip>
</template>

<style scoped>
.poptip {
	bottom: 2%;
	right: 50px;
	padding: 0;
}

.datePicker {
	width: 100%;
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
