// src/components/Schema.jsx
import { Helmet } from 'react-helmet';

// Organization Schema - for every page
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AstirMind Software Solutions',
    url: 'https://www.astirmind.com',
    logo: 'https://www.astirmind.com/img/brand-logo-white.png',
    description: 'Custom software, AI, and IT training solutions in Ludhiana.',
    founder: {
      '@type': 'Person',
      name: 'Aksh'
    },
    foundingDate: '2016',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ludhiana',
      addressRegion: 'Punjab',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9815674608',
      contactType: 'sales',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.instagram.com/astirmind/',
      'https://twitter.com/AstirMind',
      'https://www.facebook.com/AstirMind-363890014173446',
      'https://www.youtube.com/@astirmind7859'
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// LocalBusiness Schema
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AstirMind Software Solutions',
    description: 'Custom software, AI, and IT training solutions in Ludhiana.',
    url: 'https://www.astirmind.com',
    telephone: '+91-9815674608',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ludhiana',
      addressRegion: 'Punjab',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.915967102990805',
      longitude: '75.8098441938874'
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    priceRange: '$$'
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Course Schema - for course detail pages
export function CourseSchema({ course }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.desc,
    url: `https://www.astirmind.com/courses/${course.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'AstirMind Software Solutions',
      sameAs: 'https://www.astirmind.com'
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['onsite', 'online'],
      courseWorkload: 'PT16W', // 16 weeks
      location: {
        '@type': 'Place',
        name: 'AstirMind Software Solutions, Ludhiana'
      }
    },
    teaches: course.tags || [],
    educationalCredentialAwarded: {
      '@type': 'EducationalOccupationalCredential',
      name: 'ISO Certified Internship Certificate'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }) {
  // items: [{ name, url }]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.astirmind.com${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}