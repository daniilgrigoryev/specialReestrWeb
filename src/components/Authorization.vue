<template>
	<Layout class="viewport-full">
		<div class="bg-gray flex-parent flex-parent--center-main flex-parent--center-cross viewport-full">
			<div class="auth-container">
				<div class="prose prose--dark align-center my24">
					<h3>Спецтранспорт</h3>
					<p>Единый реестр специальных <br> транспортных средств</p>
				</div>
				<Card class="pt6 px24">
					<p slot="title" class="align-center">Вход в систему</p>
					<Form label-position="top">
						<FormItem label="Логин" for="userName">
							<Input size="large" id="userName" v-model="userName" />
						</FormItem>
						<FormItem label="Пароль" for="userName">
							<Input size="large" id="password" v-model="password" />
						</FormItem>		


						<div class="py12 align-center">		
							<Button size="large" @click="authorize" type="primary">Войти</Button>
							<br/>
							<Button size="large" type="text" class="link">Восстановление пароля</Button>
						</div>	
					</Form>
				</Card>
			</div>
		</div>
	</Layout>
</template>
<style>
	.auth-container{
		max-width: 400px;
		min-width: 100px;
		width: 100%;
	}
</style>

<script>
import Fingerprint from "./../assets/js/vendor/fingerprint";
import * as funcUtils from "./../assets/js/utils/funcUtils";

export default {
	name: 'Authorization',
	data() {
		return {
			userName: '',
			password: ''
		}
	},

	methods: {
		authorize() {
			if (this.userName !== '' && this.password !== '') {
				let vm = this;
				let wid = sessionStorage.getItem('wid');
				(async () => {
					try {
						let eventResponse = await vm.$store.dispatch('prepareData', {
							beanName: null,
							method: 'login',
							params: {
								jsFingerPrint: new Fingerprint().get(),
								webGlId: funcUtils.webGlId(),
								platform: navigator.platform,
								userAgent: navigator.userAgent,
								cookieValue: null,
								username: vm.userName,
								databaseLabel: null,
								password: vm.password
							},
							cid: null
						});
						if (eventResponse.status === 200) {
							let data = eventResponse.response;
							if (data.length > 0) {
								let dataJson = JSON.parse(data);
								let respData = dataJson.data;
								let respError = dataJson.error;
								if (!funcUtils.isNull(respData)) {
									if (dataJson.method === 'login') {
										funcUtils.clearAll();
										localStorage.setItem('auth', 'true');
										localStorage.setItem('sid', respData.sid);
										if (funcUtils.isNull(sessionStorage.getItem(wid))) {
											sessionStorage.setItem(wid, '[]');
										}
										vm.$root.activateTimer();
									}
								} else {
									alert(respError.errorMsg);
								}
							}
						}
						if (funcUtils.isNotEmpty(localStorage.getItem('sid'))) {
							vm.$store.dispatch('sendSocketRequest', {
								body: {
									head: {
										sid: localStorage.getItem('sid'),
										wid: wid,
										cid: null,
										bean: null,
										method: 'addWID'
									},
									body: null
								},
								vm: vm
							});
							vm.$store.dispatch('getNextPage', {
								'vm': vm,
								'pageName': 'Test'
							});
							vm.$root.getRegisterReestr();
						}
					} catch (e) {
						alert(e.message);
					}
				})();
			} else {
				let message = '';
				if (this.userName === '') {
					message += 'Не заполнен логин!\n\r';
				}
				if (this.password === '') {
					message += 'Не заполнен пароль!';
				}
				alert(message);
			}
		}
	}
}
</script>
