import React, { useState, useEffect } from 'react';
import './Reviews.css';

const truncateDescription = (description) => {
  const words = description.split(' ');
  return words.length > 50 ? words.slice(0, 50).join(' ') + '...' : description;
};

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  // Fetch reviews from the server with filters
  const fetchReviews = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);
      if (selectedAuthor) params.append('author', selectedAuthor);
      if (selectedTitle) params.append('title', selectedTitle);

      const response = await fetch(`http://localhost:5000/reviews?${params.toString()}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Fetch reviews when search term, author, or title changes
  useEffect(() => {
    fetchReviews();
  }, [searchTerm, selectedAuthor, selectedTitle]);

  // // Get unique authors and titles for dropdowns (from the fetched reviews)
  // const authors = [...new Set(reviews.map((review) => review.author_name))];
  // const titles = [...new Set(reviews.map((review) => review.book_title))];

  return (
    <div className="review-main">
      <h1>Book Reviews</h1>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={fetchReviews} className="search-button">Search</button>
      </div>

      {/* Display Filtered Reviews */}
      <div className="review-container">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="book-review-card">
              <h2 className="book-title">{review.book_title}</h2>
              <p className="book-author">by {review.author_name}</p>
              <p className="rating">{"★".repeat(review.rating)}</p>
              <p className="book-description">{truncateDescription(review.review)}</p>
            </div>
          ))
        ) : (
          <p>No reviews found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
