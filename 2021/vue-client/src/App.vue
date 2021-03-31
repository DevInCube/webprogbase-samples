<template>
  <div id="app">
    <input v-model="comment" placeholder="Comment...">
    <button @click="createPost">Create post</button>
    <ul>
      <li v-for="post in posts" v-bind:key="post.id">
        {{post.id}} | {{post.author}} - {{post.comment}}
      </li>
    </ul>
  </div>
</template>
 
<script>
import { CREATE_POST, POST_FEED } from './constants/graphql.js'

export default {
  name: 'App',
  data() {
    return {
      comment: 'default comment',
      posts: [
        {id: 1, author: 'auth1', comment: 'desc 1'},
        {id: 2, author: 'auth1', comment: 'desc 22'},
        {id: 3, author: 'auth2', comment: 'desc 333'},
      ]
    };
  },
  components: {
    //HelloWorld
  },
  apollo: {
    // Subscriptions
    $subscribe: {
      postCreated: {
        query: POST_FEED,
        // Result hook
        result ({ data }) {
          const {postCreated} = data;
          console.log('SUB', postCreated);
          this.posts.push(postCreated);
        },
      },
    },
  },

  methods: {
    async createPost() {
      console.log('create post');
      const result = await this.$apollo.mutate({
        mutation: CREATE_POST,
        variables: {
          comment: this.comment,
        },
      });
      console.log(result);
    }
  }
}
</script>
 
<style>
</style>
