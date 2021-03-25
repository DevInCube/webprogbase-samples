const BookRepository = {
    // fake "server" books
    books: [
        { id: 1, title: "A book #1", authors: "King" },
        { id: 2, title: "Another book", authors: "King, Queen" },
        { id: 3, title: "Another book 2", authors: "Queen" },
    ],

    get nextId() {
        const ids = this.books.map(x => x.id);
        return ids.length !== 0
            ? ids.sort().reverse()[0] + 1
            : 1;
    },

    async getAll() {
        // return a copy
        return this.books.slice();
    },  // list (book)

    async insert(book) {
        book.id = this.nextId;
        this.books.push(book);
        return book;
    },  // object (book)

    async delete(bookId) {
        const index = this.books.findIndex(x => x.id === bookId);
        if (index < 0) { return Promise.resolve(false); }
        this.books.splice(index, 1);
        return true;
    },  // bool
};