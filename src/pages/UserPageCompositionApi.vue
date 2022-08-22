<template>
    <div>
        <h1>{{likes}}</h1>
        <h1>Страница с постами</h1>
        <my-input v-focus v-model.trim="searchQuery" placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button @click="dialogVisible=true">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form />
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading"/>
        <div v-if="isPostsLoading">Идет загрузка...</div>
    </div>
</template>
<script>
import PostForm from '../components/PostForm.vue';
import PostList from '../components/PostList.vue';
import axios from 'axios';
import {ref} from 'vue'
import { usePosts } from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'
export default {
    components: {
        PostList, PostForm
    },  
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'}
            ],
        }
    },
    setup(props){
        const {posts, totalPages, isPostsLoading} = usePosts(10)
        const {selectedSort, sortedPosts} = useSortedPosts(posts)
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts
        }
    }
}
</script>
<style>
.app__btns{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
}
.observer {
    height: 30px;
    background: green;
}
</style>