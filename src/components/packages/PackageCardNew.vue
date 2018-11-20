<template>
  <Layout>
    <div class="bg-gray flex-parent flex-parent--center-main flex-parent--center-cross height100-header">
      <Card class="w-full mx12" style="max-width: 1200px; min-height: 600px;">
        <div slot="title">
          <Row type="flex" justify="space-between">
            <span class="txt-h3">Список записей</span>
            <div>
              <Button v-if="page === 0" type="primary" @click="addRow">Добавить новую запись
                <Icon type="md-add" :size="15"/>
              </Button>
              <Icon style="cursor: pointer;" type="ios-close" size="40" @click="getPrev"/>
            </div>
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
        <Row v-if="page === 0">
          <Col :xs="{span: 24}" :md="{span: 24}">
            <Table ref="selection" :columns="columnsOption" :data="packageRegisters" size="small"
                   @on-row-click="setPackageRegister" height="400"></Table>
          </Col>
        </Row>

        <Row v-if="page === 0" class="my24" :gutter="16">
          <Form v-if="selectedPackageRegister" label-position="top">
            <Col :xs="{span: 24}" :md="{span: 8}">
              <FormItem label="ГРЗ">
                <Input v-model="selectedPackageRegister.tcRegno"></Input>
              </FormItem>

              <FormItem label="Категория ТС">
                <Select :clearable="true" v-model="selectedPackageRegister.categoryId">
                  <Option v-for="item in categoryDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>

              <FormItem label="Марка ТС">
                <Input v-model="selectedPackageRegister.brand"></Input>
              </FormItem>
              <FormItem label="Модель ТС">
                <Input v-model="selectedPackageRegister.model"></Input>
              </FormItem>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 8}">
              <FormItem label="Назавание владельца">
                <Input v-model="selectedPackageRegister.ownerName"></Input>
              </FormItem>
              <FormItem label="Адрес владельца">
                <Input v-model="selectedPackageRegister.ownerAddress" type="textarea" :rows="4"></Input>
              </FormItem>
              <FormItem label="Телефон владельца">
                <Input v-model="selectedPackageRegister.ownerPhone"></Input>
              </FormItem>
            </Col>
            <Col :xs="{span: 24}" :md="{span: 8}">
              <FormItem label="Дата начала действия">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="selectedPackageRegister.permitStartDate"
                            placeholder="Select time1"></DatePicker>
              </FormItem>
              <FormItem label="Дата окончания действия">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="selectedPackageRegister.permitEndDate"
                            placeholder="Select time2"></DatePicker>
              </FormItem>
            </Col>
          </Form>
        </Row>

        <Row v-if="page === 1" type="flex" justify="space-between" class="px36 py36">
          <Col :xs="{span: 24}" :md="{span: 8}">
            <Form label-position="top">
              <FormItem label="Источник">
                <Select clearable v-model="sourceId" @on-change="changeSource">
                  <Option v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="Основание">
                <Select clearable v-model="reasonId" style="max-width: 380px;">
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
        </Row>

        <Footer class="flex-parent flex-parent--center-main card-footer pt12 py12 my0 border-t border--gray-light">
          <Button size="large" @click="prevStep" :disabled="page === 0">Назад</Button>

          <Button v-if="page === 0" :disabled="packageRegisters.length === 0" @click="nextStep" size="large"
                  type="primary" class="mx24">
            <span class="align-middle">Выбор подписи</span>
          </Button>
          <Button v-if="page === 1 && sourceId && reasonId && sertificateNumber" @click="signFile" size="large" type="primary" class="mx24">
            <span class="align-middle">Подписать файл</span>
          </Button>
          <Button v-if="page === 2 && sign" @click="signFile" size="large" type="primary" class="mx24">
            <span class="align-middle">Отправить файл</span>
          </Button>
        </Footer>
      </Card>
    </div>
  </Layout>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import 'crypto-pro';

  export default {
    name: "PackageCardNew",
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
          vm.$store.dispatch('packageCardNewSetCid', cid);

          let eventResponse = await vm.$store.dispatch('prepareData', {
            method: 'getSourceForLoad',
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

          eventResponse = await vm.$store.dispatch('prepareData', {
            method: 'getReasonForLoad',
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

          eventResponse = await vm.$store.dispatch('prepareData', {
            method: 'getCategoryDict',
            cid: cid
          });
          let categoryDict = JSON.parse(eventResponse.response).data;
          for (let prop in categoryDict) {
            if (categoryDict.hasOwnProperty(prop)) {
              vm.categoryDict.push({
                value: prop,
                label: categoryDict[prop]
              });
            }
          }
        } catch (e) {
          alert(e.message);
        }
      })();
    },
    destroyed() {
      this.$store.dispatch('packageCardNewSetCid', null);
      this.$store.dispatch('packageCardNewSetData', {
        data: null
      });
    },
    data() {
      return {
        generatedId: 1,
        packageRegisters: [],
        selectedPackageRegister: null,
        sourceDict: [],
        reasonDict: [],
        categoryDict: [],
        sourceId: null,
        reasonId: null,
        signList: [],
        sertificateObj: {},
        sertificateNumber: null,
        sign: null,
        file: null,
        page: 0,
        columnsOption: [
          {
            title: 'ГРЗ',
            key: 'tcRegno',
            align: "center",
            minWidth: 120,
            ellipsis: true,
            tooltip: true,
          },
          {
            title: 'Дата начала действия лицензии',
            key: 'permitStartDate',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Дата окончания действия лицензии',
            key: 'permitEndDate',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Категория ТС',
            key: 'categoryId',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Марка ТС',
            key: 'brand',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Модль ТС',
            key: 'model',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Название владельца',
            key: 'ownerName',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Адрес владельца',
            key: 'ownerAddress',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Телефон владельца',
            key: 'ownerPhone',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            }
          },
          {
            title: 'Операции',
            key: 'operations',
            minWidth: 100,
            align: 'center',
            ellipsis: true,
            tooltip: true,
            fixed: 'right',
            renderHeader: (h, params) => {
              return h('Tooltip', {
                props: {
                  placement: 'bottom',
                  content: params.column.title,
                  transfer: true,
                }

              }, [
                h('span', params.column.title)
              ])
            },
            render: (h, params) => {
              return h('div', {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between'
                },
              }, [
                h("Icon", {
                  props: {
                    type: "ios-copy",
                    size: 20,
                  },
                  style: {
                    cursor: "pointer",
                    color: "rgb(45, 140, 240)"
                  },
                  on: {
                    click: () => {
                      this.copyRow(params.row, params.index);
                      e.stopPropagation();
                    }
                  }
                }),
                h("Icon", {
                  props: {
                    type: "ios-trash",
                    size: 20,
                  },
                  style: {
                    cursor: "pointer",
                    color: "#ed4014",
                  },
                  on: {
                    click: () => {
                      this.deleteRow(params.row, params.index);
                      e.stopPropagation();
                    }
                  }
                })
              ]);
            }
          }
        ]
      }
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
              let eventResponse = await vm.$store.dispatch('prepareData', {
                method: 'createFile',
                params: {
                  data: {
                    items: vm.packageRegisters
                  }
                }
              });
              vm.file = JSON.parse(eventResponse.response).data;

              let signList = await this.getSignList();
              let sName = signList['SubjectName'];
              let sNumber = signList['SerialNumber'];
              let vFromDate = signList['ValidFromDate'];
              let vToDate = signList['ValidToDate'];

              let nameSplit = sName.split(";");
              let numberSplit = sNumber.split(";");
              let fDateSplit = vFromDate.split(";");
              let tDateSplit = vToDate.split(";");

              vm.signList = [];
              for (let i = 0; i < nameSplit.length; i++) {
                if (numberSplit[i].length > 0) {
                  vm.signList.push({
                    label: nameSplit[i] + "; " + numberSplit[i] + "; " + fDateSplit[i] + "; " + tDateSplit[i],
                    value: numberSplit[i]
                  });
                  vm.sertificateObj[numberSplit[i]] = {
                    IssuerName: '',
                    SubjectName: nameSplit[i],
                    SerialNumber: numberSplit[i],
                    ValidFromDate: fDateSplit[i],
                    ValidToDate: tDateSplit[i]
                  }
                }
              }
            } catch (e) {
              alert(e.message);
            }
          })();
        }
      },
      getSignList() {
        let CADESCOM_CADES_BES = 1;
        let CAPICOM_CURRENT_USER_STORE = 2;
        let CAPICOM_MY_STORE = "My";
        let CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED = 2;
        let CAPICOM_CERTIFICATE_FIND_SUBJECT_NAME = 1;

        return new Promise(function (resolve, reject) {
          cadesplugin.async_spawn(function* (args) {
            try {
              let oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
              yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE,
                CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

              let CertificatesObj = yield oStore.Certificates;

              let cnt = yield CertificatesObj.Count;
              let res = {};
              res.SubjectName = '';
              res.SerialNumber = '';
              res.ValidFromDate = '';
              res.ValidToDate = '';
              for (let i = 1; i <= cnt; i++) {
                let oCertificates = yield CertificatesObj.Item(i);
                let name = yield oCertificates.SubjectName;
                name = name.replace(new RegExp("\\n", 'g'), ',');
                res.SubjectName = res.SubjectName + ';' + name;
                let num = yield oCertificates.SerialNumber;
                res.SerialNumber = res.SerialNumber + ';' + num;
                let fdate = yield oCertificates.ValidFromDate;
                res.ValidFromDate = res.ValidFromDate + ';' + fdate;
                let tdate = yield oCertificates.ValidToDate;
                res.ValidToDate = res.ValidToDate + ';' + tdate;
              }

              yield oStore.Close();

              args[0](res);
            } catch (e) {
              args[1]("Failed to create signature. Error: " + cadesplugin.getLastError(e));
            }
          }, resolve, reject);
        });
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
        (async () => {
          try {
            let body = vm.file.substr(vm.file.lastIndexOf(',') + 1);
            let eventResponse = await vm.$store.dispatch('prepareData', {
              method: 'loadReestr',
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
              }
            });
            let response = JSON.parse(eventResponse.response).data;
            if (response) {
              alert('Подписан');
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
        dataToSign = dataToSign.substr(dataToSign.lastIndexOf(',') + 1);

        return new Promise(function (resolve, reject) {
          cadesplugin.async_spawn(function* (args) {
            try {
              let oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
              yield oStore.Open(CAPICOM_CURRENT_USER_STORE, CAPICOM_MY_STORE,
                CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED);

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

              let oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
              yield oSigner.propset_Certificate(oCertificate);

              let oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
              yield oSignedData.propset_ContentEncoding(cadesplugin.CADESCOM_BASE64_TO_BINARY);
              yield oSignedData.propset_Content(dataToSign);

              let resObj = {};

              let sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES, true);

              resObj.Message = sSignedMessage;
              resObj.SubjectName = yield oCertificate.SubjectName;
              resObj.SerialNumber = yield oCertificate.SerialNumber;
              resObj.IssuerName = yield oCertificate.IssuerName;
              resObj.ValidFromDate = yield oCertificate.ValidFromDate;
              resObj.ValidToDate = yield oCertificate.ValidToDate;

              yield oStore.Close();

              args[2](resObj);
            } catch (e) {
              args[3]("Failed to create signature. Error: " + cadesplugin.getLastError(e));
            }
          }, certSerialNumber, dataToSign, resolve, reject);
        });
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
      addRow() {
        let packageRegister = {
          tcRegno: '',
          permitStartDate: new Date(),
          permitEndDate: new Date(),
          ownerName: '',
          ownerAddress: '',
          ownerPhone: '',
          brand: '',
          model: '',
          categoryId: null
        };
        this.packageRegisters.push(packageRegister);
        this.selectedPackageRegister = null;
      },
      copyRow(row) {
        this.packageRegisters.push(row);
        this.selectedPackageRegister = null;
      },
      deleteRow(row, index) {
        this.packageRegisters.splice(index, 1);
        this.selectedPackageRegister = null;
      },
      setPackageRegister(row, index) {
        this.selectedPackageRegister = this.packageRegisters[index];
      },
      getPrev() {
        let vm = this;
        let path = funcUtils.getFromSessionStorage('path');
        (async () => {
          try {
            let currentPage = await vm.$store.dispatch('getCurrentPage', path);
            if (currentPage.params.routeName === vm.$store.state.packageReestr.routeName) {
              vm.$root.getPackageReestr();
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
  .wrapper {
    // width: 1000px;
    // min-width: 500px;
  }

  .card-footer {
    background: #fff;
  }

  .ivu-table-body {
    overflow-y: auto;
  }

  table th .ivu-table-cell {
    white-space: nowrap;
    display: block
  }

  table th .ivu-table-cell .ivu-tooltip {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline;
  }

  table th .ivu-table-cell .ivu-tooltip .ivu-tooltip-rel {
    width: 100%;
  }
</style>
