<template>
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
</template>

<script>
export default  {
  name : "home",
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
}
</script>