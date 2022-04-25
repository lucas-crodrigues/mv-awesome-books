let books = [
  {
    title: 'Title1',
    author: 'author1'
  },
  {
    title: 'Title2',
    author: 'author2'
  },
  {
    title: 'Title3',
    author: 'author3'
  }
];
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook = () => {
    const ititle = document.getElementById('addTitle').value;
    const iauthor = document.getElementById('addAuthor').value;
    books.push({ title: ititle, author: iauthor });
    this.renderBooks();
  }

  static removeBook = (e) => {
    const button = e.target;
    const title = button.id.split('_')[1];
    books = books.filter((book) => book.title !== title);
    this.renderBooks();
    return books;
  }

  static renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = this.markupAllBooks();
    Book.addEventListeners();
  }

  static markupAllBooks() {
    let allBooksHTML = ``;
    books.forEach((book) => {
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

    addButton.addEventListener('click', this.addBook );
    let removeButtons = Array.from(document.querySelectorAll('.book button'));
    removeButtons.forEach((button) => {
      button.addEventListener('click', this.removeBook);
    })
  }

}

Book.renderBooks();