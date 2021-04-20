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
        <form class="container" @submit.prevent="register" method="POST" enctype="multipart/form-data">
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
                    <label for="name">Fullname</label>
                    <input class="form-control" id="name" name="name" type="text">
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
                    <label for="biography">Biography</label>
                    <textarea class="form-control" id="biography" name="biography" type="text" rows=5></textarea>
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

const NewCar = {
  name: 'NewCar',
  template:`
  <section id="new-car-page">
      <div class="register-form">
        <h3 class="font-weight-bold display-5">
          Add New Car
        </h3>
        <form class="container" @submit.prevent="addCar" method="POST" enctype="multipart/form-data">
            <div class="form-row">
                <div class="col w-25 form-group">
                    <label for="make">Make</label>
                    <input class="form-control" id="make" type="text" name="make" placeholder="Tesla">
                </div>
                <div class="form-group col w-25">
                    <label for="model">Model</label>
                    <input class="form-control" id="model" type="text" name="model" placeholder="Model S">
                </div> 
            </div>
            <div class="form-row">
                <div class="form-group col w-15">
                    <label for="colour">Colour</label>
                    <input class="form-control" id="colour" name="colour" type="text" placeholder="Red">
                </div>
                <div class="form-group col w-25">
                    <label for="year">Year</label>
                    <input class="form-control" type="number" name="year" id="year" placeholder="2021">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col w-15">
                    <label for="price">Price</label>
                    <input class="form-control" id="price" name="price" type="text" placeholder="62700">
                </div>
                <div class="form-group col w-25">
                    <label for="car_type">Car Type</label>
                    <select id="car_type" class="form-control" name="car_type">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col w-25">
                    <label for="transmission">Transmission</label>
                    <select id="transmission" class="form-control" name="transmission">
                      <option selected>Automatic</option>
                      <option>Manual</option>
                      <option>Hybrid</option>
                    </select>
                </div>
                <div class="col w-25"></div>
            </div>
            <div class="form-row">
                <div class="form-group col w-50">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" name="description" type="text" rows=5></textarea>
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
                    <button type="submit" class="btn">Save</button>
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
     addCar(){
      let car_form = document.querySelector("#new-car-form .register-form form")
      let form_data = new FormData(car_form);
      let self = this;
      fetch("/api/cars", {
          method: 'POST',
          body: form_data,
          headers: {'X-CSRFToken': token    },
          credentials: 'same-origin'
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

const ViewCar = {
  name:'ViewCar',
  template:`
  <div class="view_car">
    <div v-if="isCar" class="car">
        <div class="car_img">
            <img class="img-fluid" src="{{car.photo}}">
        </div>
        <div class="car-info font-weight-bold">
            <h1 class="font-weight-bold">{{car.year}} {{car.make}}</h1>
            <h4 class="text-secondary font-weight-bold">{{car.model}}</h4><br>
            <section class="text-secondary">
                <article>{{car.description}}</article>
            </section><br>
            <div class="row">
                <div class="col w-25 text-secondary">Colour</div>
                <div class="col w-25">{{car.colour}}</div>
                <div class="col w-25 text-secondary">Body Type</div>
                <div class="col w-25">{{car.car_type}}</div>
            </div>
            <div class="row">
                <div class="col w-25 text-secondary">Price</div>
                <div class="col w-25">{{car.price}}</div>
                <div class="col w-25 text-secondary">Transmission</div>
                <div class="col w-25">{{car.transmission}}</div>
            </div>
             <button type="button">Email Owner</button>
        </div>
    </div>
    <div v-else class="car">
        <div class="car_img">
            <img class="img-fluid" src="../../../uploads/david-gavi-TMz-OUCvFO8-unsplash.jpg">
        </div>
        <div class="car-info d-flex flex-column">
            <h1 class="font-weight-bold">2018 Tesla</h1>
            <h4 class="text-secondary font-weight-bold">Model S</h4><br>
            <section class="text-secondary">
                <article>
                  With the longest range and quickest acceleration of any electric vehicle
                  in production, Model S is the highest performing sedan ever built. Both Long-Range and Plaid powertrains, with updated battery architecture, are capable of back-to-back, consistent 1/4 mile runs.
                </article>
            </section><br>
            <div class="row">
                <div class="col w-25 text-secondary">Colour</div>
                <div class="col w-25">Red</div>
                <div class="col w-25 text-secondary">Body Type</div>
                <div class="col w-25">Sedan</div>
            </div>
            <div class="row">
                <div class="col w-25 text-secondary">Price</div>
                <div class="col w-25">$62,888</div>
                <div class="col w-25 text-secondary">Transmission</div>
                <div class="col w-25">Automatic</div>
            </div>
            <div class="mt-auto car-opts">
              <button class="" type="button">Email Owner</button>
              <div></div>
              <span @click="addFavourite" class="heart d-flex flex-row-reverse">
                <svg id="heart" viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><g>
                <path d="M475.366,71.949c-24.175-23.606-57.575-35.404-100.215-35.404c-11.8,0-23.843,2.046-36.117,6.136
                  c-12.279,4.093-23.702,9.615-34.256,16.562c-10.568,6.945-19.65,13.467-27.269,19.556c-7.61,6.091-14.845,12.564-21.696,19.414
                  c-6.854-6.85-14.087-13.323-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556c-10.564-6.95-21.985-12.468-34.261-16.562
                  c-12.275-4.089-24.316-6.136-36.116-6.136c-42.637,0-76.039,11.801-100.211,35.404C12.087,95.55,0,128.286,0,170.16
                  c0,12.753,2.24,25.891,6.711,39.398c4.471,13.514,9.566,25.031,15.275,34.546c5.708,9.514,12.181,18.792,19.414,27.834
                  c7.233,9.041,12.519,15.272,15.846,18.698c3.33,3.426,5.948,5.903,7.851,7.427L243.25,469.938
                  c3.427,3.426,7.614,5.144,12.562,5.144s9.138-1.718,12.563-5.144l177.87-171.31c43.588-43.58,65.38-86.406,65.38-128.472
                  C511.626,128.279,499.54,95.546,475.366,71.949z M421.405,271.795L255.813,431.391L89.938,271.507
                  C54.344,235.922,36.55,202.133,36.55,170.156c0-15.415,2.046-29.026,6.136-40.824c4.093-11.8,9.327-21.177,15.703-28.124
                  c6.377-6.949,14.132-12.607,23.268-16.988c9.141-4.377,18.086-7.328,26.84-8.85c8.754-1.52,18.079-2.281,27.978-2.281
                  c9.896,0,20.557,2.424,31.977,7.279c11.418,4.853,21.934,10.944,31.545,18.271c9.613,7.332,17.845,14.183,24.7,20.557
                  c6.851,6.38,12.559,12.229,17.128,17.559c3.424,4.189,8.091,6.283,13.989,6.283c5.9,0,10.562-2.094,13.99-6.283
                  c4.568-5.33,10.28-11.182,17.131-17.559c6.852-6.374,15.085-13.222,24.694-20.557c9.613-7.327,20.129-13.418,31.553-18.271
                  c11.416-4.854,22.08-7.279,31.977-7.279s19.219,0.761,27.977,2.281c8.757,1.521,17.702,4.473,26.84,8.85
                  c9.137,4.38,16.892,10.042,23.267,16.988c6.376,6.947,11.612,16.324,15.705,28.124c4.086,11.798,6.132,25.409,6.132,40.824
                  C475.078,202.133,457.19,236.016,421.405,271.795z"/>
              </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g>
              </g></svg>
              </span>
            </div>
        </div>
    </div>
  </div>
  `,
  mounted(){
    let self = this;
    fetch(`/api/cars/${this.$route.params.id}`, {
        method: 'GET',
        credentials: 'same-origin'
    })    
    .then(function (response) {        
        return response.json();
        })    
    .then(function (jsonResponse) {
        // display a success message
        console.log(jsonResponse);
        self.car=jsonResponse;
        self.isCar = true;
      })    
    .catch(function (error) {
        console.log(error); 
        self.error=error;  
        self.isCar = false
    });
  },
  methods:{
    // Get user_id from JWT bearer payload
      addFavourite(){
        fetch(`api/cars/${self.car.id}/favourite`,{
          method: 'POST',
          body: JSON.stringify({user_id:0, car_id:self.car.id}), // for testing
          headers: {'X-CSRFToken': token    },
          credentials: 'same-origin'
        })
        .then(function (response) {
          if(response.ok){     
            return response.json();
          } else if(response.status == 401){
            throw Error(response.json().message)
          }
        })    
        .then(function (jsonResponse) {
            // display a success message
            document.getElementById("heart").classList.add("favourited-svg");
            document.querySelector(".heart.d-flex.flex-row-reverse").classList.add("favourited");

            console.log(jsonResponse);
            self.message=jsonResponse.message;
        })    
        .catch(function (error) {
            console.log(error); 
            self.error=error;   
        });
     }
  },
  data: function(){
      return {
          car: {},
          error: '',
          isCar: ''
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
  {path:"/cars/new", component: NewCar, name:"NewCar"},
  {path:"/cars/:id", component: ViewCar, name:"ViewCar"},

  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');