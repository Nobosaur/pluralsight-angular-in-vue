import Vue from 'vue'
import Router from 'vue-router'
import UserSearch from '../pages/UserSearch.vue'
import RepoShow from '../pages/RepoShow.vue'
import RepoDetails from '../pages/RepoDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'usersearch',
      component: UserSearch
    },
    {
        path: '/user/:id', 
        component: RepoShow, 
        props: true
    },
    {
        path: '/user/:id/repo/:reponame', 
        component: RepoDetails, 
        props: true
    }
  ],
  mode: 'history'
})