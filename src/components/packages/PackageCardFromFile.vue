<template>
	<!--<div>
				    <button type="button" @click="getPrev">Назад</button>
				
				    <div v-if="page === 1">
				      <div>
				        <span>Источник</span>
				        <Select :clearable="true" v-model="sourceId">
				          <Option v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
				        </Select>
				      </div>
				      <div>
				        <span>Основание</span>
				        <Select :clearable="true" v-model="reasonId">
				          <Option v-for="item in reasonDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
				        </Select>
				      </div>
				
				      <button v-if="sourceId" type="button" @click="nextStep">Выбор подписи</button>
				    </div>
				
				    <div v-if="page === 2">
				      <div>
				        <span>Сертификат</span>
				        <Select :clearable="true" v-model="sertificateNumber">
				          <Option v-for="item in signList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				        </Select>
				      </div>
				
				      <div v-if="sertificateNumber">
				        <div>
				          <span>Кому выдан</span>
				          <div>
				            {{sertificateObj[sertificateNumber].IssuerName}}
				          </div>
				        </div>
				
				        <div>
				          <span>Кем выдан</span>
				          <div>
				            {{sertificateObj[sertificateNumber].SubjectName}}
				          </div>
				        </div>
				
				        <div>
				          <span>Срок действия</span>
				          <div>
				            {{sertificateObj[sertificateNumber].ValidFromDate + ' - ' + sertificateObj[sertificateNumber].ValidToDate}}
				          </div>
				        </div>
				
				        <div>
				          <span>Подпись</span>
				          <div>
				            {{sertificateObj[sertificateNumber].SerialNumber}}
				          </div>
				        </div>
				      </div>
				
				      <button v-if="file" type="button" @click="signFile">Подписать файл</button>
				      <button v-if="sign" type="button" @click="sendSignedFile">Отправить файл</button>
				    </div>
				
				    <div>
				      <div>
				        <input type="file" @change="onFileChange">
				      </div>
				    </div>
				  </div>-->
	<Layout class="height100-header">
		<div class="bg-gray flex-parent flex-parent--center-main flex-parent--center-cross height100-header">
			<Card class="w-full" style="max-width: 1200px;  min-height: 600px;">
				<div slot="title">
					<Row type="flex" justify="space-between" align="center">
						<span class="txt-h3">Загрузка пакета</span>
						<Icon style="cursor: pointer;" type="ios-close" size="40" @click="getPrev" />
					</Row>
				</div>
				<Row type="flex" justify="center" align="middle" class="py36">
					<Col :xs="{span: 24,  offset: 1}" :md="{span: 18, offset: 5}">
					<Steps :current="page">
						<Step title="Загрузка"></Step>
						<Step title="Подпись"></Step>
						<Step title="Отправка"></Step>
					</Steps>
					</Col>
				</Row>
				<Row type="flex" align="middle" justify="space-between" class="px36 py36">
					<Col v-if="page === 0" :xs="{span: 24}" :md="{span: 8}">
					<Form label-position="top">
						<FormItem label="Источник">
							<Select clearable v-model="sourceId">
												<Option v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
											</Select>
						</FormItem>
						<FormItem label="Основание">
							<Select clearable v-model="reasonId">
												<Option v-for="item in reasonDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
											</Select>
						</FormItem>
					</Form>
					</Col>
	
					<Col :xs="{span: 24}" :md="{span: 8}">
					<Form v-if="page === 1" label-position="top">
						<FormItem label="Сертификат">
							<Select :clearable="true" v-model="sertificateNumber">
												<Option v-for="item in signList" :value="item.value" :key="item.value">{{ item.label }}</Option>
											</Select>
						</FormItem>
					</Form>
	
					<table v-if="sertificateNumber" class="table table--fixed border--0">
						<tbody>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Кому выдан</td>
								<td class="border--0 px0 py0">{{sertificateObj[sertificateNumber].IssuerName}}"</td>
							</tr>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Кем выдан</td>
								<td class="border--0 px0 py0">{{sertificateObj[sertificateNumber].SubjectName}} </td>
							</tr>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Срок действия</td>
								<td class="border--0 px0 py0">{{sertificateObj[sertificateNumber].ValidFromDate + ' - ' + sertificateObj[sertificateNumber].ValidToDate}}</td>
							</tr>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Подпись</td>
								<td class="border--0 px0 py0">{{sertificateObj[sertificateNumber].SerialNumber}}</td>
							</tr>
						</tbody>
					</table>
					</Col>
	
					<Col :xs="{span: 24}" :md="{span: 8}">
					<input type="file" @change="onFileChange">
					<div class="px24 py24">
						<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
						<p>Выберете файл или перетащите его сюда</p>
					</div>
					</Col>
				</Row>
	
	
				<Row v-if="false" type="flex" align="middle" justify="space-between" class="px36 py36">
					<Col :xs="{span: 24}" :md="{span: 8}">
					<Form label-position="top">
						<FormItem label="Источник">
							<Select clearable style="width:100%" size="large">
									<Option value="">New York</Option>
									<Option value="">New Amsterdam</Option>
									</Select>
						</FormItem>
						<FormItem label="Основание">
							<Select clearable style="width:100%" size="large">
									<Option value="">New York</Option>
									<Option value="">New Amsterdam</Option>
									</Select>
						</FormItem>
					</Form>
					</Col>
					<Col :xs="{span: 24}" :md="{span: 8}">
					<Card :bordered="false" class="flex-parent flex-parent--center-main align-center my24 border round-bold px24 py12 fr" style="max-width: 200px;">
						<Icon type="ios-document" size="150" />
						<div class="color-black">93f23fa123fadfasf.xml</div>
						<div class="color-gray txt-s">Готов к отправке на подпись</div>
					</Card>
					</Col>
				</Row>
	
	
				<Row v-if="false" type="flex" align="middle" justify="space-between" class="px36 py36">
					<Col :xs="{span: 24}" :md="{span: 8}">
					<Form label-position="top">
						<FormItem label="Источник">
							<Select clearable style="width:100%" size="large">
									<Option value="">New York</Option>
									<Option value="">New Amsterdam</Option>
									</Select>
						</FormItem>
						<FormItem label="Основание">
							<Select clearable style="width:100%" size="large">
									<Option value="">New York</Option>
									<Option value="">New Amsterdam</Option>
									</Select>
						</FormItem>
					</Form>
					</Col>
					<Col :xs="{span: 24}" :md="{span: 8}">
	
	
	
					<Card :bordered="false" class="flex-parent flex-parent--center-main align-center my24 border round-bold px24 py12 fr color-red-dark" style="max-width: 200px;">
						<Icon type="ios-document" size="150" />
						<div class="color-black">93f23fa123fadfasf.xml</div>
						<div class="color-gray-light txt-s color-red-dark">Файл содержит ошибки</div>
					</Card>
	
	
	
					</Col>
				</Row>
	
	
				<Row v-if="false" type="flex" align="middle" justify="space-between" class="px36 py36">
					<Col :xs="{span: 24}" :md="{span: 8}">
	
	
					<Form label-position="top">
						<FormItem label="Сертификат">
							<Select clearable style="width:100%" size="large">
									<Option value="1">New York</Option>
									<Option value="2">New Amsterdam</Option>
									</Select>
						</FormItem>
					</Form>
					<table class="table table--fixed border--0">
						<tbody>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Кому выдан</td>
								<td class="border--0 px0 py0">ООО "ВИРАЖСИСТЕМС"</td>
							</tr>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Кем выдан</td>
								<td class="border--0 px0 py0">UNSS LUFFJ L JJSJJ JHLA </td>
							</tr>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Срок действия</td>
								<td class="border--0 px0 py0">25.02.2018 15:34</td>
							</tr>
							<tr class="txt-bold">
								<td class="border--0 px0 py0 color-gray">Подпись</td>
								<td class="border--0 px0 py0">6c179f21e6f62b629055d8ab40f454ed02e48b68563</td>
							</tr>
						</tbody>
					</table>
					</Col>
					<Col :xs="{span: 24}" :md="{span: 8}">
					<Card class="flex-parent flex-parent--center-main align-center my24 border round-bold px24 py12 fr" style="max-width: 200px;">
						<Icon type="ios-document" size="150" />
						<span class="color-black">93f23fa123fadfasf.xml</span>
					</Card>
					</Col>
				</Row>
	
	
				<Row v-if="false" type="flex" align="middle" justify="center" class="px36 py36">
					<Col :xs="{span: 24}" :md="{span: 24}">
					<Card :bordered="false" class="flex-parent flex-parent--center-main align-center my24 border round-bold color-green px24 py12 mx-auto" style="max-width: 200px;">
	
						<Icon type="ios-document" size="150" />
	
	
						<div class="color-black">93f23fa123fadfasf.xml</div>
						<div class="color-gray txt-s">Файл пакета подписан и отправлен</div>
					</Card>
					</Col>
				</Row>
	
				<Row v-if="false" type="flex" align="middle" justify="center" class="px36 py36">
					<Col :xs="{span: 24}" :md="{span: 24}">
					<Card :bordered="false" class="flex-parent flex-parent--center-main align-center my24 border round-bold color-green px24 py12 mx-auto" style="max-width: 200px;">
						<Icon type="ios-document" size="150" />
						<div class="color-black">93f23fa123fadfasf.xml</div>
						<div class="color-gray txt-s">Файл пакета отправлен</div>
					</Card>
					</Col>
				</Row>
	
	
	
				<Footer v-if="false" class="flex-parent flex-parent--space-between-main flex-parent--center-main card-footer px36 py24 my0 border-t border--gray-light">
					<Button size="large">Отмена</Button>
					<Button size="large" type="primary" disabled>Подписать файл</Button>
				</Footer>
	
				<Footer class="flex-parent flex-parent--space-between-main flex-parent--center-main card-footer px36 py24 my0 border-t border--gray-light">
					<Button size="large" @click="prevStep" :disabled="page === 0">Назад</Button>
					<Button v-if="page === 0" size="large" type="primary" @click="nextStep">Выбор подписи</Button>
					<Button v-if="file && page === 1" size="large" type="primary" @click="signFile">Подписать файл</Button>
					<Button v-if="sign && page === 2" size="large" type="primary" @click="sendSignedFile">Отправить файл</Button>
				</Footer>
	
				<Footer v-if="false" class="flex-parent flex-parent--space-between-main flex-parent--center-main card-footer px36 py24 my0 border-t border--gray-light">
					<Button size="large">Отмена</Button>
					<Button size="large" type="primary" disabled>
								<span class="align-middle">Выбор подписи</span>
								<Icon type="md-arrow-dropright" />
							</Button>
				</Footer>
	
				<Footer v-if="false" class="flex-parent flex-parent--space-between-main flex-parent--center-main card-footer px36 py24 my0 border-t border--gray-light">
					<Button size="large"><Icon type="md-arrow-dropleft" /> Загрузить снова</Button>
					<Button size="large" type="primary">
								<span class="align-middle">Подписать и отправить</span>
								<Icon type="md-arrow-dropright" />
							</Button>
				</Footer>

				<Footer v-if="false" class="flex-parent flex-parent--center-main card-footer px36 py24 my0 border-t border--gray-light">
					<Button size="large" type="primary">Закрыть</Button>
				</Footer>
			</Card>
		</div>
	</Layout>
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import "crypto-pro";

