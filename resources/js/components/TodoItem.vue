<template>
    <div class="todo-item">
        <div class="todo-item-left">
            <input type="checkbox" v-model="completed" @change="doneEdit" />
            <div
                v-if="!editing"
                @dblclick="editTodo"
                class="todo-item-label"
                :class="{ completed: completed }"
            >
                {{ title }}
            </div>
            <input
                v-else
                class="todo-item-edit"
                type="text"
                v-model="title"
                v-focus
                @blur="doneEdit"
                @keyup.enter="doneEdit"
                @keyup.esc="cancelEdit"
            />
        </div>
        <div>
            <button @click="pluralize">Plural</button>
            <span class="remove-item" @click="removeTodo(todo.id)">
                &times;
            </span>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../app.js";
export default {
    name: "todo-item",
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    },
    props: {
        todo: {
            type: Object,
            required: true
        },
        checkAll: {
            type: Boolean,
            required: true
        }
    },
    created() {
        eventBus.$on("pluralize", this.handlePluralize);
    },
    beforeDestroy() {
        eventBus.$off("pluralize", this.handlePluralize);
    },
    watch: {
        checkAll() {
            this.completed = this.checkAll ? true : this.todo.completed;
        }
    },
    data() {
        return {
            id: this.todo.id,
            title: this.todo.title,
            completed: this.todo.completed,
            editing: this.todo.editing,
            beforeEditCache: ""
        };
    },
    methods: {
        removeTodo(id) {
            const index = this.$store.state.todos.findIndex(
                item => item.id == id
            );
            this.$store.state.todos.splice(index, 1);
        },
        editTodo() {
            this.beforeEditCache = this.title;
            this.editing = true;
        },
        doneEdit() {
            if (this.title.trim().length == 0) {
                this.title = this.beforeEditCache;
            }
            this.editing = false;
            const index = this.$store.state.todos.findIndex(
                item => item.id == this.id
            );
            this.$store.state.todos.splice(index, 1, {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing
            });
        },
        cancelEdit() {
            this.title = this.beforeEditCache;
            this.editing = false;
        },
        pluralize() {
            eventBus.$emit("pluralize");
        },
        handlePluralize() {
            this.title = this.title + "s";
            const index = this.$store.state.todos.findIndex(
                item => item.id == this.id
            );
            this.$store.state.todos.splice(index, 1, {
                id: this.id,
                title: this.title,
                completed: this.completed,
                editing: this.editing
            });
        }
    }
};
</script>

<style scoped></style>
