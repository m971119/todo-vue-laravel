<template>
    <div>{{ remaining }} items left</div>
</template>

<script>
export default {
    name: 'todo-items-remaining',
    computed: {
        remaining() {
            return this.$store.getters.remaining;
        }
    }
};
</script>

<style scoped></style>
