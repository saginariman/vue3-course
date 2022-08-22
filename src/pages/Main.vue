<template>
    <div>
        <h1>Добро пожаловать на курс Vue 3</h1>
        <router-link to="users" exact>Пользователи</router-link>
        <router-link to="about" exact>О сайте</router-link>
        <button @click="$router.push('/users');">В пользователи</button>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>