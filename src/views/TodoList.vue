<template>
<div class="main-wrapper">
  <div class="main">
    <div class="add-todo">
      <input @keyup="keyUpSubmitTodo" v-model="temptodo" type="text" placeholder="新增代辦事項" />
      <font-awesome-icon
        @click="submitTodo"
        icon="plus"
        class="i-plus cursor-pointer"
      ></font-awesome-icon>
    </div>
    <div class="wrapper">
      <ul class="switch-wrapper">
        <li @click="switchToAll">全部</li>
        <li @click="switchToProgress">待完成</li>
        <li @click="switchToDone">已完成</li>
      </ul>
      <ul class="todo-wrapper">
        <li
          class="flex items-center justify-between"
          v-show="showTodo(todo)"
          v-for="(todo,index) in todos"
          :key="index"
        >
          <div
            @click="toggleStatus(index)"
            class="flex cursor-pointer items-center"
          >
            <font-awesome-icon :class="[null !== todo.completed_at ? 'show' : 'hide']" icon="check" class="i-check" />
            <div :class="[null == todo.completed_at ? 'show' : 'hide']" class="square"></div>
            <p :class="[null !== todo.completed_at ? 'isDone-item' : '']" class="hover:line-through duration-75">{{ todo.content }}</p>
          </div>
          <font-awesome-icon @click="deleteTodo(index)" icon="trash" class="i-trash cursor-pointer" />
        </li>
        <ul class="state">
          <li>{{ todosCount() }} 個待完成項目</li>
          <li @click="clearDone" class="text-gray-400 cursor-pointer">清除已完成項目</li>
          <li @click="clearAll" class="text-red-400 cursor-pointer">清除全部</li>

        </ul>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      isDone: false,
      temptodo: '',
      switchOptions: '',
      statusOptions: [typeof(null), typeof("string")],
      todos:[],
      apiDomain: this.$route.meta.apiDomain,
      config: {
        headers: { Authorization: sessionStorage.getItem('authorization') }
      }
    };  
  },
  created(){
    this.getApi()
  },
  methods: {
    //init
    getApi(){
      axios.get(`${this.apiDomain}/todos`, this.config)
      .then(res => {
        this.todos = res.data.todos
      })
      .catch(err => console.log(err))
    },
    saveApi(){
      let obj = {}
      obj.content = this.temptodo
      axios.post(`${this.apiDomain}/todos`, obj, this.config)
      .then(res => {
        this.refreshDom()
      })
    },
    refreshDom(){
      this.$emit('refreshFunc')
    },
    //CRUD
    keyUpSubmitTodo(e){
      if(e.key === "Enter" && this.temptodo){
        this.saveApi()
        this.temptodo = ''
      } 
    },
    submitTodo(){
      if(this.temptodo){
      this.saveApi()
      this.temptodo = ''
      }
    },
    deleteTodo(index){
      axios.get(`${this.apiDomain}/todos`, this.config)
      .then(res => {
        let deleteIndex
        for(let i=0; i<res.data.todos.length; i++){
          if(res.data.todos[i].id === this.todos[index].id){
            deleteIndex = i
          }
        }
        let deleteUrl = `${this.apiDomain}/todos/${res.data.todos[deleteIndex].id}`
        axios.delete(deleteUrl, this.config)
        .then(res => {
          this.refreshDom()
          })
        .catch(error => console.log(error))
      })
    },
    toggleStatus(index){
      axios.get(`${this.apiDomain}/todos`, this.config)
      .then(res => {
        res.data.todos.forEach((element) => {
          if(element.id == this.todos[index].id){
            let statusUrl = `${this.apiDomain}/todos/${element.id}/toggle`
            axios.patch(statusUrl, {
              completed_at: this.todos[index].completed_at
            }, this.config)
            .then(res => {
              this.refreshDom()
            })
          }
        })
      })
    },
    clearDone(){
      this.todos = this.todos.filter(element => element.completed_at === null)
      axios.get(`${this.apiDomain}/todos`, this.config)
      .then(res => {
        res.data.todos.forEach(element => {
          if(typeof(element.completed_at) === 'string'){
            let apiUrl = `${this.apiDomain}/todos/${element.id}`
            axios.delete(apiUrl, this.config)
            .then(res => console.log(res))
            .catch(error => console(error))
          }
        })
      
      })
    },
    clearAll(){
      axios.get(`${this.apiDomain}/todos`, this.config)
      .then(res =>{
        res.data.todos.forEach(element => {
          let deleteUrl = `${this.apiDomain}/todos/${element.id}`
          axios.delete(deleteUrl, this.config)
          .then(() =>{
            this.refreshDom()
          })
          .catch(error => console.log(error))
        })
      })
    },

    // UI display
    todosCount(){
      let inProgressArr = this.todos.filter(element => element.completed_at === null)
      return inProgressArr.length
    },

    // Local todos status switching
    showTodo(todo){
      if(this.switchOptions == this.statusOptions[0] || this.switchOptions == this.statusOptions[1]){
        return typeof(todo.completed_at) == this.switchOptions
      }else {
        return true
      }
    },
    switchToAll(){
      this.switchOptions = ''
    },
    switchToProgress(){
      this.switchOptions = this.statusOptions[0]
    },
    switchToDone(){
      this.switchOptions = this.statusOptions[1]
    },

  }
};
</script>

