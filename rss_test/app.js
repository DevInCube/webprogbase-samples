let RSS = require('rss');

let feed = new RSS({
    title: 'Popular posts',
    description: 'The most popular posts',
    feed_url: 'http://example.com/rss.xml',
    site_url: 'http://example.com',
    image_url: 'http://example.com/icon.png',
    language: 'en',
    categories: ['Post', 'Popular'],
    pubDate: 'May 20, 2012 04:00:00 GMT',
});

let popularPosts = [
    {
        title:  'Bla-bla',
        description: 'use this for the content. It can include <b>html</b>.',
        url: 'http://example.com/posts/1', 
    },
    {
        title:  'post #2',
        description: 'use this for the content. It can include html.',
        url: 'http://example.com/posts/2', 
    }
];

for (let post of popularPosts) {
    feed.item(post);
}

// cache the xml to send to clients 
let xml = feed.xml();

console.log(xml);