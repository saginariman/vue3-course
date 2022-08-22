import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setLimit(state, limit) {
            state.limit = limit
        },
        setTotalPages(state, totalPage) {
            state.totalPage = totalPage;
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery;
        }
    },
    actions: {
        async fetchPosts({state, commit}){
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                console.log(e)
                alert('Error ')
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}){
            try {
                commit('setPage', state.page +=1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e)
                alert('Error ')
            }
        }
    },
    namespaced: true
}