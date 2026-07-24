// src/components/GoogleReviews.jsx
import { Star, User, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
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
    const { rating, reviews, loading, error } = useGoogleRating();

    // Loading state
    if (loading) {
        return (
            <div style={{ marginTop: '2rem' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3rem 2rem',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        border: '3px solid var(--line)',
                        borderTop: '3px solid var(--accent)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-3)'
                    }}>
                        Loading Google reviews...
                    </span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div style={{ marginTop: '2rem' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '3rem 2rem',
                    gap: '1rem',
                    border: '1px solid var(--line)',
                    background: 'var(--bg-alt)',
                    borderRadius: '8px'
                }}>
                    <AlertCircle size={32} color="var(--text-3)" />
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: 'var(--text-2)',
                        textAlign: 'center'
                    }}>
                        Unable to load Google reviews at the moment.
                    </span>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1.5rem',
                            background: 'var(--accent)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        <RefreshCw size={14} /> Retry
                    </button>
                </div>
            </div>
        );
    }

    // No reviews
    if (!reviews || reviews.length === 0) {
        return (
            <div style={{ marginTop: '2rem' }}>
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1px solid var(--line)',
                    background: 'var(--bg-alt)',
                    borderRadius: '8px'
                }}>
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        color: 'var(--text-2)'
                    }}>
                        No reviews available yet.
                    </span>
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
                flexWrap: 'wrap',
                borderRadius: '8px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'var(--text)',
                        lineHeight: 1
                    }}>
                        {rating.ratingValue.toFixed(1)}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        <StarRating rating={rating.ratingValue} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-3)',
                        marginTop: '0.25rem'
                    }}>
                        {rating.reviewCount.toLocaleString()} Google reviews
                    </span>
                </div>

                {/* Optional: Add a "Write a review" button */}
                <div style={{ marginLeft: 'auto' }}>
                    <a
                        href="https://g.page/r/ChIJqdR6UIaDGjkR2iiyvu19dHs/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.625rem',
                            color: 'var(--accent)',
                            textDecoration: 'none',
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--accent)',
                            borderRadius: '4px',
                            transition: 'background 0.2s, color 0.2s',
                            display: 'inline-block'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--accent)';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--accent)';
                        }}
                    >
                        ⭐ Write a review
                    </a>
                </div>
            </div>

            {/* Individual Reviews */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
                gap: '1px',
                border: '1px solid var(--line)',
                background: 'var(--line)',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                {reviews.slice(0, 6).map((review, index) => (
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
                                        objectFit: 'cover',
                                        border: '1px solid var(--line)'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        // Show fallback after image fails
                                        const parent = e.target.parentElement;
                                        const fallback = document.createElement('div');
                                        fallback.style.cssText = `
                                            width: 40px;
                                            height: 40px;
                                            border-radius: 50%;
                                            background: var(--accent);
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            border: 1px solid var(--line);
                                            color: var(--bg);
                                            font-weight: 600;
                                            font-size: 0.875rem;
                                            font-family: var(--font-sans);
                                        `;
                                        fallback.textContent = getInitials(review.author_name);
                                        parent.appendChild(fallback);
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
                                    fontFamily: 'var(--font-sans)',
                                    flexShrink: 0
                                }}>
                                    {getInitials(review.author_name)}
                                </div>
                            )}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    margin: 0,
                                    color: 'var(--text)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {review.author_name || 'Anonymous'}
                                </h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <StarRating rating={review.rating || 5} />
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
                            {review.text || 'No review text available.'}
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
                                ★ Google Review
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* View all reviews link */}
            {reviews.length > 6 && (
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <a
                        href="https://g.page/r/ChIJqdR6UIaDGjkR2iiyvu19dHs/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6875rem',
                            color: 'var(--text-2)',
                            textDecoration: 'none',
                            borderBottom: '1px solid var(--line)',
                            paddingBottom: '2px',
                            transition: 'color 0.2s, border-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--accent)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-2)';
                            e.currentTarget.style.borderColor = 'var(--line)';
                        }}
                    >
                        View all {reviews.length} reviews on Google →
                    </a>
                </div>
            )}

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