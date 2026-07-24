// src/hooks/useGoogleRating.js
import { useState, useEffect, useCallback } from 'react';
import { API_BASE } from '../config/api';

const DEFAULT_RATING = {
  ratingValue: 5.0,
  reviewCount: 135,
  loading: false
};

const DEFAULT_REVIEWS = [
  {
    author_name: "Vanshika Malik",
    rating: 5,
    text: "I completed my BCA internship at AstirMind Software Solutions and had an excellent experience...",
    time: "3 weeks ago",
    profile_photo_url: null
  },
  // ... add all default reviews here
];

export function useGoogleRating() {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchFromBackend = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/google-reviews/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      
      if (data.rating) {
        setRating({
          ratingValue: data.rating.rating_value || DEFAULT_RATING.ratingValue,
          reviewCount: data.rating.review_count || DEFAULT_RATING.reviewCount,
          loading: false
        });
      }

      if (data.reviews && data.reviews.length > 0) {
        setReviews(data.reviews);
      }

      if (data.last_updated) {
        setLastUpdated(data.last_updated);
      }

      // Cache in localStorage for instant display next time
      localStorage.setItem('astirmind_google_rating_cached', JSON.stringify({
        ...rating,
        _timestamp: Date.now()
      }));
      localStorage.setItem('astirmind_google_reviews_cached', JSON.stringify({
        reviews: data.reviews,
        _timestamp: Date.now()
      }));

    } catch (err) {
      console.error('Error fetching Google rating:', err);
      setError(err.message);
      // Use cached data if available
      const cachedRating = localStorage.getItem('astirmind_google_rating_cached');
      const cachedReviews = localStorage.getItem('astirmind_google_reviews_cached');
      
      if (cachedRating && cachedReviews) {
        try {
          setRating(JSON.parse(cachedRating));
          setReviews(JSON.parse(cachedReviews).reviews || DEFAULT_REVIEWS);
        } catch (e) {
          setRating(DEFAULT_RATING);
          setReviews(DEFAULT_REVIEWS);
        }
      } else {
        setRating(DEFAULT_RATING);
        setReviews(DEFAULT_REVIEWS);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Try localStorage cache first for instant display
    const cachedRating = localStorage.getItem('astirmind_google_rating_cached');
    const cachedReviews = localStorage.getItem('astirmind_google_reviews_cached');
    
    if (cachedRating && cachedReviews) {
      try {
        const parsedRating = JSON.parse(cachedRating);
        const parsedReviews = JSON.parse(cachedReviews);
        
        // Check if cache is less than 1 hour old (for instant display)
        const cacheAge = Date.now() - (parsedRating._timestamp || 0);
        if (cacheAge < 3600000) { // 1 hour
          setRating(parsedRating);
          setReviews(parsedReviews.reviews || DEFAULT_REVIEWS);
          setLoading(false);
          
          // Still fetch from backend in background for fresh data
          fetchFromBackend();
          return;
        }
      } catch (e) {
        // Cache corrupted, ignore
      }
    }

    // No valid cache, fetch from backend
    fetchFromBackend();
  }, [fetchFromBackend]);

  return { 
    rating, 
    reviews, 
    loading, 
    error,
    lastUpdated,
    refresh: fetchFromBackend 
  };
}