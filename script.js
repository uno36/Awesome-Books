/* eslint-disable max-classes-per-file */
document.getElementById('date').innerHTML = Date();
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();
    const index = books.findIndex((book) => book.title === title);
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#books');
    const details = document.createElement('div');
    details.style.backgroundColor = 'rgba(125, 125, 125, 0.3)';
    details.innerHTML = `
        <h5>"${book.title}" by <span>${book.author}</span></h5>
        <input type="submit" class="remove" value="Remove">        
      `;
    list.appendChild(details);
    const numBooks = list.children.length;
    if (numBooks % 2 === 0) {
      details.style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }

  static deleteBook(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.remove();
      const title = el.previousElementSibling.previousElementSibling.textContent;
      Store.removeBook(title);
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);
  UI.addBookToList(book);
  Store.addBook(book);
  UI.clearFields();
});

document.querySelector('#books').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});


const list = document.querySelector('#list');
const addNew = document.querySelector('.nav-item2');
const contact = document.querySelector('#contact');
const books = document.querySelector('#books');
const form = document.querySelector('#form');
const awesome = document.querySelector('.awesome');
const hr = document.querySelector('.book-new');
const contactSection = document.querySelector('.contact');

form.classList.add('hidden');
contactSection.classList.add('hidden');
list.style.textDecoration = ('underline');
hr.classList.add('hidden')

list.addEventListener('click', () => {
  list.style.textDecoration = ('underline');
  addNew.style.textDecoration = ('none');
  contact.style.textDecoration = ('none');
  form.classList.add('hidden');
  books.classList.remove('hidden');
  contactSection.classList.add('hidden');
  awesome.classList.remove('hidden');
});

addNew.addEventListener('click', () => {
  addNew.style.textDecoration = ('underline');
  list.style.textDecoration = ('none');
  contact.style.textDecoration = ('none');
  form.classList.remove('hidden');
  books.classList.add('hidden');
  contactSection.classList.add('hidden');
  awesome.classList.add('hidden');
  hr.classList.add('hidden');
});

contact.addEventListener('click', () => {
  addNew.style.textDecoration = ('none');
  list.style.textDecoration = ('none');
  contact.style.textDecoration = ('underline');
  form.classList.add('hidden');
  books.classList.add('hidden');
  awesome.classList.add('hidden');
  contactSection.classList.remove('hidden');
});