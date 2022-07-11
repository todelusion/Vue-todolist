<template>
<div class="flex justify-center h-screen items-center bg-second">
    <ul class="hidden md:block md:mr-28">
        <li>
            <router-link to="/"><img src="../assets/logo_lg.png" alt="logo"></router-link>
        </li>
        <li><img src="../assets/landing.png" alt="landingImage"></li>
    </ul>
    <ul v-if="!$route.meta.hideLogin" class="max-w-xs w-full flex flex-col items-center font-bold">
        <li class="mb-4 md:hidden"><img src="../assets/logo_lg.png" alt="logo"></li>
        <li class="text-xl mb-8">最實用的線上代辦事項服務</li>
        <li class="mb-4 w-full">
            <form class="flex flex-col">
                <label for="email" class="text-sm text-primary mb-1">
                    Email
                </label>
                <input type="email" placeholder="請輸入Email" class="py-3 px-4 bg-white rounded-lg font-medium">
            </form>
        </li>
        <li class="mb-7 w-full">
            <form class="flex flex-col">
                <label for="password" class="text-sm text-primary mb-1">
                    Password
                </label>
                <input type="password" placeholder="請輸入密碼" class="py-3 px-4 bg-white rounded-lg font-medium">
            </form>
        </li>
        <li class="w-full flex justify-center -ml-4 mb-6">
            <router-link to="/VisiterTodoList">
                <button class="text-primary font-medium py-3 px-10 rounded-xl">訪客登入</button>
            </router-link>
            <router-link to="/todoList">
                <button class="text-white bg-primary font-bold w-max py-3 px-12 rounded-xl">登入</button>
            </router-link>
        </li>
        <li>
            <router-link to="/register">
                <button class="text-primary/50 font-bold w-max py-3 px-12 rounded-xl">註冊帳號</button>
            </router-link>
        </li>
    </ul>
    <router-view />
</div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            modal: false,
            token: '',
            user: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        showModal(){
            modal = !modal
        }
    }
}
</script>