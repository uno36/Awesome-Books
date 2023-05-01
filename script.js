const Book = {
  create(title, author) {
    return {
      title,
      author,
    };
  },
};

const Store = {
  getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  },

  addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  },

  removeBook(title) {
    const books = Store.getBooks();
    const index = books.findIndex((book) => book.title === title);
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  },
};

const UI = {
  displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  },

  addBookToList(book) {
    const list = document.querySelector('#books');

    const details = document.createElement('div');
    details.innerHTML = `
        <h5>${book.title}</h5>
        <p>${book.author}</p>
        <input type="submit" class="remove" value="remove">
        <hr><br>
      `;

    list.appendChild(details);
  },

  deleteBook(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.remove();
      const title = el.previousElementSibling.previousElementSibling.textContent;
      Store.removeBook(title);
    }
  },

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  },
};

function init() {
  UI.displayBooks();

  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    const book = Book.create(title, author);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.clearFields();
  });

  document.querySelector('#books').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
  });
}

document.addEventListener('DOMContentLoaded', init);