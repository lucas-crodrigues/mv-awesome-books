let books = JSON.parse(localStorage.getItem('books')) || [];

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
    const booksList = document.getElementById('booksList');
    booksContainer.innerHTML = this.markupAllBooks();
    if (booksContainer.innerHTML === '') {
      booksList.style.display = 'none';
    } else {
      booksList.style.display = 'initial';
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

  static addEventListeners = () => {
    const addForm = document.getElementById('addBook');
    addForm.addEventListener('submit', this.addBook);

    const removeButtons = Array.from(document.querySelectorAll('.book button'));
    removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook);
    });
  }

  static clearBooks = () => {
    window.localStorage.setItem('books', JSON.stringify([]));
    window.location.reload(); //Or invoke renderBooks()
  };
}

/*
const addBook = document.getElementById('addBook');
const booksList = document.getElementById('booksList');
const contactInfo = document.getElementById('contactInfo');
addBook.addEventListener('click', (e) => switchView(e));
booksList.addEventListener('click', (e) => switchView(e));
navContact.addEventListener('click', (e) => switchView(e));
const switchView = (e) => {
  switch (e.target.id) {
    case 'booksList':
      booksList.style.display = 'block';
      contactInfo.style.display = 'none';
      addBook.style.display = 'none';
      break;
    case 'contactInfo':
      booksList.style.display = 'none';
      contactInfo.style.display = 'block';
      addBook.style.display = 'none';
      break;
    case 'addBook':
      booksMainCont.style.display = 'none';
      contactInfo.style.display = 'none';
      addBook.style.display = 'flex';
      break;
    default:
      break;
  }
};

const addDate = () => {
  const dateDiv = document.getElementById('date');
  const date = DateTime.now().setLocale('en-US').toFormat('DD HH:mm');
  dateDiv.textContent = date;
};
*/

Book.renderBooks();