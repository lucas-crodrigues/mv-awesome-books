let books = localStorage.getItem('books')
books = JSON.parse(books) || [];
localStorage.setItem('books', JSON.stringify(books));

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
    const title = button.id.split('_')[1];
    books = books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(books));
    this.renderBooks();
    return books;
  }

  static getLocalStorage = () => {
    return JSON.parse(localStorage.getItem('books'));
  }

  static renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = this.markupAllBooks();
    Book.addEventListeners();
  }

  static markupAllBooks() {
    let allBooksHTML = ``;
    JSON.parse(localStorage.getItem('books')).forEach((book) => {
      allBooksHTML += `<div class="book" id="${book.title}">
                        <p class="title">${book.title}</p>
                        <p class="author">${book.author} </p>
                        <button type="button" id="r_${book.title}">"Remove</button>
                        <hr>
                      </div>`;
    });
    return allBooksHTML;
  }


  static addEventListeners = () => {
    const addButton = document.getElementById('addButton');

    addButton.addEventListener('click', this.addBook);
    let removeButtons = Array.from(document.querySelectorAll('.book button'));
    removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook);
    })
  }
}

Book.renderBooks();