const fs = require('fs');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
 
const typeDefs = fs.readFileSync('schema.gql').toString();
 
const resolvers = { 
    Query: {
        me: async (_, args, context) => {
            console.log(context);
            if (!context.user) {
                throw new Error("Not authenticated");
            }
            return context.user;
        },
        hello: () => 'Hello world!',
        echo: (_, obj) => {
            console.log(obj);
            return obj.message;
        },
        echoLater: (_, {message, timeout}) => {
            return new Promise(resolve => setTimeout(() => resolve(message), timeout));
        },
        readFile: async (_, {filename}) => {
            const buffer = await fs.promises.readFile(filename);
            return buffer.toString();
        },
        status: () => {
            return {
                os: "ubuntu",
                uptime: (Math.random() * 10000) | 0,
                description: "This is a demo GraphQL server",
            };
        },
        latestPosts: async (_, {page, perPage}) => {
            page = Math.max(page, 1);
            const maxPerPage = 10;
            perPage = Math.min(Math.max(perPage, 1), maxPerPage);

            const allPosts = Array(100).fill(0).map((_, i) => ({ timestamp: new Date().toISOString(), text: 'Post #' + i }));
            return allPosts.slice((page - 1) * perPage, (page) * (perPage));
        },
        getBookByTitle: async (_, {title}) => {
            return {
                title,
                authors: "Random",
            };
        },
        fail: async () => {
            throw new Error("oh no, it failed!");
        }
    },
    Status: {
        modules: async () => {
            return [
                { name: "Core", description: "Core module" },
                { name: "Graphics", description: "Graphics module" },
                { name: "Logger", description: "Log crashes" },
                { name: "GraphQL", description: "API module" },
            ];
        }
    },
    Mutation: {
        createPost: async (_, {post}) => {
            post.id = (Math.random() * 1000) | 0;
            post.timestamp = new Date().toISOString();
            pubsub.publish('postCreated', { postCreated: post});
            return post;
        },
        updatePost: async (_, {postId, post}) => {
            console.log(postId, post);
            post.timestamp = new Date().toISOString();
            return post;
        },
        deletePost: async (_, {postId}) => {
            return {
                id: postId,
                text: "deleted post",
                timestamp: new Date().toISOString(),
            };
        }
    },
    Subscription: {
        postCreated: {
          subscribe: () => pubsub.asyncIterator('commentAdded')
        }
    },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function authRequest(req, res, next)
{
    req.user = {
        username: "Admin",
        role: "ADMIN",
    };
    next();
}
 
const app = express();
app.use('/graphql', 
    authRequest,
    (req, res) => {
        const middleware = graphqlHTTP({
            schema: schema,
            graphiql: true,
            context: { user: req.user },
        });
        middleware(req, res);
    });

const port = 4000;
app.listen(port, () => console.log(`Now browse to localhost:${port}/graphql`));