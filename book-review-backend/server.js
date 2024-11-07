const express = require('express');
const pgp = require('pg-promise')();
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'book_review',
  user: 'postgres',
  password: 'Sheetal@0709'
});

// API endpoint to handle review submission
app.post('/reviews', async (req, res) => {
  const { bookTitle, authorName, genre, rating, review } = req.body;

  try {
    await db.none(
      'INSERT INTO reviews (book_title, author_name, genre, rating, review) VALUES ($1, $2, $3, $4, $5)',
      [bookTitle, authorName, genre, rating, review]
    );
    res.status(201).send('Review submitted successfully');
  } catch (error) {
    console.error('Error inserting review:', error);
    res.status(500).send('Error saving review');
  }
});

// API endpoint to fetch reviews with optional filters
app.get('/reviews', async (req, res) => {
  const { searchTerm, author, title } = req.query;

  let query = 'SELECT * FROM reviews WHERE 1=1';
  const queryParams = [];

  if (searchTerm) {
    query += ' AND (book_title ILIKE $1 OR author_name ILIKE $2)';
    queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
  }
  if (author) {
    query += ' AND author_name = $3';
    queryParams.push(author);
  }
  if (title) {
    query += ' AND book_title = $4';
    queryParams.push(title);
  }

  try {
    const reviews = await db.any(query, queryParams);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Error retrieving reviews');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
