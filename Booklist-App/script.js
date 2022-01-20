const container = document.querySelector(".container");
const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");
const titleEl = document.querySelector("#title");
const authorEl = document.querySelector("#author");
const isbnEl = document.querySelector("#isbn");

//BOOK CLASS: It represent a Book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    };
};

//UI CLASS: It handles UI part
class UI{
    static displayBooks(){
        /*const StoredBook = [
            {title:"Book1",author:"author1",isbn:"1234"},
            {title:"Book2",author:"author2",isbn:"5678"},
        ];*/
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        bookList.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            // console.log(el.parentElement.parentElement);
            el.parentElement.parentElement.remove();
        }
    }

    static showAlerts(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        container.insertBefore(div, bookForm);

        //vanish in 3 sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        titleEl.value = '';
        authorEl.value = '';
        isbnEl.value = '';
    }
};

//HANDLE STORAGE / LOCAL STORAGE
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

//DISPLAY BOOK
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//ADD BOOK
bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); //Prevent actual Submit

    const title = titleEl.value;
    const author = authorEl.value;
    const isbn = isbnEl.value;
    console.log(title,author,isbn);

    //Alert Message
    if(title === '' || author === '' || isbn === ''){
        UI.showAlerts("Please fill the fields","danger")
    }else{
        //Instantiate Book class
        const book = new Book(title, author, isbn);

        //Success Message
        UI.showAlerts("Book Added","success");

        //Add book to UI
        UI.addBookToList(book);

        //Add book to local storage
        Store.addBooks(book);
        
        //Clear Input field
        UI.clearFields();       
    }
});

//DELETE BOOK
bookList.addEventListener('click', (e) => {
    console.log(e.target);
    UI.deleteBook(e.target);

    //Remove Book in local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    // Store.removeBook(e.target)
    if(e.target.classList.contains('delete')){
        UI.showAlerts("Book Removed", "success");
    }   
});