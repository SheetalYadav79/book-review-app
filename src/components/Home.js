import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';

function Home() {

  return (
    <div className='home'>
      <h1 className='main-heading'>Hello!</h1>
      <h1 className='main-heading'>Readers</h1>

      <p className='description'>
        Welcome to our book review page! Here, you can share your thoughts and opinions on the latest books you've read. Whether it's fiction, non-fiction, or anything in between, we'd love to hear your review.
      </p>

      <button className='review-button'>
        <Link className='review-button-link' to="add-review">Write a review</Link>
      </button>
      
      <Reviews/>
    </div>
  );
}

export default Home;
