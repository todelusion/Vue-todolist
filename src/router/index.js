import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import TodoList from "../views/TodoList.vue";
import Register from "../views/Register.vue";
import VisiterTodoList from "../views/VisiterTodoList.vue";

let history = createWebHistory("/RocketTeam-10th/");
const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      hideNavbar: true,
      apiDomain: 'https://todoo.5xcamp.us'
    },
    children: [
      { 
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          hideLogin: true
        }
      },
    ] 
  },
  {
    path: "/todoList",
    name: "todoList",
    component: TodoList,
    meta: {
      apiDomain: 'https://todoo.5xcamp.us'
    }
  },
  {
    path: "/VisiterTodoList",
    name: "VisiterTodoList",
    component: VisiterTodoList,
  }
];

export default createRouter({ history, routes });
