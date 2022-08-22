<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus v-model.trim="searchQuery" placeholder="Поиск..."/>
        <div class="app__btns">
            <my-button @click="dialogVisible=true">Создать пост</my-button>
            <my-select v-model="selectedSort" :options="sortOptions"/>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading"/> <!-- v-bind:posts = :posts -->
        <div v-else>Идет загрузка...</div>
        <!-- <div ref="observer" class="observer"></div> -->
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber" 
                class="page" 
                :class="{
                    'current-page': page === pageNumber
                }"
                @click="changePage(pageNumber)"
            >
                {{pageNumber}}
            </div>
        </div> -->
    </div>
</template>
<script>
import PostForm from '../components/PostForm.vue';
import PostList from '../components/PostList.vue';
import axios from 'axios';
export default {
    /* Компонент проходит четыре стадии:
     * создание beforeCreate, created
     * монтирование beforeMount, mounted
     * обновление beforeUpdate, updated
     * уничтожение beforeUnmount, unmounted
    */
    components: {
        PostList, PostForm
    },  
    data() {
        return {
            posts: [],
            dialogVisible: false,
            modificatorValue: '',
            isPostsLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'}
            ],
            searchQuery: '',
        }
    },
    methods: {
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
        // changePage(pageNumber){
        //     this.page = pageNumber;
        // },
        async fetchPosts(){
            try {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
                this.posts = response.data;
            } catch (e) {
                alert('Error ')
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts(){
            try {
                this.page +=1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch (e) {
                alert('Error ')
            }
        }
    },
    mounted() {
        this.fetchPosts()
        // let options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }
        // let callback = (entries, observer) => {
        //     entries.forEach((entry) => {
        //         if(entry.isIntersecting && this.page < this.totalPages){
        //             this.loadMorePosts()
        //         }
        //     });
        // };

        // let observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer)
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        // selectedSort(newValue){
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue])
        //     })
        // },
        // page() {
        //     this.fetchPosts()
        // }
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