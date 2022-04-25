let books = localStorage.getItem('books');
books = JSON.parse(books) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook = () => {
    const ititle = document.getElementById('addTitle').value;
    const iauthor = document.getElementById('addAuthor').value;
    books.push({ title: ititle, author: iauthor });
    localStorage.setItem('books', JSON.stringify(books));
    this.renderBooks();
  }

  static removeBook = (e) => {
    const button = e.target;
    const bookIndex = button.id.split('_')[1];
    books = books.filter((book, index) => index != bookIndex);
    localStorage.setItem('books', JSON.stringify(books));
    this.renderBooks();
    return books;
  }

  static getLocalStorage = () => JSON.parse(localStorage.getItem('books'))

  static renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = this.markupAllBooks();
    Book.addEventListeners();
  }

  static markupAllBooks() {
    let allBooksHTML = '';
    JSON.parse(localStorage.getItem('books')).forEach((book, index) => {
      allBooksHTML += `<div class="book" id="${book.title}">
                        <p class="title">Title: ${book.title}</p>
                        <p class="author">By: ${book.author} </p>
                        <button type="button" id="r_${index}">Remove</button>
                        <hr>
                      </div>`;
    });
    return allBooksHTML;
  }

  static addEventListeners = () => {
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', this.addBook);
    
    const removeButtons = Array.from(document.querySelectorAll('.book button'));
    removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook);
    });
  }
}

Book.renderBooks();