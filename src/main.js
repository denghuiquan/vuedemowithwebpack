import Vue from 'vue'
import App from './App.vue'

if (module.hot) {
    module.hot.accept([
        './App.vue' // 这里可以不需要
    ], () => {
        console.log('Vue demo app working with hot replacement.')
    })

}

new Vue({
    render: h => h(App)
}).$mount('#app')
