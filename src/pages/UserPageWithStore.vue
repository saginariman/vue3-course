<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery"  placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button @click="dialogVisible=true">Создать пост</my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/> <!-- v-bind:posts = :posts -->
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>
<script>
import PostForm from '../components/PostForm.vue';
import PostList from '../components/PostList.vue';
import axios from 'axios';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    components: {
        PostList, PostForm
    },  
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts',
        }),
        createPost(post){
             this.posts.push(post)
             this.dialogVisible = false;
        },
        inputTitle(event) {
            this.title = event.target.value;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
            searchQuery: state => state.post.searchQuery,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },
    watch: {
    },
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

<!-- Single file component -->