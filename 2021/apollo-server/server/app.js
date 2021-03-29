const fs = require('fs');
const path = require('path');
const { PubSub, ApolloServer } = require('apollo-server');

const pubsub = new PubSub();

const resolvers = {
    Subscription: require('./resolvers/Subscription.js'),
    Mutation: require('./resolvers/Mutation.js'),
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.gql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            pubsub,
            userId: 13,
        };
    }
});

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );