<template>
    <div>
        <div class="name-container">Welcome, {{ name }}</div>
        <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo" />
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutLeft">
            <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining"> </todo-item>
        </transition-group>
        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>
        <div class="extra-container">
            <todo-filtered></todo-filtered>
            <div>
                <transition name="fade">
                    <todo-clear-completed></todo-clear-completed>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoCheckAll from './TodoCheckAll';
import TodoFiltered from './TodoFiltered';
import TodoClearCompleted from './TodoClearCompleted';
// import { eventBus } from '../app.js';
export default {
    name: 'TodoList',
    components: { TodoItem, TodoItemsRemaining, TodoCheckAll, TodoFiltered, TodoClearCompleted },
    data() {
        return {
            newTodo: '',
            idForTodo: 3,
            name: ''
        };
    },
    created() {
        this.$store.dispatch('retrieveTodos');
        this.$store.dispatch('retrieveName').then((res) => (this.name = res.data.name));
    },
    computed: {
        anyRemaining() {
            return this.$store.getters.anyRemaining;
        },
        todosFiltered() {
            return this.$store.getters.todosFiltered;
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim().length == 0) {
                return;
            }
            // call mutation
            this.$store.dispatch('addTodo', {
                id: this.idForTodo,
                title: this.newTodo
            });
            this.newTodo = '';
            this.idForTodo++;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
.todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
        outline: 0;
    }
}
.todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
}
.remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
        color: red;
    }
}
.todo-item-left {
    //later
    display: flex;
    align-items: center;
}
.todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
}
.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Aveniz', Helvetica, Arial, sans-serif;
    &:focus {
        outline: none;
    }
}
.completed {
    text-decoration: line-through;
    color: grey;
}

.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgray;
    padding-top: 14px;
    margin-bottom: 14px;
}

button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    border: 1px solid lightgray;
    padding: 4px;

    &:hover {
        background: lightgreen;
    }
    &:focus {
        outline: none;
    }
}
.active {
    background: lightgreen;
}
.name-container {
    margin-bottom: 16px;
    text-align: center;
}

// CSS Transition
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
