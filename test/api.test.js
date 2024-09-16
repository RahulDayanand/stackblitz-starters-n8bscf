const { getBooks, getBookById } = require('../controllers/index');
const { app } = require('../index');
const http = require('http');
const request = require('supertest');
let server;

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getBooks: jest.fn(),
}));

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe('Controllers Testing Time', () => {
  it('Exercise 5: Mock the Get All Books Function', () => {
    let mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];

    getBooks.mockReturnValue(mockBooks);
    let books = getBooks();
    expect(books).toEqual(mockBooks);
    expect(books.length).toBe(3);
  });
});

describe('API Endpoints Testing Time', () => {
  it('Exercise 3: Test Retrieve All Books', async () => {
    let books = await request(server).get('/books');
    expect(books.status).toEqual(200);
    expect(books.body).toEqual({
      books: [
        {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
        },
        {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
        },
        {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
        },
      ],
    });
  });
  it('Exercise 4: Test Retrieve Book by ID', async () => {
    let book = await request(server).get('/books/details/1');
    expect(book.status).toEqual(200);
    expect(book.body).toEqual({
      book: {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    });
  });
});
