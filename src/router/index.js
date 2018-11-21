import Vue from 'vue';
import Router from 'vue-router';
import Authorization from './../components/Authorization';
import RegisterReestr from './../components/reestrPassport/RegisterReestr';
import PackageReestr from './../components/reestrPassport/PackageReestr';
import DictReestr from './../components/reestrPassport/DictReestr';
import PackageCardFromFile from '../components/packages/PackageCardFromFile';
import PackageCard from '../components/packages/PackageCard';
import PackageCardSpecial from '../components/packages/PackageCardSpecial';
import PackageCardNew from '../components/packages/PackageCardNew';
import RegisterCardAccounting from './../components/registerCardAccounting/RegisterCardAccounting';
import DictCategoryEdit from './../components/dictonary/edit/DictCategoryEdit';
import DictReasonEdit from './../components/dictonary/edit/DictReasonEdit';
import DictSourceEdit from './../components/dictonary/edit/DictSourceEdit';
import ReportReestr from './../components/reestrPassport/ReportReestr';
import * as funcUtils from "./../assets/js/utils/funcUtils";
import PageNotFound from '../components/404';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  hashbang: false,
  routes: [
    {
      path: '/',
      name: 'Authorization',
      component: Authorization
    },
    {
      path: '/registerReestr',
      name: 'RegisterReestr',
      component: RegisterReestr
    },
    {
      path: '/packageReestr',
      name: 'PackageReestr',
      component: PackageReestr
    },
    {
      path: '/packageCardFromFile',
      name: 'PackageCardFromFile',
      component: PackageCardFromFile
    },
    {
      path: '/registerCardAccounting',
      name: 'RegisterCardAccounting',
      component: RegisterCardAccounting,
      props: true
    },
    {
      path: '/packageCard',
      name: 'PackageCard',
      component: PackageCard,
      props: true
    },
    {
      path: '/packageCardSpecial',
      name: 'PackageCardSpecial',
      component: PackageCardSpecial,
      props: true
    },
    {
      path: '/packageCardNew',
      name: 'PackageCardNew',
      component: PackageCardNew
    },
    {
      path: '/dictReestr',
      name: 'DictReestr',
      component: DictReestr
    },
    {
      path: '/dictCategoryEdit',
      name: 'DictCategoryEdit',
      component: DictCategoryEdit,
      props: true
    },
    {
      path: '/dictReasonEdit',
      name: 'DictReasonEdit',
      component: DictReasonEdit,
      props: true
    },
    {
      path: '/dictSourceEdit',
      name: 'DictSourceEdit',
      component: DictSourceEdit,
      props: true
    },
    {
      path: '/reportReestr',
      name: 'ReportReestr',
      component: ReportReestr
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  let vm = router.app;
  (async () => {
    try {
      let path = funcUtils.getFromSessionStorage('path');
      let currentPage = await vm.$store.dispatch('getCurrentPage', path);
      if (funcUtils.isNull(to) || funcUtils.isNull(to.name)) {
        next('/404');
      } else if (funcUtils.isNull(currentPage)) {
        if (funcUtils.isNull(sessionStorage.getItem('wid'))) {
          next();
        } else {
          next('/');
        }
      } else if (to.name === 'Authorization' && currentPage.routeName === 'Authorization') {
        next();
      } else if (funcUtils.getfromLocalStorage('auth') && currentPage.routeName === to.name) {
        next();
      } else {
        next({name: currentPage.routeName});
      }
    } catch (e) {
      alert(e.message);
    }
  })();
});

export default router;
