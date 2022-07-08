<template>
<ul class="max-w-xs w-full flex flex-col items-center font-bold">
    <li class="mb-4 md:hidden">
        <router-link to="/">
            <img src="../assets/logo_lg.png" alt="logo">
        </router-link>
    </li>
    <li class="text-xl mb-8">註冊帳號</li>
    <li class="mb-4 w-full">
        <form class="flex flex-col">
            <label for="email" class="text-sm text-primary mb-1">
                Email
            </label>
            <input type="email" placeholder="請輸入Email" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="mb-4 w-full">
        <form class="flex flex-col">
            <label for="name" class="text-sm text-primary mb-1">
                您的暱稱
            </label>
            <input type="text" placeholder="請輸入您的暱稱" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="mb-4 w-full">
        <form class="flex flex-col">
            <label for="password" class="text-sm text-primary mb-1">
                Password
            </label>
            <input type="password" placeholder="請輸入密碼" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="mb-6 w-full">
        <form class="flex flex-col">    
            <label for="password" class="text-sm text-primary mb-1">
                Confirm the password
            </label>
            <input type="text" placeholder="請再次輸入密碼" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="w-full flex justify-center -ml-4 mb-6">
        <button @click="$emit('show')" class="text-white bg-primary font-bold w-max py-3 px-12 rounded-xl">註冊帳號</button>
    </li>
</ul>
</template>
