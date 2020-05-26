<template>
    <div>
        <input
            type="text"
            class="todo-input"
            placeholder="What needs to be done"
        />
    </div>
</template>

<script>
export default {
    name: "todo-list"
};
</script>

<style lang="scss">
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
    font-family: "Aveniz", Helvetica, Arial, sans-serif;
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
