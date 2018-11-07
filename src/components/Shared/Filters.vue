<script>
  import Vue from 'vue'
  import moment from 'moment';
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  moment.locale('ru');

  // Кастомный фильтр форматирования дат
  Vue.filter('formatDateTime', function (dateTime, format) {
    if (funcUtils.isEmpty(dateTime) || funcUtils.isEmpty(format)) return '';
    return moment(dateTime).format(format);
  });
</script>
