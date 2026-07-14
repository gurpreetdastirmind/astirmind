// src/components/GoogleReviews.jsx
import { Star, User, Calendar } from 'lucide-react';
import { useGoogleRating } from '../hooks/useGoogleRating';

function StarRating({ rating, total = 5 }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[...Array(total)].map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    strokeWidth={1.5}
                    fill={i < fullStars ? 'var(--accent)' : (i === fullStars && hasHalfStar ? 'var(--accent)' : 'none')}
                    style={{
                        color: i < fullStars || (i === fullStars && hasHalfStar) ? 'var(--accent)' : 'var(--line)',
                        opacity: i < fullStars || (i === fullStars && hasHalfStar) ? 1 : 0.3
                    }}
                />
            ))}
        </div>
    );
}

// Helper function to get initials from name
function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

export default function GoogleReviews() {
    const { rating, reviews, loading } = useGoogleRating();

    if (loading) {
        return (
            <div style={{ marginTop: '2rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem'
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        border: '3px solid var(--line)',
                        borderTop: '3px solid var(--accent)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                </div>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            {/* Google Rating Summary - Same as Google Search */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.5rem 2rem',
                border: '1px solid var(--line)',
                background: 'var(--bg-alt)',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'var(--text)'
                    }}>
                        {rating.ratingValue.toFixed(1)}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <StarRating rating={rating.ratingValue} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-3)'
                    }}>
                        {rating.reviewCount} Google reviews
                    </span>
                </div>
            </div>

            {/* Individual Reviews */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
                gap: '1px',
                border: '1px solid var(--line)',
                background: 'var(--line)',
            }}>
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        style={{
                            background: 'var(--bg-card)',
                            padding: '1.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            transition: 'background 0.2s, transform 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--bg-elevated)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--bg-card)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {/* Profile Photo or Fallback with Initials */}
                            {review.profile_photo_url ? (
                                <img
                                    src={review.profile_photo_url}
                                    alt={review.author_name}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'var(--accent)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--line)',
                                    color: 'var(--bg)',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    fontFamily: 'var(--font-sans)'
                                }}>
                                    {getInitials(review.author_name)}
                                </div>
                            )}
                            <div>
                                <h4 style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    margin: 0,
                                    color: 'var(--text)'
                                }}>
                                    {review.author_name}
                                </h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <StarRating rating={review.rating} />
                                    {review.time && (
                                        <span style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.5625rem',
                                            color: 'var(--text-3)'
                                        }}>
                                            {review.time}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.875rem',
                            lineHeight: 1.7,
                            color: 'var(--text-2)',
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {review.text}
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '0.25rem',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid var(--line)'
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.5625rem',
                                color: 'var(--text-3)'
                            }}>
                                ⭐ Posted on Google
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add CSS animation for loading spinner */}
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}