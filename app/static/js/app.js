// Forked from info-3180-lab7


const app = Vue.createApp({
  data() {
      return {

      }
  },

});

app.component('app-header', {
  name: 'AppHeader',
  template: `
  <nav v-if="!isPublic" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="/">
      <svg version="1.1" id="car_logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="20px" height="20px" viewBox="0 0 39.055 39.054" style="enable-background:new 0 0 39.055 39.054;"
      xml:space="preserve">
      <g>
        <g>
          <path d="M38.831,14.26c-0.191-0.233-0.476-0.369-0.775-0.369h-3.801c-0.938-2.474-2.16-4.898-3.549-5.813
            c-4.805-3.161-17.55-3.161-22.355,0c-1.39,0.916-2.607,3.343-3.55,5.813H1c-0.302,0-0.586,0.136-0.775,0.369
            c-0.19,0.232-0.266,0.539-0.204,0.834l0.563,2.728c0.096,0.465,0.506,0.797,0.979,0.797h1.126
            c-1.087,1.254-1.614,2.833-1.621,4.413c-0.007,1.952,0.734,3.716,2.089,4.964c0.015,0.013,0.03,0.022,0.044,0.035v3.817
            c0,0.827,0.672,1.5,1.5,1.5h3.506c0.828,0,1.5-0.673,1.5-1.5v-1.534h19.641v1.534c0,0.827,0.672,1.5,1.5,1.5h3.506
            c0.826,0,1.5-0.673,1.5-1.5v-3.742c1.438-1.317,2.125-3.129,2.134-4.938c0.006-1.634-0.545-3.271-1.696-4.551h1.201
            c0.475,0,0.885-0.332,0.979-0.798l0.564-2.727C39.094,14.799,39.021,14.494,38.831,14.26z M9.998,10.583
            c3.83-2.521,15.229-2.521,19.057,0c0.744,0.488,1.701,2.461,2.578,4.877H7.422C8.297,13.045,9.254,11.073,9.998,10.583z
              M5.512,23.408c0-1.63,1.322-2.95,2.951-2.95c1.631,0,2.951,1.32,2.951,2.95s-1.32,2.951-2.951,2.951
            C6.834,26.359,5.512,25.038,5.512,23.408z M30.631,26.359c-1.629,0-2.951-1.321-2.951-2.951s1.322-2.95,2.951-2.95
            c1.631,0,2.951,1.32,2.951,2.95S32.26,26.359,30.631,26.359z"/>
        </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg>
      <p>United Auto Sales</p>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/"> <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
        <router-link class="nav-link" to="/uploads"><span class="sr-only">(current)</span></router-link>
      </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link" to="/register">Register<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/login">Login<span class="sr-only">(current)</span></router-link>
        </li> 
      </ul> 
    </div>
  </nav>
  `,
    data(){
      return {
          publicRoutes:['Login']
      }
    },
    computed: {
      isPublic() {
          //Todo change this to an array for multiple public routes (if needed)
          return this.$route.name  == "Login"
      }
    }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
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
    <section id="home">
        <article>
            <div>
              <h1 class="font-weight-bold display-4">Buy and Sell Cars Online</h1><br>
              <p>United Auto Sales provides the fastest, easiest and most user friendly way to buy or sell cars online. Find a Great Price on the Vehicle You Want</p><br>
              <button id="Register" type="button" class="btn btn-primary">Register</button>
              <button id="Login" type="button" class="btn btn-success">Login</button>
            </div>
        </article>
        <img src="./static/images/car.jpg" class="img-fluid">
    </section>
  `,
  data() {
      return {}
  },
  mounted() {
    document.getElementById("Register").onclick = function(){
      location.href = "/register";
    }
    document.getElementById("Login").onclick = function(){
      location.href = "/login";
    }
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

const loginComponent = {
     name: 'login',
    template: `<div class="login-form">
    <form action="/examples/actions/confirmation.php" method="post">
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Log in</button>
        </div>
        <div class="clearfix">
            <label class="float-left form-check-label"><input type="checkbox"> Remember me</label>
            <a href="#" class="float-right">Forgot Password?</a>
        </div>        
    </form>
    <p class="text-center"><a href="#">Create an Account</a></p>
</div>`
}

const Register = {
  name: 'Register',
  template:`
  <section id="register-page">
      <div class="register-form">
        <h3 class="font-weight-bold display-5">
          Register New User
        </h3>
        <form class="container" action="/api/register" method="POST" enctype="multipart/form-data">
            <div class="form-row">
                <div class="col w-25 form-group">
                    <label for="username">Username</label>
                    <input class="form-control" id="username" type="text" name="username">
                </div>
                <div class="form-group col w-25">
                    <label for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div> 
            </div>
            <div class="form-row">
                <div class="form-group col w-15">
                    <label for="fullname">Fullname</label>
                    <input class="form-control" id="fullname" name="fullname" type="text">
                </div>
                <div class="form-group col w-25">
                    <label for="email">Email</label>
                    <input class="form-control" type="email" name="email" id="email">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col w-25">
                    <label for="location">Location</label>
                    <input class="form-control" id="location" name="location" type="text">
                </div>
                <div class="col w-25"></div>
            </div>
            <div class="form-row">
                <div class="form-group col w-50">
                    <label for="bio">Biography</label>
                    <textarea class="form-control" id="bio" name="bio" type="text" rows=5></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col w-50">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input font-weight-bold" name="photo" id="photo">
                    <label class="custom-file-label" for="photo">Upload Photo</label>
                  </div>
                </div>
                <div class="col w-50"></div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <button type="submit" class="btn">Register</button>
                </div>
            </div>
        </form>
      </div>
  </section>
  `,
  created(){
    document.body.classList.add("background");
  },
  methods:{
     register(){
      let register_form = document.querySelector(".register-form form")
      let form_data = new FormData(register_form);
      let self = this;
      fetch("/api/register", {
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
  {path:"/login",component: loginComponent, name:"Login"},
  {path:"/register", component: Register, name:"Register"},

  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');