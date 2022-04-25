const books = [];
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook = (title, author) => {
    console.log('called')
    console.log(books)
    books.push({ title, author });
    console.log(books);
  }

  removeBook = () => {

  }

  static addEventListeners = () => {
    const addButton = document.getElementById('addButton');
    const addTitle = document.getElementById('addTitle').value;
    const addAuthor = document.getElementById('addAuthor').value;
    addButton.addEventListener('click', () => { Book.addBook(addTitle, addAuthor) })
  }

}

Book.addEventListeners();