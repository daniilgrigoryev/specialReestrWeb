<template>
	<div>
		<div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
			<h3 class="txt-h3 my12">Регистр учета объектов</h3>
      <Page :total="100" prev-text="Previous" next-text="Next" />
		</div>
		<Table border ref="selection" :columns="columnsOption" :data="columnsData"></Table>
	</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      columnsOption: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "№",
          width: 80,
          key: "num",
          sortable: true
        },
        {
          title: "ГРЗ",
          key: "grz",
          sortable: true
        },
        {
          title: "Дата экспирации",
          key: "expiration_date"
        },
        {
          title: "Источник",
          key: "source"
        },
        {
          title: "Основание включения",
          key: "base_inclusion"
        },
        {
          title: "Начало действия разрешения",
          key: "start_permission"
        },
        {
          title: "Окончание действия разрешения",
          key: "end_permission"
        },
        {
          title: "Марка/Модель",
          key: "model"
        },
        {
          title: "Категория спецтранспорта",
          key: "category",
          filters: [
            {
              label: "ГРЗ",
              value: 1
            },
            {
              label: "Дата начала действия разрешения",
              value: 2
            },
            {
              label: "Дата окончания действия разрешения",
              value: 3
            },
            {
              label: "Название владельца",
              value: 4
            },
            {
              label: "Описание к записи",
              value: 5
            }
          ]
        }
      ],
      columnsData: [
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        },
        {
          num: 110453,
          grz: "OH344Y",
          expiration_date: "19.07.2018",
          source: "Мосгортранс",
          base_inclusion: "ПП-1090",
          start_permission: "19.07.2018",
          end_permission: "18.07.2018",
          model: "volvo 1342",
          category: "Такси имеющие лицензии"
        }
      ]
    };
  }
};
</script>
