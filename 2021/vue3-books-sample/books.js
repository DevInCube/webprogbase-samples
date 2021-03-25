const app = new Vue({
    el: '#books-app',
    
    mounted: function() {
         this.fetchBooks();
    },

    data: {
        books: [],
        titleFilter: ""
    },
    computed: {
        filteredBooks: function () {
            const filterString = this.titleFilter.toLowerCase().trim();
            return !filterString 
                ? this.books
                : this.books
                      .filter(x => x.title.toLowerCase().includes(filterString));
        }
    },
    watch: {
        titleFilter: function(val) { console.log(val); }
    },

    methods: {
        fetchBooks: async function() {
            try 
            {
                const books = await BookRepository.getAll();
                this.books = books;
            }
            catch (err)
            {
                console.log("Can't fetch books from server");
            }
        },
        clearFilter: function() {
            this.titleFilter = "";
        },
        createBook: async function(event) {
            event.preventDefault();
            const newBookTitle = event.target.newBookTitle.value;
            const newBookAuthors = event.target.newBookAuthors.value;
            try 
            {
                const newBook = {
                    title: newBookTitle,
                    authors: newBookAuthors,
                }
                const book = await BookRepository.insert(newBook);
                this.books.push(book);
            }
            catch (err)
            {
                console.log("Can't create book on server");
            }
        },
        removeBook: async function(event) {
            const bookId = parseInt(event.target.attributes.book_id.value);
            try 
            {
                await BookRepository.delete(bookId);
                this.books.splice(this.books.findIndex(x => x.id === bookId), 1);
            }
            catch (err)
            {
                console.log("Can't remove book on server");
            }
        }
    }
 });