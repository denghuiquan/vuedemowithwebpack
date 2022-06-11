<template>
  <div class="content">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>{{ titile }}
      <button @click="count++"> Count is: {{ count }}</button>
    </p>
    <HelloWorld :msg="welcomeTips" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      titile: 'Welcome to Vue Development.',
      count: 0
    }
  },
  computed: {
    welcomeTips() {
      return `Welcome to Your Vue.js App ${this.count}`
    }
  }
};
</script>

<style lang="less" scopeds>
#app,
.content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  font-weight: bold;
}
</style>
