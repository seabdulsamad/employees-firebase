import Vue from 'vue';

const mainMenu = [
  {
    icon: "mdi-monitor-dashboard",
    title: "About",
    to: "/"
  },
  {
    icon: "mdi-account-supervisor",
    title: "Employees",
    to: "/employees"
  },
];

const messages = {
  default_error: 'An unexpected error has occurred. Please try again sometime later.',
  default_success: 'The specified action has been performed.',
  remove: 'The specified information has been removed.',
  error_notfound: 'The specified resource does not exist.'
};

let obj = {
  mainMenu,
  messages,
}

export default obj;
Vue.prototype.$pluginsData = obj;