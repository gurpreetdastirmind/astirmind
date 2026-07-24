import requests
from datetime import datetime
from django.utils import timezone
from .models import GooglePlaceRating, GoogleReview

# Your Google API configuration
GOOGLE_PLACE_ID = 'ChIJqdR6UIaDGjkR2iiyvu19dHs'
GOOGLE_API_KEY = 'AIzaSyCB9glwEPd0J6l3c9dJc5O5cMdDCRnhi3E'

# Default fallback data
DEFAULT_RATING = {
    'rating_value': 5.0,
    'review_count': 135
}

DEFAULT_REVIEWS = [
    {
        "author_name": "Vanshika Malik",
        "rating": 5,
        "text": "I completed my BCA internship at AstirMind Software Solutions and had an excellent experience. It was a highly productive period where I learned a lot about software development, project workflows, and professional work culture.",
        "time": "3 weeks ago",
        "profile_photo_url": None
    },
    {
        "author_name": "Ravinder Kaur",
        "rating": 5,
        "text": "My experience at AstirMind Software Solutions as an intern after completing my M.Sc. in Physics has been highly transformative and rewarding. Coming from a non-IT background, I initially had concerns about transitioning into the field of technology.",
        "time": "2 months ago",
        "profile_photo_url": None
    },
    {
        "author_name": "Khushi Mittal",
        "rating": 5,
        "text": "I had a great experience completing my 6-month MSc IT internship at AstirMind, where I worked on AI/ML and Full Stack Development. The training was hands-on, industry-focused, and aligned with current tech trends.",
        "time": "3 months ago",
        "profile_photo_url": None
    },
    {
        "author_name": "Sukhveer Kaur",
        "rating": 5,
        "text": "Astirmind is an excellent platform for internships, especially for those seeking hands-on experience in Artificial Intelligence and Machine Learning.",
        "time": "3 months ago",
        "profile_photo_url": None
    },
    {
        "author_name": "Himanjot Kaur",
        "rating": 5,
        "text": "My 6-month Artificial Intelligence internship at AstirMind was a highly rewarding and career-shaping experience. I worked on real-time AI and machine learning projects.",
        "time": "3 months ago",
        "profile_photo_url": None
    }
]


def fetch_google_place_data():
    """Fetch data from Google Places API - only rating and count"""
    url = f'https://places.googleapis.com/v1/places/{GOOGLE_PLACE_ID}'
    
    try:
        response = requests.get(url, headers={
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'rating,userRatingCount'
        }, timeout=10)
        
        if response.status_code != 200:
            print(f"Google API Error: {response.status_code}")
            print(f"Response: {response.text[:200]}")
            return None, None
        
        data = response.json()
        print(f"API Response keys: {list(data.keys())}")
        
        if 'rating' not in data:
            print("No rating data in response")
            return None, None
        
        # Extract rating data
        rating_data = {
            'rating_value': data.get('rating', DEFAULT_RATING['rating_value']),
            'review_count': data.get('userRatingCount', DEFAULT_RATING['review_count'])
        }
        
        print(f"✅ Rating: {rating_data['rating_value']} ({rating_data['review_count']} reviews)")
        print("ℹ️ Using default reviews (Google API doesn't return individual reviews)")
        
        # Use default reviews
        reviews_data = DEFAULT_REVIEWS.copy()
        
        return rating_data, reviews_data
        
    except Exception as e:
        print(f"Error fetching Google data: {e}")
        import traceback
        traceback.print_exc()
        return None, None


def save_google_data(rating_data, reviews_data):
    """Save fetched data to database"""
    if rating_data is None:
        return False
    
    place_rating, created = GooglePlaceRating.objects.get_or_create(
        place_id=GOOGLE_PLACE_ID,
        defaults={
            'rating_value': rating_data.get('rating_value', DEFAULT_RATING['rating_value']),
            'review_count': rating_data.get('review_count', DEFAULT_RATING['review_count'])
        }
    )
    
    if not created:
        place_rating.rating_value = rating_data.get('rating_value', place_rating.rating_value)
        place_rating.review_count = rating_data.get('review_count', place_rating.review_count)
        place_rating.save()
    
    # Delete old reviews
    place_rating.reviews.all().delete()
    
    # Add new reviews
    if reviews_data:
        for review_data in reviews_data:
            GoogleReview.objects.create(
                place_rating=place_rating,
                author_name=review_data.get('author_name', 'Anonymous'),
                rating=review_data.get('rating', 5),
                text=review_data.get('text', ''),
                time=review_data.get('time', ''),
                profile_photo_url=review_data.get('profile_photo_url'),
                language=review_data.get('language', 'en')
            )
    else:
        for review_data in DEFAULT_REVIEWS:
            GoogleReview.objects.create(
                place_rating=place_rating,
                **review_data
            )
    
    return True


def update_google_reviews():
    """Main function to update reviews - called by cron job"""
    print(f"[{datetime.now()}] Starting Google Reviews update...")
    
    rating_data, reviews_data = fetch_google_place_data()
    
    if rating_data:
        save_google_data(rating_data, reviews_data)
        print(f"[{datetime.now()}] Google Reviews updated successfully!")
        return True
    else:
        print(f"[{datetime.now()}] Failed to fetch Google data, using existing data")
        return False


def get_google_reviews():
    """Get reviews from database"""
    try:
        place_rating = GooglePlaceRating.objects.get(place_id=GOOGLE_PLACE_ID)
        reviews = place_rating.reviews.all()
        
        rating_data = {
            'rating_value': place_rating.rating_value,
            'review_count': place_rating.review_count
        }
        
        reviews_data = [
            {
                'author_name': review.author_name,
                'rating': review.rating,
                'text': review.text,
                'time': review.time,
                'profile_photo_url': review.profile_photo_url,
                'language': review.language
            }
            for review in reviews
        ]
        
        return rating_data, reviews_data
        
    except GooglePlaceRating.DoesNotExist:
        place_rating = GooglePlaceRating.objects.create(
            place_id=GOOGLE_PLACE_ID,
            rating_value=DEFAULT_RATING['rating_value'],
            review_count=DEFAULT_RATING['review_count']
        )
        for review_data in DEFAULT_REVIEWS:
            GoogleReview.objects.create(place_rating=place_rating, **review_data)
        
        return DEFAULT_RATING, DEFAULT_REVIEWS