const books = [
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
  },
];
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook = (title, author) => {
    books.push({ title, author });
  }

  static removeBook = (title) => {
    books = books.filter((book) => book.title !== title);
    console.log(books)
    return books
  }

  static renderBooks() {
    // let books = 
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = this.markupAllBooks();
  }
  
  static markupAllBooks() {
    let allBooksHTML = ``;
    books.forEach((book, index) => {
      allBooksHTML += `<div class="book" id="${book.title}">
                        <p class="title">${book.title}</p>
                        <p class="author">${book.author} </p>
                        <button type="button" id="r_${book.title}">Remove</button>
                        <hr>
                      </div>`;
    });
    return allBooksHTML;
  }


  static addEventListeners = () => {
    const addButton = document.getElementById('addButton');
    const addTitle = document.getElementById('addTitle');
    const addAuthor = document.getElementById('addAuthor');
    addButton.addEventListener('click', () => { this.addBook(addTitle.value, addAuthor.value) })
  }

}

Book.addEventListeners();
Book.renderBooks();