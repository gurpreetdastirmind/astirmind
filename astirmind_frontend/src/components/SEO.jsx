// src/components/SEO.jsx
import { Helmet } from 'react-helmet';

export default function SEO({ 
  title, 
  description, 
  path, 
  image, 
  article = false,
  noindex = false 
}) {
  const siteUrl = 'https://www.astirmind.com';
  const defaultTitle = 'AstirMind Software Solutions';
  const defaultDescription = 'Custom software, AI, and IT training solutions in Ludhiana.';
  
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const url = path ? `${siteUrl}${path}` : siteUrl;
  const ogImage = image || 'https://www.astirmind.com/images/og-image.jpg';
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />
      
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="AstirMind Software Solutions" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <html lang="en" />
    </Helmet>
  );
}