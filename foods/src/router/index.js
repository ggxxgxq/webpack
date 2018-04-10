import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../components/Index.vue"
import Detail from "../components/Detail.vue"
import List from "../components/List.vue"
import Settings from "../components/Settings.vue"
import Wiki from "../components/Wiki.vue"


Vue.use(VueRouter)

const routes = [
  {
  	path:"/",
  	component:Index,
  	name:"index",
  	redirect:"/Wiki",
  	children:[
       {
       	path:"Wiki",
        component:Wiki,
        name:'wiki'
       },
       {
       	path:"List",
        component:List,
        name:'list'
       },
       {
       	path:"Settings",
        component:Settings,
        name:'settings'
       }
  	]
  },{
  	path:"/Detail",
  	component:Detail,
  	name:"detail"
  }

]
const router = new VueRouter({
   routes
})

export default router