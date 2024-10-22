import Vue from 'vue'
import VueRouter from 'vue-router'
import tableManageSystem from '../views/pages/tableManageSystem/index.vue'
import Layout from '../views/layouts/index.vue'
import loginPage from '../views/login/index.vue'
import systemPage from '../views/pages/systemChoose/index.vue'
import shootReviewSystem from '../views/pages/shootReviewSystem/index.vue'
import startShootSystem from '../views/pages/startShootSystem/index.vue'
import reviewSystem from '../views/pages/reviewSystem/index.vue'
import infoManagement from '../views/pages/infoManagement/infoManagementIndex.vue'
import trainingManagement from '../views/pages/trainingManagement/trainingManagementIndex.vue'

// import ActionPull from '../components/actionPull/index.vue'
// import ActionCite from '../components/actionCite/index.vue'
// import ActionFling from '../components/actionFling/index.vue'
// import ActionHunker from '../components/actionHunker/index.vue'
// import ActionTrack from '../components/actionTrack/index.vue'
// import IndividuationScheme from '../components/individuationScheme/index.vue'

Vue.use(VueRouter)

// const legalRoutingArray = ['/', '/sceneSelect', '/reviewSystem', '/shootReviewSystem', '/startShootSystem'];

const routes = [
  {
    path: '/',
    name: 'userLogin',
    component: loginPage,
  },
  {
    path: '/systemChoose',
    name: 'systemChoose',
    component: systemPage,
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [{
      path: '/pages/reviewSystem',
      name: 'reviewSystem',
      component: reviewSystem,
    },
    {
      path: '/pages/tableManageSystem',
      name: 'tableManageSystem',
      component: tableManageSystem,
    },
    {
      path: '/pages/shootReviewSystem',
      name: 'shootReviewSystem',
      component: shootReviewSystem,
    },
    {
      path: '/pages/startShootSystem',
      name: 'startShootSystem',
      component: startShootSystem,
    },
    {
      path: '/pages/infoManagement',
      name: 'infoManagement',
      component: infoManagement,
    },
    {
      path: '/pages/trainingManagement',
      name: 'trainingManagement',
      component: trainingManagement,
    }
  ],
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  let legalSign = false;
  routes.forEach(item => {
    if(item.path == to.path){
      legalSign = true;
    }
    if(item.children != null){
      item.children.forEach(Childrenitem => {
        if(Childrenitem.path == to.path){
          legalSign = true;
        }
      })
    }
  })
  if(legalSign){
    next();
  }
  else{
    router.push("/");
  }
})

export default router
