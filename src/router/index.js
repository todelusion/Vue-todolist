import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import TodoList from "../views/TodoList.vue";
import Register from "../views/Register.vue";

let history = createWebHistory("/RocketTeam-10th/");
const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      hideNavbar: true
    },
    children: [
      { 
        path: '/register',
        component: Register,
        meta: {
          hideLogin: true
        }
      }
    ] 
  },
  {
    path: "/todoList",
    name: "todoList",
    component: TodoList,
  },
];

export default createRouter({ history, routes });
