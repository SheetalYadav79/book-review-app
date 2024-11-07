import React, { useState } from 'react';
import './ReviewPage.css';

function ReviewPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [review, setReview] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewData = {
      bookTitle,
      authorName,
      genre: selectedGenre,
      rating: selectedRating,
      review,
    };

    try {
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        // Reset the form or handle the response as needed
        setBookTitle('');
        setAuthorName('');
        setSelectedGenre('');
        setSelectedRating(0);
        setReview('');
      } else {
        alert('Failed to submit review.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting your review.');
    }
  };

  return (
    <div className='add-review-main'>
      <form className='review-form' onSubmit={handleSubmit}>
        <h2 className='form-heading'>Submit Your Review</h2>

        <label>
          Book Title:
          <input
            type='text'
            name='bookTitle'
            placeholder='Enter the book title'
            required
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </label>

        <label>
          Author Name:
          <input
            type='text'
            name='authorName'
            placeholder='Enter Author name'
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </label>

        <label className='select-genre'>Select Genre:
          <br />
          <input
            type="radio"
            id="fiction"
            name="genre"
            value="fiction"
            checked={selectedGenre === "fiction"}
            onChange={handleGenreChange}
          />
          <label htmlFor="fiction">Fiction</label>
          <br />

          <input
            type="radio"
            id="nonfiction"
            name="genre"
            value="nonfiction"
            checked={selectedGenre === "nonfiction"}
            onChange={handleGenreChange}
          />
          <label htmlFor="nonfiction">Non-Fiction</label>
          <br />

          <input
            type="radio"
            id="others"
            name="genre"
            value="others"
            checked={selectedGenre === "others"}
            onChange={handleGenreChange}
          />
          <label htmlFor="others">Others</label>
          <br />
        </label>

        <br />

        <label className='rating-section'>
          Rating:
          <div className='rating-options'>
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating}>
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={selectedRating === rating}
                  onChange={handleRatingChange}
                />
                {rating} ★
              </label>
            ))}
          </div>
        </label>

        <br />

        <label>
          Your Review:
          <textarea
            name='review'
            placeholder='Write your review here'
            required
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </label>

        <button type='submit' className='submit-button'>
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewPage;
