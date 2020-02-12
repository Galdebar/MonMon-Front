<template>
  <div id="app">
    <Header ref="header"></Header>
    <ShoppingListMain @moveHeader="moveHeader"></ShoppingListMain>
  </div>
</template>

<script>
import Header from "./components/Header/Header";
import ShoppingListMain from "./components/ShoppingList/ShoppingListMain";
import 'normalize.css';

export default {
  name: 'App',
  components: {
    Header,
    ShoppingListMain
  },
  data(){
      return{
          passedMessage: "Passed Message"
      }
  },
  methods:{
    moveHeader(){
      this.$refs.header.moveHeader();
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
