const fs = require('fs');
const { PubSub, ApolloServer } = require('apollo-server');

const pubsub = new PubSub();

const resolvers = {
    Query: {
        posts() {
            return [
                {id: 1, author: 'auth1', comment: 'desc 1'},
                {id: 2, author: 'auth1', comment: 'desc 22'},
                {id: 3, author: 'auth2', comment: 'desc 333'},
            ];
        },
    },
    Mutation: {
        createPost(parent, {author, comment}, context) {
            const newPost = {
                id: (Math.random() * 10000) | 0,
                author,
                comment,
            }; 
            pubsub.publish('POST_CREATED', { postCreated: newPost });
            return newPost;
        }
    },
    Subscription: {
      postCreated: {
        // More on pubsub below
        subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
      },
    },
    // ...other resolvers...
  };

const server = new ApolloServer({
    cors: true,
    typeDefs: fs.readFileSync('./schema.gql').toString(),
    resolvers,
    subscriptions: {
        onConnect: (connectionParams, webSocket, context) => {
            console.log('Connected!')
        },
        onDisconnect: (webSocket, context) => {
            console.log('Disconnected!')
        },
        // ...other options...
    },
    // ...other options...
});

server
    .listen()
    .then(({ url, subscriptionsUrl }) => {
        console.log(`🚀 Server ready at ${url}`);
        console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
    });