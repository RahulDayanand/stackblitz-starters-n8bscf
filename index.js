const express = require('express');
const app = express();
const { getBooks, getBookById } = require('./controllers/index');
app.use(express.json());

//Exercise 1: Retrieve All Books

app.get('/books', (req, res) => {
  let books = getBooks();
  res.json({ books });
});

//Exercise 2: Retrieve Book by ID

app.get('/books/details/:id', (req, res) => {
  let book = getBookById(parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: 'Book not found' });

  res.json({ book });
});

module.exports = {
  app,
};
