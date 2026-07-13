// src/hooks/useGoogleRating.js
import { useState, useEffect } from 'react';

const DEFAULT_RATING = {
  ratingValue: 5.0,
  reviewCount: 135,
  loading: false
};

// Cache key for localStorage
const CACHE_KEY = 'astirmind_google_rating';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function useGoogleRating() {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip if running on server
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    async function fetchRating() {
      try {
        // Try to get from cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          // Use cache if less than 24 hours old
          if (Date.now() - timestamp < CACHE_DURATION) {
            setRating(data);
            setLoading(false);
            return;
          }
        }

        // Your Google Place ID - Get from Google Places API
        const placeId = process.env.REACT_APP_GOOGLE_PLACE_ID || 'ChIJi-6wYZbtDzkRkMFZzJZ7PBI';
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY || 'AIzaSyCB9glwEPd0J6l3c9dJc5O5cMdDCRnhi3E';

        if (!apiKey) {
          console.warn('Google API key not found, using default rating');
          setRating(DEFAULT_RATING);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.result) {
          const newRating = {
            ratingValue: data.result.rating || DEFAULT_RATING.ratingValue,
            reviewCount: data.result.user_ratings_total || DEFAULT_RATING.reviewCount
          };
          
          // Cache the result
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: newRating,
            timestamp: Date.now()
          }));
          
          setRating(newRating);
        } else {
          setRating(DEFAULT_RATING);
        }
      } catch (err) {
        console.error('Error fetching Google rating:', err);
        setRating(DEFAULT_RATING);
      } finally {
        setLoading(false);
      }
    }

    fetchRating();
  }, []);

  return { rating, loading };
}