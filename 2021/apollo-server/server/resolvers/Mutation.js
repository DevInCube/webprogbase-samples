async function post(parent, args, context, info) {
    const userId = 13;

    const newLink = {
        id: (Math.random() * 1000) | 0,
        url: args.url,
        description: args.description,
        postedBy: { id: userId, username: "Test user" },
    };
    context.pubsub.publish("NEW_LINK", newLink);

    return newLink;
}

module.exports = {
    post,
}