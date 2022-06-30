import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";

let history = createWebHistory("/RocketTeam-10th/");
const routes = [
  {
    path: "/",
    name: "todoList",
    component: TodoList,
  },
];

export default createRouter({ history, routes });
