// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
// eslint-disable-next-line
import FormItem from '@odyzeo/form-item';
import App from './App';

Vue.config.productionTip = false;

Vue.use(FormItem);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
