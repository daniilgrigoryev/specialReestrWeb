<template>
    <Layout class="main-wrapper" style="min-height: calc(100vh - 64px)">
        <table-poptip :expDate="expDate" :clickFunction="createExpireReestr"></table-poptip>
        
            

                <!-- :xs="{span: 24, order: 2}" :sm="{span: 1, order: 2}" :md="{span: 10, order: 1}" :lg="{span: 4, order: 1}" -->
                 <!-- :xs="{span: 24, order: 1}" :sm="{span: 1, order: 2}" :md="{span: 14, order: 2}" :lg="{span: 20, order: 2}" -->


            <Sider width="350px" style="min-width: 350px" class="px18 py18 bg-white">
                <Form label-position="top">
                    <h3 class="txt-h2 my12">Фильтр объектов</h3>

                    <FormItem label="Признак активности">
                        <RadioGroup  v-model="filter.flgActive.value1">
                            <Row>
                                <Radio label="null">Все</Radio>
                            </Row>
                            <Row>
                                <Radio label="T">Активные</Radio>
                            </Row>
                            <Row>
                                <Radio label="F">Неактивные</Radio>
                            </Row>
                        </RadioGroup>
                    </FormItem>


                    <FormItem label="ГРЗ">
                        <Input v-model="filter.tcRegno.value1"></Input>
                    </FormItem>

                    <FormItem label="Источник" prop="">
                        <Select :clearable="true" v-model="filter.sourceId.value1">
                                <Option v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                    </FormItem>

                    <FormItem label="Основание" prop="">
                        <Select :clearable="true" v-model="filter.reasonId.value1">
                                <Option v-for="item in reasonDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                    </FormItem>

                    <FormItem label="Категория" prop="">
                        <Select :clearable="true" v-model="filter.categoryId.value1">
                                <Option v-for="item in categoryDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                    </FormItem>


                    <FormItem label="Владелец (Название или ФИО)">
                        <Input v-model="filter.ownerName.value1"></Input>
                    </FormItem>


                    <FormItem label="Время создания записи" :style="{width: '100%'}">
                        <Row :gutter="8">
                            <Col :md="{span: 24}" :lg="{span: 12}" class="my6">
                                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value1" style="width: 100%"></DatePicker>
                            </Col>
                            <Col :md="{span: 24}" :lg="{span: 12}" class="my6">
                                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value2" style="width: 100%"></DatePicker>
                            </Col> 
                        </Row>
                    </FormItem>

                    <FormItem label="Дата начала действия разрешения">
                        <Row :gutter="8">
                            <Col :md="{span: 24}" :lg="{span: 12}" class="my6">
                                <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value1" style="width: 100%"></DatePicker>
                            </Col>
                            <Col :md="{span: 24}" :lg="{span: 12}" class="my6">
                                <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value2" style="width: 100%"></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="Дата окончания действия разрешения">
                        <Row :gutter="8">
                            <Col :xs="{span: 24}" :lg="{span: 12}" class="my6">
                                <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value1" style="width: 100%"></DatePicker>
                            </Col>
                            <Col :xs="{span: 24}" :lg="{span: 12}" class="my6">
                                <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value2" style="width: 100%"></DatePicker>
                            </Col>                        
                        </Row>
                    </FormItem>

                    <FormItem>
                        <Row type="flex" justify="center">
                            <Col class="my6">
                                <Button @click="filterRegisters" type="primary">Применить</Button>
                            </Col>
                            <Col class="my6">
                                <Button class="mx6">Отчистить</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Sider>

            <Content>
                <Card>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col :xs="{span: 24}" :md="{span: 12}">
                            <h2 class="txt-h2 my12">Регистр учета объектов ({{countRegister}})</h2>
                        </Col>

                        <Col :xs="{span: 24}" :md="{span: 12}">
                            <Row type="flex" justify="end">
                                <Page :total="countRegister" :current="currentPage" :page-size="limit" @on-change="changePage" />
                            </Row>
                        </Col>
                    </Row>

                    <Table border ref="selection" size="small" :columns="columnsOption" @on-select="selectRegister" :data="registers" @on-sort-change="sortRegisters"></Table>
                </Card>
            </Content>  
   




    </Layout>
    
    
    
    <!--<div>
                <div style="display: flex;">
                  <div style="width: 30%; display: flex; flex-direction: column;">
                    <div>
                      <RadioGroup v-model="filter.flgActive.value1">
                        <Radio label="null">Все</Radio>
                        <Radio label="T">Активные</Radio>
                        <Radio label="F">Неактивные</Radio>
                      </RadioGroup>
                    </div>
                    <div>
                      <span>ГРЗ</span>
                      <input v-model="filter.tcRegno.value1" />
                    </div>
                    <div>
                      <span>Источник</span>
                      <Select :clearable="true" v-model="filter.sourceId.value1">
                        <Option v-for="item in sourceDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div>
                      <span>Основание</span>
                      <Select :clearable="true" v-model="filter.reasonId.value1">
                        <Option v-for="item in reasonDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div>
                      <span>Категория</span>
                      <Select :clearable="true" v-model="filter.categoryId.value1">
                        <Option v-for="item in categoryDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </div>
                    <div>
                      <span>Владелец (Название или ФИО)</span>
                      <input v-model="filter.ownerName.value1" />
                    </div>
                    <div>
                      <span>Время создания записи</span>
                      <div style="display: flex;">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value1" placeholder="Select time1"></DatePicker>
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="filter.createdTime.value2" placeholder="Select time2"></DatePicker>
                      </div>
                    </div>
                    <div>
                      <span>Дата начала действия разрешения</span>
                      <div style="display: flex;">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value1" placeholder="Select time1"></DatePicker>
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitStartDate.value2" placeholder="Select time2"></DatePicker>
                      </div>
                    </div>
                    <div>
                      <span>Дата окончания действия разрешения</span>
                      <div style="display: flex;">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value1" placeholder="Select time1"></DatePicker>
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="filter.permitEndDate.value2" placeholder="Select time2"></DatePicker>
                      </div>
                    </div>
            
                    <button type="button" @click="filterRegisters">Применить</button>
            
                    <div>
                      <span>
                        Задать дату окончания действия
                      </span>
                      <DatePicker type="date" format="yyyy-MM-dd" v-model="expDate" placeholder="Select expDate"></DatePicker>
                      <button @click="createExpireReestr">Применить к выбранным</button>
                    </div>
                  </div>
                  <div style="width: 70%;">
                    <Page :total="countRegister" :current="currentPage" :page-size="limit" @on-change="changePage" />
                    <table style="width: 100%;">
                      <thead>
                      <tr>
                        <td>
                          <input type="checkbox" v-model="allChecked" />
                        </td>
                        <td style="cursor: pointer;" :style="isSorted('tcRegno')" @click="sortRegisters('tcRegno')">ГРЗ</td>
                        <td style="cursor: pointer;" :style="isSorted('createdTime')" @click="sortRegisters('createdTime')">Дата создания</td>
                        <td style="cursor: pointer;" :style="isSorted('sourceId')" @click="sortRegisters('sourceId')">Источник</td>
                        <td style="cursor: pointer;" :style="isSorted('reasonId')" @click="sortRegisters('reasonId')">Основание включения</td>
                        <td style="cursor: pointer;" :style="isSorted('permitStartDate')" @click="sortRegisters('permitStartDate')">Начало действия разрешения</td>
                        <td style="cursor: pointer;" :style="isSorted('permitEndDate')" @click="sortRegisters('permitEndDate')">Окончание действия разрешения</td>
                        <td style="cursor: pointer;" :style="isSorted('brand,model')" @click="sortRegisters('brand,model')">Марка/Модель</td>
                        <td style="cursor: pointer;" :style="isSorted('categoryId')" @click="sortRegisters('categoryId')">Категория спецтранспорта</td>
                        <td style="cursor: pointer;" :style="isSorted('ownerName')" @click="sortRegisters('ownerName')">Название владельца</td>
                        <td style="cursor: pointer;" :style="isSorted('descr')" @click="sortRegisters('descr')">Описание к записи</td>
                      </tr>
                      </thead>
            
                      <tbody>
                      <tr v-for="(register, index) in registers" class="registersRow" @click="getCardAccounting(register)" :key="index">
                        <td>
                          <input @click.stop="selectRegister(register)" :disabled="register.tcId === null" type="checkbox" v-model="register.selected" />
                        </td>
                        <td>
                          {{register.tcRegno}}
                        </td>
                        <td>
                          {{register.createdTime | formatDateTime('DD.MM.YYYY HH:mm')}}
                        </td>
                        <td>
                          {{register.sourceName}}
                        </td>
                        <td>
                          {{register.reasonName}}
                        </td>
                        <td>
                          {{register.permitStartDate | formatDateTime('DD.MM.YYYY')}}
                        </td>
                        <td>
                          {{register.permitEndDate | formatDateTime('DD.MM.YYYY')}}
                        </td>
                        <td>
                          {{register.brand + ' / ' + register.model}}
                        </td>
                        <td>
                          {{register.categoryName}}
                        </td>
                        <td>
                          {{register.ownerName}}
                        </td>
                        <td>
                          {{register.descr}}
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>-->
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import TableRegister from "./../verstka/TableRegister.vue";
import FilterObjects from "./../verstka/FilterObjects.vue";
import TablePoptip from "./../verstka/TablePoptip.vue";

