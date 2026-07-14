// src/hooks/useGoogleRating.js
import { useState, useEffect } from 'react';

const DEFAULT_RATING = {
  ratingValue: 5.0,
  reviewCount: 135,
  loading: false
};

const CACHE_KEY = 'astirmind_google_rating';
const CACHE_REVIEWS_KEY = 'astirmind_google_reviews';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const GOOGLE_PLACE_ID = 'ChIJqdR6UIaDGjkR2iiyvu19dHs';
const GOOGLE_API_KEY = 'AIzaSyCB9glwEPd0J6l3c9dJc5O5cMdDCRnhi3E';

export function useGoogleRating() {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    async function fetchRating() {
      try {
        // Check cache first
        const cachedRating = localStorage.getItem(CACHE_KEY);
        const cachedReviews = localStorage.getItem(CACHE_REVIEWS_KEY);
        
        if (cachedRating && cachedReviews) {
          const { data: ratingData, timestamp: ratingTimestamp } = JSON.parse(cachedRating);
          const { data: reviewsData, timestamp: reviewsTimestamp } = JSON.parse(cachedReviews);
          
          if (Date.now() - ratingTimestamp < CACHE_DURATION && Date.now() - reviewsTimestamp < CACHE_DURATION) {
            setRating(ratingData);
            setReviews(reviewsData);
            setLoading(false);
            return;
          }
        }

        const url = `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`;
        
        const response = await fetch(url, {
          headers: {
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews(reviews.authorAttribution.photoUri)'
          }
        });

        if (!response.ok) {
          console.error('API Error:', response.status, response.statusText);
          setRating(DEFAULT_RATING);
          setReviews(getDefaultReviews());
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (data && data.rating !== undefined) {
          console.log('✅ Successfully fetched reviews!');
          
          const newRating = {
            ratingValue: data.rating || DEFAULT_RATING.ratingValue,
            reviewCount: data.userRatingCount || DEFAULT_RATING.reviewCount
          };
          
          // Process reviews with better photo handling
          const newReviews = data.reviews ? data.reviews.map(review => {
            // Try multiple ways to get the photo URL
            let photoUrl = null;
            
            // Check different possible field names
            if (review.authorAttribution) {
              photoUrl = review.authorAttribution.photoUri || 
                        review.authorAttribution.photoUrl ||
                        review.authorAttribution.profilePhotoUrl ||
                        review.authorAttribution.photo ||
                        null;
            }
            
            // Also check if photo is at top level
            if (!photoUrl && review.profile_photo_url) {
              photoUrl = review.profile_photo_url;
            }
            
            // Check if there's a photo array
            if (!photoUrl && review.photos && review.photos.length > 0) {
              photoUrl = review.photos[0].uri || 
                        review.photos[0].photoUri ||
                        review.photos[0].url ||
                        null;
            }

            return {
              author_name: review.authorAttribution?.displayName || review.author_name || 'Anonymous',
              rating: review.rating || 5,
              text: review.text?.text || review.text || '',
              time: review.relativePublishTimeDescription || '',
              profile_photo_url: photoUrl,
              language: review.language || 'en'
            };
          }) : getDefaultReviews();
          
          // Cache results
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: newRating,
            timestamp: Date.now()
          }));
          
          localStorage.setItem(CACHE_REVIEWS_KEY, JSON.stringify({
            data: newReviews,
            timestamp: Date.now()
          }));
          
          setRating(newRating);
          setReviews(newReviews);
        } else {
          console.warn('⚠️ No rating data found');
          setRating(DEFAULT_RATING);
          setReviews(getDefaultReviews());
        }
      } catch (err) {
        console.error('❌ Error fetching Google rating:', err);
        setRating(DEFAULT_RATING);
        setReviews(getDefaultReviews());
      } finally {
        setLoading(false);
      }
    }

    fetchRating();
  }, []);

  return { rating, reviews, loading };
}

// Default reviews for fallback
// function getDefaultReviews() {
//   return [
//     {
//       author_name: "Vanshika Malik",
//       rating: 5,
//       text: "I completed my BCA internship at AstirMind Software Solutions and had an excellent experience. It was a highly productive period where I learned a lot about software development, project workflows, and professional work culture.",
//       time: "3 weeks ago",
//       profile_photo_url: null
//     },
//     {
//       author_name: "Ravinder Kaur",
//       rating: 5,
//       text: "My experience at AstirMind Software Solutions as an intern after completing my M.Sc. in Physics has been highly transformative and rewarding. Coming from a non-IT background, I initially had concerns about transitioning into the field of technology.",
//       time: "2 months ago",
//       profile_photo_url: null
//     },
//     {
//       author_name: "Khushi Mittal",
//       rating: 5,
//       text: "I had a great experience completing my 6-month MSc IT internship at AstirMind, where I worked on AI/ML and Full Stack Development. The training was hands-on, industry-focused, and aligned with current tech trends.",
//       time: "3 months ago",
//       profile_photo_url: null
//     },
//     {
//       author_name: "Sukhveer Kaur",
//       rating: 5,
//       text: "Astirmind is an excellent platform for internships, especially for those seeking hands-on experience in Artificial Intelligence and Machine Learning.",
//       time: "3 months ago",
//       profile_photo_url: null
//     },
//     {
//       author_name: "Himanjot Kaur",
//       rating: 5,
//       text: "My 6-month Artificial Intelligence internship at AstirMind was a highly rewarding and career-shaping experience. I worked on real-time AI and machine learning projects.",
//       time: "3 months ago",
//       profile_photo_url: null
//     }
//   ];
// }