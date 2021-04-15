import Vue from "../vue"
import VueRouter from "../vue-router"


Window.Vue = Vue

window.Vue.use(VueRouter)

const routes = [
  { path: "/", component: Home },
  // Put other routes here
  {path:"/uploads",component: UploadForm},
  {path:"/login",component: loginComponent, name:"Login"},
  {path:"/register", component: Register, name:"Register"},
  {path:"/cars/new", component: NewCar, name:"NewCar"},

  // This is a catch all route in case none of the above matches
  {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
       component:function (){
            return import("../Components/notFoundComponent")
        }
  }
];


//router initialization
const router = new VueRouter({
    mode: "history",
    routes,
})

export default router