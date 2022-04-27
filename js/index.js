let books = JSON.parse(localStorage.getItem('books')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook = (e) => {
    e.preventDefault();
    const ititle = document.getElementById('addTitle').value;
    const iauthor = document.getElementById('addAuthor').value;
    books.push({ title: ititle, author: iauthor });
    localStorage.setItem('books', JSON.stringify(books));
    document.querySelectorAll('form input').forEach((element) => {
      element.value = '';
    });
    document.getElementById('message').innerHTML = '';
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
    this.addDate();
    const booksContainer = document.getElementById('books-container');
    const booksList = document.getElementById('booksList');
    const addBook = document.getElementById('addBook');
    booksContainer.innerHTML = this.markupAllBooks();
    if (booksContainer.innerHTML === '') {
      booksList.classList.toggle('hide');
      document.getElementById('message').innerHTML = 'Sorry, there are no registered books. Add a book below:';
      addBook.classList.toggle('hide');
    } else {
      document.getElementById('message').innerHTML = '';
    }
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

  static switchView = (e) => {
    switch (e.target.id) {
      case 'navList':
        booksList.classList.remove('hide');
        contactInfo.classList.add('hide');
        addBook.classList.add('hide');
        this.renderBooks();
        break;
      case 'navContact':
        booksList.classList.add('hide');
        contactInfo.classList.remove('hide');
        addBook.classList.add('hide');
        break;
      case 'navAdd':
        booksList.classList.add('hide');
        contactInfo.classList.add('hide');
        addBook.classList.remove('hide');
        break;
      default:
        break;
    }
  };

  static addEventListeners = () => {
    const addForm = document.getElementById('addBook');
    addForm.addEventListener('submit', this.addBook);

    const removeButtons = Array.from(document.querySelectorAll('.book button'));
    removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook);
    });

    const addBook = document.getElementById('navAdd');
    const booksList = document.getElementById('navList');
    const contactInfo = document.getElementById('navContact');
    addBook.addEventListener('click', (e) => this.switchView(e));
    booksList.addEventListener('click', (e) => this.switchView(e));
    contactInfo.addEventListener('click', (e) => this.switchView(e));
  }

  static clearBooks = () => {
    window.localStorage.setItem('books', JSON.stringify([]));
    window.location.reload();
  };

  static addDate = () => {
    const dateDiv = document.getElementById('date');
    const date = Date().split(' ').splice(0, 5).join(' ');;
    dateDiv.textContent = date;
  };
}




/*
const 
*/

Book.renderBooks();