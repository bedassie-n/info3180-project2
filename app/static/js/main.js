import Vue from "./vue"
import App from "./App.vue"
import router from "./router"


/*new Vue ({
    router,
    render: h =>(App),
}).$mount("#app")*/


new Vue({
    el: '#app',
    render: App,
    router,
})