export default {
	name: "PackageCardFromFile",
	beforeCreate: function() {
		let vm = this;
		let cid = funcUtils.getfromLocalStorage("packageReestr");

		(async () => {
			try {
				let eventResponse = await vm.$store.dispatch("prepareData", {
					method: "getSourceForLoad",
					cid: cid
				});
				let sourceDict = JSON.parse(eventResponse.response).data;
				for (let prop in sourceDict) {
					if (sourceDict.hasOwnProperty(prop)) {
						vm.sourceDict.push({
							value: sourceDict[prop].id,
							label: sourceDict[prop].name
						});
					}
				}

				eventResponse = await vm.$store.dispatch("prepareData", {
					method: "getReasonForLoad",
					cid: cid
				});
				let reasonDict = JSON.parse(eventResponse.response).data;
				for (let prop in reasonDict) {
					if (reasonDict.hasOwnProperty(prop)) {
						vm.reasonDict.push({
							value: reasonDict[prop].id,
							label: reasonDict[prop].name
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
			sourceDict: [],
			reasonDict: [],
			sourceId: null,
			reasonId: null,
			signList: [],
			sertificateObj: {},
			sertificateNumber: null,
			file: null,
			page: 0,
			sign: null
		};
	},
	methods: {
		prevStep() {
			if (this.page > 0) {
				this.page--;
			}
		},
		nextStep() {
			this.page++;
			let vm = this;
			if (this.page === 1) {
				(async () => {
					try {
						let signList = await this.getSignList();
						let sName = signList["SubjectName"];
						let sNumber = signList["SerialNumber"];
						let vFromDate = signList["ValidFromDate"];
						let vToDate = signList["ValidToDate"];

						let nameSplit = sName.split(";");
						let numberSplit = sNumber.split(";");
						let fDateSplit = vFromDate.split(";");
						let tDateSplit = vToDate.split(";");

						vm.signList = [];
						for (let i = 0; i < nameSplit.length; i++) {
							if (numberSplit[i].length > 0) {
								vm.signList.push({
									label: nameSplit[i] +
										"; " +
										numberSplit[i] +
										"; " +
										fDateSplit[i] +
										"; " +
										tDateSplit[i],
									value: numberSplit[i]
								});
								vm.sertificateObj[numberSplit[i]] = {
									IssuerName: "",
									SubjectName: nameSplit[i],
									SerialNumber: numberSplit[i],
									ValidFromDate: fDateSplit[i],
									ValidToDate: tDateSplit[i]
								};
							}
						}
					} catch (e) {
						alert(e.message);
					}
				})();
			}
		},
		signFile() {
			let vm = this;
			(async () => {
				try {
					let sign = await vm.signCreate(vm.sertificateNumber, vm.file);
					vm.sertificateObj[vm.sertificateNumber].IssuerName = sign.IssuerName;
					vm.sign = sign;
					vm.page++;
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		sendSignedFile() {
			let vm = this;
			let cid = funcUtils.getfromLocalStorage("packageReestr");
			(async () => {
				try {
					let body = vm.file.substr(vm.file.lastIndexOf(",") + 1);
					let eventResponse = await vm.$store.dispatch("prepareData", {
						method: "loadReestr",
						params: {
							sourceId: vm.sourceId,
							reasonId: vm.reasonId,
							body: body,
							signedMessage: vm.sign.Message,
							signingTime: new Date(),
							certSerialNumber: vm.sign.SerialNumber,
							certSubject: vm.sign.SubjectName,
							certIssuer: vm.sign.IssuerName,
							certValidFrom: vm.sign.ValidFromDate,
							certValidTo: vm.sign.ValidToDate
						},
						cid: cid
					});
					let response = JSON.parse(eventResponse.response).data;
					if (response) {
						alert("Подписан");
						vm.getPrev();
					}
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		signCreate(certSerialNumber, dataToSign) {
			let CADESCOM_CADES_BES = 1;
			let CAPICOM_CURRENT_USER_STORE = 2;
			let CAPICOM_MY_STORE = "My";
			let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
			let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;
			dataToSign = dataToSign.substr(dataToSign.lastIndexOf(",") + 1);

			return new Promise(function(resolve, reject) {
				cadesplugin.async_spawn(
					function*(args) {
						try {
							let oStore = yield cadesplugin.CreateObjectAsync(
								"CAdESCOM.Store"
							);
							yield oStore.Open(
								CAPICOM_CURRENT_USER_STORE,
								CAPICOM_MY_STORE,
								CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
							);

							let CertificatesObj = yield oStore.Certificates;
							let oCertificate = {};
							let cnt = yield CertificatesObj.Count;
							for (let i = 1; i <= cnt; i++) {
								let vCertificate = yield CertificatesObj.Item(i);
								let num = yield vCertificate.SerialNumber;
								if (certSerialNumber == num) {
									oCertificate = vCertificate;
									break;
								}
							}

							let oSigner = yield cadesplugin.CreateObjectAsync(
								"CAdESCOM.CPSigner"
							);
							yield oSigner.propset_Certificate(oCertificate);

							let oSignedData = yield cadesplugin.CreateObjectAsync(
								"CAdESCOM.CadesSignedData"
							);
							yield oSignedData.propset_ContentEncoding(
								cadesplugin.CADESCOM_BASE64_TO_BINARY
							);
							yield oSignedData.propset_Content(dataToSign);

							let resObj = {};

							let sSignedMessage = yield oSignedData.SignCades(
								oSigner,
								cadesplugin.CADESCOM_CADES_BES,
								true
							);

							resObj.Message = sSignedMessage;
							resObj.SubjectName = yield oCertificate.SubjectName;
							resObj.SerialNumber = yield oCertificate.SerialNumber;
							resObj.IssuerName = yield oCertificate.IssuerName;
							resObj.ValidFromDate = yield oCertificate.ValidFromDate;
							resObj.ValidToDate = yield oCertificate.ValidToDate;

							yield oStore.Close();

							args[2](resObj);
						} catch (e) {
							args[3](
								"Failed to create signature. Error: " +
								cadesplugin.getLastError(e)
							);
						}
					},
					certSerialNumber,
					dataToSign,
					resolve,
					reject
				);
			});
		},
		onFileChange(e) {
			let files = e.target.files || e.dataTransfer.files;
			if (!files || files.length === 0) return;
			let vm = this;
			let reader = new FileReader();
			reader.onload = e => {
				vm.file = e.currentTarget.result;
			};

			reader.readAsDataURL(files[0]);
		},
		getSignList() {
			let CADESCOM_CADES_BES = 1;
			let CAPICOM_CURRENT_USER_STORE = 2;
			let CAPICOM_MY_STORE = "My";
			let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
			let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

			return new Promise(function(resolve, reject) {
				cadesplugin.async_spawn(
					function*(args) {
						try {
							let oStore = yield cadesplugin.CreateObjectAsync(
								"CAdESCOM.Store"
							);
							yield oStore.Open(
								CAPICOM_CURRENT_USER_STORE,
								CAPICOM_MY_STORE,
								CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
							);

							let CertificatesObj = yield oStore.Certificates;

							let cnt = yield CertificatesObj.Count;
							let res = {};
							res.SubjectName = "";
							res.SerialNumber = "";
							res.ValidFromDate = "";
							res.ValidToDate = "";
							for (let i = 1; i <= cnt; i++) {
								let oCertificates = yield CertificatesObj.Item(i);
								let name = yield oCertificates.SubjectName;
								name = name.replace(new RegExp("\\n", "g"), ",");
								res.SubjectName = res.SubjectName + ";" + name;
								let num = yield oCertificates.SerialNumber;
								res.SerialNumber = res.SerialNumber + ";" + num;
								let fdate = yield oCertificates.ValidFromDate;
								res.ValidFromDate = res.ValidFromDate + ";" + fdate;
								let tdate = yield oCertificates.ValidToDate;
								res.ValidToDate = res.ValidToDate + ";" + tdate;
							}

							yield oStore.Close();

							args[0](res);
						} catch (e) {
							args[1](
								"Failed to create signature. Error: " +
								cadesplugin.getLastError(e)
							);
						}
					},
					resolve,
					reject
				);
			});
		},
		getPrev: function() {
			let vm = this;
			let path = funcUtils.getFromSessionStorage("path");
			(async () => {
				try {
					let currentPage = await vm.$store.dispatch("getCurrentPage", path);
					if (
						currentPage.params.routeName ===
						vm.$store.state.packageReestr.routeName
					) {
						vm.$root.getPackageReestr();
					} else {
						await vm.$store.dispatch("getPrevComponent");
						vm.$store.dispatch("getPrevPage", {
							vm: vm,
							pageName: currentPage.params.routeName
						});
					}
				} catch (e) {
					alert(e.message);
				}
			})();
		}
	}
};
</script>

<style lang="scss">
.card {
	max-width: 1000px;
}

.card-footer {
	background: #fff;
}
</style>
