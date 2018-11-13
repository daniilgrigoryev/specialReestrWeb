<template>
  <Layout class="height100-header">
    <Sider width="350px" style="min-width: 350px" class="bg-white">
      <Menu @on-select="onMenuClick" :active-name="activeReport" width="auto" theme="primary">
        <MenuGroup title="Типы отчетов">
          <MenuItem name="ReportCategory">Содержание данных</MenuItem>
          <MenuItem name="ReportSpecial">Особый порядок аннулирования разрешений</MenuItem>
          <MenuItem name="ReportZone">Действующие пропуска</MenuItem>
        </MenuGroup>
      </Menu>
    </Sider>

    <Content>
      <Card>
        <report-category v-if="showReportCategory"></report-category>
        <report-special v-if="showReportSpecial"></report-special>
        <report-zone v-if="showReportZone"></report-zone>
      </Card>
    </Content>
  </Layout>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import ReportCategory from "../reports/ReportCategory";
  import ReportSpecial from "../reports/ReportSpecial";
  import ReportZone from "../reports/ReportZone";
  import TablePoptip from './../verstka/TablePoptip.vue';

  export default {
    name: "ReportReestr",
    components: {
      ReportCategory,
      ReportSpecial,
      ReportZone,
      TablePoptip
    },
    mounted() {
      let vm = this;
      let reportReestr = funcUtils.getfromLocalStorage('reportReestr');

      let reportCategory = this.$store.state.reportCategory.bean;
      let reportSpecial = this.$store.state.reportSpecial.bean;
      let reportZone = this.$store.state.reportZone.bean;

      (async () => {
        try {
          let eventResponse;
          if (funcUtils.isNull(reportReestr)) {
            reportReestr = {};
            reportReestr[reportCategory] = {
              cid: null,
              moduleName: vm.$store.state.reportCategory.moduleName
            };
            reportReestr[reportSpecial] = {
              cid: null,
              moduleName: vm.$store.state.reportSpecial.moduleName
            };
            reportReestr[reportZone] = {
              cid: null,
              moduleName: vm.$store.state.reportZone.moduleName
            };

            eventResponse = await vm.$store.dispatch('prepareData', {
              beanName: reportCategory,
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
                    reportReestr[reportCategory].cid = respData.cid;
                    funcUtils.addToLocalStorage('reportReestr', reportReestr);
                    vm.$store.dispatch('reportCategorySetCid', respData.cid);
                    eventResponse = await vm.$store.dispatch('prepareData', {
                      method: 'getData',
                      params: {
                        fromDate: new Date('01/01/2018'),
                      },
                      cid: respData.cid
                    });
                    await vm.$store.dispatch('fillModule', {'event': eventResponse});
                    vm.activeReport = reportCategory;
                  }
                } else {
                  if (!funcUtils.isNull(respError)) {
                    alert(respError.errorMsg);
                  }
                }
              }
            }
          } else {
            for (let prop in reportReestr) {
              if (reportReestr.hasOwnProperty(prop)) {
                if (funcUtils.isNotEmpty(reportReestr[prop].cid)) {
                  vm.activeReport = prop;
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
      this.$store.dispatch('reportCategorySetCid', null);
      this.$store.dispatch('reportCategorySetData', {
        data: null
      });

      this.$store.dispatch('reportSpecialSetCid', null);
      this.$store.dispatch('reportSpecialSetData', {
        data: null
      });

      this.$store.dispatch('reportZoneSetCid', null);
      this.$store.dispatch('reportZoneSetData', {
        data: null
      });
    },
    data() {
      return {
        activeReport: ''
      }
    },
    computed: {
      showReportCategory() {
        return this.$store.state.reportCategory.bean === this.activeReport;
      },
      showReportSpecial() {
        return this.$store.state.reportSpecial.bean === this.activeReport;
      },
      showReportZone() {
        return this.$store.state.reportZone.bean === this.activeReport;
      }
    },
    methods: {
      onMenuClick(reportName) {
        let vm = this;
        let reportReestr = funcUtils.getfromLocalStorage('reportReestr');
        let cid = reportReestr[this.activeReport].cid;
        let moduleName = reportReestr[this.activeReport].moduleName;

        (async () => {
          try {
            vm.$store.dispatch('removeComponent', {
              cid: cid
            });

            vm.$store.dispatch(moduleName + 'SetCid', null);
            vm.$store.dispatch(moduleName + 'SetData', {
              data: null
            });
            reportReestr[vm.activeReport].cid = null;
            moduleName = reportReestr[reportName].moduleName;

            let eventResponse = await vm.$store.dispatch('prepareData', {
              beanName: reportName,
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
                    reportReestr[reportName].cid = respData.cid;
                    funcUtils.addToLocalStorage('reportReestr', reportReestr);
                    vm.$store.dispatch(moduleName + 'SetCid', respData.cid);
                    eventResponse = await vm.$store.dispatch('prepareData', {
                      method: 'getData',
                      params: {
                        fromDate: new Date('01/01/2018'),
                      },
                      cid: respData.cid
                    });
                    await vm.$store.dispatch('fillModule', {'event': eventResponse});
                    vm.activeReport = reportName;
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
