<template>
  <Layout>
    <div class="bg-gray flex-parent flex-parent--center-main flex-parent--center-cross height100-header">
      <Card class="w-full" style="max-width: 1200px;  min-height: 600px;">
        <div slot="title">
          <Row type="flex" justify="space-between">
            <span class="txt-h3">Загрузка пакета</span>
            <Icon style="cursor: pointer;" type="ios-close" size="40" @click="getPrev"/>
          </Row>
        </div>
        <Row type="flex" justify="center" class="py36">
          <Col :xs="{span: 24,  offset: 1}" :md="{span: 18, offset: 5}">
            <Steps :current="page">
              <Step title="Загрузка"></Step>
              <Step title="Подпись"></Step>
              <Step title="Отправка"></Step>
            </Steps>
          </Col>
        </Row>
        <Row type="flex" justify="space-between" class="px36 py36">
          <Col v-if="page === 0" :xs="{span: 24}" :md="{span: 8}">
            <Form label-position="top">
              <FormItem label="Источник">
                <Select clearable v-model="sourceId" @on-change="changeSource">
                  <Option v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="Основание">
                <Select clearable v-model="reasonId" style="width:100%; max-width: 380px;">
                  <Option style="white-space: pre-wrap;" v-for="item in reasonDict" :value="item.value"
                          :key="item.value">{{ item.label }}
                  </Option>
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
                <td class="border--0 px0 py0">{{sertificateObj[sertificateNumber].SubjectName}}</td>
              </tr>
              <tr class="txt-bold">
                <td class="border--0 px0 py0 color-gray">Срок действия</td>
                <td class="border--0 px0 py0">{{sertificateObj[sertificateNumber].ValidFromDate + ' - ' +
                  sertificateObj[sertificateNumber].ValidToDate}}
                </td>
              </tr>
              <tr class="txt-bold">
                <td class="border--0 px0 py0 color-gray">Подпись</td>
                <td class="border--0 px0 py0">{{sertificateObj[sertificateNumber].SerialNumber}}</td>
              </tr>
              </tbody>
            </table>
          </Col>

          <Col :xs="{span: 24}" :md="{span: 8}">
            <Form label-position="top">
              <FormItem label="Вложение">
                <Card :padding="0" class="relative">
                  <input type="file" ref="file" @change="onFileChange" id="file"
                         class="absolute w-full h-full opacity0 scroll-hidden z-neg1"/>
                  <label for="file" class="relative block cursor-pointer px12 py12">
                    <Row type="flex" justify="space-between" align="middle">
                      <figure class="block bg-white round px6 py6">
                        <Icon v-if="!previewImage" type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <img id="previewImage" v-if="previewImage" :src="previewImage"
                             style="width: 52px; height: 52px;"/>
                      </figure>
                      <Col :xs="{span: 16}" :md="{span: 15}" :lg="{span: 17}" class="align-center">
                        <div class="px6" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                          <b>{{fileName}}</b>
                        </div>
                      </Col>
                      <Button @click.stop="clearFile" type="error" shape="circle" icon="md-close"
                              style="font-size: 20px;"></Button>
                    </Row>
                  </label>
                </Card>
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Footer
          class="flex-parent flex-parent--space-between-main flex-parent--center-main card-footer px36 py24 my0 border-t border--gray-light">
          <Button size="large" @click="prevStep" :disabled="page === 0">Назад</Button>
          <Button v-if="page === 0" size="large" type="primary" @click="nextStep">Выбор подписи</Button>
          <Button v-if="file && page === 1 && sourceId && reasonId" size="large" type="primary" @click="signFile">Подписать файл</Button>
          <Button v-if="sign && page === 2" size="large" type="primary" @click="sendSignedFile">Отправить файл</Button>
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
    beforeCreate: function () {
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
                label: sourceDict[prop].name,
                reasons: sourceDict[prop].reasons
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
        fileName: 'Выберете или перетащите файл',
        page: 0,
        sign: null,
        previewImage: null
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

        return new Promise(function (resolve, reject) {
          cadesplugin.async_spawn(
            function* (args) {
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
        if (!files || files.length === 0) {
          return;
        }
        let file = files[0];
        let type = file.type;
        if (type !== 'text/xml' && type !== 'application/vnd.ms-excel' && type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.clearFile();
          alert('Только XML или XLS(XLSX)!!!');
          return;
        }
        this.fileName = file.name;
        let vm = this;
        let reader = new FileReader();
        reader.onload = e => {
          vm.file = e.currentTarget.result;
          if (type.indexOf('image') > -1) {
            this.previewImage = vm.file;
          }
        };
        reader.readAsDataURL(file);
      },
      changeSource(val) {
        this.reasonDict = [];
        this.reasonId = null;
        if (funcUtils.isNotEmpty(val)) {
          let reason = this.sourceDict.filter((item) => {
            return item.value === val;
          })[0];

          let vm = this;
          let cid = funcUtils.getfromLocalStorage("packageReestr");

          (async () => {
            try {
              let eventResponse = await vm.$store.dispatch("prepareData", {
                method: "getReasonForLoad",
                cid: cid
              });
              let reasonDict = JSON.parse(eventResponse.response).data;
              for (let prop in reasonDict) {
                if (reasonDict.hasOwnProperty(prop) && reason.reasons.includes(reasonDict[prop].id)) {
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
        }
      },
      clearFile() {
        this.file = null;
        this.previewImage = null;
        this.fileName = 'Выберете или перетащите файл';
        let input = this.$refs.file;
        input.type = 'file';
      },
      getSignList() {
        let CADESCOM_CADES_BES = 1;
        let CAPICOM_CURRENT_USER_STORE = 2;
        let CAPICOM_MY_STORE = "My";
        let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
        let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

        return new Promise(function (resolve, reject) {
          cadesplugin.async_spawn(
            function* (args) {
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
      getPrev: function () {
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

