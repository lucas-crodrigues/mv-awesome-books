let books = JSON.parse(localStorage.getItem('books')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook = (e) => {
    const ititle = document.getElementById('addTitle').value;
    const iauthor = document.getElementById('addAuthor').value;
    books.push({ title: ititle, author: iauthor });
    localStorage.setItem('books', JSON.stringify(books));
    this.renderBooks();
  }

  static removeBook = (e) => {
    const button = e.target;
    const bookIndex = Number(button.id.split('_')[1]);
    books = books.filter((book, index) => index !== bookIndex);
    localStorage.setItem('books', JSON.stringify(books));
    this.renderBooks();
    return books;
  }

  static getLocalStorage = () => {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    return books;
  }

  static renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = this.markupAllBooks();
    Book.addEventListeners();
  }

  static markupAllBooks() {
    let allBooksHTML = '';
    this.getLocalStorage().forEach((book, index) => {
      allBooksHTML += `<div class="book" id="${book.title}">
                        <p class="title">"${book.title}" by ${book.author} </p>
                        <button type="button" class="shadow" id="r_${index}">Remove</button>
                      </div>`;
    });
    return allBooksHTML;
  }

  static addEventListeners = () => {
    const addForm = document.getElementById('addBook');
    addForm.addEventListener('submit', this.addBook);

    const removeButtons = Array.from(document.querySelectorAll('.book button'));
    removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook);
    });
  }
}

Book.renderBooks();