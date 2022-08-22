<template>
    <form @submit.prevent>
        <h1>Создание поста</h1>
        <my-input v-focus v-model="post.title" type="text" placeholder="Название" /> <!-- v-bind:value="post.title" @input="post.title = $event.target.value" -->
        <my-input v-model="post.body" type="text" placeholder="Описание" /> <!-- v-bind:value="post.body" @input="post.body = $event.target.value" -->
        <my-button @create="createPost" @click="createPost" style="align-self: flex-end; margin-top: 15px;">Создать</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: "",
            };
        },
    },
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>