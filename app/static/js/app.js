// Forked from info-3180-lab7

// require
// var Vue = require('vue')
// Vue.use(require('vue-cookies'))

// // es2015 module
// import Vue from 'vue'
// import VueCookies from 'vue-cookies';
// Vue.use(VueCookies);

const app = Vue.createApp({
  data() {
      return {

      }
  },

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

const privateAppBar = {
    name: 'app-bar',
    computed:{
      user_id: function(){
        token = localStorage.getItem("token");
        if(token){
          var base64Url = token.split('.')[1];
          var base64 = base64Url.replace('-', '+').replace('_', '/');
          var res = JSON.parse(atob(base64));
          return res.sub;
        } else {
          return null;
        }
      }
    },
    template: `  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item active ml-5">
          <router-link class="nav-link" to="/cars/new">Add Car <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active ml-5">
        <router-link class="nav-link" to="/cars/explore">Explore <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item active ml-5">
        <router-link class="nav-link" :to="'/user/'+ this.user_id">My Profile <span class="sr-only">(current)</span></router-link>
      </li>
      </ul>
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link @click="logout" class="nav-link" to="/">Logout<span class="sr-only">(current)</span></router-link>
        </li> 
      </ul> 
    </div>
  </nav>`,
    methods : {
        logout() {
            localStorage.removeItem("token");
        }
    }
}

const publicAppBar = {
    name: 'app-bar',
    template: `  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
  </nav>`
}

app.component('app-header', {
  name: 'AppHeader',
  template: ` <privateAppBar  v-if="!isPublic" ></privateAppBar>
 <publicAppBar v-if="isPublic"></publicAppBar>
  `,
    components:{
        privateAppBar,
        publicAppBar
    },
    data(){
      return {
          publicRoutes:['Login', 'Register', 'Home']
      }
    },
    computed: {
      isPublic() {
          //Todo change this to an array for multiple public routes (if needed)
          return this.publicRoutes.includes(this.$route.name)
      }
    }
});

const Flash = {
  name: 'Flash',
  props:['message','category'],
  template: `
    <div :class="'alert alert-'+ category">
      {{ message }}
    </div>
  `
}

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

const loginComponent = {
    name: 'login',
    props: ['flashes'],
    computed:{
      json_flashes: function(){
        return JSON.parse(this.flashes)
      },
      is_flashes: function(){
        if(this.flashes){
          return true
        }else{
          return false
        }
      }
    },
    template: `
      <Flash v-if="is_flashes" v-for="flash in json_flashes" v-bind:message="flash.message" v-bind:category="flash.category"></Flash>
      <div class="login-form">
        <h2 class="text-center">Login to your account</h2>       
        <form v-on:submit.prevent method="post">
            <div class="form-group">
              <label for="username" class="font-weight-bold">Username</label>
              <input  type="text" class="form-control"  required="required" name="username">
            </div>
            <div class="form-group">
              <label for="password" class="font-weight-bold">Password</label>
              <input   type="password" class="form-control" required="required" name="password">
            </div>
            <div class="form-group">
                <button type="submit" @click="login" class="btn btn-primary btn-block log-btn-class">Log in</button>
            </div> 
        </form>
      </div>
    `
    ,
    methods:{
      login(){

        let login_form = document.querySelector(".login-form form")
        let form_data = new FormData(login_form);

          let username = form_data.get("username")
          let password = form_data.get("password")
        let sub = {}
        sub.username = username;
          sub.password = password;
        let self = this;
        fetch("/api/auth/login", {
            method: 'POST',
            body: sub,
            headers : {
                'Accept': 'application/json',
                 "Content-Type":"application/json"
            },
            body: JSON.stringify(sub)
           // headers: {'X-CSRFToken': token    },    credentials: 'same-origin'
        })    
          .then(function (response) {        
            if(response.status == 404){
              response.json().then((data) => {
                router.push({ name: 'Login', params: { flashes: JSON.stringify(
                  [{
                      message: "Username or password is incorrect",
                      category: "danger"
                    }]
                )}})
              });
            } else if (response.status == 200){
              response.json().then((data) => {
                router.push({ name: 'Explore', params: { flashes: JSON.stringify(
                  [{
                      message: "Login Successful",
                      category: "success"
                    }]
                )}})
                localStorage.setItem('token', data.token)
              });
            }
              })    
          .then(function (jsonResponse) {
              // display a success message
              console.log(jsonResponse);

              self.message=jsonResponse.message;
              if(self.message == "Login successful") {
                  self.$router.push("/cars/explore")
                  localStorage.setItem('token', jsonResponse.token)
              }
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
            error: ""
        }
      },
      components : {
        Flash
      }
}

// Responsive
const Register = {
  name: 'Register',
  props: ['flashes'],
  computed:{
    json_flashes: function(){
      return JSON.parse(this.flashes)
    },
    is_flashes: function(){
      if(this.flashes){
        return true
      }else{
        return false
      }
    }
  },
  template:`
  <section id="register-page">
    <Flash v-if="is_flashes" v-for="flash in json_flashes" v-bind:message="flash.message" v-bind:category="flash.category"></Flash>
    <div class="row">
      <div class="col-sm"></div>
      <div class="register-form col-lg-7">
        <h3 class="font-weight-bold display-5">
          Register New User
        </h3>
        <form class="container" @submit.prevent="register" method="POST" enctype="multipart/form-data">
            <div class="form-row">
                <div class="col w-25 form-group">
                    <label for="username">Username</label>
                    <input class="form-control" id="username" type="text" name="username" required>
                </div>
                <div class="form-group col w-25">
                    <label for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password" required>
                </div> 
            </div>
            <div class="form-row">
                <div class="form-group col w-15">
                    <label for="name">Fullname</label>
                    <input class="form-control" id="name" name="name" type="text" required>
                </div>
                <div class="form-group col w-25">
                    <label for="email">Email</label>
                    <input class="form-control" type="email" name="email" id="email" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col w-25">
                    <label for="location">Location</label>
                    <input class="form-control" id="location" name="location" type="text" required>
                </div>
                <div class="col w-25"></div>
            </div>
            <div class="form-row">
                <div class="form-group col w-50">
                    <label for="biography">Biography</label>
                    <textarea class="form-control" id="biography" name="biography" type="text" rows=5 required></textarea>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col w-50">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input font-weight-bold" name="photo" id="photo" required>
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
      <div class="col-sm"></div>
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
          body: form_data
          })    
          .then(function (response) {        
              if(response.status == 409 || response.status == 500 || response.status == 400){
                response.json().then((data) => {
                  router.push({ name: 'Register', params: { flashes: JSON.stringify(
                    [{
                        message: data.message,
                        category: "danger"
                      }]
                  )}})
                });
              } else if (response.status == 201){
                response.json().then((data) => {
                  router.push({ name: 'Login', params: { flashes: JSON.stringify(
                    [{
                        message: "Successfully Registered: " + data.name,
                        category: "success"
                      }]
                  ) }})
                });
              }
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
          error: ""
      }
  },
  components : {
    Flash
  }
}

const NewCar = {
  name: 'NewCar',
  props: ['flashes'],
  computed:{
    json_flashes: function(){
      return JSON.parse(this.flashes)
    },
    is_flashes: function(){
      if(this.flashes){
        return true
      }else{
        return false
      }
    },
    user_id: function(){
      token = localStorage.getItem("token");
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var res = JSON.parse(atob(base64));
      return res.sub;
    }
  },
  template:`
  <section id="new-car-page">
      <Flash v-if="is_flashes" v-for="flash in json_flashes" v-bind:message="flash.message" v-bind:category="flash.category"></Flash>
      <div class="row">
        <div class="col-sm"></div>
        <div class="register-form col-lg-7">
          <h3 class="font-weight-bold display-5">
            Add New Car
          </h3>
          <form id="car-form" class="container" @submit.prevent="addCar" method="POST" enctype="multipart/form-data">
              <div class="form-row">
                  <div class="col w-25 form-group">
                      <label for="make">Make</label>
                      <input class="form-control" id="make" type="text" name="make" placeholder="Tesla" required>
                  </div>
                  <div class="form-group col w-25">
                      <label for="model">Model</label>
                      <input class="form-control" id="model" type="text" name="model" placeholder="Model S" required>
                  </div> 
              </div>
              <div class="form-row">
                  <div class="form-group col w-15">
                      <label for="colour">Colour</label>
                      <input class="form-control" id="colour" name="colour" type="text" placeholder="Red" required>
                  </div>
                  <div class="form-group col w-25">
                      <label for="year">Year</label>
                      <input class="form-control" type="number" name="year" id="year" placeholder="2021" required>
                  </div>
              </div>
              <div class="form-row">
                  <div class="form-group col w-15">
                      <label for="price">Price</label>
                      <input class="form-control" id="price" name="price" type="text" placeholder="62700" required>
                  </div>
                  <div class="form-group col w-25">
                      <label for="car_type">Car Type</label>
                      <select id="car_type" class="form-control" name="car_type" required>
                        <option selected>Choose...</option>
                        <option>Sports Sedan</option>
                        <option>Luxury Sedan</option>
                        <option>Convertible</option>
                        <option>Supercar</option>
                        <option selected>Roadster</option>
                        <option>SUV</option>
                        <option>Truck</option>
                        <option>Station Wagon</option>
                        <option>Coupe</option>
                        <option>Minivan</option>
                      </select>
                  </div>
              </div>
              <div class="form-row">
                  <div class="form-group col w-25">
                      <label for="transmission">Transmission</label>
                      <select id="transmission" class="form-control" name="transmission" required>
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
                      <textarea class="form-control" id="description" name="description" type="text" rows=5 required></textarea>
                  </div>
              </div>
              <div class="form-row">
                  <div class="form-group col w-50">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input font-weight-bold" name="photo" id="photo" required>
                      <label class="custom-file-label" for="photo">Upload Photo</label>
                    </div>
                  </div>
                  <div class="col w-50"></div>
              </div>
              <input id="user_id" name="user_id" :value="this.user_id" hidden/>
              <div class="form-row">
                  <div class="form-group">
                      <button type="submit" class="btn">Save</button>
                  </div>
              </div>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
  </section>
  `,
  created(){
    document.body.classList.add("background");
  },
  methods:{
     addCar(){
      let car_form = document.querySelector("#car-form")
      let form_data = new FormData(car_form);      
      let self = this;
      fetch("/api/cars", {
          method: 'POST',
          //body: form_data,
          headers : {
            'Accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
          },
          body: form_data
          // headers: {'Authorization': "Bearer " + localStorage.getItem("token")},
          // headers: {'Authorization': "Bearer " + this.$cookies.get("session")},
          // credentials: 'same-origin'
      })    
      .then(function (response) {        
        if(response.status == 409 || response.status == 500){
          response.json().then((data) => {
            router.push({ name: 'NewCar', params: { flashes: JSON.stringify(
              [{
                  message: data.message,
                  category: "danger"
                }]
            )}})
          });
        } else if (response.status == 201){
          response.json().then((data) => {
            router.push({ name: 'Explore', params: { flashes: JSON.stringify(
              [{
                  message: "Successfully added your " + data.make + " " + data.model +".",
                  category: "success"
                }]
            ) }})
          });
        } else if (response.status == 400){
          response.json().then((data) => {
            router.push({ name: 'NewCar', params: { flashes: JSON.stringify(
              [{
                  message: "Wrong request format, contact Administrator.",
                  category: "danger"
                }]
            ) }})
          });
        } else if (response.status == 401){
          response.json().then((data) => {
            router.push({ name: 'NewCar', params: { flashes: JSON.stringify(
              [{
                  message: "Please login to add a car.",
                  category: "danger"
                }]
            ) }})
          });
        }
        })   
     }
  },
  data: function(){
      return {
          message: "",
          error: "",
      }
  },
  components : {
    Flash
  }
}

const ViewCar = {
  name:'ViewCar',
  props: ['flashes'],
  computed:{
    json_flashes: function(){
      return JSON.parse(this.flashes)
    },
    is_flashes: function(){
      if(this.flashes){
        return true
      }else{
        return false
      }
    },
    user_id: function(){
      token = localStorage.getItem("token");
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var res = JSON.parse(atob(base64));
      return res.sub;
    }
  },
  template:`
  <div class="view_car">
    <Flash v-if="is_flashes" v-for="flash in json_flashes" v-bind:message="flash.message" v-bind:category="flash.category"></Flash>
    <div v-if="isCar" class="car">
        <div class="car_img">
            <img class="img-fluid" :src="car.photo">
        </div>
        <div class="car-info font-weight-bold">
            <h1 class="font-weight-bold">{{car.year}} {{car.make}}</h1>
            <h4 class="text-secondary font-weight-bold">{{car.model}}</h4><br>
            <section class="text-secondary">
                <article>{{car.description}}</article>
            </section><br>
            <div class="row">
                <div class="col w-25 text-secondary">Colour</div>
                <div class="col w-25">{{car.color}}</div>
                <div class="col w-25 text-secondary">Body Type</div>
                <div class="col w-25">{{car.car_type}}</div>
            </div>
            <div class="row">
                <div class="col w-25 text-secondary">Price</div>
                <div class="col w-25">{{car.price}}</div>
                <div class="col w-25 text-secondary">Transmission</div>
                <div class="col w-25">{{car.transmission}}</div>
            </div>
            <div class="mt-auto car-opts">
              <button class="" type="button">Email Owner</button>
              <div></div>
              <span v-if="favourited" @click="removeFavourite" class="heart d-flex flex-row-reverse favourited">
                <svg id="heart" class="favourited-svg" viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg"><g>
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
              <span v-else="favourited" @click="addFavourite" class="heart d-flex flex-row-reverse">
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
              <span v-if="favourited" @click="removedFavourite" class="heart d-flex flex-row-reverse">
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
              <span v-else="favourited" @click="addFavourite" class="heart d-flex flex-row-reverse">
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
        headers:{
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })    
    .then(function (response) {        
      if(response.status == 404 || response.status == 500){
        response.json().then((data) => {
          console.log(data.result)
        });
      } else if (response.status == 200){
        response.json().then((data) => {
          self.car=data;
          self.isCar = true;
        });
      } else if (response.status == 400){
        response.json().then((data) => {
          router.push({ name: 'Explore', params: { flashes: JSON.stringify(
            [{
                message: "Wrong request format, contact Administrator.",
                category: "danger"
              }]
          ) }})
        });
      } else if (response.status == 401){
        response.json().then((data) => {
          router.push({ name: 'Explore', params: { flashes: JSON.stringify(
            [{
                message: "Please log in to view cars.",
                category: "danger"
              }]
          ) }})
        });
      }  
    })
    fetch(`/api/users/${this.user_id}/favourites`, {
      method: 'GET',
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })    
    .then(function (response) {        
      if(response.status == 404 || response.status == 500){
        response.json().then((data) => {
          console.log(data.result)
        });
      } else if (response.status == 200){
        response.json().then((data) => {
          console.log(data);
          data.result.forEach(pair => {
            if(pair.carid == self.car.id){
              self.favourited = true
              document.getElementById("heart").classList.add("favourited-svg");
              document.querySelector(".heart.d-flex.flex-row-reverse").classList.add("favourited");
            }
          });
        });
      } 
    })
  },
  methods:{
    // Get user_id from JWT bearer payload
      addFavourite(){
        fetch(`/api/cars/${this.car.id}/favourites`,{
          method: 'POST',
          body: JSON.stringify({user_id:this.user_id, car_id:this.car.id}), // for testing
          headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
        })
        .then(function (response) {
          if(response.ok){     
            return response.json();
          } else if(response.status == 401){
            response.json().then((data) => {
              router.push({ name: 'Explore', params: { flashes: JSON.stringify(
                [{
                    message: data.message,
                    category: "danger"
                  }]
              ) }})
            });
          }
        })    
        .then(function (jsonResponse) {
            // display a success message
            document.getElementById("heart").classList.add("favourited-svg");
            document.querySelector(".heart.d-flex.flex-row-reverse").classList.add("favourited");
            self.favourited = true
            console.log(jsonResponse);
            self.message=jsonResponse.message;
        })
     },
     removeFavourite(){
      fetch(`/api/cars/${this.car.id}/unfavourite`,{
        method: 'POST',
        body: JSON.stringify({user_id:this.user_id, car_id:this.car.id}), // for testing
        headers: {'Authorization': "Bearer " + localStorage.getItem("token")}
      })
      .then(function (response) {
        if(response.ok){     
          return response.json();
        } else if(response.status == 401){
          response.json().then((data) => {
            router.push({ name: 'Explore', params: { flashes: JSON.stringify(
              [{
                  message: data.message,
                  category: "danger"
                }]
            ) }})
          });
        }
      })    
      .then(function (jsonResponse) {
          // display a success message
          document.getElementById("heart").classList.remove("favourited-svg");
          document.querySelector(".heart.d-flex.flex-row-reverse").classList.remove("favourited");
          self.favourited = false
          console.log(jsonResponse);
          self.message=jsonResponse.message;
      })
   }
  },
  data: function(){
      return {
          car: {},
          error: '',
          isCar: '',
          favourited: false
      }
  },
  components:{
    Flash
  }
}

const CardCarsList = {
    name: 'card-cars-list',
    props: ['cars'],
    template:`
    <div class="container">
      <div class="row">
        <div v-for="card in cars" class="card col-sm vehicle-list-card box-shadow-down" style="width: 18rem;">
          <img class="img-fluid card-img-top" :src="card.photo" >
          <div class="card-body">
            <h5 class="card-title">{{card.year + " " + card.make}} <span><button class="price-chip "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
            <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"/>
            <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"/>
            </svg> {{card.price}}</button></span></h5>
            <p class="card-text">{{card.model}}.</p>
            <a :href="'/cars/' + card.id" class="btn btn-primary btn-block">View more details</a>
          </div>
        </div> 
        </div>
    </div>
    `
}

const ExploreComponent = {
    name:'explore-component',
    props: ['flashes'],
    computed:{
      json_flashes: function(){
        return JSON.parse(this.flashes)
      },
      is_flashes: function(){
        if(this.flashes){
          return true
        }else{
          return false
        }
      },
      user_id: function(){
        token = localStorage.getItem("token");
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var res = JSON.parse(atob(base64));
        return res.sub;
      }
    },
    template:`
      <section id="explore-page" >
        <Flash v-if="is_flashes" v-for="flash in json_flashes" v-bind:message="flash.message" v-bind:category="flash.category"></Flash>
        <div class="container">
          <div class="row">
            <div class="col-sm"></div>
            <div class="explore-div col-lg-7">
              <h3 class="font-weight-bold display-5">
                  Explore
              </h3>
              <form @submit.prevent="addCar" method="POST" enctype="multipart/form-data">
                  <div class="form-row  container">
                      <div class="col-sm form-group">
                          <label for="make">Make</label>
                          <input v-model="make" class="form-control" id="make" type="text" name="make" placeholder="Tesla">
                      </div> 
                      <div class="form-group col-sm">
                          <label for="model">Model</label>
                          <input v-model="model" class="form-control" id="model" type="text" name="model" placeholder="Model S">
                      </div> 
                      <div class="form-group col-sm ">
                          <div>&nbsp;</div>
                          <button @click="getCarsBySearch" type="submit" class="btn-class mt-lg-4">Search</button>
                      </div>
                      </div>
              </form>
              <CardCarsList v-bind:cars="cars"></CardCarsList>
            </div>
            <div class="col-sm"></div>
          </div>
        </div>
      </section>
    `,
    created(){
    document.body.classList.add("grey-background");
    this.getAllCars()

  },
    methods : {
      getAllCars(){
          let self = this;
    fetch(`/api/cars`, {
    method: 'GET',
    headers: {'Authorization': "Bearer " + localStorage.getItem("token")},
    })
    .then(function (response) {
      if(response.status == 404 || response.status == 500){
        response.json().then((data) => {
          router.push({ name: 'Explore', params: { flashes: JSON.stringify(
            [{
                message: "No Cars Found.",
                category: "warning"
              }]
          )}})
        });
      } else if (response.status == 200){
        response.json().then((data) => {
          self.cars = data.result
        });
      }
    })
      },
        getCarsBySearch() {
           let self = this;
           if(self.make == "" && self.model== ""){
            self.getAllCars()
           } else {
            fetch(`/api/search?` + new URLSearchParams({make:self.make, model:self.model}), {
              method: 'GET',
              headers: {'Authorization': "Bearer " + localStorage.getItem("token")},
              })
              .then(function (response) {
                if(response.status == 404 || response.status == 500){
                  response.json().then((data) => {
                    router.push({ name: 'Explore', params: { flashes: JSON.stringify(
                      [{
                          message: "No Cars Found.",
                          category: "warning"
                        }]
                    )}})
                  });
                } else if (response.status == 200){
                  response.json().then((data) => {
                    self.cars = data.result
                  });
                }
              })
           }
        }
    },
  components : {
      CardCarsList,
      Flash
  },
  data: function(){
    return {
      cars:[],
        make:"",
        model:""
    }
  }
}

const UserProfile = {
  name: 'UserProfile',
  props: ['flashes'],
  computed:{
    json_flashes: function(){
      return JSON.parse(this.flashes)
    },
    is_flashes: function(){
      if(this.flashes){
        return true
      }else{
        return false
      }
    },
    user_id: function(){
      token = localStorage.getItem("token");
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var res = JSON.parse(atob(base64));
      return res.sub;
    }
  },
  template:`
  <div id="user_profile" class="row">
    <Flash v-if="is_flashes" v-for="flash in json_flashes" v-bind:message="flash.message" v-bind:category="flash.category"></Flash>
    <div class="col-lg-8 mx-auto mb-5">
      <section v-if="isUser" class="user row mt-5 mx-5">
        <div class="col-md-3 user_img">
            <img class="img-fluid mt-3 mx-2" :src="user.photo">
        </div>
        <div class="col-md-7 user-info pr-5">
            <h1 class="font-weight-bold">{{user.name}}</h1>
            <h4 class="text-secondary font-weight-bold">@{{user.username}}</h4><br>
            <section class="text-secondary">
                <article>
                  {{user.biography}}
                </article>
            </section><br>
            <div class="row">
                <div class="col w-25 text-secondary">Email</div>
                <div class="col w-25">{{user.email}}</div>
            </div>
            <div class="row">
                <div class="col w-25 text-secondary">Location</div>
                <div class="col w-25">{{user.location}}</div>
            </div>
            <div class="row">
                <div class="col w-25 text-secondary">Joined</div>
                <div class="col w-25">{{user.date_joined}}</div>
            </div>
        </div>
      </section>
      <section v-if="isUser" id="favourited_cars" class="mt-5 mx-5">
        <h3> Cars Favourited</h3>
        <CardCarsList/>
      </section>
      <section v-else class="user mt-5">
        <div class="user_img">
            <img class="img-fluid" src="../../../uploads/danicapatrick.jpeg">
        </div>
        <div class="user-info pr-15">
            <h1 class="font-weight-bold">Danica Patrick</h1>
            <h4 class="text-secondary font-weight-bold">@dpatrick</h4><br>
            <section class="text-secondary">
                <article>
                  I am a former professional racing driver and the most successful woman in the history of American open-wheel racing. I love cars and driving fast.
                </article>
            </section><br>
            <div class="row">
                <div class="col w-25 text-secondary">Email</div>
                <div class="col w-25">dpatrick@example.com</div>
            </div>
            <div class="row">
                <div class="col w-25 text-secondary">Location</div>
                <div class="col w-25">Wisconsin, USA</div>
            </div>
            <div class="row">
                <div class="col w-25 text-secondary">Joined</div>
                <div class="col w-25">April 8, 2021</div>
            </div>
        </div>
      </section>
      <section v-if="!isUser" id="favourited_cars" class="mt-5">
        <h3> Cars Favourited</h3>
        <CardCarsList/>
      </section>
    </div>
  </div> 
  `,
  created(){
    document.body.classList.add("grey-background");
  },
  mounted(){
    let self = this;
    fetch(`/api/users/${this.user_id}`, {
        method: 'GET',
        headers: {'Authorization': "Bearer " + localStorage.getItem("token")},
    })    
    .then(function (response) {        
      if(response.status == 404 || response.status == 500){
        response.json().then((data) => {
          router.push({ name: 'Explore', params: { flashes: JSON.stringify(
            [{
                message: "User not found.",
                category: "danger"
              }]
          )}})
        });
      } else if (response.status == 200){
        response.json().then((data) => {
          self.user=data;
          self.isUser = true;
        });
      } else if (response.status == 401){
        response.json().then((data) => {
          router.push({ name: 'Explore', params: { flashes: JSON.stringify(
            [{
                message: "Please log in to view profile.",
                category: "danger"
              }]
          ) }})
        });
      }
    })    
  },
  computed :{
    user_id: function(){
      token = localStorage.getItem("token");
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var res = JSON.parse(atob(base64));
      return res.sub;
    }
  },
  data: function(){
      return {
          user: {},
          error: '',
          isUser: ''
      }
  },
  components : {
    CardCarsList,
    Flash
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
  { path: "/", component: Home, name:"Home" },
  // Put other routes here
  {path:"/login",component: loginComponent, name:"Login", props: true},
  {path:"/register", component: Register, name:"Register", props:true},
  {path:"/cars/new", component: NewCar, name:"NewCar", props: true},
  {path:"/cars/:id", component: ViewCar, name:"ViewCar", props: true},
  {path:"/cars/explore", component: ExploreComponent, name:"Explore", props: true},
  {path:"/user/:user_id", component: UserProfile, name:"UserProfile", props: true},

  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');