export default {
    name: "RegisterReestr",
    components: {
        TableRegister,
        FilterObjects,
        TablePoptip
    },
    beforeCreate() {
        let vm = this;
        let cid = funcUtils.getfromLocalStorage("registerReestr");

        (async () => {
            try {
                let eventResponse;
                if (funcUtils.isNull(cid)) {
                    eventResponse = await vm.$store.dispatch("prepareData", {
                        beanName: vm.$store.state.registerReestr.bean,
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
                                if (dataJson.method === "addCID") {
                                    cid = respData.cid;
                                    funcUtils.addToLocalStorage("registerReestr", cid);
                                    eventResponse = await vm.$store.dispatch("prepareData", {
                                        method: "getData",
                                        params: {
                                            filter: null,
                                            sort: null,
                                            from: vm.from,
                                            limit: vm.limit
                                        },
                                        cid: cid
                                    });
                                }
                            } else {
                                if (!funcUtils.isNull(respError)) {
                                    alert(respError.errorMsg);
                                }
                            }
                        }
                    }
                } else {
                    eventResponse = await vm.$store.dispatch("prepareData", {
                        params: null,
                        cid: cid
                    });
                    let filter = JSON.parse(eventResponse.response).data.filter;
                    if (
                        funcUtils.isNotEmpty(filter) &&
                        funcUtils.isNotEmpty(filter.filter)
                    ) {
                        filter.filter.forEach(item => {
                            vm.filter[item.field].value1 = item.value1;
                            vm.filter[item.field].value2 = item.value2;
                        });
                    }

                    let sort = JSON.parse(eventResponse.response).data.sort;
                    if (funcUtils.isNotEmpty(sort) && funcUtils.isNotEmpty(sort.sort)) {
                        sort.sort.forEach(item => {
                            vm.sort[item.field] = item.desc;
                            vm.columnsOption.forEach(col => {
                                if (
                                    funcUtils.isNotEmpty(col) &&
                                    funcUtils.isNotEmpty(col.referenceName)
                                ) {
                                    let colNames = col.referenceName.split(",");
                                    colNames.forEach(colName => {
                                        if (colName === item.field) {
                                            vm.$set(col, "sortType", item.desc ? "desc" : "asc");
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
                vm.$store.dispatch("registerReestrSetCid", cid);
                await vm.$store.dispatch("fillModule", { event: eventResponse });

                eventResponse = await vm.$store.dispatch("prepareData", {
                    method: "getSourceDict",
                    cid: cid
                });
                let sourceDict = JSON.parse(eventResponse.response).data;
                for (let prop in sourceDict) {
                    if (sourceDict.hasOwnProperty(prop)) {
                        vm.sourceDict.push({
                            value: prop,
                            label: sourceDict[prop]
                        });
                    }
                }

                eventResponse = await vm.$store.dispatch("prepareData", {
                    method: "getReasonDict",
                    cid: cid
                });
                let reasonDict = JSON.parse(eventResponse.response).data;
                for (let prop in reasonDict) {
                    if (reasonDict.hasOwnProperty(prop)) {
                        vm.reasonDict.push({
                            value: prop,
                            label: reasonDict[prop]
                        });
                    }
                }

                eventResponse = await vm.$store.dispatch("prepareData", {
                    method: "getCategoryDict",
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

        this.$store.watch(this.$store.getters.registerReestrGetCommand, () => {
            (async () => {
                try {
                    let eventResponse = vm.$store.dispatch("prepareData", {
                        cid: cid
                    });
                    vm.$store.dispatch("fillModule", { event: eventResponse });
                } catch (e) {
                    alert(e.message);
                }
            })();
        });
    },
    destroyed() {
        this.$store.dispatch("registerReestrSetCid", null);
        this.$store.dispatch("registerReestrSetData", {
            data: null
        });
    },
    data() {
        return {
            columnsOption: [{
                    type: "selection",
                    width: 60,
                    align: "center",
                    key: "selected",
                },
                {
                    title: "№",
                    width: 80,
                    key: "num"
                },
                {
                    title: "ГРЗ",
                    key: "tcRegno",
                    sortable: true,
                    referenceName: "tcRegno",
                    align: "center",
                    minWidth: 120,
                },
                {
                    title: "Дата экспирации",
                    key: "createdTime",
                    sortable: true,
                    referenceName: "statusId",
                    align: "center",
                    minWidth: 160,
                },
                {
                    title: "Источник",
                    key: "sourceName",
                    sortable: true,
                    referenceName: "sourceId",
                    align: "center",
                    minWidth: 200,
                },
                {
                    title: "Основание включения",
                    key: "reasonName",
                    sortable: true,
                    referenceName: "reasonId",
                    minWidth: 300,
                },
                {
                    title: "Начало действия разрешения",
                    key: "permitStartDate",
                    sortable: true,
                    referenceName: "permitStartDate",
                    minWidth: 180,
                },
                {
                    title: "Окончание действия разрешения",
                    key: "permitEndDate",
                    sortable: true,
                    referenceName: "permitEndDate",
                    minWidth: 180,
                },
                {
                    title: "Марка/Модель",
                    key: "brand,model",
                    sortable: true,
                    referenceName: "brand,model",
                    minWidth: 200,
                },
                {
                    title: "Категория спецтранспорта",
                    key: "categoryName",
                    sortable: true,
                    referenceName: "categoryId",
                    minWidth: 300,
                },
                {
                    title: "Название владельца",
                    key: "ownerName",
                    sortable: true,
                    referenceName: "ownerName",
                    minWidth: 200,
                },
                {
                    title: "Описание к записи",
                    key: "descr",
                    sortable: true,
                    referenceName: "descr",
                    minWidth: 300,
                },
                {
                    title: "Действия",
                    width: 150,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.getCardAccounting(params.row);
                                        }
                                    }
                                },
                                "Редактировать"
                            )
                        ]);
                    }
                }
            ],
            allChecked: false,
            from: 0,
            limit: 20,
            countRegister: 0,
            currentPage: 1,
            sourceDict: [],
            reasonDict: [],
            categoryDict: [],
            filter: {
                flgActive: {
                    value1: null,
                    value2: null
                },
                tcRegno: {
                    value1: null,
                    value2: null
                },
                sourceId: {
                    value1: null,
                    value2: null
                },
                reasonId: {
                    value1: null,
                    value2: null
                },
                categoryId: {
                    value1: null,
                    value2: null
                },
                ownerName: {
                    value1: null,
                    value2: null
                },
                createdTime: {
                    value1: null,
                    value2: null
                },
                permitStartDate: {
                    value1: null,
                    value2: null
                },
                permitEndDate: {
                    value1: null,
                    value2: null
                }
            },
            sort: {
                tcRegno: null,
                createdTime: null,
                sourceId: null,
                reasonId: null,
                permitStartDate: null,
                permitEndDate: null,
                brand: null,
                model: null,
                categoryId: null,
                ownerName: null,
                descr: null
            },
            selectedRegisters: [],
            expDate: null
        };
    },
    methods: {
        getCardAccounting(register) {
            let params = {
                routeName: this.$store.state.registerReestr.routeName,
                id: register.id,
                sourceId: register.sourceId
            };

            let vm = this;
            (async () => {
                try {
                    await vm.$store.dispatch("getNextComponent", {
                        beanName: vm.$store.state.registerCardAccounting.bean
                    });
                    vm.$store.dispatch("getNextPage", {
                        vm: vm,
                        pageName: vm.$store.state.registerCardAccounting.routeName,
                        params: params
                    });
                } catch (e) {
                    alert(e.message);
                }
            })();
        },
        isSorted(name) {
            let res;
            let nameArr = name.split(",");
            nameArr.forEach(item => {
                if (funcUtils.isNull(this.sort[item])) {
                    res = "background: transparent";
                } else if (this.sort[item]) {
                    res = "background: red";
                } else if (!this.sort[item]) {
                    res = "background: green";
                }
            });
            return res;
        },
        changePage(nextPage) {
            let data = this.$store.state.registerReestr.data;
            this.from = data.limit * nextPage - data.limit;
            let vm = this;
            let cid = funcUtils.getfromLocalStorage("registerReestr");

            (async () => {
                try {
                    let eventResponse = await vm.$store.dispatch("prepareData", {
                        method: "read",
                        params: {
                            from: vm.from,
                            limit: vm.limit
                        },
                        cid: cid,
                        withSpinner: false
                    });
                    let dataJson = JSON.parse(eventResponse.response);
                    data.data = dataJson.data.data;
                    data.count = dataJson.data.count;
                    data.from = dataJson.data.from;
                    data.limit = dataJson.data.limit;
                } catch (e) {
                    alert(e.message);
                }
            })();
        },
        selectRegister(registers) {
            let register = registers[0];
            register.selected = !register.selected;
            this.selectedRegisters.push(register.id);
        },
        createExpireReestr() {
            if (this.selectedRegisters.length === 0) return;

            let vm = this;
            let cid = funcUtils.getfromLocalStorage("registerReestr");

            (async () => {
                try {
                    await vm.$store.dispatch("prepareData", {
                        method: "createExpireReestr",
                        params: {
                            expDate: this.expDate,
                            ids: this.selectedRegisters
                        },
                        cid: cid
                    });

                    this.selectedRegisters = [];

                    let eventResponse = await vm.$store.dispatch("prepareData", {
                        cid: cid
                    });

                    vm.$store.dispatch("fillModule", { event: eventResponse });
                } catch (e) {
                    alert(e.message);
                }
            })();
        },
        getFilterFields() {
            let filterObj = {
                filter: []
            };
            let filter = this.filter;
            for (let prop in filter) {
                if (filter.hasOwnProperty(prop)) {
                    let propObj = filter[prop];
                    propObj.field = prop;
                    if (
                        funcUtils.isNotEmpty(propObj.value1) &&
                        (propObj.value1 === "null" || propObj.value1.length === 0)
                    ) {
                        propObj.value1 = null;
                    }
                    if (
                        funcUtils.isNotEmpty(propObj.value2) &&
                        (propObj.value2 === "null" || propObj.value2.length === 0)
                    ) {
                        propObj.value2 = null;
                    }
                    filterObj.filter.push(propObj);
                }
            }

            return filterObj;
        },
        filterRegisters() {
            this.from = 0;
            let vm = this;
            let cid = funcUtils.getfromLocalStorage("registerReestr");
            let filterFields = this.getFilterFields();
            let sortedFields = this.getSortedFields();

            (async () => {
                try {
                    let eventResponse = await vm.$store.dispatch("prepareData", {
                        method: "getData",
                        params: {
                            filter: filterFields,
                            sort: sortedFields,
                            from: vm.from,
                            limit: vm.limit
                        },
                        cid: cid
                    });
                    vm.$store.dispatch("fillModule", { event: eventResponse });
                } catch (e) {
                    alert(e.message);
                }
            })();
        },
        getSortedFields() {
            let sortObj = {
                sort: []
            };

            let fields = this.sort;
            for (let prop in fields) {
                if (fields.hasOwnProperty(prop)) {
                    let propObj = fields[prop];
                    if (!funcUtils.isNull(propObj)) {
                        sortObj.sort.push({
                            field: prop,
                            desc: propObj
                        });
                    }
                }
            }

            return sortObj;
        },
        sortRegisters(name) {
            this.from = 0;
            let vm = this;
            let cid = funcUtils.getfromLocalStorage("registerReestr");

            let fields = this.sort;

            let nameArr = name.column.referenceName.split(",");
            nameArr.forEach(item => {
                switch (name.order) {
                    case "asc":
                        {
                            fields[item] = false;
                            break;
                        }
                    case "desc":
                        {
                            fields[item] = true;
                            break;
                        }
                    case "normal":
                        {
                            fields[item] = null;
                            break;
                        }
                }
            });

            let sortedFields = this.getSortedFields();
            let filterFields = this.getFilterFields();

            (async () => {
                try {
                    let eventResponse = await vm.$store.dispatch("prepareData", {
                        method: "getData",
                        params: {
                            filter: filterFields,
                            sort: sortedFields,
                            from: vm.from,
                            limit: vm.limit
                        },
                        cid: cid
                    });

                    vm.$store.dispatch("fillModule", { event: eventResponse });
                } catch (e) {
                    alert(e.message);
                }
            })();
        }
    },
    computed: {
        registers: function() {
            let res = [];
            let data = this.$store.state.registerReestr.data;
            if (data) {
                this.countRegister = data.count;
                this.currentPage = (data.from + data.limit) / data.limit;
                let registers = data.data;
                registers.forEach((register, index) => {
                    this.$set(register, "selected", false);
                    this.$set(
                        register,
                        "_disabled",
                        register.tcId === null || register.flgActive === "F"
                    );
                    register.num = data.from + index + 1;
                    register.createdTime = funcUtils.parseDateTime(
                        register.createdTime,
                        "DD.MM.YYYY HH:mm"
                    );
                    register["brand,model"] = register.brand + " / " + register.model;
                });
                res = registers;
            }
            return res;
        }
    }
};
</script>

<style lang="scss">
.registersRow:hover {
    td {
        background: azure;
        cursor: pointer;
    }
}

.poptip {
    bottom: 2%;
    right: 50px;
    padding: 0;
}

.datePicker {
    width: 100%;
}
</style>
