<template>
  <div>
    <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
      <h2 class="txt-h2 my12">Категории транспортных средств</h2>
      <Form>
        <Input placeholder="Enter something..." class="search"></Input>
      </Form>
    </div>
    <Table border ref="selection" :columns="columnsOption" :data="dictCategory"></Table>
  </div>

  <!--<div>
    <button type="button" @click="getNewOrEditCategory(null)">Новая категория</button>
    <table>
      <thead>
      <tr>
        <td>ID</td>
        <td>Название категории</td>
        <td>Активно</td>
        <td>Дата внесения</td>
        <td>Описание</td>
        <td>Операции</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in dictCategory" :key="key" class="registersRow">
        <td>{{value.code}}</td>
        <td>{{value.name}}</td>
        <td>
          <input type="checkbox" v-model="value.flgActive" />
        </td>
        <td>{{value.addTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
        <td>{{value.note}}</td>
        <td>
          <button type="button" @click="getNewOrEditCategory(value.id)">Редактировать</button>
          <button type="button">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>-->
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";

  export default {
    name: "DictCategory",
    beforeCreate() {
      let data = this.$store.state.dictCategory.data;
      if (!data) {
        let vm = this;
        let dictReestr = funcUtils.getfromLocalStorage('dictReestr');
        let cid = dictReestr[this.$store.state.dictCategory.bean].cid;

        (async () => {
          try {
            vm.$store.dispatch('dictCategorySetCid', cid);
            let eventResponse = await vm.$store.dispatch('prepareData', {
              cid: cid
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            alert(e.message);
          }
        })();
      }
    },
    computed: {
      dictCategory() {
        let res = [];
        let data = this.$store.state.dictCategory.data;
        if (data) {
          data.forEach((item) => {
            if (item.flgActive === 'T') {
              this.$set(item, 'flgActive', true);
            } else if (item.flgActive === 'F') {
              this.$set(item, 'flgActive', false);
            }
          });
          res = data;
        }
        return res;
      }
    },
    data() {
      return {
        columnsOption: [
          {
            title: "Код",
            key: "code",
            width: 100,
          },
          {
            title: "Название категории",
            key: "name",
          },
          {
            title: "Активно",
            width: 100,
            align: "center",
            key: 'flgActive',
            render: (h, params) => {
              return h('Checkbox', {
                props: {
                  value: params.row.flgActive,
                  disabled: true
                }
              });
            }
          },
          {
            title: "Дата внесения",
            key: "addTime"
          },
          {
            title: "Описание",
            key: "note"
          },
          {
            title: "Действия",
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.getNewOrEditCategory(params.row.id)
                    }
                  }
                }, 'Редактировать')
              ]);
            }
          }
        ],
      }
    },
    methods: {
      getNewOrEditCategory(id) {
        let params = {
          'routeName': this.$store.state.dictReestr.routeName,
          'id': id
        };

        let vm = this;
        (async () => {
          try {
            await vm.$store.dispatch('getNextComponent', {
              'beanName': vm.$store.state.dictCategoryEdit.bean
            });
            vm.$store.dispatch('getNextPage', {
              'vm': vm,
              'pageName': vm.$store.state.dictCategoryEdit.routeName,
              'params': params
            });
          } catch (e) {
            alert(e.message);
          }
        })();
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
