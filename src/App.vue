<template>
  <div id="app">
    <h1>GitHub Viever</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed (){
    
  },
  data () {
    return {
      counter: 5
    }
  }
}
</script>

<style>
body {
  padding: 50px;
}
</style>
