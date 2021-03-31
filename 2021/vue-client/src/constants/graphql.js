import gql from 'graphql-tag'

export const CREATE_POST = gql`mutation createPost($comment: String!) {
    createPost(author: "me", comment: $comment) {
      id
      author
      comment
    }
  }`;

export const POST_FEED = gql`subscription PostFeed {
    postCreated {
      id
      author
      comment
    }
  }`;