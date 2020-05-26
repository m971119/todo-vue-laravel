import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://todo-laravel.test/api';

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        filter: 'all',
        todos: []
    },
    getters: {
        loggedIn(state) {
            return state.token !== null;
        },
        remaining(state) {
            return state.todos.filter((todo) => !todo.completed).length;
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0;
        },
        todosFiltered(state) {
            if (state.filter == 'all') {
                return state.todos;
            } else if (state.filter == 'active') {
                return state.todos.filter((todo) => !todo.completed);
            } else if (state.filter == 'completed') {
                return state.todos.filter((todo) => todo.completed);
            }
            return state.todos;
        },
        showClearCompletedButton(state) {
            return state.todos.filter((todo) => todo.completed).length > 0;
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            });
        },
        clearCompleted(state) {
            state.todos = state.todos.filter((todo) => !todo.completed);
        },
        updateFilter(state, filter) {
            state.filter = filter;
        },
        checkAll(state, checked) {
            state.todos.forEach((todo) => (todo.completed = checked));
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex((item) => item.id == id);
            state.todos.splice(index, 1);
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex((item) => item.id == todo.id);
            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing
            });
        },
        retrieveTodos(state, todos) {
            state.todos = todos;
        },
        retrieveToken(state, token) {
            state.token = token;
        },
        destroyToken(state) {
            state.token = null;
        },
        clearTodos(state) {
            state.todos = [];
        }
    },
    actions: {
        retrieveName(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios
                    .get('/user')
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        clearTodos(context) {
            context.commit('clearTodos');
        },
        register(context, data) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/register', {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    })
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios
                        .post('/logout')
                        .then((res) => {
                            localStorage.removeItem('access_token');
                            context.commit('destroyToken');
                            resolve(res);
                        })
                        .catch((err) => {
                            localStorage.removeItem('access_token');
                            context.commit('destroyToken');
                            console.log(err);
                            reject(err);
                        });
                });
            }
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios
                    .post('/login', {
                        username: credentials.username,
                        password: credentials.password
                    })
                    .then((res) => {
                        const token = res.data.access_token;
                        localStorage.setItem('access_token', token);
                        context.commit('retrieveToken', token);
                        resolve(res);

                        // console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            });
        },
        retrieveTodos(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

            axios
                .get('/todos')
                .then((res) => {
                    context.commit('retrieveTodos', res.data);
                })
                .catch((err) => console.log(err));
        },
        addTodo(context, todo) {
            axios
                .post('/todos', {
                    title: todo.title,
                    completed: false
                })
                .then((res) => {
                    context.commit('addTodo', res.data);
                })
                .catch((err) => console.log(err));
        },
        deleteTodo(context, id) {
            axios
                .delete('/todos/' + id)
                .then(() => {
                    context.commit('deleteTodo', id);
                })
                .catch((err) => console.log(err));
        },
        updateTodo(context, todo) {
            axios
                .patch('/todos/' + todo.id, {
                    title: todo.title,
                    completed: todo.completed
                })
                .then((res) => {
                    context.commit('updateTodo', res.data);
                })
                .catch((err) => console.log(err));
        },
        clearCompleted(context) {
            // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
            const completedIds = store.state.todos.filter((todo) => todo.completed).map((todo) => todo.id);
            axios
                .delete('/todosDeleteCompleted', {
                    data: {
                        todos: completedIds
                    }
                })
                .then(() => {
                    context.commit('clearCompleted');
                })
                .catch((err) => console.log(err));
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        },
        checkAll(context, checked) {
            axios
                .patch('/todosCheckAll', {
                    completed: checked
                })
                .then(() => {
                    context.commit('checkAll', checked);
                })
                .catch((err) => console.log(err));
        }
    }
});