<style lang="scss">
// v-bind class
.hide {
  display: none;
}
.show {
  display: block;
}
.isDone-item {
  text-decoration-line: line-through;
  color: #868686;
}
.showAll {
  display: block;
}


/* utility */
:root {
  --primary: #ffd370;
  --second: #333333;
  --third: #9f9a91;
}
.text-second {
  color: var(--third);
}
.user-name {
  font-weight: 600;
  @media (max-width: 768px) {
    display: none;
  }
}

@mixin text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
@mixin text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
@mixin text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
@mixin text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
@mixin text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
@mixin text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

@mixin text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
@mixin text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
@mixin tracking-normal {
  letter-spacing: 0em;
}

@mixin tracking-wide {
  letter-spacing: 0.025em;
}

@mixin tracking-wider {
  letter-spacing: 0.05em;
}

@mixin tracking-widest {
  letter-spacing: 0.1em;
}
@mixin tracking($wide) {
  letter-spacing: $wide;
}

@mixin align-center {
  margin: 0 auto;
}

@mixin font-serif {
  font-family: Noto Serif TC, Times;
}
@mixin font-sans {
  font-family: Noto Sans TC, Roboto;
}
@mixin font-dela {
  font-family: Dela Gothic One;
}

//dynamic css
.isFinished {
  color: var(--third);
  text-decoration: line-through;
}

// style.css

input {
  border: 0;
  outline: none;
  background-color: transparent;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
}
nav > ul {
  @include font-sans;
  display: flex;
}
nav > ul > li {
  margin-left: 24px;
}

.main {
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
}
.add-wrapper {
  display: flex;
  width: 100%;
}
.add-todo {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  margin-bottom: 16px;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.15));
}
.add-todo > input {
  flex: 1;
}
input[placeholder] {
  @include font-sans;
  color: #9f9a91;
  padding: 12px 0 12px 16px;
}
.i-plus {
  padding: 10px;
  background-color: #333333;
  color: white;
  border-radius: 10px;
  margin-right: 4px;
}
.i-trash {
  opacity: 0;
  color: rgb(101, 101, 101);
  transition: 0.1s ease-in-out;
}

.wrapper {
  background-color: #fff;
  border-radius: 10px;
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.15));
}

.switch-wrapper {
  display: flex;
  font-weight: 600;
  color: var(--second);
  li {
    @include font-sans;
    position: relative;
    padding: 16px 0;
    flex: 1;
    text-align: center;
    cursor: pointer;
    border-bottom: 2px solid #efefef;
    &::after {
      content: "";
      width: 0%;
      height: 3px;
      position: absolute;
      bottom: -1px;

      // 偽元素初始狀況受left與right擠壓，因此不可見
      left: 50%;
      right: 50%;
    }
    &:hover::after {
      width: 100%;
      background: var(--second);
      transition: 0.2s;

      // 偽元素在hover之後，left0與right0，釋放偽元素
      left: 0;
      right: 0;
    }
    
  }
}

.todo-wrapper {
  padding: 24px 48px 24px 24px;
  font-weight: 400;
  .square {
    width: 20px;
    height: 20px;
    border: 1px solid #9f9a91;
    border-radius: 5px;
  }

  li {
    @include font-sans;
    padding-bottom: 15px;
    margin-bottom: 17px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    &:hover > .i-trash{
      transition: 0.2s ease-in-out;
      opacity: 1;
    }
  }
  p {
    margin-left: 16px;
  }
}

.i-check {
  font-size: 20px;
  width: 20px;
  border-radius: 5px;
  text-align: center;
  color: var(--primary);
}

.state {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  li {
    margin-top: 7px;
    border-bottom: 0;
  }
}
</style>
