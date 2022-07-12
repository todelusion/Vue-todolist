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
            <ul class="flex text-red-600 text-xs mb-1">
                <li v-show="user.email == '' ? true : false">｜必須輸入email｜</li>
                <!-- <li v-show="user.email.length>5 ? false : true">｜格式錯誤｜</li> -->
            </ul>
            <input type="email" v-model.trim="user.email" placeholder="請輸入Email" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="mb-4 w-full">
        <form class="flex flex-col">
            <label for="name" class="text-sm text-primary mb-1">
                您的暱稱
            </label>
            <p v-show="user.nickname == '' ? true : false" class="text-red-600 text-xs mb-1">必須輸入暱稱</p>
            <input type="text" v-model.trim="user.nickname" placeholder="請輸入您的暱稱" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="mb-4 w-full">
        <form class="flex flex-col">
            <label for="password" class="flex items-center text-sm text-primary">
                <p>Password</p>
            </label>
            <ul class="flex text-red-600 text-xs mb-1">
                <li v-show="user.password == '' ? true : false">｜必須輸入密碼｜</li>
                <li v-show="user.password.length>5 ? false : true">｜至少需要輸入6個字｜</li>
            </ul>
            <input type="password" v-model.trim="user.password" placeholder="請輸入密碼" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="mb-6 w-full">
        <form class="flex flex-col">    
            <label for="password" class="text-sm text-primary mb-1">
                Confirm the password
            </label>
            <p v-show="user.password === passwordChecked ? false : true" class="text-red-600 text-xs mb-1">密碼不相同</p>
            <input type="password" v-model.trim="passwordChecked" placeholder="請再次輸入密碼" class="py-3 px-4 bg-white rounded-lg font-medium">
        </form>
    </li>
    <li class="w-full flex justify-center -ml-4 mb-6">
        <button @click="regist" class="text-white bg-primary font-bold w-max py-3 px-12 rounded-xl">註冊帳號</button>
    </li>
</ul>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            user: {
                email: '',
                nickname: '',
                password: '',
            },
            passwordChecked: '',
            APIstatus: {
                successful: '註冊成功',
                error: '密碼 字數太少，至少需要 6 個字", "電子信箱 格式有誤'
            }
        }
    },
    methods: {
        regist(){
            if((this.user.email && this.user.nickname && this.user.password && this.passwordChecked) !== ''){
                if(this.user.password !== this.passwordChecked){
                    return
                }
                let obj = {
                    user: {
                        email : this.user.email,
                        nickname : this.user.nickname,
                        password : this.user.password
                    }
                }
                axios.post(`${this.$route.meta.apiDomain}/users`, obj)
                .then(res => {
                    this.$router.push({ path:'/' })
                    console.log(res)
                })
                .catch(err => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '註冊失敗，請再檢查格式',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(err)
                })

                console.log('submit') 
            }else{
                Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '資料還沒填完喔!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
            }

        },
    }
}
</script>