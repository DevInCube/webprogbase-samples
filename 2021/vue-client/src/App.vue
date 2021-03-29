<template>
  <div id="app">
    <button @click="createPost">Create post</button>
    <ul>
      <li v-for="post in posts" v-bind:key="post.id">
        {{post.id}} | {{post.author}} - {{post.comment}}
      </li>
    </ul>
  </div>
</template>
 
<script>
//import HelloWorld from './components/HelloWorld.vue'
import gql from 'graphql-tag'
 
export default {
  name: 'App',
  data() {
    return {
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
        query: gql`subscription PostFeed {
          postCreated {
            id
            author
            comment
          }
        }`,
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
        mutation: gql`mutation {
          createPost(author: "me", comment: "this is a post") {
            id
            author
            comment
          }
        }`,
      });
      console.log(result);
    }
  }
}
</script>
 
<style>
</style>
