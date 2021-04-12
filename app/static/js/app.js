// Forked from info-3180-lab7

const app = Vue.createApp({
  data() {
      return {

      }
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <a class="navbar-brand" href="#">Lab 7</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
        <router-link class="nav-link" to="/uploads">Uploads <span class="sr-only">(current)</span></router-link>
      </li>
      </ul>
    </div>
  </nav>
  `
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
  <footer>
      <div class="container">
          <p>Copyright &copy; {{ year }} Flask Inc.</p>
      </div>
  </footer>
  `,
  data() {
      return {
          year: (new Date).getFullYear()
      }
  }
});

const Home = {
  name: 'Home',
  template: `
  <div class="jumbotron">
      <h1>Project 2</h1>
  </div>
  `,
  data() {
      return {}
  }
};

const UploadForm = {
  name: 'Upload-Form',    
  template: 

  `
  <div class="alert alert-success" role="alert" v-if="message">
      {{message}}
   </div>
  <div class="alert alert-danger" role="alert" v-if="error">
   {{error}}
</div>
  <form class="form-group" id="uploadForm" @submit.prevent="uploadPhoto" method="post">
      <div class="formfields">
          <label for="description">Description</label><br>
          <textarea class="form-control" id="description" name="description" required=""></textarea><br>
      </div>
      <div>
          <label for="image">Image</label><br>
          <input class="form-control-file" id="image" name="image" required="" type="file">
      </div><br>
      <span></span><br>
      <button type="submit" name="submit" class="buttons btn btn-success">Submit</button>
  </form>
  `,
  methods:{
     uploadPhoto(){
      let uploadForm = document.getElementById('uploadForm');
      let form_data = new FormData(uploadForm);
      let self = this;
      fetch("/api/upload", {
          method: 'POST',
          body: form_data,
          headers: {'X-CSRFToken': token    },    credentials: 'same-origin'
      })    
          .then(function (response) {        
              return response.json();
              })    
          .then(function (jsonResponse) {
              // display a success message
              console.log(jsonResponse);
              self.message=jsonResponse.message;
           })    
          .catch(function (error) {
              console.log(error); 
              self.error=error.message;   
          });
     }
  },
  data: function(){
      return {
          message: "",
          error: "",
      }
  }

}
  



const NotFound = {
  name: 'NotFound',
  template: `
  <div>
      <h1>404 - Not Found</h1>
  </div>
  `,
  data() {
      return {}
  }
};

// Define Routes
const routes = [
  { path: "/", component: Home },
  // Put other routes here
  {path:"/uploads",component: UploadForm},

  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');